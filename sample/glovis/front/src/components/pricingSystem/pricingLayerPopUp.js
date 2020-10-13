import React, { memo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import moment from 'moment';
import CheckBox from '@lib/share/items/CheckBox';
import useRodal from '@lib/share/custom/useRodal';
import RodalPopup from '@lib/share/popup/RodalPopup';

const PricingLayerPopUp = memo(({ cookies }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const cookieName = 'pricing-never-show-up-today';
  const [pricingPopupShow, setPricingPopupShow] = useRodal(false, false);

  const handleChangeToday = useCallback(() => {
    if (cookies) {
      const expires = moment()
        .add(1, 'days')
        .toDate();
      cookies.set(cookieName, true, { path: '/', expires });
    }
    setPricingPopupShow(false);
  }, [cookies, setPricingPopupShow]);

  const handlePopUpClose = useCallback(() => {
    setPricingPopupShow(false);
  }, [setPricingPopupShow]);

  useEffect(() => {
    if (cookies) {
      const currentCookies = cookies.get(cookieName);
      setPricingPopupShow(currentCookies !== undefined ? !currentCookies : true);
    }
  }, [cookies, setPricingPopupShow]);

  return (
    <RodalPopup show={pricingPopupShow} type={'fade'} closedHandler={handlePopUpClose} mode={hasMobile ? 'no-padding ' : 'normal'} size={hasMobile ? undefined : 'small'} className="today-banner">
      <div className="popup-pricing">
        <div className="img-wrap">
          <Link href={'/event/eventList'}>
            <a>
              <img src={hasMobile ? "/images/mobile/dummy/pricing-popup.png" : "/images/dummy/pricing-popup.png"} alt="프라이싱시스템 팝업 이미지" />
            </a>
          </Link>
        </div>
        <div className="today-close">
          <CheckBox id="chk-today-close" title="오늘 하루 동안 보지 않기" onChange={handleChangeToday} />
        </div>
      </div>
    </RodalPopup>
  );
});

PricingLayerPopUp.prototype = {
  cookies: PropTypes.instanceOf(Cookies).isRequired
};

PricingLayerPopUp.displayName = 'PricingLayerPopUp';
export default withCookies(PricingLayerPopUp);
