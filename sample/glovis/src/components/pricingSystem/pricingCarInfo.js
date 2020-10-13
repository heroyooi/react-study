import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Buttons from '@lib/share/items/Buttons';
import Button from '@lib/share/items/Button';
import Input from '@lib/share/items/Input';
import CheckBox from '@lib/share/items/CheckBox';
import CheckColors from '@src/components/common/CheckColors';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import { objIsEmpty } from '@src/utils/CommonUtil';
import PricingCarOptions from './pricingCarOptions';
import PricingCarInfoitem from './pricingCarInfoItem';
import PricingCarGradePopUp from './pricingCarGradePopUp';
import PricingCarGradeSpec from './pricingCarGradeSpec';

const PricingCarInfo = ({ dataContext, type, withoutGrade, hasMobile, hasPricing, onValueChange, onGetPricingCarInfo, onGetPricing }) => {
  const [colorPopupShow, setColorPopupShow, openColorPopup, closeColorPopup] = useRodal(false, true);
  const [gradePopupShow, setGradePopupShow, openGradePopup, closeGradePopup] = useRodal(false, true);

  const pricingCarGradeSpecData = useSelector((state) => state.pricing.pricingCarGradeSpec);
  const [carInfo, setCarInfo] = useState(dataContext);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCarInfo({ ...dataContext });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataContext]);

  const handleGetCarInfo = useCallback(
    (e) => {
      e.preventDefault();

      if (onGetPricingCarInfo) {
        onGetPricingCarInfo(e, carInfo);
      }
      setIsEditing(false);
    },
    [carInfo, onGetPricingCarInfo]
  );

  const handleGetPricing = useCallback(
    (e) => {
      e.preventDefault();

      if (onGetPricing) {
        onGetPricing(e, carInfo);
      }
      setIsEditing(false);
    },
    [carInfo, onGetPricing]
  );

  const handleValueChange = useCallback(
    (e, deps) => {
      if (isEditing === false) {
        setIsEditing(true);
      }
      setCarInfo(Object.assign({ ...carInfo }, { [deps.name]: deps.value }));
    },
    [carInfo, isEditing]
  );

  const handleOpenCarInfoPopUp = useCallback(
    (e) => {
      e.preventDefault();
      setColorPopupShow(true);
      document.getElementsByTagName('html')[0].style.overflow = 'auto';
    },
    [setColorPopupShow]
  );

  const handleClickColor = useCallback(() => {
    setColorPopupShow(false);
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }, [setColorPopupShow]);

  const handleDrvDistChanged = useCallback(
    (e) => {
      const newCarInfo = Object.assign({ ...carInfo }, { drvDist: e.target.value });

      setCarInfo(newCarInfo);

      if (onValueChange) {
        onValueChange({}, newCarInfo);
      }
    },
    [carInfo, onValueChange]
  );

  const handleOptionChanged = useCallback(
    (e, arg) => {
      const newCarInfo = Object.assign({ ...carInfo }, { carOptions: arg.carOptions });
      setCarInfo(newCarInfo);

      if (onValueChange) {
        onValueChange(e, newCarInfo);
      }
    },
    [carInfo, onValueChange]
  );

  const handleColorChange = useCallback(
    (e, deps) => {
      const newColor = deps || e.target.name;

      setCarInfo(Object.assign({ ...carInfo }, { clr: newColor }));

      handleClickColor(e);
    },
    [carInfo, handleClickColor]
  );

  const handleOpenGradePopUp = useCallback(
    (e) => {
      openGradePopup(e, 'fade');
    },
    [openGradePopup]
  );

  const handleCloseGradePopUp = useCallback(() => {
    setGradePopupShow(false);
  }, [setGradePopupShow]);

  const handleSelectGrade = useCallback(
    (e, deps) => {
      const newCarInfo = Object.assign({ ...carInfo }, { seriesNo: deps.seriesNo });
      setGradePopupShow(false);
      if (onValueChange) {
        onValueChange({}, newCarInfo);
      }
    },
    [carInfo, onValueChange, setGradePopupShow]
  );

  if (hasPricing === false) {
    return null;
  }

  if (hasMobile === true) {
    return (
      <>
        <div className="tit-wrap">
          <h4 className="fl">차량 정보</h4>
        </div>
        <table summary="차량 정보에 대한 내용" className="table-tp1">
          <caption className="away">차량 정보</caption>
          <colgroup>
            <col width="27%" />
            <col width="25%" />
            <col width="20%" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>차량명</th>
              <td colSpan="4">{carInfo.crNm}</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  if (type === 'marketPrice') {
    return (
      <form className="register-form">
        <fieldset>
          <legend className="away">차량 정보 조회</legend>
          <div className="market-car-info">
            <div className="img-wrap">
              <img src={carInfo.defaultImg || ''} alt="내 차량 이미지" />
            </div>
            <table summary="차량 정보에 대한 내용" className="table-tp1 input">
              <caption className="away">차량 정보</caption>
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차량번호</th>
                  <td>{carInfo.crNo}</td>
                  <th>차량연식</th>
                  <td>
                    {carInfo.noy} {carInfo.now ? '년' : ''}
                  </td>
                </tr>
                {withoutGrade === false && (
                  <>
                    <tr>
                      <th>배기량</th>
                      <td>{carInfo.dspl}cc</td>
                      <th>신차출고가</th>
                      <td>
                        <PricingCarInfoitem name="rlsPrc" value={carInfo.rlsPrc} isEditingState={isEditing} isEdit={true} onValueChange={handleValueChange} />
                      </td>
                    </tr>
                    <tr>
                      <th>연료</th>
                      <td>{carInfo.fuel}</td>
                      <th>최초등록일</th>
                      <td>
                        <PricingCarInfoitem name="frstRegDt" value={carInfo.frstRegDt} isEditingState={isEditing} isEdit={true} type={'date'} onValueChange={handleValueChange} />
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
            {!objIsEmpty(carInfo.grades) && withoutGrade === true && (
              <Buttons align="center">
                <Button size="mid" background="blue80" radius={true} title="해당 등급을 선택하세요" width={160} marginTop={40} onClick={handleOpenGradePopUp} />
              </Buttons>
            )}
          </div>

          {carInfo.carOptions && <PricingCarOptions more="false" type={2} mode="check" defaultOptions={carInfo.carOptions} onChange={handleOptionChanged} />}

          <div className="market-add-info">
            <ul className="distance">
              <li>주행거리를 입력해주세요</li>
              <li className="distance-input">
                <Input type="number" width={220} height={30} value={carInfo.drvDist} onChange={handleDrvDistChanged} />
              </li>
              {/* <li className="newPrice">신차가격을 입력해주세요</li>
              <li className="distance-input">
                <Input type="text" width={220} height={30} />
              </li> */}
            </ul>
            <ul className="color">
              <li>차량 색상을 선택해주세요</li>
              <li>
                <CheckBox id="chk-white" title="흰색" name="흰색" checked={carInfo.clr === '흰색'} isSelf={false} onChange={handleColorChange} isColor={true} bgColor1="#fff" />
              </li>
              <li>
                <CheckBox id="chk-black" title="검정색" name="검정색" checked={carInfo.clr === '검정색'} isSelf={false} onChange={handleColorChange} isColor={true} bgColor1="#000" chkColor="white" />
              </li>
              <li>
                <CheckBox id="chk-silver" title="은색" name="은색" checked={carInfo.clr === '은색'} isSelf={false} onChange={handleColorChange} isColor={true} bgColor1="#e5e5e5" chkColor="black" />
              </li>
              <li>
                <CheckBox
                  id="chk-silvergray"
                  title="회색"
                  name="회색"
                  checked={carInfo.clr === '회색'}
                  isSelf={false}
                  onChange={handleColorChange}
                  isColor={true}
                  bgColor1="#bcbcbc"
                  chkColor="white"
                />
              </li>
              <li>
                <CheckBox
                  id="chk-pearl"
                  title="진주색"
                  name="진주색"
                  checked={carInfo.clr === '진주색'}
                  isSelf={false}
                  onChange={handleColorChange}
                  isColor={true}
                  bgColor1="#f8f7e2"
                  chkColor="black"
                />
              </li>
              {/* <li>
                <CheckBox
                  id="chk-black2"
                  title="검정투톤"
                  type="chk-color2"
                  name="검정투톤"
                  checked={carInfo.clr === '검정투톤'}
                  isSelf={false}
                  onChange={handleColorChange}
                  isColor={true}
                  bgColor1="#616161"
                  bgColor2="#000"
                  chkColor="white"
                />
              </li>
              <li>
                <CheckBox id="chk-gray" className="chip-gray chk-white" title="쥐색" name="쥐색" checked={carInfo.clr === '쥐색'} isSelf={false} onChange={handleColorChange} />
              </li> */}
            </ul>
            <Button color="blue80" title="색상더보기 +" onClick={handleOpenCarInfoPopUp} />
          </div>
        </fieldset>
        <RodalPopup show={colorPopupShow} type={'fade'} closedHandler={closeColorPopup} title="주요색상" mode="normal" width={894}>
          <div className="con-wrap">
            <CheckColors isTitle={false} selectedColor={carInfo.clr} mode="radio" onClick={handleColorChange} onClose={handleClickColor} />
          </div>
        </RodalPopup>
        <RodalPopup show={gradePopupShow} type={'fade'} closedHandler={closeGradePopup} mode="normal" width={440}>
          <PricingCarGradePopUp dataContext={carInfo.grades} modelNo={carInfo.modelNo} onGradeSelect={handleSelectGrade} />
        </RodalPopup>
      </form>
    );
  }
  return (
    <React.Fragment>
      {hasPricing === true && carInfo.resStatus.rstCode === '1' && (
        <form className="register-form mt23">
          <fieldset>
            <legend className="away">차량 정보 조회</legend>
            <table summary="차량 기본 정보에 대한 내용" className="table-tp1 input">
              <caption className="away">차량 기본 정보</caption>
              <colgroup>
                <col width="17%" />
                <col width="33%" />
                <col width="17%" />
                <col width="33%" />
              </colgroup>
              <tbody>
                <tr>
                  <th>차량번호</th>
                  <td>
                    <PricingCarInfoitem name="carNo" value={carInfo.crNo} onValueChange={handleValueChange} />
                  </td>
                  <th>차량연식</th>
                  <td>
                    <PricingCarInfoitem name="noy" value={carInfo.noy} onValueChange={handleValueChange} />
                  </td>
                </tr>
                <tr>
                  <th>배기량</th>
                  <td>
                    <PricingCarInfoitem name="dspl" value={carInfo.dspl} onValueChange={handleValueChange} />
                  </td>
                  <th>신차출고가</th>
                  <td>
                    <PricingCarInfoitem name="rlsPrc" value={carInfo.rlsPrc} isEditingState={isEditing} isEdit={true} onValueChange={handleValueChange} />
                  </td>
                </tr>
                <tr>
                  <th>연료</th>
                  <td>
                    <PricingCarInfoitem name="fuel" value={carInfo.fuel} onValueChange={handleValueChange} />
                  </td>
                  <th>최초등록일</th>
                  <td>
                    <PricingCarInfoitem name="frstRegDt" value={carInfo.frstRegDt} isEditingState={isEditing} isEdit={true} type={'date'} onValueChange={handleValueChange} />
                  </td>
                </tr>
                <tr>
                  <th>주행거리</th>
                  <td>
                    <PricingCarInfoitem name="drvDist" value={carInfo.drvDist} isEditingState={isEditing} isEdit={true} maxLength={5} onValueChange={handleValueChange} />
                  </td>
                  <th>색상</th>
                  <td>
                    <PricingCarInfoitem name="clr" value={carInfo.clr} onOpenPopUp={handleOpenCarInfoPopUp} onValueChange={handleValueChange} />
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>
        </form>
      )}
      {!objIsEmpty(carInfo.grades) &&
      withoutGrade === true && ( // 상세등급 정보가 노출이 안되는 경우
          <div className="grade">
            <p>해당 등급을 선택하세요</p>
            <PricingCarGradePopUp isPopUpMode={false} dataContext={carInfo.grades} modelNo={carInfo.modelNo} onGradeSelect={handleSelectGrade} />
          </div>
        )}

      {hasPricing && carInfo.resStatus.rstCode === '1' ? (
        <Buttons align="center" marginTop={40} marginBottom={20}>
          <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleGetPricing} />
        </Buttons>
      ) : (
        <Buttons align="center" marginTop={40} marginBottom={20}>
          <Button size="big" background="blue80" title="확인" width={180} height={60} onClick={handleGetCarInfo} />
        </Buttons>
      )}

      <RodalPopup show={colorPopupShow} type={'fade'} closedHandler={closeColorPopup} title="주요색상" mode="normal" width={894}>
        <div className="con-wrap">
          <CheckColors isTitle={false} mode="radio" onClick={handleColorChange} onClose={handleClickColor} />
        </div>
      </RodalPopup>

      <RodalPopup show={gradePopupShow} type={'fade'} closedHandler={closeGradePopup} title="상세 사양보기" mode="normal" size="small">
        <PricingCarGradeSpec mode={'self'} pricingCarGradeSpec={pricingCarGradeSpecData} onClose={handleCloseGradePopUp} />
      </RodalPopup>
    </React.Fragment>
  );
};

PricingCarInfo.propTypes = {
  dataContext: PropTypes.object,
  hasMobile: PropTypes.bool,
  hasPricing: PropTypes.bool,
  type: PropTypes.string,
  withoutGrade: PropTypes.bool,
  onGetPricingCarInfo: PropTypes.func,
  onGetPricing: PropTypes.func,
  onValueChange: PropTypes.func
};

PricingCarInfo.defaultProps = {
  hasMobile: false,
  hasPricing: false,
  isAutoSelectCarGrade: false
};

export default PricingCarInfo;
