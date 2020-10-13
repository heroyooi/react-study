import { useState, useEffect, useMemo, useContext } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames/bind'
import Router from 'next/router';

import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';

import UpdateTimePicker from '@src/components/mypage/dealer/DealerProdList/popUpdateTimePicker';
import PopUpdateTimePicker from '@src/components/mypage/dealer/DealerProdList/popUpdateTimePicker';
import PageNavigator from '@src/components/common/PageNavigator';
import AnotherProdCarListAsync from '@src/components/mypage/dealer/DealerAdManagement/tabAdEffect/AnotherProdCarListAsync';
import ProdCarSummary from '@src/components/mypage/dealer/DealerProdList/ProdListItem/ProdCarSummary'

import * as dealerProdApi from '@src/api/mypage/dealer/dealerProdApi';
import { setComma } from '@src/utils/StringUtil';
import { imgUrl } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';

const tabPurchaseHistory = ({params, eventHandler, advStore, prodStore}) => {
  const { advEffect = {}, analysis, } = useSelector((rootStore) => rootStore.dealerAdverEffect);
  console.log("tabPurchaseHistory -> advEffect", advEffect)
  console.log("tabPurchaseHistory -> analysis", analysis)
  console.log("tabPurchaseHistory -> advStore", advStore)
  console.log("tabPurchaseHistory -> prodStore", prodStore)
  const { showAlert, showConfirm, showLoader, hideLoader, Confirm, initAlert, initConfirm } = useContext(SystemContext);
  const { dlrPrdAdLstList = [], updatePassInfoList } = advEffect;
  const [ selectedCompareCategory, setSelectedCompareCategory ] = useState(params?.effectCategory)
  // console.log("tabPurchaseHistory -> prodItem", prodItem)
  const [ displayUpdatePop, setDisplayUpdatePop, showUpdatePop, hideUpdatePop] = useRodal(false);
  const [ displayMyOtherAdverProdListPop, setDisplayMyOtherAdverProdListPop, showMyOtherAdverProdListPop, hideMyOtherAdverProdListPop] = useRodal(false);
  const [ prodItem, setProdItem ] = useState({})

  const adTitle = useMemo(() => dlrPrdAdLstList?.map((ad) => {
    console.log("adTitle -> ad", ad)
    console.log("adTitle -> ad?.prdNm", ad?.prdNm)
    return ad?.prdNm
  }).join(', ') ?? '', [advEffect?.dlrPrdAdLstList]);

  const [ compareCategories ] = useState([
    {code:"00", label:"전체차량" },
    {code:"01", label:"동일 모델" },
    {code:"02", label:"동일 등급" },
    {code:"03", label:"동일 세그먼트" },
    {code:"04", label:"Live Service 차량" },
    {code:"05", label:"동일 지역 차량" },
  ])

  const selectCategory = (e) => {
    e.preventDefault()
    const { dataset : { effectCategory } } = e.target
    eventHandler({
      effectCategory,
    })
  }
  
  const showMyOtherAdverProdPop = (e) => {
    console.log('showMyOtherAdverProdPop')
    showMyOtherAdverProdListPop(true)
  }
  
  const saveUpdateTime = (data) => {
    hideUpdatePop(false)
    if(data?.length){
      console.log('save : ', data)
      const { dlrPrdId } = data
      eventHandler({
        dlrPrdId
      })
    }
  }

  const saveCallback = (item) => {
    console.log('saveCallback item : ', item)
    if(item){
      console.log('load : ', item)
      const { dlrPrdId } = item
      eventHandler({
        dlrPrdId
      })
    }
    hideMyOtherAdverProdListPop(false)
  }

  const changingEvent = (data) => {
    console.log('changingEvent : ', data)
  }

  const showUpdatePopAsync = async (e) => {
    e.persist()
    const { dlrPrdId } = advEffect
    showLoader()
    const { data, statusinfo } = await dealerProdApi.selectSaleProdItem(dlrPrdId).then((res) => res?.data);
    console.log("showUpdatePopAsync -> data", data)
    console.log("showUpdatePopAsync -> statusinfo", statusinfo)

    hideLoader()
    if(data){
      setProdItem(data)
      showUpdatePop(e, 'slideUp')
    } else {
      showAlert('에러가 발생했습니다')
    }
  }

  useEffect(()=>{
    setSelectedCompareCategory(params.effectCategory)
  },[ params.effectCategory ])

  return (
    <>
      {
        // analysis?.myTodayClickAvg &&
        advEffect?.crId ?
          <>
            <div className="dealer-adeffect-sec">
              <div className="admin-list tp1">
                <div className="content-top">
                  <div className="img-cover">
                    <img src={advEffect?.phtUrl ? imgUrl+advEffect?.phtUrl : '/images/dummy/market-car-no-img.jpg'} alt="차량 이미지" />
                  </div>

                  <ProdCarSummary
                    item={advEffect}
                    mss={advEffect?.mssNm}
                    fuel={advEffect?.fuelNm}
                  />
                  
                  {/* <div className="summary">
                    <h4 className="subject">{advEffect?.crNm}</h4>
                    <ul className="info">
                      <li>{advEffect?.crNo}</li>
                      <li>{advEffect?.frmYyyy}년형</li>
                      <li>{setComma(advEffect?.drvDist)}km</li>
                      <li>{advEffect?.mssNm}</li>
                      <li>{advEffect?.fuelNm}</li>
                    </ul>
                    <p className="price-tp6">
                      {setComma(advEffect?.slAmt)}<span className="won">만원</span>
                    </p>
                  </div> */}

                  <ul className="numerical">
                    <li>
                      <i className="ico-dot sml"></i>판매기간<span>{advEffect?.allday}일</span>
                    </li>
                    <li>
                      <i className="ico-dot sml"></i>조회수(일평균)<span>{advEffect?.dayaverageview}회</span>
                    </li>
                    <li>
                      <i className="ico-dot sml"></i>관심고객<span>{advEffect?.itrtcnt}명</span>
                    </li>
                    <li>
                      <i className="ico-dot sml"></i>동급매물(최근4주)
                      <span>
                        <i className="ico-triangle-top"></i>{advEffect?.samecnt}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="content-bottom">
                  <ul>
                    <li className="product-name">{adTitle}</li>
                    <li>
                      <span>등록일</span>{advEffect?.prdRegDt}
                    </li>
                    <li>
                      <span>최종수정일</span> {advEffect?.prdUpdDt}
                    </li>

                    {
                      updatePassInfoList &&
                      <li>
                        <span>최종업데이트 </span>
                        {updatePassInfoList[0]?.lastUpdHm} ({updatePassInfoList[0]?.updTimeCnt}/{updatePassInfoList[0]?.updTimeMaxCnt}회)
                      </li>
                    }
                  </ul>
                  <Button size="mid" line="blue80" color="blue80" radius={true} title="업데이트 시간변경" onClick={showUpdatePopAsync} width={129} buttonMarkup={true} />
                </div>
              </div>

              <Buttons align="right" marginTop={16}>
                <Button size="sml" background="blue80" radius={true} title="다른 차량 불러오기" width={109} buttonMarkup={true} onClick={(e) => showMyOtherAdverProdPop(e)} />
              </Buttons>

              
              <h3 className="sub-tit">비교하고 싶은 대상을 선택하세요.</h3>
              <div className="tabmenu tp9">
                <ul className="ui-tab">
                  {
                    compareCategories.map((compareCategory,i) =>
                      <li key={i} className={classNames("tabTitle", {"on" : compareCategory.code == selectedCompareCategory})}>
                        {/* <button type="button" onClick={selectCategory} >{compareCategory.label}</button> */}
                        <a href="#" onClick={selectCategory} data-effect-category={compareCategory.code} style={{
                          "display" : "block",
                          "lineHeight" : "38px"
                        }} >{compareCategory.label}</a>
                      </li>
                    )
                  }
                </ul>
                {
                  analysis?.avgadamtcnt !== undefined ?
                    <div className="ui-panel active" id="tab9-1">
                      <table className="table-tp1 th-c td-c" summary="비교하고 싶은 대상에 대한 내용">
                        <caption className="away">비교하고 싶은 대상</caption>
                        <colgroup>
                          <col width="20%"/>
                          <col width="16%"/>
                          <col width="16%"/>
                          <col width="16%"/>
                          <col width="16%"/>
                          <col width="16%"/>
                        </colgroup>
                        <thead>
                          <tr>
                            <th></th>
                            <th>일평균 클릭 수</th>
                            <th>관심 고객 수(찜수)</th>
                            <th>주간 콜 수</th>
                            <th>재고일 수</th>
                            <th>(평균)광고가</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>내 차량 수치</th>
                            <td>{analysis?.myclickcnt}회</td>
                            <td>{analysis?.mylikecnt}회</td>
                            <td>{analysis?.mycallcnt}회</td>
                            <td>{analysis?.myregdtcnt}</td>
                            <td>{setComma(analysis?.myadamtcnt)}만원</td>
                          </tr>
                          <tr>
                            <th>전체 차량 평균 수치</th>
                            <td>{analysis?.avgclickcnt}회</td>
                            <td>{analysis?.avglikecnt}회</td>
                            <td>{analysis?.avgcallcnt}회</td>
                            <td>{analysis?.avgregdtcnt}</td>
                            <td>{setComma(analysis?.avgadamtcnt)}만원</td>
                            </tr>
                          <tr>
                            <th>전체 차량 대비 비교</th>
                            <td><i className="ico-triangle-top"></i><span>{analysis?.clickpct}%</span></td>
                            <td><i className="ico-triangle-top"></i><span>{analysis?.likepct}%</span></td>
                            <td><i className="ico-triangle-bottom"></i><span>{analysis?.callpct}%</span></td>
                            <td>{analysis?.regdtpct}</td>
                            <td><i className="ico-triangle-bottom"></i><span>{analysis?.adamtpct}%</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  :
                    <div className="ui-panel active" id="tab9-1">
                      <div className="admin-list tp1" style={{marginTop:'12px'}}>
                        <p style={{textAlign:'center'}}>
                          현재 생성된 데이터가 없습니다
                        </p>
                      </div>
                    </div>
                }
              </div>
            </div>
          </>
        :
          <div className="dealer-adeffect-sec">
            <div className="admin-list tp1">
              <p style={{textAlign:'center'}}>
                광고중인 상품이 없습니다
              </p>
            </div>
          </div>
      }
      <RodalPopup show={displayUpdatePop} type={'fade'} closedHandler={hideUpdatePop} title="업데이트 시간 변경" mode="normal" size="large">
        <PopUpdateTimePicker changingEvent={changingEvent} onClose={hideUpdatePop} prodItem={prodItem} />
      </RodalPopup>

      <RodalPopup show={displayMyOtherAdverProdListPop} type={'fade'} closedHandler={hideMyOtherAdverProdListPop} title="다른 차량 불러오기" mode="normal" size="medium">
        <AnotherProdCarListAsync saveCallback={saveCallback} />
      </RodalPopup>
    </>
  );
};
export default tabPurchaseHistory;
