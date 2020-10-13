import React from 'react';
import PropTypes from 'prop-types';
import RadioGroupList from '@lib/share/items/RadioGroupList';
import RadioItem from '@lib/share/items/RadioItem';
import Button from '@lib/share/items/Button';
import { objIsEmpty } from '@src/utils/CommonUtil';

class pricingCarGradeList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onGradeSelect = this.onHandleGradeSelect.bind(this);
    this.onOpenSpecPopUp = this.onHandleOpenSpePopUp.bind(this);
  }

  onHandleGradeSelect(e, deps) {
    if (this.props.onGradeSelect) {
      this.props.onGradeSelect(e, deps);
    }
  }

  onHandleOpenSpePopUp(e, deps) {
    e.preventDefault();
    e.stopPropagation();
    if (this.props.onClick && deps) {
      this.props.onClick(e, deps);
    }
  }

  render() {
    if (objIsEmpty(this.props.dataList)) {
      return null;
    }

    if (this.props.hasMobile === true) {
      return <RadioGroupList itemsSource={this.props.dataList} selectedValuePath={'seriesNo'} displayMemberPath={'seriesNm'} mode="vertical" onChange={this.onGradeSelect} />;
    }

    return (
      <RadioGroupList itemsSource={this.props.dataList} selectedValuePath={'seriesNo'} displayMemberPath={'seriesNm'} mode="vertical" onChange={this.onGradeSelect}>
        {this.props.dataList.map((item, i) => {
          return (
            <RadioItem key={'radio' + (i + 1)}>
              <Button size="mid" line="gray" radius={true} title="상세사양보기" width={106} dataContext={item} onClick={this.onOpenSpecPopUp} />
            </RadioItem>
          );
        })}
      </RadioGroupList>
    );
  }
}

pricingCarGradeList.propTypes = {
  dataList: PropTypes.array,
  hasMobile: PropTypes.bool,
  onClick: PropTypes.func,
  onGradeSelect: PropTypes.func
};

export default pricingCarGradeList;
