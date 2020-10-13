import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';

const MobPhotoList = memo(({ photoList, callback }) => {
  const handleFilm = (e) => {
    e.preventDefault();
    if (callback) {
      callback(e);
    }
  };
  return (
    <div className="photo-list-wrap">
      <div className="content-sec">
        <ul className="float-wrap">
          <li>촬영하신 사진을 확인해보세요</li>
          <li>
            <Button size="sml" line="gray" radius={true} title="재촬영" width={50} onClick={handleFilm} />
          </li>
        </ul>
      </div>
      <div className="content-wrap">
        {(photoList || []).map((item, idx) => {
          if (item.phtUrl) {
            return (
              <React.Fragment key={idx}>
                <p>{item.title}</p>
                <div className="img-wrap">
                  <img src={item.phtUrl} />
                </div>
              </React.Fragment>
            );
          }
        })}
      </div>
    </div>
  );
});

MobPhotoList.propTypes = {
  photoList: PropTypes.array,
  callback: PropTypes.func
};
MobPhotoList.displayName = 'MobPhotoList';
export default MobPhotoList;
