import moment from 'moment';
import PropTypes from 'prop-types';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';

const INIT_DATA = {
  hsvcId: null, // 홈서비스 ID
  payNum: null, // 결제번호
  payDt: null, // 결제일
  prdNm: null, // 결제내용
  payAmt: null, // 결제금액
  athMthdNm: null, // 결재수단
  rcptType: null, // 영수증 타입
  cshrYn: null, // 현금영수증 발급 여부
  txivPblcYn: null, // 세급계산서 발급 여부
  cashReceiptPblcUse: null, // 현금영수증발행용도
  taxNo: null // 발급번호
};
const DATE_FORMAT = 'YYYY-MM-DD';

const PopupReceipt = ({ data = INIT_DATA, closedHandler }) => {
  const now = moment().format(DATE_FORMAT);
  const { payNum, payDt, prdNm, payAmt, athMthdNm, rcptType, cshrYn, txivPblcYn, cashReceiptPblcUse, taxNo } = data;
  return (
    // <div className="popup-reserve">
    //   <div className="reserve-wrap payment-sec method">
    <div className="con-wrap">
      <div>
        {/* <h3 className="sub-tit">영수증/증빙</h3> */}
        {/* <div className="point-area"> */}
        <div>
          <table summary="content" className="table-tp1">
            <caption>결제정보</caption>
            <colgroup>
              <col width="30%" />
              <col width="70%" />
            </colgroup>
            <tbody>
              <tr>
                <th>결제번호</th>
                <td>{payNum}</td>
              </tr>
              <tr>
                <th>결제일</th>
                <td>{payDt}</td>
              </tr>
              <tr>
                <th>결제내용</th>
                <td>{prdNm}</td>
              </tr>
              <tr>
                <th>결제금액</th>
                <td>{payAmt}</td>
              </tr>
              <tr>
                <th>결제수단</th>
                <td>{athMthdNm}</td>
              </tr>
              <tr>
                <th>영수증/증빙</th>
                <td>{rcptType}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt20">
          {cshrYn === 'Y' && (
            <table summary="content" className="table-tp1">
              <caption>현금영수증 신청내역(신청일:{now})</caption>
              <colgroup>
                <col width="30%" />
                <col width="70%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>구분</th>
                  <td>{cashReceiptPblcUse}</td>
                </tr>
                <tr>
                  <th>발급 내역</th>
                  {/* TODO: 홈텍스 연동 api 필요함 */}
                  <td>
                    <a href={`http://naver.com/${taxNo}`}>현금영수증 보기</a>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          {txivPblcYn === 'Y' && (
            <table summary="content" className="table-tp1">
              <caption>세금계산서 신청내역(신청일:{now})</caption>
              <colgroup>
                <col width="30%" />
                <col width="70%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>발급번호</th>
                  <td>{taxNo}</td>
                </tr>
                <tr>
                  <th>상호</th>
                  <td>{'글로비스'}</td>
                </tr>
                <tr>
                  <th>대표자명</th>
                  <td>{'김정훈 '}</td>
                </tr>
                <tr>
                  <th>담당자명</th>
                  <td>{'@ 담당자명'}</td>
                </tr>
                <tr>
                  <th>업태</th>
                  <td>{'도매 및 소매업'}</td>
                </tr>
                <tr>
                  <th>종목</th>
                  <td>{'중고자동차판매'}</td>
                </tr>
                <tr>
                  <th>사업자등록번호</th>
                  <td>{'106-81-97118'}</td>
                </tr>
                <tr>
                  <th>연락처</th>
                  <td>{'02-6191-9114'}</td>
                </tr>
                <tr>
                  <th>이메일주소</th>
                  <td>{'@ 이메일주소'}</td>
                </tr>
                <tr>
                  <th>주소</th>
                  <td>{'서울특별시 강남구 테헤란로301 (역삼동)'}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <Buttons align="center" marginTop={48}>
          <Button size="big" background="blue80" title="확인" width={172} height={60} mode="normal" buttonMarkup onClick={() => closedHandler()} />
        </Buttons>
      </div>
    </div>
  );
};

PopupReceipt.propTypes = {
  data: PropTypes.object,
  closedHandler: PropTypes.func
};

export default PopupReceipt;
