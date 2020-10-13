import { useState, useEffect, useCallback, useContext, memo } from "react";
import classNames from "classnames/bind";
import RadioGroup from "@lib/share/items/RadioGroup";
import Button from "@lib/share/items/Button";
import MobBottomArea from "@lib/share/items/MobBottomArea";
import useCreatePortalInBody from "@lib/share/custom/useCreatePortalInBody";

const MobSelectBox = memo(
  ({
    options = [],
    uiType = 1,
    width = "100%",
    height = 40,
    customMode = false,
    children,
    customName = "",
    isActive = false,
    customButton = false,
    customButtonName = "선택",
    customButtonHeight,
    areaClass,
    onChange,
    onClick,
    isDimm = true,
    dimmColor = "black",
    isFixButton = true,
    isSimple = false,
    disabled = false,
    isClose = false,
    placeHolder,
    zid = 103,
    subPop = false
  }) => {
    const createBodyPortal1 = useCreatePortalInBody(null, "wrap");
    const createBodyPortal2 = useCreatePortalInBody(null, "wrap");
    const [dummyVal, setDummyVal] = useState(
      options.findIndex(v => v.checked === true) + 1
    );
    const [value, setValue] = useState(
      options.findIndex(v => v.checked === true) + 1
    );
    const [dimm, setDimm] = useState(isActive);
    const [active, setActive] = useState(isActive);
    const [areaActive, setAreaActive] = useState(isActive);

    const selectClass = classNames("select-box", { tp2: uiType === 2 });

    useEffect(() => {
      setAreaActive(active);
    }, [active]);

    useEffect(() => {
      // customMode를 사용할 경우, 부모 컴포넌트에서 값을 변경해야할 때 활용
      setActive(false);
      setDimm(false);
      if (!subPop)
        document.getElementsByTagName("html")[0].style.overflow = "auto";
    }, [isClose]);
    // isChange: 외부에서 mobselectbox close 기능
    // 예) /sell/selfStep01 - 모바일 페이지에서 차량 기본정보, 색상 커스텀 셀렉트박스

    const handleOpen = useCallback(e => {
      e.preventDefault();
      setActive(true);
      setDimm(true);
      document.getElementsByTagName("html")[0].style.overflow = "hidden";
    }, []);

    const handleConfirm = useCallback(
      e => {
        e.preventDefault();
        setActive(false);
        setDimm(false);
        setValue(dummyVal);
        if (!subPop)
          document.getElementsByTagName("html")[0].style.overflow = "auto";
        if (onClick) onClick(dummyVal, e);
      },
      [dummyVal]
    );

    const handleChange = useCallback(
      e => {
        setDummyVal(+e.target.value);
        if (onChange) onChange(e);
      },
      [value]
    );

    const handleCloseDimm = useCallback(() => {
      setActive(false);
      setDimm(false);
      setValue(value);
      if (!subPop)
        document.getElementsByTagName("html")[0].style.overflow = "auto";
    }, [value, dummyVal]);

    return (
      <>
        <div
          className={selectClass}
          onClick={disabled ? null : handleOpen}
          style={{ width: width }}
        >
          <input
            type="hidden"
            value={
              !customMode
                ? value === 0
                  ? placeHolder
                  : options[value - 1].label
                : customName
            }
          />
          {customButton ? (
            <Button
              size="full"
              background="blue20"
              color="blue80"
              radius={true}
              title={customButtonName}
              height={customButtonHeight}
              disabled={disabled}
            />
          ) : (
            <button
              type="button"
              style={{ height: height }}
              disabled={disabled}
            >
              {!customMode
                ? value === 0
                  ? placeHolder
                  : options[value - 1].label
                : customName}
            </button>
          )}
        </div>
        {isDimm &&
          createBodyPortal1(
            <div
              className={
                dimm
                  ? `modal-bg v-2 ${dimmColor} active`
                  : `modal-bg v-2 ${dimmColor}`
              }
              style={{ zIndex: zid }}
              onClick={handleCloseDimm}
            ></div>
          )}
        {createBodyPortal2(
          <MobBottomArea
            active={areaActive}
            className={areaClass}
            isFixButton={isFixButton}
            isSimple={isSimple}
            zid={zid}
          >
            {customMode ? (
              children
            ) : (
              <>
                {active && (
                  <RadioGroup
                    dataList={options}
                    mode="vertical"
                    defaultValue={value}
                    onChange={handleChange}
                  />
                )}
                <Button
                  className="fixed"
                  size="full"
                  background="blue80"
                  title="확인"
                  height={56}
                  onClick={handleConfirm}
                />
              </>
            )}
          </MobBottomArea>
        )}
      </>
    );
  }
);

export default MobSelectBox;
