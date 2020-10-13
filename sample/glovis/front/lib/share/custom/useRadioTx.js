import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import Input from '@lib/share/items/Input';
import Radio from '@lib/share/items/Radio';
import Textarea from '@lib/share/items/Textarea';
import InputNumber from '@lib/share/items/InputNumber';

class UseRadioTx extends React.Component {
  constructor(props) {
    super(props);

    this.onChanged = this.onHandleChanged.bind(this);
    this.onTextChanged = this.onHandleTextChanged.bind(this);
    this.onCounterChanged = this.onHandleCounterChanged.bind(this);
    this.onValueChanged = this.onHandleValueChanged.bind(this);
    this.onCalendarOpen = this.onHandleCalendarOpen.bind(this);
    this.onColorOpen = this.onHandleColorOpen.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (!isEqual(nextProps.dataContext, this.props.dataContext)) {
      return true;
    }
    return false;
  }

  onHandleChanged(e, deps) {
    this.props.onChange(e, { category: this.props.dataContext.category, key: this.props.dataContext.key, value: deps.value });
  }

  onHandleTextChanged(e) {
    this.props.onChange(e, { category: this.props.dataContext.category, key: this.props.dataContext.key, memo: e.target.value });
  }

  onHandleCounterChanged(e) {
    this.props.onChange(e, { category: this.props.dataContext.category, key: this.props.dataContext.key, cnt: e.target.value });
  }

  onHandleValueChanged(e) {
    this.props.onChange(e, { category: this.props.dataContext.category, key: this.props.dataContext.key, value: e.target.value });
  }

  onHandleCalendarOpen(e) {
    e.preventDefault();

    if (this.props.onOpenCarlendar) {
      this.props.onOpenCarlendar(e, { category: this.props.dataContext.category, key: this.props.dataContext.key, value: e.target.value });
    }
  }

  onHandleColorOpen(e) {
    e.preventDefault();

    if (this.props.onOpenColorPicker) {
      this.props.onOpenColorPicker(e, { category: this.props.dataContext.category, key: this.props.dataContext.key, value: e.target.value, text: this.props.dataContext.text });
    }
  }

  render() {
    const { category, checkedValue, unCheckedValue, isDisplay, isRadio, isSelect, key, memo, source, text, title, value, isReadOnly, countKey, cnt } = this.props.dataContext;
    if (isDisplay === false) {
      return null;
    }

    if (isSelect === true) {
      return (
        <>
          <tr>
            <th dangerouslySetInnerHTML={{ __html: title }} />
            <td>
              <ul className="radio-block tp4 col3">
                {source.map((item, idx) => {
                  return (
                    <li key={idx}>
                      <Radio
                        className="txt"
                        id={`livshot-cat-${category}-${key}-${idx}`}
                        label={idx === 0 ? '정상' : idx === 1 ? '판금/용접' : '교환'}
                        value={item}
                        checked={value}
                        dataContext={{ value: item }}
                        onChange={this.onChanged}
                      />
                    </li>
                  );
                })}
              </ul>
            </td>
          </tr>
        </>
      );
    }

    if (isRadio === true) {
      return (
        <>
          <tr>
            <th dangerouslySetInnerHTML={{ __html: title }} />
            <td>
              <ul className={countKey ? 'radio-block tp4' : 'radio-block tp4 ws'}>
                <li>
                  <Radio className="txt" id={`livshot-cat-${category}-${key}-1`} label="양호" value={checkedValue} checked={value} dataContext={{ value: checkedValue }} onChange={this.onChanged} />
                </li>
                <li>
                  <Radio
                    className="txt"
                    id={`livshot-cat-${category}-${key}-2`}
                    label={countKey ? '이상' : '수리/보수 필요'}
                    value={unCheckedValue}
                    checked={value}
                    dataContext={{ value: unCheckedValue }}
                    onChange={this.onChanged}
                  />
                </li>
              </ul>
            </td>
          </tr>
          {(value || '').toString() === unCheckedValue.toString() && countKey ? (
            <tr>
              <td colSpan="2">
                <InputNumber placeHolder="이상 (00) 개" id="input-tp1" height={40} maxLength={6} value={(cnt || '').toString()} onChange={this.onCounterChanged} />
              </td>
            </tr>
          ) : null}
          {(value || '').toString() === unCheckedValue.toString() ? (
            <tr>
              <td colSpan="2">
                <Textarea countLimit={100} isSelf={false} data={memo || ''} type="tp1" width="100%" height={96} placeHolder="특이사항 입력" onChange={this.onTextChanged} />
              </td>
            </tr>
          ) : null}
        </>
      );
    }

    return (
      <tr>
        <th>{title}</th>
        <td>
          {this.props.dataContext.dataType === 'date' ? (
            <div onClick={this.onCalendarOpen}>
              <Input type="text" value={(value || '').substr(0, 10)} id="input-tp1" disabled={true} width="100%" />
            </div>
          ) : this.props.dataContext.dataType === 'number' ? (
            <InputNumber placeHolder="예)10000" id="input-tp1" height={40} maxLength={6} value={value} onChange={this.onValueChanged} />
          ) : this.props.dataContext.dataType === 'color' ? (
            <div onClick={this.onColorOpen}>
              {/* <Input type="text" value={text || value || ''} id="input-tp1" disabled={false} readOnly={true} width="100%" /> */}
              <Input type="text" value={value ? value : text ? text.selectColor : ''} id="input-tp1" disabled={false} readOnly={true} width="100%" />
            </div>
          ) : (
            <Input type="text" value={text || value || ''} id="input-tp1" disabled={isReadOnly === undefined || isReadOnly === null ? true : isReadOnly} width="100%" />
          )}
        </td>
      </tr>
    );
  }
}

UseRadioTx.propTypes = {
  dataContext: PropTypes.object,
  onChange: PropTypes.func,
  onOpenCarlendar: PropTypes.func,
  onOpenColorPicker: PropTypes.func
};

export default UseRadioTx;
