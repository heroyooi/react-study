import { useState, useCallback, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SelectBox from '@lib/share/items/SelectBox';
import PageNavigator from '@src/components/common/PageNavigator';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobFilterModel from '@src/components/common/MobFilterModel';

import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import CheckBox from '@lib/share/items/CheckBox';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import MobBottomArea from '@lib/share/items/MobBottomArea';
import useCreatePortalInBody from '@lib/share/custom/useCreatePortalInBody';

import ProdListItemA from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdListItemA';
import ProdListItemB from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdListItemB';
import ProdListItemC from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdListItemC';

import { getCommonCodeAsync } from '@src/utils/DataUtils'

import { ProdItemType } from '@src/constant/dealer/dealerProd'
import { preventScroll } from '@src/utils/CommonUtil';
const { itemTypeA, itemTypeB, itemTypeC} =  ProdItemType

const ProdListMobile = ({eventHandler, checkItem, checkAll, sttDvcd, statusList}) => {
  const dealerProdList = useSelector((rootStore) => rootStore.dealerProdList);
  const {
    [`mList${sttDvcd}`]:list,
    selectedItems,
  } = dealerProdList;
  const [ sortValue, setSortValue] = useState('REG_DT')
  const [ startDt, setStartDt ] = useState(new Date())
  const [ endDt, setEndDt ] = useState(new Date())

  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);
  const [fpAd, setFpAd] = useState(false); // 광고관리 > 상품안내 > 자세히 보기 팝업
  const [fpAdBuy, setFpAdBuy] = useState(false); // 광고관리 > 구입하기 > 이용권 구매 팝업
  const [fpFilter01, setFpFilter01] = useState(false); // 제조사,모델,등급 팝업

  const handleFullpagePopup = useCallback(name => e => {
    e.preventDefault();
    if (name === "f1") {
      setFpAd(false);
      setFpAdBuy(false);
      setFpFilter01(true);
    } else if (name === "ad") {
      setFpFilter01(false);
      setFpAdBuy(false);
      setFpAd(true);
    } else if (name === "adBuy") {
      setFpFilter01(false);
      setFpAd(false);
      setFpAdBuy(true);
    }
    preventScroll(true);
  }, [fpFilter01, fpAd, fpAdBuy]);

  const [dimm, setDimm] = useState(false);
  const [active, setActive] = useState(false);
  const handleOpenPop = useCallback((e) => {
    e.preventDefault();
    setActive(true);
    setDimm(true);
    preventScroll(true);
  }, []);
  const handleCloseDimm = useCallback(() => {
    setActive(false);
    setDimm(false);
    preventScroll(false);
  }, []);

  const createBodyPortal1 = useCreatePortalInBody(null, "wrap");
  const createBodyPortal2 = useCreatePortalInBody(null, "wrap");
  const createBodyPortal3 = useCreatePortalInBody(null, "wrap");

  const clickHandler = e => {
    const { name, value } = e.target
    handleCloseDimm()
    eventHandler({
      [name] : value,
      sttDvcd,
    })
  }

  return (
    <>
      <div className="register-admin-sec">
        <div className="float-wrap btn-s">
          <h3 className="tit2">판매차량 목록</h3>
          <Button size="sml" background="blue20" color="blue80" radius={true} title="상세조회" width={61} onClick={handleOpenPop} />
        </div>

        <ul className="admin-list-wrap">
          <li>
            <div className="float-wrap btn-xs mb20">
              <CheckBox id='sell-all-chk1' title='전체선택' isSelf={false} onChange={checkAll} />
              <div className="btn-wrap">
                <Button size="sml" line="gray" color="gray" radius={true} title="선택차량 삭제" width={74} height={24} fontSize={10} fontWeight={500} />
                <Button size="sml" line="gray" color="gray" radius={true} title="대기차량 이동" width={74} height={24} fontSize={10} fontWeight={500} marginLeft={8} />
              </div>
            </div>
            <div className="goods-list admin-list tp4">
              <ul>
                {
                  list.length ?
                    list?.map((item, i) => (
                      <li key={i}>
                        {
                          itemTypeA.includes(item.sttDvcd) ?
                            <ProdListItemA
                              item={item}
                              key={i}
                              checked={selectedItems?.findIndex((selectedItem) => selectedItem?.dlrPrdId == item?.dlrPrdId) >= 0}
                              checkItem={checkItem}
                            />
                          : itemTypeB.includes(item.sttDvcd) ?
                              <ProdListItemB
                                item={item}
                                key={i}
                                checked={selectedItems?.findIndex((selectedItem) => selectedItem?.dlrPrdId == item?.dlrPrdId) >= 0}
                                checkItem={checkItem}
                              />
                            :
                              <ProdListItemC
                                item={item}
                                key={i}
                                checked={selectedItems?.findIndex((selectedItem) => selectedItem?.dlrPrdId == item?.dlrPrdId) >= 0}
                                checkItem={checkItem}
                              />
                        }
                      </li>
                    ))
                  :
                    <div className="list-none-wrap">
                      <p className="list-none">광고중인 차량이 없습니다.
                        <span>광고효과 분석은 차량 등록 후<br />48시간 이후 확인 하실 수 있습니다.</span>
                      </p>
                    </div>
                }

              </ul>
            </div>
          </li>
        </ul>
      </div>

      {createBodyPortal1(<div className={dimm ? "modal-bg active" : "modal-bg"} onClick={handleCloseDimm}></div>)}

      {createBodyPortal2(<MobBottomArea active={active} isFixButton={true}>
        <div className="inner pb7">
          <h3 className="tit1 pb7">상세조회</h3>
          <ul className="m-menu-list tp1">
            <li onClick={handleFullpagePopup("f1")}>
              <div className="sel-wrap">
                <span className="tit">제조사/모델</span>
              </div>
            </li>
            <li className="btn-wrap">
              <span className="tit">정렬</span>
              <Buttons align="center">
                <Button size="mid" buttonMarkup={true} onClick={clickHandler} name="sortValue" value="REG_DT" background={sortValue == 'REG_DT' ? 'blue80' : ''} line={sortValue == 'REG_DT' ? '' : 'gray'} radius={true} title="등록순" width={48} measure={'%'} height={38} />
                <Button size="mid" buttonMarkup={true} onClick={clickHandler} name="sortValue" value="UDT_DT" background={sortValue == 'UDT_DT' ? 'blue80' : ''} line={sortValue == 'UDT_DT' ? '' : 'gray'} radius={true} title="업데이트순" width={48} measure={'%'} height={38} marginLeft={4} mgMeasure={'%'} />
              </Buttons>
            </li>
          </ul>
        </div>
        <Button className="fixed" size="full" background="blue80" title="조회" />
      </MobBottomArea>)}
      
      {createBodyPortal3(<MobFullpagePopup active={mFullpagePopup} paddingBottom={56}>
        {fpFilter01 && (<><MobFilterModel hiddenTab={[2]} /><Button className="fixed" size="full" background="blue80" title="전체선택" /></>)}
      </MobFullpagePopup>)}
    </>
  )
}

export default ProdListMobile;