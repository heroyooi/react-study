import { useCallback, useMemo } from 'react'
import Select, { components } from 'react-select'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars';

const SelectBox = ({className, id, options, disabled, loading, multi, menuOpen, width='100%', height=40, placeHolder, onChange, hoverColor='#f6f7f8', selectedColor='#3f64c3', value, name, valueBy, isValue, closeMenuOnSelect=true}) => {
  const options_H = useMemo(() => {
    return height * 6
  }, []);
  
  const customStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
      ...styles,
      fontSize: 14 + 'px',
      backgroundColor:
        isDisabled
          ? null
          : isSelected 
              ? selectedColor = (selectedColor !== null) ? selectedColor : '#222222'
              : isFocused ? hoverColor : null,        
      color: 
        isDisabled
          ? '#ccc'
          : isSelected ? '#ffffff' : '#222222',
      padding: (height - 14) / 2 + 'px 20px'
      // ':active': { ...styles[':active'], backgroundColor: }
    }),
    control: styles => ({
      ...styles,
      width: width,
      height: multi ? "auto" : height,
      minHeight: height,
      padding: multi ? "8px 0 0" : null
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';  
      return { ...provided, opacity, transition }
    },
    multiValue: (styles, { data }) => ({
      ...styles,
      backgroundColor: '#3f64c3',
      borderRadius: 4,
      margin: 0,
      marginRight: 8,
      marginBottom: 8,
    }),
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      borderRadius: 0,
      color: '#ffffff',
      fontSize: 13,
      height: 26,
      lineHeight: '26px',
      padding: 0,
      paddingLeft: 8,
      paddingRight: 2,
    }),    
    multiValueRemove: (styles, { data }) => ({
      background: 'url(/images/ico/ico-delete-option.svg) 5px 50% no-repeat',
      width: 22,
    })
  }
  const customTheme = theme => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: hoverColor,
      primary: selectedColor
    }
  })
  
  const renderScrollbar = useCallback(({children}) => {
    return (
      <div
        className="items-sbox__menu-list scroll-type"
        style={
          children.length < 6
            ? null : { height: options_H }
        }
      >
        {
          children.length < 6
            ? children : <Scrollbars>{children}</Scrollbars>
        }
      </div>
    );
  }, []);
  let customClassName = (width === '100%') ? `${className} fullsize` : className;
  customClassName += (selectedColor === null) ? ' no-theme' : '';

  const setValue  = (value) => {
    let selectedValue = '';
    if(typeof value =='object') {
      selectedValue = valueBy ? options.find(option => option[valueBy] == value ) : value
    }else{
      //console.log(value);
      selectedValue =  valueBy ? options.find(option => option[valueBy] == value ) :  options.find(option => option['value'] == value )
    }
    //console.log(selectedValue);
    return selectedValue;
  }

  const selectedValue = useMemo(() =>
    setValue(value)
  , [options, valueBy, value]);

  const setDefaultValue = (value) => {
    let defaultValue = '';
    if (multi) {
      defaultValue = isValue !== undefined ? isValue : value;
    } else {
      if (typeof value == 'object') {
        defaultValue = isValue !== undefined ? options[isValue] : value;
      } else {
        //console.log(value);
        defaultValue =  isValue !== undefined ? options[isValue] :  options.find(option => option['value'] == value )
      }
      //console.log(defaultValue);
    }
    
    return defaultValue;
  }

  const selectDefaultValue = useMemo(() =>
    setDefaultValue(value), [value]);

  return (
    <Select
      className={customClassName}
      classNamePrefix={"items-sbox"}
      components={options.length > 5 && {
        MenuList: renderScrollbar
      }}
      captureMenuScroll={options.length > 5 ? false : true}
      instanceId= {id}
      defaultValue={selectDefaultValue}
      value={selectedValue}
      options={options}
      isDisabled={disabled}
      isLoading={loading}
      isMulti={multi}
      defaultInputValue=""
      menuIsOpen={menuOpen}
      onChange={onChange}
      placeholder={placeHolder === undefined ? "선택" : placeHolder}
      autosize={true}
      styles={customStyles}
      theme={customTheme}
      name={name}
      closeMenuOnSelect={closeMenuOnSelect}
    />
  )
}

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
  closeMenuOnSelect : PropTypes.bool
}

export default SelectBox