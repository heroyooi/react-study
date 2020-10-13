import { useState, useCallback, useEffect } from 'react';
import Helmet from 'react-helmet';
import Link from 'next/link';
import Input from '@lib/share/items/Input';
import InputFile from '@lib/share/items/InputFile';
import InputPicture from '@lib/share/items/InputPicture';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import CheckBox from '@lib/share/items/CheckBox';
import CheckColors from '@src/components/common/CheckColors';
import SelectBox from '@lib/share/items/SelectBox';

// TimePicker
import moment from 'moment';
import TimePicker from 'rc-time-picker';

import TreeCheckCount from '@lib/share/items/TreeCheckCount';
import { textDummy, dataProvider } from '@src/dummy';

import { select1_list } from '@src/dummy';

/*
html 변경이력
03.05 : class="abc" -> "bce" 로 수정
03.05 : maxWidth 800 -> 900으로 수정 #a1 부분 참고
03.06 : #a2 부분 참고

*/
const ywTest = () => {
  
  const YwWrapper = useCallback(({children}) => {
    return (
      // #a1 start
      <div style={{maxWidth: 900, height: 10000, margin: '0 auto'}}>{children}</div>
      // #a1 end
    )
  }, []);
  

  // #a2 start
  const ComponentDiv = useCallback(({children, title, sub}) => {
    return (
      <div style={{padding: 10, marginTop: 10, borderRadius: 5, background: '#aaa'}}>
        <div style={{padding: 10, background: '#fff', borderRadius: 5}}>
          {title && <h2 style={{marginBottom: 10}}>{title} {sub && <span style={{fontSize: 16}}>{sub}</span>}</h2>}
          {children}
        </div>
      </div>
    )
  }, []);
  // #a2 end
  
  // InputFile & InputPicture
  const uploadList1 = (files) => {
    const _files = Object.values(files);
    _files.map(v => console.log(v));
  };

  // Textarea
  const textareaChange = (e) => console.log('textareaChange: ', e);
  const textareaBlur = (e) => console.log('textareaBlur: ', e);
  const textareaFocus = (e) => console.log('textareaFocus: ', e);

  // Input
  const inputChange = (e) => console.log('inputChange: ', e.target.value);
  const inputBlur = (e) => console.log('inputBlur: ', e);
  const inputFocus = (e) => console.log('inputFocus: ', e);

  // Time Picker
  const now = moment().hour(0).minute(0);
  const format = 'h:mm a';
  const onChange = (value) => {
    console.log(value && value.format(format));
  }

  // TreeCheckCount
  const treeClick = (e, data) => {
    const ctLevel = '현재 선택한 Level: ';
    const ctItem = '현재 선택한 Item Object: ';
    console.log("e: ", e);
    console.log(ctLevel, data.level);
    data.children !== undefined 
      ? console.log(ctItem, data.children)
      : console.log(`${ctItem} 없음`);
  }
  // RodalPopup
  const [rodalShow1, setRodalShow1, rodalPopupHandler1, modalCloseHandler1] = useRodal(false);

  // 전체 체크박스 Start
  // 예시 1
  const localData = [
    {id:'chk-seoul', title:'서울', checked:true},
    {id:'chk-gyeonggi', title:'경기', checked:false},
    {id:'chk-incheon', title:'인천', checked:true},

    {id:'chk-daejeon', title:'대전', checked:true},
    {id:'chk-sejong', title:'세종', checked:true},
    {id:'chk-chungnam', title:'충남', checked:true},
    {id:'chk-chungbuk', title:'충북', checked:true},
    {id:'chk-gangwon', title:'강원', checked:true},

    {id:'chk-busan', title:'부산', checked:true},
    {id:'chk-daegu', title:'대구', checked:true},
    {id:'chk-ulsan', title:'울산', checked:true},
    {id:'chk-gyeongnam', title:'경남', checked:true},
    {id:'chk-gyeongbuk', title:'경북', checked:true},

    {id:'chk-gwangju', title:'광주', checked:true},
    {id:'chk-jeonnam', title:'전남', checked:true},
    {id:'chk-jeonbuk', title:'전북', checked:true},
    {id:'chk-jeju', title:'제주', checked:true}
  ];
  const [chkLocal, setChkLocal] = useState(localData);
  const [chkLocalAll, setChkLocalAll] = useState(localData.every(v => v.checked === true));
  const handleChkLocal = (id) => () => {
    const copyLocal = [...chkLocal];
    copyLocal.map(v => {
      if (v.id === id) {
        v.checked = !v.checked
      }
    });
    setChkLocal(copyLocal);
    setChkLocalAll(copyLocal.every(v => v.checked === true))
  }
  const handleChkLocalAll = (e) => {
    const copyLocal = [...chkLocal];
    copyLocal.map(v => v.checked = (e.target.checked === true) ? true : false);
    setChkLocal(copyLocal);
    setChkLocalAll(prevCheck => !prevCheck);
  }

  // 예시 2
  const gearData = [
    {id:'chk-auto', title:'오토', checked:true},
    {id:'chk-stick', title:'수동', checked:true},
    {id:'chk-semi', title:'세미', checked:true},
    {id:'chk-auto-2', title:'오토', checked:true},
    {id:'chk-cvt', title:'CVT', checked:true},
    {id:'chk-etc', title:'기타', checked:true},
  ]
  const [chkGear, setChkGear] = useState(gearData);
  const [chkGearAll, setChkGearAll] = useState(gearData.every(v => v.checked === true));
  const handleChkGear = (id) => () => {
    const copyGear = [...chkGear];
    copyGear.map(v => {
      if (v.id === id) {
        v.checked = !v.checked
      }
    });
    setChkGear(copyGear);
    setChkGearAll(copyGear.every(v => v.checked === true))
  }
  const handleChkGearAll = (e) => {
    const copyGear = [...chkGear];
    copyGear.map(v => v.checked = (e.target.checked === true) ? true : false);
    setChkGear(copyGear);
    setChkGearAll(prevCheck => !prevCheck);
  }
  // 전체 체크박스 End
  const [selectV, setSelectV] = useState(0); 
  const handleNoyChanged = (e, deps) =>{
    console.log(e)
    console.log(deps)
  }
  const handleSelReset = () => {
    setSelectV(null);
  }
  return (
    <YwWrapper>
      <h1 style={{fontSize: 28, fontWeight: 'bold', margin: '15px 0'}}>TestPage <span style={{fontSize: 16, fontWeight: 500}}>(Publishing By 연욱)</span></h1>
      <ComponentDiv title="셀렉트박스 테스트">
        <SelectBox
          id="carCondNoy"
          className="items-sbox"
          placeHolder="연식"
          options={select1_list}
          hasSelectedItemValue={true}
          value={selectV}
          isValue={selectV}
          height={48}
          onChange={handleNoyChanged}
        />
        <span onClick={handleSelReset}>초기화</span>
      </ComponentDiv>

      <ComponentDiv title="참고 링크">
        <p style={{fontSize: 20, paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid #000'}}>PC</p>
        <ul>
          <li><Link href="/customer/inquiryWrite"><a target="_blank">- inputFile 다중 등록</a></Link></li>
          <li><Link href="/mypage/dealerBuy01_01"><a target="_blank">- 마이페이지 슬라이드</a></Link></li>
          <li><Link href="/mypage/dealerBuy01"><a target="_blank">- 페이지 상에 전체 체크박스 작업 > + 상세옵션 설정</a></Link></li>
          <li><Link href="/member/memberStep01"><a target="_blank">- 약관 (필수체크, 모두체크, 일반체크)</a></Link></li>
          <li><Link href="/sell/selfStep01"><a target="_blank">- 달력(셀렉트 팝업)</a></Link></li>
        </ul>
        <p style={{fontSize: 20, paddingBottom: 10, margin: '10px 0', borderBottom: '1px solid #000'}}>MO</p>
        <ul>
          <li><Link href="/buy/quickMenu"><a>- 전체 체크박스 (내차사기 > 최근 본 차량)</a></Link></li>
          <li><Link href="/mypage/generalBuy01"><a>- 전체 체크박스 (마이페이지 > 등록차량 관리)</a></Link></li>
          <li><Link href="/marketPrice/marketSearch"><a>- 레이어 팝업 처리</a></Link></li>
        </ul>
        <p style={{fontSize: 20, paddingBottom: 10, margin: '10px 0', borderBottom: '1px solid #000'}}>문법, 공부 ...</p>
        <ul>
          <li><Link href="/buy/viewA"><a target="_blank">-  MO: handleFullpagePopup("view_gallery")(e);</a></Link></li>
          <li><Link href="/buy/viewA"><a target="_blank">-  MO: 더보기 클릭 시 탭의 이동 위치 재계산, forceChange</a></Link></li>
        </ul>
      </ComponentDiv>

      <ComponentDiv title="모바일 풀페이지 팝업 정리">
        
      </ComponentDiv>

      <ComponentDiv title="전체 체크박스" sub="페이지 처리">
        {/* 예시1 */}
        <CheckBox id='chk-all-1' title='전체' isSelf={false} checked={chkLocalAll} onChange={handleChkLocalAll} />
        <table summary="상세 옵션 지역 선택" className="table-tp1 area">
          <caption className="away">지역</caption>
          <colgroup>
            <col width="12.5%" />
            <col width="12.5%" />
            <col width="12.5%" />                 
            <col width="12.5%" />
          </colgroup>
          <tbody>
            <tr>
              <th>서울/경인</th>
              <th>충청/강원</th>
              <th>영남</th>
              <th>호남/제주</th>
            </tr>
            <tr>
              <td>
                {chkLocal.map((v, i) => {
                  if (i < 3) {
                    return <CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkLocal(v.id)} />
                  }
                })}
              </td>
              <td>
                {chkLocal.map((v, i) => {
                  if (i >= 3 && i < 8) {
                    return <CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkLocal(v.id)} />
                  }
                })}
              </td>
              <td>
                {chkLocal.map((v, i) => {
                  if (i >= 8 && i < 13) {
                    return <CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkLocal(v.id)} />
                  }
                })}
              </td>
              <td>
                {chkLocal.map((v, i) => {
                  if (i >= 13) {
                    return <CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkLocal(v.id)} />
                  }
                })}
              </td>
            </tr>
          </tbody>
        </table>

        {/* 예시2 */}
        <CheckBox id='chk-all-2' title='전체' isSelf={false} checked={chkGearAll} onChange={handleChkGearAll} />
        <table summary="상세 옵션 변속기 선택" className="table-tp1 area">
          <caption className="away">변속기</caption>
          <tbody>
            <tr>
              <td>
                {chkGear.map((v, i) => {
                  return (<CheckBox key={v.id} id={v.id} title={v.title} checked={v.checked} isSelf={false} onChange={handleChkGear(v.id)} />)
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </ComponentDiv>

      

      <ComponentDiv title="CheckColors">
        <CheckColors />
      </ComponentDiv>

      <ComponentDiv title="InputPicture">
        <InputPicture />
      </ComponentDiv>

      <ComponentDiv title="TreeCheckCount" sub="기능 추가">
        <h3 style={{fontSize: 14, lineHeight: 1.6, marginBottom: 10}}>- onClick: 현재 선택한 Level 및 Item Object를 넘겨받을 수 있는 핸들러<br />- childChecked: Datalist내 child를 default 펼칠지 여부를 결정하는 속성</h3>
        <p style={{color: 'red', marginBottom: 10}}>* 데이터에 key 값 defaultChecked 를 true 로 설정하면 펼쳐진 상태로 나오게됩니다.</p>
        <TreeCheckCount dataProvider={dataProvider} onClick={treeClick} />
      </ComponentDiv>

      <ComponentDiv title="TimePicker">
        <TimePicker
          showSecond={false}
          defaultValue={now}
          className="xxx"
          onChange={onChange}
          format={format}
          use12Hours
          inputReadOnly
        />
      </ComponentDiv>

      <ComponentDiv title="헬멧 테스트">
        <p>타이틀과 연결된 css를 디버깅해보세요.</p>
        <Helmet
          title={'테스트'}
          description={'글이 나옵니다.'}
          link={[
            {rel: "stylesheet", href: "/css/slick.css"},
            {rel: "stylesheet", href: "/css/slick-theme.css"}
          ]}
        />
      </ComponentDiv>

      <ComponentDiv title="InputFile">
        <InputFile uploadList={uploadList1} />
      </ComponentDiv>

      <ComponentDiv title="Textarea & Input" sub="부모 컴포넌트에서 이벤트 호출">
        <Textarea countLimit={1000} type="tp1" data={textDummy} onChange={textareaChange} onBlur={textareaBlur} onFocus={textareaFocus} />
        <hr />
        <Input type="number" placeHolder="계좌이체금액 입력을 입력해주세요." value='' id="account-price" width={284} height={48} onChange={inputChange} onBlur={inputBlur} onFocus={inputFocus} />
      </ComponentDiv>

      <ComponentDiv title="RodalPopup" sub="Confirm 팝업 예제">
        <Button size="mid" background="blue80" radius={true} title="제목 없는 팝업 (FADE)" width={160} onClick={(e) => rodalPopupHandler1(e, "fade")} />
        <RodalPopup show={rodalShow1} type={'fade'} width={380} closedHandler={modalCloseHandler1} mode="normal" isMask={true} subPop={false}>
          <div className="con-wrap compact">
            <p>해당 차량번호로 조회된 차량정보가 없습니다.<br /> 차량정보를 직접 등록하시겠습니까?</p>
            <Buttons align="center" marginTop={30}>
              <Button size="sml" background="gray" radius={true} title="취소" width={68} />
              <Button size="sml" background="blue80" radius={true} title="확인" width={68} />
            </Buttons>
          </div>
        </RodalPopup>
      </ComponentDiv>
      
    </YwWrapper>
  )
}

export default ywTest