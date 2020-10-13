import React, { useEffect, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';
import { SystemContext } from '@src/provider/SystemProvider';

const Editor = dynamic(() => import('@lib/share/textEditor/editor'), {
  ssr: false,
  loading() {
    return <span>Loading...</span>;
  }
});

const liveStudioData = [
  {
    nttTtlNm: '외장 진단',
    nttCntn: '앞유리 상태, 뒷유리 상태, 창문상태, 광택상태, 와이퍼 작동 상태, 텐트, 흡집 상태, 도장 상태, 휠 상태, 타이어 상태, 번호판 상태, 플라스틱류 부품 상태 총 15가지 항목'
  },
  {
    nttTtlNm: '실내 진단',
    nttCntn: '실내세정 확인, 글로스 박스 상태, 대시보도, 룸미러, 거울 유리창 내면, 트렁크, 모든 시트, 모든 매트, 안전벨트 청결 상태, 악취, 루프 라이닝, 보조키, 매뉴얼, 스페어타이어 총 14가지 항목'
  },
  {
    nttTtlNm: '기능 진단',
    nttCntn:
      '모든 잠김장치, 스마트키, 모든 실내등, 외부 라이트, 계기판, 메모리 시트, 전동 시트 조절, 열선 스터어링, 창문개폐, 선루프, 경적, 시트열선, 통풍, 마사지 , 12V 충전단자, USB작동, 안전벨트, 에어컨, 히터, 네비게이션, 후방카메라, 360 어라운드 뷰, 주차 보조 시스템 총 32가지 항목'
  }
];

const FaqList = ({ section = 'common', isTitle = true, more = false, mode = 'faq', faqData = [], tabNo = 7, faqDataTotalCount = 0, onClick, isShowOnlyOne = false }) => {
  const { initAlert, initConfirm } = useContext(SystemContext);
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [menuToggle, setMenuToggle] = useState([true, false, false, false, false, false, false, false]);
  const [listData, setListData] = useState([]);

  const handleMore = useCallback(
    (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      if (hasMobile) {
        if (onClick) {
          onClick(e, 1);
        }
      } else {
        if (onClick) {
          onClick(e);
        }
      }
    },
    [onClick]
  );

  useEffect(() => {
    initAlert();
    initConfirm();
  }, []);

  useEffect(() => {
    if (mode === 'faq') {
      setListData(!isEmpty(faqData) ? faqData : []);
    } else {
      setListData(liveStudioData);
    }
  }, [faqData, mode]);

  const menuClickCb = useCallback((index) => () => {
    // 내차팔기에서 자주묻는질문 1개씩만 보이게
    if (isShowOnlyOne) {
      // menuToggle이 왜 8개짜리 배열인지 모르니 배열 로직처리
      const _newMenu = [];
      menuToggle.forEach((element, idx) => {
        if (idx === index) {
          _newMenu.push(true);
        } else {
          _newMenu.push(false);
        }
      });
      setMenuToggle(_newMenu);
    }
  });

  return (
    <>
      {isTitle && (
        <div className="faq-tit">
          <h4>자주 묻는 질문</h4>
          {!hasMobile ? (
            <>
              {section === 'autoAuction' && <p className="info">스마트옥션에 대한 궁금한 점을 빠르게 해결하세요.</p>}
              <Button color="black" title="더 많은 FAQ 보러가기" iconType="arrow" href={`/cscenter/faq?tabNo=${tabNo}`} />
            </>
          ) : (
            <>
              <Button size="sml" line="gray" color="gray" radius={true} title="더보기" width={50} href={`/cscenter/faq?tabNo=${tabNo}`} />
              <p className="info">내차 팔기 전, 궁금한 점을 빠르게 해결하세요.</p>
            </>
          )}
        </div>
      )}
      <div className="faq-list">
        <ul className={hasMobile ? (isTitle ? `m-toggle-list` : `m-toggle-list no-tit`) : isTitle ? `menu-list` : `menu-list no-tit`}>
          {!isEmpty(listData) &&
            listData.map((val, index) => {
              return (
                <MenuItem key={index} isValue={menuToggle[index]}>
                  <MenuTitle callback={menuClickCb(index)}>
                    <h6>{val.nttTtlNm ? val.nttTtlNm : val.title}</h6>
                  </MenuTitle>
                  <MenuCont>
                    <div className="con-wrap frminbox">
                      <Editor value={val.nttCntn ? val.nttCntn : ''} editing={false} />
                    </div>
                    {/* <div dangerouslySetInnerHTML={{ __html: val.nttCntn }} /> */}
                    {/* <div dangerouslySetInnerHTML={{ __html: v.content }} /> */}
                    {/* <p>
                      {val.nttCntn
                        ? val.nttCntn.split('\n').map((item, index) => {
                            return (
                              <span key={index} style={{ color: '#222', textAlign: 'left', wordBreak: 'break-all' }}>
                                {item}
                                <br />
                              </span>
                            );
                      }) : val.content }
                    </p> */}
                  </MenuCont>
                </MenuItem>
              );
            })}
        </ul>
      </div>

      {hasMobile && more && faqDataTotalCount > (faqData?.length || 0) && (
        <div className="mt16">
          <Button size="full" line="gray" color="darkgray" radius={true} title="더보기 +" height={40} fontSize={14} lineHeight={40} fontWeight={500} onClick={handleMore} />
        </div>
      )}
      {/* #a1 end */}
    </>
  );
};

FaqList.propTypes = {
  section: PropTypes.string,
  isTitle: PropTypes.bool,
  more: PropTypes.bool,
  mode: PropTypes.string,
  faqData: PropTypes.array,
  tabNo: PropTypes.number,
  faqDataTotalCount: PropTypes.number,
  onClick: PropTypes.func,
  isShowOnlyOne: PropTypes.bool
};

export default FaqList;
