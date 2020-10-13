import React from 'react';
import ColoredScrollbars from '@lib/share/items/ColoredScrollbars';
import TabMenu from '@lib/share/tab/TabMenu';
import TabCont from '@lib/share/tab/TabCont';
import RadioGroup from '@lib/share/items/RadioGroup';
import RadioItem from '@lib/share/items/RadioItem';
import { car_radio1, car_radio2, car_radio3, car_radio4, car_radio5 } from '@src/dummy';

const CarSelection = ({ saveCallback, cancleEmitter }) => {
  const handleChange = (e, n) => {
    //tab label 변경함수
    console.log(n + '번쨰 탭 : ' + e.target.nextSibling.innerHTML); // label 명
    if (saveCallback) {
      saveCallback([
        { title: '제조사', column: 'crMnfcCd', code: '5', text: '현대' },
        { title: '모델', column: 'crMdlCd', code: '111', text: '쏘나타' },
        { title: '상세모델', column: 'crDtlMdlCd', code: '89', text: '더미 쏘나타 II' },
        { title: '제원', column: 'crClsCd', code: '2089', text: '2.0 GLS' },
        { title: '등급', column: 'crDtlClsCd', code: '2129', text: '3.0 LPi' }
      ]);
    }
  };
  return (
    <div className="car-name-mod">
      <TabMenu type="type7" defaultTab={4} mount={false} liClicked={true}>
        <TabCont tabTitle="현대" id="name-tab1" index={0}>
          <div className="car-name-tab t1">
            <ColoredScrollbars autoHeightMax={300}>
              <RadioGroup dataList={car_radio1} mode="vertical" onChange={(e) => handleChange(e, 0)} />
            </ColoredScrollbars>
          </div>
        </TabCont>
        <TabCont tabTitle="쏘나타" id="name-tab2" index={1}>
          <div className="car-name-tab t2">
            <ColoredScrollbars autoHeightMax={300}>
              <RadioGroup dataList={car_radio2} mode="vertical" />
            </ColoredScrollbars>
          </div>
        </TabCont>
        <TabCont tabTitle="쏘나타 뉴 라이즈 쏘나타 뉴 라이즈 플러그쏘나타 뉴 라이즈 플러그쏘나타 뉴 라이즈 플러그" id="name-tab3" index={2}>
          <div className="car-name-tab t3">
            <ColoredScrollbars autoHeightMax={300}>
              <RadioGroup dataList={car_radio3} mode="vertical" onChange={(e) => handleChange(e, 1)} />
            </ColoredScrollbars>
          </div>
        </TabCont>
        <TabCont tabTitle="2.0 HEV" id="name-tab4" index={3}>
          <div className="car-name-tab t4">
            <ColoredScrollbars autoHeightMax={300}>
              <RadioGroup dataList={car_radio4} mode="vertical" onChange={(e) => handleChange(e, 2)} />
            </ColoredScrollbars>
          </div>
        </TabCont>
        <TabCont tabTitle="프리미엄" id="name-tab5" index={4}>
          <div className="car-name-tab t5">
            <ColoredScrollbars autoHeightMax={300}>
              <RadioGroup dataList={car_radio5} mode="vertical" onChange={(e) => handleChange(e, 3)} />
            </ColoredScrollbars>
          </div>
        </TabCont>
      </TabMenu>
    </div>
  );
};

export default CarSelection;
