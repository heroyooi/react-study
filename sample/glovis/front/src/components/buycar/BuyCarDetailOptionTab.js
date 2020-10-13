import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@lib/share/items/Button';
import CarOptionsPc from '@src/components/common/car/buyCar/CarOptions'; //pc용 차량옵션 컴포넌트
import CarOptionsMob from '@src/components/common/CarOptions'; //모바일용 차량옵션 컴포넌트
import { setComma } from '@src/utils/StringUtil';
import { stringToDateFotmat } from '@src/utils/CommonUtil';

const BuyCarDetailOptionTab = memo(
  ({ carAccident, carBaseInfo, carOption, isMobile, performance, onCarOptionClick, onHistoryPopUpOpen, onPfmcPopUpOpen, onViewAccidentHistory, onViewPerformance, onViewReport }) => {
    if (isMobile) {
      return (
        <>
          <div className="float-wrap btn-s mt0">
            <h3 className="tit2">차량 기본 정보</h3>
            <Button size="sml" line="red60" color="red60" radius={true} title="허위매물 신고" width={85} onClick={onViewReport} buttonMarkup={true} />
          </div>
          <table summary="차량 기본정보에 대한 내용" className="table-tp1">
            <caption className="away">차량 기본정보</caption>
            <colgroup>
              <col width="24%" />
              <col width="26%" />
              <col width="24%" />
              <col width="26%" />
            </colgroup>
            <tbody>
              <tr>
                <th>차량번호</th>
                <td>{carBaseInfo.carNo}</td>
                <th>연료</th>
                <td>{carBaseInfo.fuelNm === null ? `가솔린` : carBaseInfo.fuelNm}</td>
              </tr>
              <tr>
                <th>변속기</th>
                <td>{carBaseInfo.mssNm === null ? `오토` : carBaseInfo.mssNm}</td>
                <th>색상</th>
                <td>{carBaseInfo.crClrNm}</td>
              </tr>
              <tr>
                <th>연식</th>
                <td>{carBaseInfo.frmYyyy === null ? `2020년식` : `${carBaseInfo.frmYyyy}년식`}</td>
                <th>배기량</th>
                <td>{`${carBaseInfo.dspl}cc`}</td>
              </tr>
              <tr>
                <th>사고유무</th>
                <td>{carBaseInfo.acdtYn === 'Y' ? '사고' : '무사고'}</td>
                <th>압류/저당</th>
                <td>{carBaseInfo.szrMorYn === 'Y' ? '유' : '무'}</td>
              </tr>
              <tr>
                <th>주행거리</th>
                <td>{`${setComma(carBaseInfo?.drvDist || 0)}KM`}</td>
                <th>차종</th>
                <td>{carBaseInfo.crTypeNm}</td>
              </tr>
              <tr>
                <th>제시번호</th>
                <td colSpan="3">{carBaseInfo?.crPrsnNum || ''}</td>
              </tr>
            </tbody>
          </table>
          <CarOptionsMob optionList={carOption} type={1} addOption={true} selectOption={true} className="mt32" callback={onCarOptionClick} />
          <div className="float-wrap btn-s">
            <h3 className="tit2">보험처리 이력</h3>
            {carAccident && (
              <Button size="sml" background="blue20" color="blue80" radius={true} title="자세히 보기" width={88} href="/buy/viewAccidentHistory" onClick={onViewAccidentHistory} buttonMarkup={true} />
            )}
          </div>
          <table summary="보험처리 이력 정보에 대한 내용" className="table-tp1 tx-c">
            <caption className="away">보험처리 이력</caption>
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <thead>
              <tr>
                <th colSpan="4">자동차 특수사고 이력</th>
              </tr>
              <tr>
                <th>전손</th>
                <th>도난</th>
                <th>침수전손</th>
                <th>침수분손</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{carAccident && carAccident.carTotalLess}</td>
                <td>{carAccident && carAccident.carTheft}</td>
                <td>{carAccident && carAccident.carFloodingTotalLess}</td>
                <td>{carAccident && carAccident.carFloodingTotalLess}</td>
              </tr>
            </tbody>
          </table>
          <div className="essential-point tp2 fs12">
            <ul>
              <li>&#8251; 본 차량의 보험처리 이력정보는 {stringToDateFotmat(carAccident.recentCheckHistoryDate)}에 조회한 내용입니다.</li>
              <li>&#8251; 이후 이력 정보의 업데이트가 있을 수 있으며, 보험 이력 조회서비스에서 확인 가능합니다.</li>
            </ul>
          </div>

          <div className="float-wrap btn-s">
            <h3 className="tit2">성능점검 정보</h3>
            <Button size="sml" background="blue20" color="blue80" radius={true} title="자세히 보기" width={88} onClick={onViewPerformance} buttonMarkup={true} />
          </div>
          <table summary="보험처리 이력 정보에 대한 내용" className="table-tp1 tx-c">
            <caption className="away">성능점검 정보</caption>
            <colgroup>
              <col width="*" />
              <col width="33.333%" />
              <col width="33.333%" />
            </colgroup>
            <thead>
              <tr>
                <th colSpan="3">자동차 상태표시</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>교환(교체)</th>
                <th>판금/용접</th>
                <th>흠집</th>
              </tr>
              <tr>
                <td>{performance && performance.isChangeModule === 0 ? '없음' : '있음'}</td>
                <td>{performance && performance.isSheeting === 0 ? '없음' : '있음'}</td>
                <td>{performance && performance.isScratch === 0 ? '없음' : '있음'}</td>
              </tr>
            </tbody>
          </table>

          <table summary="보험처리 이력 정보에 대한 내용" className="table-tp1 mt16">
            <caption className="away">성능점검 정보</caption>
            <colgroup>
              <col width="40%" />
              <col width="60%" />
            </colgroup>
            <tbody>
              <tr>
                <th>사고이력</th>
                <td>{performance && performance && performance.acdtHstYn === 'Y' ? '있음' : '없음'}</td>
              </tr>
              <tr>
                <th>단순수리</th>
                <td>{performance && performance && performance.smplRprYn === 'Y' ? '있음' : '없음'}</td>
              </tr>
              <tr>
                <th>성능/상태 점검자</th>
                <td>{performance && performance.sttChckr}</td>
              </tr>
              <tr>
                <th>성능/상태 점검일</th>
                <td>{performance && stringToDateFotmat(performance.perfInsDt)}</td>
              </tr>
            </tbody>
          </table>
          <div className="essential-point tp2 fs12 mt16">
            <ul>
              <li>&#8251; 단순교환은 사고에 포함되지 않습니다.</li>
              <li>&#8251; 본 성능점검기록부 내용은 판매자가 직접 입력한 내용입니다.</li>
              <li>&#8251; 차량의 상담이나 방문전 성능점검기록부와 차량등록증을 팩스로 요청하시어 차량의 성능점검기록 내용이 일치하는지 확인하실 것을 권장드립니다.</li>
            </ul>
          </div>
        </>
      );
    }

    return (
      <div className="content-wrap">
        <table summary="차량 기본정보에 대한 내용" className="table-tp3">
          <caption>차량 기본정보</caption>
          <colgroup>
            <col width="9%" />
            <col width="18%" />
            <col width="9%" />
            <col width="18%" />
            <col width="9%" />
            <col width="18%" />
            <col width="9%" />
            <col width="10%" />
          </colgroup>
          <tbody>
            <tr>
              <th>차량번호</th>
              <td>{carBaseInfo?.carNo || ''}</td>
              <th>연료</th>
              <td>{carBaseInfo?.fuelNm || ''}</td>
              <th>변속기</th>
              <td>{carBaseInfo?.mssNm || ''}</td>
              <th>색상</th>
              <td>{carBaseInfo?.crClrNm || ''}</td>
            </tr>
            <tr>
              <th>연식</th>
              <td>{carBaseInfo?.frmYyyy || ''}</td>
              <th>배기량</th>
              <td>{`${carBaseInfo?.dspl || 0} cc`}</td>
              <th>사고유무</th>
              <td>{(carBaseInfo?.acdtYn || 'N') === 'Y' ? '사고' : '무사고'}</td>
              <th>압류/저당</th>
              <td>{(carBaseInfo?.szrMorYn || 'N') === 'Y' ? '유' : '무'}</td>
            </tr>
            <tr>
              <th>주행거리</th>
              <td>{`${setComma(carBaseInfo?.drvDist || 0)} KM`}</td>
              <th>차종</th>
              <td>{carBaseInfo?.crTypeNm || ''}</td>
              <th>제시번호</th>
              <td rowSpan="3">{carBaseInfo?.crPrsnNum || ''}</td>
            </tr>
          </tbody>
        </table>
        <CarOptionsPc title="차량 옵션" mode={'view'} type={2} data={carOption} />
        <div className="state-wrap fl">
          <ul className="float-wrap">
            <li>
              <h4>보험이력</h4>
            </li>
            <li>
              <Button size="mid" line="gray" radius={true} title="보험이력 자세히 보기" width={162} onClick={onHistoryPopUpOpen} buttonMarkup={true} />
            </li>
          </ul>
          <table summary="보험이력 정보에 대한 내용" className="table-tp3">
            <caption className="away">보험이력</caption>
            <colgroup>
              <col width="50%" />
              <col width="50%" />
            </colgroup>
            <tbody>
              <tr>
                <th>보험처리이력 등록기준일</th>
                <th>자동차 용도 변경</th>
              </tr>
              <tr>
                <td>{carAccident?.firstRegistrationDate && stringToDateFotmat(carAccident.firstRegistrationDate)}</td>
                <td>{carAccident?.ownerChange || '없음'}</td>
              </tr>
              <tr>
                <th colSpan="2">자동차 특수사고 이력</th>
              </tr>
              <tr>
                <td colSpan="2">
                  <table summary="자동차 특수사고 이력 정보에 대한 내용" className="table-tp1 th-c td-c">
                    <caption className="away">자동차 특수사고 이력</caption>
                    <colgroup>
                      <col width="25%" />
                      <col width="25%" />
                      <col width="25%" />
                      <col width="25%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>전손</th>
                        <th>도난</th>
                        <th>침수전손</th>
                        <th>침수분손</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{carAccident?.carTotalLess || ''}</td>
                        <td>{carAccident?.carTheft || ''}</td>
                        <td>{carAccident?.carFloodingTotalLess || ''}</td>
                        <td>{carAccident?.carFloodingTotalLess || ''}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <ul className="tx-wrap mt40">
                    <li>&#8251; 본 차량의 보험처리 이력정보는 2019년03월11일에 조회한 내용입니다.</li>
                    <li>&#8251; 이후 이력 정보의 업데이트가 있을 수 있으며, 보험 이력 조회서비스에서 확인 가능합니다.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="state-wrap fr">
          <ul className="float-wrap">
            <li>
              <h4>성능점검 정보</h4>
            </li>
            <li>
              <Button size="mid" line="gray" radius={true} title="성능점검 자세히 보기" width={162} onClick={onPfmcPopUpOpen} buttonMarkup={true} />
            </li>
          </ul>
          <table summary="성능점검 정보에 대한 내용" className="table-tp3">
            <caption className="away">성능점검 정보</caption>
            <colgroup>
              <col width="15%" />
              <col width="15%" />
              <col width="30%" />
              <col width="40%" />
            </colgroup>
            <tbody>
              <tr>
                <th colSpan="4">자동차 상태표시</th>
              </tr>
              <tr>
                <td colSpan="4">
                  <table summary="자동차 상태표시 정보에 대한 내용" className="table-tp1 th-c td-c">
                    <caption className="away">자동차 상태표시</caption>
                    <colgroup>
                      <col width="33.33%" />
                      <col width="33.33%" />
                      <col width="33.33%" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>교환(교체)</th>
                        <th>판금/용접</th>
                        <th>흠집</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{performance && performance.isChangeModule === 0 ? '없음' : '있음'}</td>
                        <td>{performance && performance.isSheeting === 0 ? '없음' : '있음'}</td>
                        <td>{performance && performance.isScratch === 0 ? '없음' : '있음'}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <th>사고이력</th>
                <td>{performance && performance.acdtHstYn === 'Y' ? '있음' : '없음'}</td>
                <th>성능/상태 점검자</th>
                <td>{performance && performance.sttChckr}</td>
              </tr>
              <tr>
                <th>단순수리</th>
                <td>{performance && performance.smplRprYn === 'Y' ? '있음' : '없음'}</td>
                <th>성능/상태 점검일</th>
                <td>{performance && stringToDateFotmat(performance.perfInsDt)}</td>
              </tr>
              <tr>
                <td colSpan="4">
                  <ul className="tx-wrap">
                    <li>&#8251; 단순교환은 사고에 포함되지 않습니다.</li>
                    <li>&#8251; 본 성능점검기록부 내용은 판매자가 직접 입력한 내용입니다.</li>
                    <li>&#8251; 차량의 상담이나 방문전 성능점검기록부와 차량등록증을 팩스로 요청하시어 차량의 성능점검기록 내용이 일치하는지 확인하실 것을 권장드립니다.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

BuyCarDetailOptionTab.propTypes = {
  carAccident: PropTypes.object,
  carBaseInfo: PropTypes.object,
  carOption: PropTypes.array,
  isMobile: PropTypes.bool,
  performance: PropTypes.object,
  onCarOptionClick: PropTypes.func,
  onHistoryPopUpOpen: PropTypes.func,
  onPfmcPopUpOpen: PropTypes.func,
  onViewAccidentHistory: PropTypes.func,
  onViewPerformance: PropTypes.func,
  onViewReport: PropTypes.func
};
BuyCarDetailOptionTab.displayName = 'BuyCarDetailOptionTab';
export default BuyCarDetailOptionTab;
