import React from 'react';
import PropTypes from 'prop-types';
import CarOptions from '@src/components/common/CarOptions';
import withMobFilterPopUp from './withMobFilterPopUp';

const MobFilterOption = ({ displayMemberPath, itemsSource, internalSelectedItems, selectedValuePath, onClose }) => {
  return (
    <div className="filter-list-wrap">
      <div className="content-wrap pt20">
        <CarOptions
          addOption={true}
          isSelectButton={true}
          title="기본옵션"
          type={1}
          mode="check"
          categoryMemberPath={'cat1Nm'}
          displayMemberPath={displayMemberPath}
          selectedValuePath={selectedValuePath}
          selectedOptions={internalSelectedItems}
          optionList={itemsSource}
          callback={onClose}
        />
      </div>
    </div>
  );
};

MobFilterOption.propTypes = {
  displayMemberPath: PropTypes.string,
  internalSelectedItems: PropTypes.array,
  itemsSource: PropTypes.array,
  selectedValuePath: PropTypes.string,
  onClose: PropTypes.func
};

MobFilterOption.displayName = 'MobFilterOption';

export default withMobFilterPopUp(MobFilterOption);
