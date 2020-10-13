import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import { getAppDownloadUrl } from '@src/utils/SitemapUtil';

const MobPhotoGuideList = memo(({ pictureList = [], isAddScratchShot = false, shootingGuide = false, shooting360 = false }) => {

  const [appDownloadUrl, setAppDownloadUrl] = useState('');

  useEffect(() => {
    setAppDownloadUrl(getAppDownloadUrl());
  }, []);

  return (
    <div className="content-wrap">
      {shootingGuide && (
        <>
          <h4>사진등록 방법</h4>
          <p>차량 사진은 직접 촬영하신 사진 업로드, 오토벨 App을 통하여 업로드 하실 수 있습니다.</p>
          <p>오토벨 App을 이용하시면 편리하게 사진 촬영하시고 업로드 하실 수 있습니다. 업로드 이후 언제 어디에서나 계속 진행 하실 수 있습니다.</p>
          <div className="app-down">
            <i className="ico-app" />
            <Button color="blue80" title="오토벨앱 다운로드" href={appDownloadUrl} />
          </div>

          <h4>촬영안내</h4>
          <p className="pic"><img src="/images/mobile/contents/guide-intro.png" alt=""/></p>
          <p>차량 외부 사진 촬영 시, 차량으로부터 2~3m정도 떨어져서 자세를 낮춘 상태에서 가이드 이미지에 맞춰 사진을 촬영하시면 멋진 사진이 나와요.</p>
          <p>연속촬영 선택 시, 차량외부 → 차량내부 → 스크래치샷 순으로 촬영이 계속 진행됩니다.</p>
          <p>어두운 환경(실내 주차장, 흐린날) 보다는 밝은 날 촬영해 주세요.</p>

          <h4>촬영예시</h4>
          <ul className="img-tx-wrap table">
            <li>
              <div className="img-wrap">
                <img src="/images/mobile/contents/app-img-bad.png" alt=""/>
              </div>
            </li>
            <li>
              <span className="tx">높은 자세에서 촬영이 이뤄졌고, 가이드도 맞지 않네요.</span>
            </li>
          </ul>
          <ul className="img-tx-wrap table">
            <li>
              <div className="img-wrap">
                <img src="/images/mobile/contents/app-img-good.png" alt=""/>
              </div>
            </li>
            <li>
              <span className="tx">가이드 맞춤 및 촬영구도가 완벽 합니다.</span>
            </li>
          </ul>
        </>
      )}
      {shooting360 && (
        <>
          <h4>360 촬영이란?</h4>
          <p>라이브 스튜디오나 별도의 특수 촬영장비 없이 오토벨 App으로 간편하게 차량 외부 360 사진을 얻을 수 있습니다.</p>
          <p>제공해드리는 가이드 이미지를 따라 촬영을 하시면 자연스럽게 360도 사진을 얻을 수 있습니다.</p>

          <h4>촬영안내</h4>
          <p className="pic"><img src="/images/mobile/contents/guide-360-1.png" alt=""/></p>
          <p>360 촬영은 차량 정면을 시작으로 운전석 방향으로 회전하며 12방향의 사진을 촬영하게 됩니다.</p>
          <p className="pic mt24"><img src="/images/mobile/contents/guide-360-2.png" alt=""/></p>
          <p>촬영 방향을 확인 하신 후, 가이드에 맞춰 촬영을 진행해 주세요.</p>
        </>
      )}
      {(!shootingGuide && !shooting360) && (
        pictureList.map((item) => (
          <>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
            <ul className="img-tx-wrap">
              <li>
                <i className="ico-close-line" />
                <div className="img-wrap">
                  <img src={item.leftImgUrl} alt={item.leftComment + item.title} />
                </div>
                <span className="tx-bad">{item.leftComment}</span>
              </li>
              <li>
                <i className="ico-chk-line" />
                <div className="img-wrap">
                  <img src={item.rightImgUrl} alt={item.rightComment + item.title} />
                </div>
                <span className="tx-good">{item.rightComment}</span>
              </li>
            </ul>
          </>
        ))
        /* {isAddScratchShot && (
        <>
          <h4>스크래치샷</h4>
          <p>차량의 스크래치 부위를 촬영해주세요.</p>
          <ul className="img-tx-wrap">
            <li>
              <i className="ico-close-line" />
              <div className="img-wrap" />
              <span className="tx-bad" />
            </li>
            <li>
              <i className="ico-chk-line" />
              <div className="img-wrap">
                <img src={'/images/mobile/contents/photo_sample_good_19.jpg'} alt={'good'} />
              </div>
              <span className="tx-good">{'good'}</span>
            </li>
          </ul>
        </>
      )} */
      )}
    </div>
  );
});

MobPhotoGuideList.propTypes = {
  pictureList: PropTypes.array,
  isAddScratchShot: PropTypes.bool,
  shootingGuide: PropTypes.bool,
  shooting360: PropTypes.bool
};
MobPhotoGuideList.displayName = 'MobPhotoGuideList';
export default MobPhotoGuideList;
