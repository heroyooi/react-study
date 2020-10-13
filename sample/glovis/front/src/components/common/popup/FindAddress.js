import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { _, isEmpty, orderBy, cloneDeep } from 'lodash';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import { SystemContext } from '@src/provider/SystemProvider';
import PageNavigator from '@src/components/common/PageNavigator';

/* target 추가, Number Format 추가 */
const FindAddress = ({ AddressEvent, closeModal = true, target, callback, mode = 'simple' }) => {
  const nf = Intl.NumberFormat();
  const [isSearch, setIsSearch] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [addrs, setAddrs] = useState([]);
  const [text, setText] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [addData, setAddData] = useState('');
  const [postCode, setPostCode] = useState('');
  const [detailText, setDetailText] = useState('');
  const [locCd, setLocCd] = useState('');
  const [ctyCd, setCtyCd] = useState('');
  const { showAlert, showConfirm, Alert, Confirm, initAlert, initConfirm } = useContext(SystemContext);

  const reset = () => {
    setText('');
    setAddrs([]);
    setIsDetail(false);
    setAddData('');
    setPostCode('');
    setLocCd('');
    setCtyCd('');
  };

  const handleKeyPress = (e) => {
    console.log(e.charCode);
    if (e.charCode === 13) {
      findAddressData(e, 1);
    }
  };

  const resetInput = (e) => {
    setText('');
    setAddrs([]);
  };

  const onChangeAddress = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const onChangeDetailAddress = (e) => {
    const { value } = e.target;
    setDetailText(value);
  };

  const handleDetail = useCallback((e, val) => {
    e.preventDefault();
    // setIsSearch(false);
    console.log(val);

    setAddData(val.roadAddr);
    setPostCode(val.zipNo);
    setLocCd(val.locCd);
    setCtyCd(val.ctyCd);
    setIsDetail(true);

    if (hasMobile && mode === 'detail') {
      setTimeout(() => {
        document.querySelector('.fp-wrap .fp-content').scrollTo(0, document.querySelector('.fp-wrap .address-wrap').clientHeight);
      }, 10);
    }
  }, []);

  const clickPageNavi = (e, clickedPageNo) => {
    console.log(clickedPageNo);
    setCurrentPage(clickedPageNo);
    findAddressData(e, clickedPageNo);
  };

  const hasMobile = useSelector((state) => state.common.hasMobile);

  const pushAddrs = (json) => {
    console.log(json.results);
    console.log(json.results.common.totalCount);
    if (!json?.results?.juso?.length) {
      setTotalCount(0);
      setAddrs([]);
      showAlert('해당 주소가 없습니다. 다시 입력하세요');
    } else {
      setTotalCount(Number(json.results.common.totalCount));
      const Addrdata = json.results.juso;
      const formData = [];
      const obj = {};
      Addrdata.forEach((val) => {
        obj.zipNo = val.zipNo;
        obj.roadAddr = val.roadAddr;
        obj.jibunAddr = val.jibunAddr;
        obj.locCd = val.admCd.substr(0, 2);
        obj.ctyCd = val.admCd.substr(2, 3);
        formData.push(cloneDeep(obj));
      });
      setAddrs(formData);
    }
  };

  const findAddressData = (e, Data) => {
    if (typeof text === 'undefined' || text.length === 0) {
      showAlert('주소를 입력하세요.');
      return;
    }

    axios({
      method: 'GET',
      url: 'https://www.juso.go.kr/addrlink/addrLinkApi.do',
      params: {
        currentPage: !Data ? 1 : Data,
        countPerPage: 10,
        keyword: text,
        confmKey: 'U01TX0FVVEgyMDIwMDEyMDAxMTYyNDEwOTQwNTM=',
        resultType: 'json'
      }
    })
      .then((response) => {
        pushAddrs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendData = (e, target) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (typeof addData === 'undefined' || addData.length === 0) {
      showAlert('도로명주소를 확인하십시오.');
      return false;
    }

    if (typeof detailText === 'undefined' || detailText.length === 0) {
      showAlert('상세주소를 입력하세요.');
      return false;
    }

    const result = {
      postCode: postCode,
      addData: addData,
      detailText: detailText,
      locCd: locCd,
      ctyCd: ctyCd
    };

    AddressEvent(result, target);
    reset();
  };

  const sendDataM = (e, val, target) => {
    if (typeof val.roadAddr === 'undefined' || val.roadAddr.length === 0) {
      showAlert('도로명주소를 확인하십시오.');
      return false;
    }

    const result = {
      postCode: val.zipNo,
      addData: val.roadAddr,
      locCd: val.locCd,
      ctyCd: val.ctyCd
    };

    AddressEvent(e, result, target);
    reset();
  };

  useEffect(
    () => () => {
      initAlert();
      initConfirm();
      if (closeModal) {
        reset();
      }
    },
    []
  );

  const handleClick = (e, val) => {
    e.preventDefault();

    setAddData(val.roadAddr);
    setPostCode(val.zipNo);
    setLocCd(val.locCd);
    setCtyCd(val.ctyCd);
    setIsDetail(false);

    sendDataM(e, val, target);

    //if (callback) callback(e);
  };

  if (hasMobile && mode === 'simple') {
    return (
      <div className="address-wrap">
        <span className="bridge2">
          <Input type="text" placeHolder="주소를 검색해주세요." id="input-tp3" uiType={3} width="73%" value={text} onChange={onChangeAddress} onKeyPress={handleKeyPress} />
          <Button
            size="mid"
            background="blue80"
            radius={true}
            title="검색"
            measure={'%'}
            width={24.5}
            marginLeft={2.5}
            mgMeasure="%"
            buttonMarkup={true}
            onClick={(e) => findAddressData(e, currentPage)}
          />
        </span>
        <ul className="bottom">
          {!isEmpty(addrs) &&
            addrs.map((val, index) => {
              return (
                <li key={index} onClick={(e) => handleClick(e, val)}>
                  <div className="float-wrap">
                    <p className="num fl">{val.zipNo}</p>
                  </div>
                  <p className="address">
                    {val.roadAddr}
                    <span className="num">(지번){val.jibunAddr}</span>
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }

  if (hasMobile && mode === 'detail') {
    return (
      <div className="address-wrap">
        <Input type="text" placeHolder="주소를 검색해주세요." id="input-tp3" uiType={3} value={text} onChange={onChangeAddress} onKeyPress={handleKeyPress} />
        <ul className="bottom">
          {!isEmpty(addrs) &&
            addrs.map((val, index) => {
              return (
                <li key={index} onClick={(e) => handleDetail(e, val)}>
                  <div className="float-wrap">
                    <p className="num fl">{val.zipNo}</p>
                  </div>
                  <p className="address">
                    {val.roadAddr}
                    <span className="num">(지번){val.jibunAddr}</span>
                  </p>
                </li>
              );
            })}
        </ul>
        {isEmpty(addrs) && (
          <div className="find-address-tip">
            <p className="tit">주소 검색 Tip!</p>
            <ul>
              <li>동/읍/면/리 + 번지 (예: 역삼동 701-2)</li>
              <li>도로명+건물번호 입력 (예: 테헤란로 301)</li>
              <li>건물명 입력 (예: 강남소방서)</li>
            </ul>
          </div>
        )}
        {isDetail === true && (
          <>
            <table summary="상세주소에 대한 정보" className="table-tp1">
              <caption>상세주소 입력</caption>
              <colgroup>
                <col width="25%" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <th>도로명주소</th>
                  <td className="add-data">{addData}</td>
                </tr>
                <tr>
                  <th>상세주소입력</th>
                  <td>
                    <Input type="text" height={40} onChange={onChangeDetailAddress} value={detailText} />
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <Buttons align="center" marginTop={30}>
              <Button size="full" background="blue80" title="주소입력" onClick={(e) => sendData(e, target)} buttonMarkup={true} />
            </Buttons> */}
            <Button className="fixed" size="full" background="blue80" title="주소입력" onClick={(e) => sendData(e, target)} />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="address-wrap">
      <div className="top">
        <div className="search-wrap">
          <div className="input-tx-wrap">
            <Input type="text" width={511} height={40} placeHolder="도로명주소, 건물명 또는 지번 입력" value={text} onChange={onChangeAddress} onKeyPress={handleKeyPress} />
            <Button className="re-input" size="mid" color="blue80" title="재입력" onClick={resetInput} buttonMarkup={true} />
          </div>
          <Button size="mid" background="blue80" title="검색" width={100} height={40} onClick={(e) => findAddressData(e, currentPage)} buttonMarkup={true} />
        </div>
        <p>검색어 예: 도로명 (반포대로 58), 건물명 (독립기념관), 지번 (삼성동 25)</p>
      </div>
      <div className="bottom">
        <p className="inquire-num">도로명 주소 검색 결과 : {nf.format(totalCount)}건</p>
        <ColoredScrollbars autoHeightMax={344}>
          <table summary="우편번호에 대한 정보" className="table-tp1 th-c td-c">
            <caption className="away">우편번호 검색</caption>
            <colgroup>
              <col width="7%" />
              <col width="*" />
              <col width="15%" />
            </colgroup>
            <thead>
              <tr>
                <th>NO</th>
                <th>도로명주소</th>
                <th>우편번호</th>
              </tr>
            </thead>
            <tbody>
              {!isEmpty(addrs) &&
                addrs.map((val, index) => {
                  return (
                    <tr key={index} onClick={(e) => handleDetail(e, val)}>
                      <td>{index + 1}</td>
                      <td>
                        {val.roadAddr}
                        <span className="num">(지번){val.jibunAddr}</span>
                      </td>
                      <td>{val.zipNo}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </ColoredScrollbars>
        {isEmpty(addrs) && (
          <div className="list-none">
            <p>
              <i className="ico-notify-big" />
              주소가 없습니다.
            </p>
          </div>
        )}
        {!isEmpty(addrs) && <PageNavigator className={'mt32'} currentPage={currentPage} recordCount={totalCount} recordSize={10} changed={clickPageNavi} />}

        {isDetail === true && (
          <>
            <table summary="상세주소에 대한 정보" className="table-tp1">
              <caption>상세주소 입력</caption>
              <colgroup>
                <col width="25%" />
                <col width="*" />
              </colgroup>
              <tbody>
                <tr>
                  <th>도로명주소</th>
                  <td>{addData}</td>
                </tr>
                <tr>
                  <th>상세주소입력</th>
                  <td>
                    <Input type="text" height={40} onChange={onChangeDetailAddress} value={detailText} />
                  </td>
                </tr>
              </tbody>
            </table>
            <Buttons align="center" marginTop={30} marginBottom={67}>
              <Button size="big" background="blue80" title="주소입력" width={127} height={40} onClick={(e) => sendData(e, target)} buttonMarkup={true} />
            </Buttons>
          </>
        )}
      </div>
    </div>
  );
};

export default FindAddress;
