import React from 'react';
import PropTypes from 'prop-types';
import CheckColors from '@src/components/common/CheckColors';
import withMobFilterPopUp from './withMobFilterPopUp';

const MobFilterColor = ({ displayMemberPath, itemsSource, internalSelectedItems, selectedValuePath, onClose }) => {
  return (
    <div className="filter-list-wrap">
      <div className="content-wrap">
        <CheckColors
          colorList={itemsSource}
          displayMemberPath={displayMemberPath}
          itemsSource={itemsSource}
          selectedColor={internalSelectedItems}
          selectedValuePath={selectedValuePath}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

MobFilterColor.propTypes = {
  displayMemberPath: PropTypes.string,
  internalSelectedItems: PropTypes.array,
  itemsSource: PropTypes.array,
  selectedValuePath: PropTypes.string,
  onClose: PropTypes.func
};

export default withMobFilterPopUp(MobFilterColor);
