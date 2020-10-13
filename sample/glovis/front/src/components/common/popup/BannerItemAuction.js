import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RodalPopup from '@lib/share/popup/RodalPopup';
import MypageTender from '@src/components/common/popup/MypageTender';
import BannerItemBuyCarContext from '@src/components/common/banner/BannerItemBuyCarContext';
import { car_gallery } from '@src/dummy';

const BannerItemAuction = ({ isBidding = false }) => {
  const { tenderPop, closeTenderPop, handleOpenConfirm } = useContext(BannerItemBuyCarContext);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <RodalPopup show={tenderPop} type={'fade'} closedHandler={closeTenderPop} title={isBidding === false ? '입찰하기' : '입찰가격 수정'} mode="normal" size="small">
      <MypageTender />
    </RodalPopup>
  );
};
BannerItemAuction.propTypes = {
  isBidding: PropTypes.bool
};
export default BannerItemAuction;
