import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import ImgCover from '@lib/share/items/ImgCover';
//import { compareList } from '@src/dummy';
import {imgUrl  as baseURL } from '@src/utils/HttpUtils';
import Router from 'next/router';

const MypageCompare = ({show, onClickPrint, compareList}) => {
  const [compareSortH, setCompareSortH] = useState([]);
  const [toogle1, setToogle1] = useState(true);
  const [toogle2, setToogle2] = useState(true);
  const [instCount, setInstCount] = useState(0);
  const [mothly, setMonthly] = useState(24);

  const arrayMoveMutate = (array, from, to) => {
    const startIndex = to < 0 ? array.length + to : to;
    const item = array.splice(from, 1)[0];
    array.splice(startIndex, 0, item);
  };
  
  const arrayMove = (array, from, to) => {
    array = array.slice();
    arrayMoveMutate(array, from, to);
    return array;
  };

  const slideToggle1 = useCallback((e) => {
    e.preventDefault();
    setToogle1(prevToggle => !prevToggle);
  }, []);
  const slideToggle2 = useCallback((e) => {
    e.preventDefault();
    setToogle2(prevToggle => !prevToggle);
  }, []);

  const SortCover = memo(({isMarkup=false, children, cName="list-con compare-sort-cover", height}) => {
    if (isMarkup === true) {
      return (<div className={cName} style={{height: height + 'px'}}><div className="list-con-in" style={{height: height + 'px'}}>{children}</div></div>);
    } else {
      return (<div className={cName} style={{height: height + 'px'}}><div className="list-con-in" style={{height: height + 'px'}}><p>{children}</p></div></div>);
    }
  });


  const linkDetailCar = (e, data) => {
    e.preventDefault();
    console.log('onclick');
    console.log(data);
    if (data.sttDvNm === '0060') {
      showAlert('해당차량은 판매종료 되었습니다.');
    } else  if (data.sttDvNm === '0050' || data.sttDvNm === '0090' || data.sttDvNm === '0070') {
      showAlert('해당차량은 광고 종료 되었습니다.');
    } else {
      Router.push('/buycar/buyCarDetailType?dlrPrdId='+ data.dlrPrdId);
    }
  }

  useEffect(() => {
    let timeout = null;
    const compareListCon = Array.from(document.getElementsByClassName('compare-sort-cover'));
    // const Col = 5;
    const Col = compareList.length + 1;
    const Row = compareListCon.length / Col - 1; // 110/5 = 22
    timeout = setTimeout(() => {
      let sortH = compareListCon.map(v => v.scrollHeight);
      let reSortH=[], reSortH2=[], calMaxH=[];
      Array(Col).fill().map((v, i) => {
        reSortH[i] = sortH.slice( i*Row+i, (i*Row+i)+Row+1 );
      });
      for(let i=0; i<=Row; i++) {
        reSortH2[i] = reSortH.map((v,j) => reSortH[j][i]);
      }
      reSortH2.map((v, i) => calMaxH.push(Math.max.apply(null, v)));
      setCompareSortH(calMaxH);
    }, 10);
    return () => {
      clearTimeout(timeout);
    }
  }, [show]);

  const SortableItem = memo(SortableElement(({value}) =>
    <li className="compare-sort-item">
      <SortCover height={compareSortH[0]} isMarkup={true}>
        <ImgCover src={baseURL + value.phtUrl} alt= '' />
        <Buttons align="center">
          <Button size="mid" line="gray" radius={true} title="삭제하기" width={118} height={36} marginTop={10} onClick={handleSortDelete(value.dlrPrdId)} />
        </Buttons>
      </SortCover>
      <SortCover height={compareSortH[1]}>{value.crNm}</SortCover>
      <SortCover height={compareSortH[2]}>{value.crNo}</SortCover>
      <SortCover height={compareSortH[3]}>{value.frmYyyy}</SortCover>
      <SortCover height={compareSortH[4]}>{value.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}<span className="won">만원</span></SortCover>
      <div className="compare-sort-toggle" style={{display: toogle1 ? "block" : "none"}}>
        <SortCover height={compareSortH[5]}>{value.slAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  <span className="won">만원</span></SortCover>
        <SortCover height={compareSortH[6]}>{value.transcost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  <span className="won">만원</span></SortCover>
        <SortCover height={compareSortH[7]}>{value.instCosts[instCount].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  <span className="won">만원</span></SortCover>
      </div>
      <SortCover height={compareSortH[8]}>{value.carTypeName}</SortCover>
      <SortCover height={compareSortH[9]}>{value.years}</SortCover>
      <SortCover height={compareSortH[10]}>{value.drvDistCnt}</SortCover>
      <SortCover height={compareSortH[11]}>{value.mssDvcd}</SortCover>
      <SortCover height={compareSortH[12]}>{value.color}</SortCover>
      <SortCover height={compareSortH[13]}>{value.fuelDvcd}</SortCover>
      <SortCover height={compareSortH[14]}>{value.doorCnt}</SortCover>
      <SortCover height={compareSortH[15]}>{value.optCnt}개</SortCover>
      <div className="compare-sort-toggle" style={{display: toogle2 ? "block" : "none"}}>
        <SortCover height={compareSortH[16]} isMarkup={true}>
          <ul className="option-list">
            {value.majorOptions.map((v, i) => <li key={i} className={v.isClass}>{v.part}</li>)}
          </ul>
        </SortCover>
      </div>
      <SortCover height={compareSortH[17]}>{value.acdtYn}</SortCover>
      <SortCover height={compareSortH[18]}>{value.smplRprYn}</SortCover>
      <SortCover height={compareSortH[19]}>{value.atbInsp}</SortCover>
      <SortCover height={compareSortH[20]}>{value.hsvcYn}</SortCover>
      <SortCover height={compareSortH[21]}>{value.seller.map((v, i) => {
        return i != 2 ? <span key={i}>{v}<br /></span> : <span key={i}>{v}</span>
      })}</SortCover>
      <Buttons align="center" className="mt32">
        <Button size="mid" background="blue80" title="차량 상세보기" width={164} height={48} buttonMarkup={true} onClick={(e) => linkDetailCar(e, value)} />
      </Buttons>
    </li>
  ));
  const SortableList = memo(SortableContainer(({items}) => {
    return (
      <ul className="compare-list cont" className={`compare-list cont col${items.length}`}>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </ul>
    );
  }));
  const [items, setItems] = useState(compareList);

/*  useEffect(() => {
    setItems(compareList);
  }, [compareList]);*/

  const handleSortDelete = useCallback((id) => (e) => {
    e.preventDefault();
    const copyItems = [...items];
    setItems(copyItems.filter(v => v.dlrPrdId !== id));
  }, [items]);

  const onSortEnd = useCallback(({oldIndex, newIndex}) => {
    setItems(prevItems => arrayMove(prevItems, oldIndex, newIndex));
  }, [items]);

  const onClickPrintEvent = (e) => {
    onClickPrint(e);
  }

  const onChangeMonthly = (e) => {

    const month = Number(e.value);

    setMonthly(e.value);

    switch(month) {
      case 24:
        setInstCount(0);
        break;
      case 36:
        setInstCount(1);
        break;
      case 48:
        setInstCount(2);
        break;
      case 60:
        setInstCount(3);
        break;
    }

  }

  return (
    <div className="con-wrap popup-comparison">
      <div className="tit-wrap">
        <h5>비교하기<span>&#8251; 최대 4개까지 비교가 가능합니다.</span></h5>
        <Buttons align="right">
          {/* <Button size="mid" line="gray" radius={true} title="모두 삭제" width={119} height={36} /> */}
          <Button size="mid" line="gray" radius={true} title="프린트" width={119} height={36} onClick={(e) => onClickPrintEvent(e)} />
        </Buttons>
      </div>
      <div className="compare-wrap">
        <ul className="compare-list tit">
          <li className="compare-sort-item">
            <SortCover cName="list-con compare-sort-cover tp2" height={compareSortH[0]}>사진을 마우스로 드래그하여<br />위치를 변경할 수 있습니다.</SortCover>
            <SortCover height={compareSortH[1]}>차량명</SortCover>
            <SortCover height={compareSortH[2]}>차량번호</SortCover>
            <SortCover height={compareSortH[3]}>최초 등록일자</SortCover>
            <SortCover cName="list-con compare-sort-cover bg-sky60" height={compareSortH[4]}>총 가격(예상)<Button size="mid" line="gray" radius={true} title={toogle1 ? "닫기" : "펼침"} width={38} height={32} onClick={slideToggle1} /></SortCover>
            <div className="compare-sort-toggle" style={{display: toogle1 ? "block" : "none"}}>
              <SortCover cName="list-con compare-sort-cover bg-sky60" height={compareSortH[5]}>판매가</SortCover>
              <SortCover cName="list-con compare-sort-cover bg-sky60" height={compareSortH[6]}>이전등록비(예상)</SortCover>
              <SortCover cName="list-con compare-sort-cover bg-sky60" height={compareSortH[7]} isMarkup={true}>
                <p style={{display: "inline-block"}}>월 할부금</p>
                <SelectBox id="select1" className="items-sbox" options={[
                  { value: '24', label: '24개월' },
                  { value: '36', label: '36개월' },
                  { value: '48', label: '48개월' },
                  { value: '60', label: '60개월' }
                ]} width={93} height={40} placeHolder="24개월"  value={mothly} onChange={(e) => onChangeMonthly(e)}/>
              </SortCover>
            </div>
            <SortCover height={compareSortH[8]}>차종</SortCover>
            <SortCover height={compareSortH[9]}>연식</SortCover>
            <SortCover height={compareSortH[10]}>주행거리</SortCover>
            <SortCover height={compareSortH[11]}>변속기</SortCover>
            <SortCover height={compareSortH[12]}>색상</SortCover>
            <SortCover height={compareSortH[13]}>연료/배기량</SortCover>
            <SortCover height={compareSortH[14]}>인승/도어수</SortCover>
            <SortCover cName="list-con compare-sort-cover bg-sky60" height={compareSortH[15]}>옵션개수<Button size="mid" line="gray" radius={true} title={toogle2 ? "닫기" : "펼침"} width={38} height={32} onClick={slideToggle2} /></SortCover>
            <div className="compare-sort-toggle" style={{display: toogle2 ? "block" : "none"}}>
              <SortCover cName="list-con compare-sort-cover bg-sky60" height={compareSortH[16]}>주요옵션리스트</SortCover>
            </div>
            <SortCover height={compareSortH[17]}>보험이력</SortCover>
            <SortCover height={compareSortH[18]}>성능점검</SortCover>
            <SortCover height={compareSortH[19]}>현대 글로비스 오토벨 인증</SortCover>
            <SortCover height={compareSortH[20]}>제공서비스</SortCover>
            <SortCover height={compareSortH[21]}>판매자</SortCover>
          </li>
        </ul>
        <SortableList
          items={items}
          onSortEnd={onSortEnd}
          axis={"x"}
          lockAxis={"x"}
          helperclassName="compare-sort-item drag-item"
          distance={1}
        />
      </div>
      {/* <ul className="btn-wrap">
        <li><Button size="mid" background="blue80" title="방문예약1" width={164} height={48} /></li>
        <li><Button size="mid" background="blue80" title="방문예약2" width={164} height={48} /></li>
        <li><Button size="mid" background="blue80" title="방문예약3" width={164} height={48} /></li>
        <li><Button size="mid" background="blue80" title="방문예약4" width={164} height={48} /></li>
      </ul> */}
    </div>
  )
}

export default MypageCompare;