import { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import AppLayout from '@src/components/layouts/AppLayout';
import MypageNavi from '@src/components/common/MypageNavi';
import DatePicker from '@src/components/common/calendar/DatePicker';
import CheckColors from '@src/components/common/CheckColors';
import CarOptions from '@src/components/common/CarOptions';
import CarAddOption from '@src/components/common/CarAddOption';
import CarNameMod from '@src/components/common/CarNameMod';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Steps from '@lib/share/items/Steps';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import Input from '@lib/share/items/Input';
import SelectBox from '@lib/share/items/SelectBox';
import MobSelectBox from '@lib/share/items/MobSelectBox';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import MobFilterModel from '@src/components/common/MobFilterModel';
import { select1_list, mobile_select_area } from '@src/dummy';
import { SECTION_MYPAGE, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP } from '@src/actions/types';

const DealerSell05_03 = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_MYPAGE });
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);

  const now = moment();

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '판매정보입력',
        options: ['back']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 80,
        color: '#fff'
      }
    });

    const [fpF1, setFpF1] = useState(false); //Ad부분 원하는 걸로 변경
    const handleFullpagePopup = useCallback((name) => (e) => {
      e.preventDefault();
      if (name === "f1") {
        dispatch({
          type: MOBILE_FULLPAGE_POPUP,
          data: {
            isPopup: true,
            title: '제조사 · 모델 · 등급 선택',
            options: ['close']
          }
        });
        setFpF1(true);
      }
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    }, [fpF1]);

    return (
      <AppLayout>
        <Steps mode="stick" type={1} contents={['차량정보 입력', 'EW 정보 입력', '등록완료']} active={1} />
        <div className="register-form">
          <p className="car-name" onClick={handleFullpagePopup("f1")}>
            03라4567<span>기아 K3 쿱 1.6 터보 GDI 프레스티지</span>
          </p>
        </div>

        <div className="content-wrap">
          <ul className="m-toggle-list up-blue">
            <MenuItem>
              <MenuTitle>차량 기본 정보</MenuTitle>
              <MenuCont>
                <table summary="차량 기본정보에 대한 내용" className="table-tp3">
                  <caption className="away">차량 기본정보</caption>
                  <colgroup>
                    <col width="32%" />
                    <col width="68%" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th>최초등록일</th>
                      <td><DatePicker defaultValue={now} width='100%' /></td>
                    </tr>
                    <tr>
                      <th>형식년도</th>
                      <td><MobSelectBox options={[
                        { id: 'radio1', value: 1, checked: true, disabled: false, label: '2016년' },
                        { id: 'radio2', value: 2, checked: false, disabled: false, label: '2017년' }
                      ]} width='100%' /></td>
                    </tr>
                    <tr>
                      <th>색상</th>
                      <td>
                        <MobSelectBox customMode={true} customName="색상" width='100%'>
                          <div className="inner filter-list-wrap pt0">
                            <CheckColors mode="radio" />
                          </div>
                        </MobSelectBox>
                      </td>
                    </tr>
                    <tr>
                      <th>연료</th>
                      <td><MobSelectBox options={[
                        { id: 'radio3', value: 1, checked: true, disabled: false, label: '가솔린+전기' },
                        { id: 'radio4', value: 2, checked: false, disabled: false, label: '가솔린' }
                      ]} width='100%' /></td>
                    </tr>
                    <tr>
                      <th>배기량</th>
                      <td><Input type="text" placeHolder="배기량을 입력해주세요" id="input-tp1" width='100%' /></td>
                    </tr>
                    <tr>
                      <th>차종</th>
                      <td><MobSelectBox options={[
                        { id: 'radio5', value: 1, checked: true, disabled: false, label: '준중형차' },
                        { id: 'radio6', value: 2, checked: false, disabled: false, label: '중형차' },
                        { id: 'radio7', value: 3, checked: false, disabled: false, label: '소형차' },
                        { id: 'radio8', value: 4, checked: false, disabled: false, label: '경차' }
                      ]} width='100%' /></td>
                    </tr>
                    <tr>
                      <th>용도</th>
                      <td><MobSelectBox options={[
                        { id: 'radio9', value: 1, checked: true, disabled: false, label: '일반' },
                        { id: 'radio10', value: 2, checked: false, disabled: false, label: '장애인' },
                        { id: 'radio11', value: 3, checked: false, disabled: false, label: '택시' },
                        { id: 'radio12', value: 4, checked: false, disabled: false, label: '렌트카' },
                        { id: 'radio13', value: 5, checked: false, disabled: false, label: '운전교습용' }
                      ]} width='100%' /></td>
                    </tr>
                    <tr>
                      <th>출고가격</th>
                      <td><Input type="text" placeHolder="출고가격을 입력해주세요" id="input-tp2" width='100%' /></td>
                    </tr>
                    <tr>
                      <th>주행거리<br />(현재기준)</th>
                      <td><Input type="text" placeHolder="주행거리를 입력해주세요" id="input-tp3" width='100%' /></td>
                    </tr>
                  </tbody>
                </table>
              </MenuCont>
            </MenuItem>
            <MenuItem>
              <MenuTitle>차량 옵션정보</MenuTitle>
              <MenuCont>
                <CarOptions addOption={true} isMore={false} mode="check" />
                <CarAddOption mode="check" />
              </MenuCont>
            </MenuItem>
          </ul>
        </div>
        <Button className="fixed" size="full" background="blue80" title="다음" href="/mypage/dealerSell05_04" />

        <MobFullpagePopup active={mFullpagePopup} paddingBottom={56}>
          {fpF1 && <MobFilterModel />}
        </MobFullpagePopup>
      </AppLayout>
    )
  }
  const [rodalShow, setRodalShow, rodalPopupHandler, modalCloseHandler] = useRodal(false, true);
  return (
    <AppLayout>
      <div className="content-wrap">
        <MypageNavi mode="dealer" />

        <div className="mypage-state-sec">
          <h3>보증차량 판매정보 등록</h3>
          <div className="dealer-register-step">
            <Steps type={2} contents={['차량정보조회/입력', 'EW정보입력', '등록완료']} active={1} />
          </div>

          <form className="register-form">
            <fieldset>
              <legend className="away">차량 정보 조회</legend>
              <table summary="차량 기본 정보에 대한 내용" className="table-tp1 input mt80">
                <caption>차량 기본 정보</caption>
                <colgroup>
                  <col width="13%" />
                  <col width="27%" />
                  <col width="13%" />
                  <col width="47%" />
                </colgroup>
                <tbody>
                  <tr>
                    <th>차량번호</th>
                    <td>
                      <label htmlFor="car-num" className="hide">차량번호</label>
                      <Input type="text" value="47러0383" id="car-num" width={160} height={40} />
                    </td>
                    <th>차량명</th>
                    <td>
                      <span className="car-name">
                        기아 K3 쿱 1.6 터보 GDI 프레스티지
                        <span>K3 2DR 1.6T / GDI 프레스티지 M/T</span>
                        <i className="ico-pencil" onClick={(e) => rodalPopupHandler(e, "fade")}></i>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>최초등록일</th>
                    <td>
                      <DatePicker defaultValue={now} inputWidth={160} inputHeight={40} />
                    </td>
                    <th>형식년도</th>
                    <td>
                      <SelectBox id="form-date" className="items-sbox" options={
                        [
                          { value: '1', label: '1980' },
                          { value: '2', label: '2020' }
                        ]
                      } width={160} height={40} placeHolder="2018" />
                    </td>
                  </tr>
                  <tr>
                    <th>색상</th>
                    <td>
                      <SelectBox id="car-color" className="items-sbox" options={
                        [
                          { value: '1', label: '검정' }
                        ]
                      } width={160} height={40} placeHolder="검정" />
                    </td>
                    <th>연료</th>
                    <td>
                      <SelectBox id="car-fuel" className="items-sbox" options={
                        [
                          { value: '1', label: '가솔린' }
                        ]
                      } width={160} height={40} placeHolder="가솔린" />
                    </td>
                  </tr>
                  <tr>
                    <th>배기량</th>
                    <td>
                      <label htmlFor="engine-cc" className="hide">배기량</label>
                      <Input type="text" value="3,342" id="engine-cc" width={160} height={40} />
                      <em>cc</em>
                    </td>
                    <th>차종</th>
                    <td>
                      <SelectBox id="car-type" className="items-sbox" options={
                        [
                          { value: '1', label: '준중형차' }
                        ]
                      } width={160} height={40} placeHolder="준중형차" />
                    </td>
                  </tr>
                  <tr>
                    <th>용도</th>
                    <td>
                      <SelectBox id="car-use" className="items-sbox" options={
                        [
                          { value: '1', label: '일반' }
                        ]
                      } width={160} height={40} placeHolder="일반" />
                    </td>
                    <th>출고가격</th>
                    <td>
                      <label htmlFor="fac-price" className="hide">출고가격</label>
                      <Input type="text" value="60,100,000" id="fac-price" width={160} height={40} />
                      <em>원</em>
                    </td>
                  </tr>
                  <tr>
                    <th>주행거리<br />(현재기준)</th>
                    <td colSpan="3">
                      <label htmlFor="mileage" className="hide">주행거리</label>
                      <Input type="text" placeHolder="주행거리를 입력해주세요." id="mileage" width={321} height={40} /><em>km</em>
                    </td>
                  </tr>
                </tbody>
              </table>
            </fieldset>
            <CarOptions title="기본 옵션" type={2} className="mt80 pt0" more={false} />

            {/* 추가옵션 */}
            <CarAddOption />
          </form>

          <Buttons align="right" marginTop={32}>
            <Button size="big" background="blue80" title="다음" width={127} height={60} />
          </Buttons>
        </div>
      </div>

      <RodalPopup show={rodalShow} type={'fade'} closedHandler={modalCloseHandler} mode="normal" className="pop-car-name-mod" width={894}>
        <div className="con-wrap">
          <CarNameMod />
        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default DealerSell05_03
