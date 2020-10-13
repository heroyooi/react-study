import { useContext } from 'react';
import RodalPopup from '@lib/share/popup/RodalPopup';
import MypageTender from '@src/components/common/popup/MypageTender';
import { BannerItemContext } from '@src/components/common/banner/BannerItem';
import { car_gallery } from '@src/dummy';

const BannerItemAuction = ({isBidding=false}) => {

  const { tenderPop, closeTenderPop, handleOpenConfirm } = useContext(BannerItemContext);

  return (
    <RodalPopup show={tenderPop} type={'fade'} closedHandler={closeTenderPop} title={isBidding === false ? "입찰하기" : "입찰가격 수정"} mode="normal" size="small">
      <MypageTender />
    </RodalPopup>
  )
}

export default BannerItemAuction;