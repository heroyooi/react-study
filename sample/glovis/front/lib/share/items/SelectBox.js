import React, { memo, useCallback, useMemo, useRef, useEffect } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

const SelectBox = memo(
  ({
    className,
    classNamePrefix,
    id,
    options = [],
    disabled,
    loading,
    multi,
    menuOpen,
    width = '100%',
    height = 40,
    placeHolder,
    onChange,
    hoverColor = '#f6f7f8',
    selectedColor = '#3f64c3',
    value,
    name,
    valueBy,
    isValue,
    closeMenuOnSelect = true,
    selectedItemValue,
    hasSelectedItemValue = false,
    customOptionsScroll = true,
    setFocus = false
  }) => {

    const selectEl = useRef();
    const optionsHeight = useMemo(() => {
      return height * 6;
    }, [height]);

    const customStyles = {
      option: (styles, { isDisabled, isFocused, isSelected }) => ({
        ...styles,
        fontSize: 14 + 'px',
        backgroundColor: isDisabled ? null : isSelected ? (selectedColor = selectedColor !== null ? selectedColor : '#222222') : isFocused ? hoverColor : null,
        color: isDisabled ? '#ccc' : isSelected ? '#ffffff' : '#222222',
        padding: (height - 14) / 2 + 'px 20px'
        // ':active': { ...styles[':active'], backgroundColor: }
      }),
      control: (styles) => ({
        ...styles,
        width: width,
        height: multi ? 'auto' : height,
        minHeight: height,
        padding: multi ? '8px 0 0' : null
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        return { ...provided, opacity, transition };
      },
      multiValue: (styles) => ({
        ...styles,
        backgroundColor: '#3f64c3',
        borderRadius: 4,
        margin: 0,
        marginRight: 8,
        marginBottom: 8
      }),
      multiValueLabel: (styles) => ({
        ...styles,
        borderRadius: 0,
        color: '#ffffff',
        fontSize: 13,
        height: 26,
        lineHeight: '26px',
        padding: 0,
        paddingLeft: 8,
        paddingRight: 2
      }),
      multiValueRemove: () => ({
        background: 'url(/images/ico/ico-delete-option.svg) 5px 50% no-repeat',
        width: 22
      })
    };
    const customTheme = (theme) => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary25: hoverColor,
        primary: selectedColor
      }
    });

    const renderScrollbar = useCallback(({ children }) => {
      return (
        <div className="items-sbox__menu-list scroll-type" style={children.length < 6 ? null : !customOptionsScroll ? { height: optionsHeight, overflowY: 'auto' } : { height: optionsHeight }}>
          {!customOptionsScroll ? children : children.length < 6 ? children : <Scrollbars>{children}</Scrollbars>}
        </div>
      );
    }, []);

    let customClassName = width === '100%' ? `${className} fullsize` : className;
    customClassName += selectedColor === null ? ' no-theme' : '';

    const setValue = (value) => {
      let selectedValue = '';
      if (typeof value === 'object') {
        selectedValue = valueBy ? options.find((option) => option[valueBy] == value) : value;
      } else {
        selectedValue = valueBy ? options.find((option) => option[valueBy] == value) : options.find((option) => option['value'] == value);
      }
      return selectedValue;
    };

    const selectedValue = useMemo(() => setValue(value), [options, valueBy, value]);

    const setDefaultValue = (value) => {
      let defaultValue = '';
      if (multi) {
        defaultValue = isValue !== undefined ? isValue : value;
      } else {
        if (typeof value === 'object') {
          defaultValue = isValue !== undefined ? options[isValue] : value;
        } else {
          defaultValue = isValue !== undefined ? options[isValue] : options.find((option) => option['value'] == value);
        }
      }

      return defaultValue;
    };

    const selectDefaultValue = useMemo(() => setDefaultValue(value), [value]);

    //벨리데이션 포커스 타겟이동
    useEffect(() => {
      if(setFocus){
        selectEl.current.focus();
      }
    },[setFocus]);

    if (hasSelectedItemValue === true && multi === true) {
      return (
        <Select
          className={customClassName}
          classNamePrefix={classNamePrefix}
          components={
            options.length > 5 && {
              MenuList: renderScrollbar
            }
          }
          captureMenuScroll={customOptionsScroll && options.length > 5 ? false : true}
          instanceId={id}
          defaultValue={hasSelectedItemValue === true ? selectedItemValue || selectedValue || null : selectDefaultValue}
          value={hasSelectedItemValue === true ? selectedItemValue || selectedValue || null : selectedValue}
          options={options}
          isDisabled={disabled}
          isLoading={loading}
          isMulti={multi}
          defaultInputValue=""
          menuIsOpen={menuOpen}
          onChange={onChange}
          placeholder={placeHolder === undefined ? '선택' : placeHolder}
          autosize={true}
          styles={customStyles}
          theme={customTheme}
          name={name}
          closeMenuOnSelect={closeMenuOnSelect}
        />
      );
    }

    return (
      <Select
        className={customClassName}
        classNamePrefix={classNamePrefix}
        components={
          options.length > 5 && {
            MenuList: renderScrollbar
          }
        }
        captureMenuScroll={customOptionsScroll && options.length > 5 ? false : true}
        instanceId={id}
        defaultValue={hasSelectedItemValue === true && (selectedItemValue === '' || selectedItemValue === undefined || selectedItemValue === null) ? null : selectDefaultValue}
        value={hasSelectedItemValue === true && (selectedItemValue === '' || selectedItemValue === undefined || selectedItemValue === null) ? null : selectedValue}
        options={options}
        isDisabled={disabled}
        isLoading={loading}
        isMulti={multi}
        defaultInputValue=""
        menuIsOpen={menuOpen}
        onChange={onChange}
        placeholder={placeHolder === undefined ? '선택' : placeHolder}
        autosize={true}
        styles={customStyles}
        theme={customTheme}
        name={name}
        closeMenuOnSelect={closeMenuOnSelect}
        ref={selectEl}
      />
    );
  }
);

SelectBox.propTypes = {
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  multi: PropTypes.bool,
  menuOpen: PropTypes.bool,
  width: PropTypes.node,
  height: PropTypes.node,
  onChange: PropTypes.func,
  hoverColor: PropTypes.string,
  selectedColor: PropTypes.node,
  closeMenuOnSelect: PropTypes.bool,
  placeHolder: PropTypes.string,
  value: PropTypes.any,
  name: PropTypes.any,
  valueBy: PropTypes.any,
  isValue: PropTypes.any,
  selectedItemValue: PropTypes.any,
  hasSelectedItemValue: PropTypes.bool,
  customOptionsScroll: PropTypes.bool,
  setFocus : PropTypes.bool
};

SelectBox.defaultProps = {
  classNamePrefix: 'items-sbox'
};

SelectBox.displayName = 'SelectBox';
export default SelectBox;
