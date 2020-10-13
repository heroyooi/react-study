import { useState } from 'react';
import { useSelector } from 'react-redux';
import MenuItem from '@lib/share/menu/MenuItem';
import MenuTitle from '@lib/share/menu/MenuTitle';
import MenuCont from '@lib/share/menu/MenuCont';
import Button from '@lib/share/items/Button';

/*
html 변경이력
03.06 : 모바일 버전, props(more & mode) 추가 및 더보기 인터렉션 구현, #a1 부분 참고
*/
const FaqList = ({ section="common", isTitle=true, more=false, mode="faq" }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [isMode, setIsMode] = useState(mode); // faq, live

  // #a1 start
  const faqData = [{
    title: '내차의 가격은 어떻게 산정되나요?',
    content: `
      <span><em>방문자 평가 판매 : </em>담당자가 고객님이 원하시는 장소로 무료 방문 후 약 5~10분 정도 차량을 점검한 후 시세 대비 최고가 산정하여 안내해드립니다.</span>
      <span><em>셀프 등록 판매 : </em>등록하신 차량 정보와 원하시는 판매가를 토대로 담당자가 시세 대비 최고가 산정하여 안내해 드립니다.</span>
      <span><em>무평가 판매 : </em>계약 후 입고된 차량을 담당자가 검수하여 시세 대비 최고가 산정하여 안내해 드립니다.</span>
    `
  }, {
    title: '접수 후 방문까지 걸리는 시간은 어느 정도인가요?',
    content: '대략 한시간 정도 소요됩니다.'
  }, {
    title: '명의 이전은 내가 직접 해야 하나요?',
    content: '네 직접 하셔야 됩니다.'
  }, {
    title: '할부나 리스로 구입한 차량도 매각이 가능한가요?',
    content: '네 가능합니다.'
  }, {
    title: '공휴일/주말에도 방문이 가능한가요?',
    content: '미리 예약잡으신 고객님들에 한에서 가능합니다.'
  }];

  const liveData = [{
    title: '외장 진단',
    content: '앞유리 상태, 뒷유리 상태, 창문상태, 스티커 제거, 광택상태, 와이퍼 작동 상태, 텐트, 흡집 상태, 도장 상태, 휠 상태, 타이어 상태, 번호판 상태, 플라스틱류 부품 상태 총 12가지 항목'
  }, {
    title: '실내 진단',
    content: '실내상태, 실내세정 확인, 금연차량여부, 글로스 박스 상태, 대시보도, 실내장식, 룸미러, 거울 유리창 내면, 트렁크, 모든 시트, 모든 매트, 안전벨트 청결 상태, 악취, 루프 라이닝, 보조키, 매뉴얼, 스페어타이어, 도어 및 내장 트림, 스티커 제거 상태  총 19가지 항목'
  }, {
    title: '기능 진단',
    content: '모든 잠김장치, 스마트키, 모든 실내등, 외부 라이트, 계기판, 메모리 시트, 전동 시트 조절, 열선 스터어링, 창문개폐, 선루프, 경적, 시트열선, 통풍, 마사지 , 12V 충전단자, USB작동, 안전벨트, 에어컨, 히터, 네비게이션, 후방카메라, 360 어라운드 뷰, 주차 보조 시스템 총 35가지 항목'
  }]
  const dummyData = {
    title: '더미 질문입니다.',
    content: '더미 답변입니다.'
  };
  
  const [listData, setListData] = useState(isMode === "faq" ? faqData : liveData);
  const handleMore = (e) => {
    e.preventDefault();
    setListData(listData => [...listData, dummyData, dummyData, dummyData, dummyData, dummyData])
  }
  // #a1 end

  return (
    <>
      {
        isTitle && (
          <div className="faq-tit">
            <h4>자주 묻는 질문</h4>
            {!hasMobile ? (
              <>
                {section === "autoAuction" && <p className="info">오토옥션에 대한 궁금한 점을 빠르게 해결하세요.</p>}
                <Button color="black" title="더 많은 FAQ 보러가기" iconType='arrow' href="/customer/faq" nextLink={true} />
              </>
            ) : (
                <>
                  <Button size="sml" line="gray" color="gray" radius={true} title="더보기" width={50} href="/customer/faq" nextLink={true} />
                  <p className="info">내차 팔기 전, 궁금한 점을 빠르게 해결하세요.</p>
                </>
              )}

          </div>
        )
      }
      {/* #a1 start */}
      <div className="faq-list">
        <ul className={
          hasMobile
            ? isTitle ? `m-toggle-list` : `m-toggle-list no-tit`
            : isTitle ? `menu-list` : `menu-list no-tit`
        }>
          {listData.map((v, i) => {
            return (
              <MenuItem key={i}>
                <MenuTitle>
                  <h6>{v.title}</h6>
                </MenuTitle>
                <MenuCont>
                  <p dangerouslySetInnerHTML={{__html: v.content}} />
                </MenuCont>
              </MenuItem>
            )
          })}
        </ul>
      </div>
      {(hasMobile && more) && (
        <div className="mt16">
          <Button size="full" line="gray" color="darkgray" radius={true} title="더보기 +" height={40} fontSize={14} lineHeight={40} fontWeight={500} onClick={handleMore} />
        </div>
      )}
      {/* #a1 end */}
    </>
  )
}

export default FaqList;