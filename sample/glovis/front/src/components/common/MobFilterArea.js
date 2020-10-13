import React from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import withMobFilterPopUp from './withMobFilterPopUp';

const MobFilterArea = ({ displayMemberPath, itemsSource, internalSelectedItems, selectedValuePath, onChange, onSelect }) => {
  return (
    <>
      <div className="filter-list-wrap">
        <div className={'content-wrap left-wrap col4'}>
          {/* <h3>서울/경인</h3> */}
          <ul>
            {(itemsSource || []).map((data, idx) => {
              return (
                <li key={idx}>
                  <CheckBox
                    id={`chk-loc-${data[selectedValuePath]}`}
                    title={data[displayMemberPath]}
                    isSelf={false}
                    dataContext={data}
                    checked={(internalSelectedItems || []).includes(data[selectedValuePath])}
                    onChange={onChange}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Button className="fixed" size="full" background="blue80" title="선택" onClick={onSelect} />
    </>
  );
};

MobFilterArea.propTypes = {
  displayMemberPath: PropTypes.string,
  internalSelectedItems: PropTypes.array,
  itemsSource: PropTypes.array,
  selectedValuePath: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func
};

export default withMobFilterPopUp(MobFilterArea);
