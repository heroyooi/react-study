export const select_order = [
  { value: '1', label: '최신 등록순' },
  { value: '2', label: '낮은 가격순' }
];

// 체크박스
export const check1_list = [
  { id: 'check1_list1', title: '현대', checked: true, disabled: false },
  { id: 'check1_list2', title: '기아', checked: false, disabled: true },
  { id: 'check1_list3', title: '르노', checked: false, disabled: false },
  { id: 'check1_list4', title: '쉐보레', checked: false, disabled: false }
];
export const check2_list = [
  { id: 'check2_list1', title: '현대', disabled: false },
  { id: 'check2_list2', title: '기아', disabled: false },
  { id: 'check2_list3', title: '르노', disabled: false },
  { id: 'check2_list4', title: '쉐보레', disabled: false }
];
export const auction_check_list = [
  { id: 'chk-auction-agree-1', title: '스마트옥션 경매약관 및 주의사항 동의', checked: false },
  { id: 'chk-auction-agree-2', title: '세금계산서 발행의무 동의', checked: false },
  { id: 'chk-auction-agree-3', title: '개인정보 활용 동의', checked: false },
  { id: 'chk-auction-agree-4', title: '자동차매매(경매) 행위에 대한 위/수임 확인', checked: false }
];
export const auction_check_list2 = [
  { id: 'chk-signup-agree-1', title: '스마트옥션 이용약관 (필수)', checked: true, essential: true },
  { id: 'chk-signup-agree-2', title: '개인정보 수집/이용 동의 (필수)', checked: false, essential: true },
  { id: 'chk-signup-agree-3', title: '개인정보 제 3자 제공/위탁 동의 (선택)', checked: false, essential: false }
];
export const signup_check_list = [
  { id: 'chk-signup-agree-1', title: '현대 오토벨 이용 약관 (필수)', checked: true, essential: true },
  { id: 'chk-signup-agree-2', title: '개인정보 수집·이용 안내 (필수)', checked: false, essential: true },
  { id: 'chk-signup-agree-3', title: '개인정보 제공 안내 (필수)', checked: true, essential: true },
  { id: 'chk-signup-agree-4', title: '마케팅 활용/수신 (선택)', checked: false, essential: false }
];
export const signup_check_list2 = [
  { id: 'chk-apply-agree-1', title: '홈서비스 이용약관 (필수)', checked: true, essential: true },
  { id: 'chk-apply-agree-2', title: '홈서비스 환불규정 (필수) ', checked: false, essential: true },
  { id: 'chk-apply-agree-3', title: '고유식별정보 수집/이용 동의 (필수)', checked: false, essential: true }
  // { id: 'chk-apply-agree-4', title: '[선택] 마케팅활용동의', checked: false, essential: false },
  // { id: 'chk-apply-agree-5', title: '[선택] 개인정보제3자제공에관한사항', checked: false, essential: false }
];

export const signup_check_item = [{ id: 'chk-signup-agree-4', title: '마케팅 활용/수신 (선택)', checked: false, essential: false }];

// 라디오
export const radio_basic = [{ id: 'radio', value: 1, checked: true, disabled: false, title: 'Radio' }];
export const radio_basic_sml = [{ id: 'radio_sml', value: 1, checked: false, disabled: false, title: 'Radio' }];
export const radio_group = [
  { id: 'radio_a', value: 1, checked: true, disabled: false, title: 'A', label: 'A' },
  { id: 'radio_b', value: 2, checked: false, disabled: false, title: 'B', label: 'B' },
  { id: 'radio_c', value: 3, checked: false, disabled: false, title: 'C', label: 'C' }
];
export const radio_profile = [
  { id: 'profile_pu', value: 1, checked: true, disabled: false, title: '공개' },
  { id: 'profile_pv', value: 2, checked: false, disabled: false, title: '비공개' }
];
export const radio_group_tax = [
  { id: 'radio_issue', value: 1, checked: true, disabled: false, title: '발행' },
  { id: 'radio_unissue', value: 2, checked: false, disabled: false, title: '미발행' }
];
export const radio_group_sign = [
  { id: 'radio_certificate', value: 1, checked: true, disabled: false, title: '공인인증서' },
  { id: 'radio_signature', value: 2, checked: false, disabled: false, title: '직접서명' }
];
export const radio_group_sml = [
  { id: 'radio_a_sm', value: 1, checked: true, disabled: false, title: 'A' },
  { id: 'radio_b_sm', value: 2, checked: false, disabled: false, title: 'B' },
  { id: 'radio_c_sm', value: 3, checked: false, disabled: false, title: 'C' }
];
export const radio_disabled = [{ id: 'disabled1', value: 1, checked: true, disabled: true, title: 'disabled' }];
export const radio_disabled_sml = [{ id: 'disabled_sml', value: 1, checked: false, disabled: true, title: 'disabled' }];
export const radio_autobel_as = [
  { id: 'autobel1', value: 1, checked: true, disabled: false, title: '오토벨EW Lv1' },
  { id: 'autobel2', value: 2, checked: false, disabled: false, title: '오토벨EW Lv2' },
  { id: 'as_none', value: 3, checked: false, disabled: false, title: '보증없음' }
];
export const radio_pay = [
  { id: 'installment', value: 1, checked: true, disabled: false, title: '할부' },
  { id: 'account', value: 2, checked: false, disabled: false, title: '계좌이체' },
  { id: 'account_installment', value: 3, checked: false, disabled: false, title: '할부+계좌이체' }
];
export const m_radio_pay = [
  { id: 'installment2', value: 1, checked: true, disabled: false, label: '할부' },
  { id: 'account2', value: 2, checked: false, disabled: false, label: '계좌이체' },
  { id: 'account_installment2', value: 3, checked: false, disabled: false, label: '할부+계좌이체' }
];
export const radio_contractor = [
  { id: 'contractor1', value: 1, checked: true, disabled: false, title: '개인' },
  { id: 'contractor2', value: 2, checked: false, disabled: false, title: '개인사업자' },
  { id: 'contractor3', value: 3, checked: false, disabled: false, title: '법인사업자' }
];
export const m_radio_contractor = [
  { id: 'contractor4', value: 1, checked: true, disabled: false, label: '개인' },
  { id: 'contractor5', value: 2, checked: false, disabled: false, label: '개인사업자' },
  { id: 'contractor6', value: 3, checked: false, disabled: false, label: '법인사업자' }
];
export const radio_guaranteed = [
  { id: 'guaranteed1', value: 1, checked: true, disabled: false, title: '오토벨EW Lv1' },
  { id: 'guaranteed2', value: 2, checked: true, disabled: false, title: '오토벨EW Lv2' },
  { id: 'guaranteed3', value: 3, checked: true, disabled: false, title: '오토벨EW Lv3' },
  { id: 'unguaranteed', value: 4, checked: true, disabled: false, title: '보증없음' }
];
export const m_radio_guaranteed = [
  { id: 'guaranteed4', value: 1, checked: true, disabled: false, label: '오토벨EW Lv1' },
  { id: 'guaranteed5', value: 2, checked: true, disabled: false, label: '오토벨EW Lv2' },
  // {id:'guaranteed6', value:3, checked:true, disabled:false, label:'오토벨EW Lv3'},
  { id: 'unguaranteed2', value: 4, checked: true, disabled: false, label: '보증없음' }
];
export const radio_auction_house = [
  { id: 'auction_house1', value: 1, checked: true, disabled: false, title: '분당 경매장' },
  { id: 'auction_house2', value: 2, checked: false, disabled: false, title: '양산 경매장' },
  { id: 'auction_house3', value: 3, checked: false, disabled: false, title: '시화 경매장' }
];
export const m_radio_auction_house = [
  { id: 'auction_house4', value: 1, checked: true, disabled: false, label: '분당 경매장' },
  { id: 'auction_house5', value: 2, checked: false, disabled: false, label: '양산 경매장' },
  { id: 'auction_house6', value: 3, checked: false, disabled: false, label: '시화 경매장' }
];
export const m_dealer = [
  { id: 'dealer1', value: 1, checked: true, disabled: false, label: '장**' },
  { id: 'dealer2', value: 2, checked: false, disabled: false, label: '장**' },
  { id: 'dealer3', value: 3, checked: false, disabled: false, label: '장**' }
];
export const m_ticket = [
  { id: 'ticket1', value: 1, checked: true, disabled: false, label: '자유이용권' },
  { id: 'ticket2', value: 2, checked: false, disabled: false, label: '업데이트 자유권' }
];
export const radio_possession = [
  { id: 'auction_possession1', value: 1, checked: true, disabled: false, title: '개인' },
  { id: 'auction_possession2', value: 2, checked: false, disabled: false, title: '법인' },
  { id: 'auction_possession3', value: 3, checked: false, disabled: false, title: '개인사업' },
  { id: 'auction_possession4', value: 4, checked: false, disabled: false, title: '법인지점' },
  { id: 'auction_possession5', value: 5, checked: false, disabled: false, title: '상품용' },
  { id: 'auction_possession6', value: 6, checked: false, disabled: false, title: '종교단체' },
  { id: 'auction_possession7', value: 7, checked: false, disabled: false, title: '법인상품' },
  { id: 'auction_possession8', value: 8, checked: false, disabled: false, title: '재외국인' }
];
export const radio_consign = [
  { id: 'auction_consign1', value: 1, checked: true, disabled: false, title: '스마트옥션에 탁송 의뢰' },
  { id: 'auction_consign2', value: 2, checked: false, disabled: false, title: '본인 탁송' }
];
export const m_radio_consign = [
  { id: 'auction_consign3', value: 1, checked: true, disabled: false, label: '스마트옥션에 탁송 의뢰' },
  { id: 'auction_consign4', value: 2, checked: false, disabled: false, label: '본인 탁송' }
];
export const radio_yn1 = [
  { id: 'radio_yes1', value: 1, checked: false, disabled: false, title: '예' },
  { id: 'radio_no1', value: 2, checked: false, disabled: false, title: '아니오' }
];
export const radio_yn2 = [
  { id: 'radio_yes2', value: 1, checked: false, disabled: false, title: '예' },
  { id: 'radio_no2', value: 2, checked: false, disabled: false, title: '아니오' }
];
export const radio_yn3 = [
  { id: 'radio_yes3', value: 1, checked: false, disabled: false, title: '예' },
  { id: 'radio_no3', value: 2, checked: false, disabled: false, title: '아니오' }
];
export const radio_yn4 = [
  { id: 'radio_yes4', value: 1, checked: false, disabled: false, title: '예' },
  { id: 'radio_no4', value: 2, checked: false, disabled: false, title: '아니오' }
];
export const m_radio_yn1 = [
  { id: 'radio_yes5', value: 1, checked: false, disabled: false, label: '예' },
  { id: 'radio_no5', value: 2, checked: false, disabled: false, label: '아니오' }
];
export const m_radio_yn2 = [
  { id: 'radio_yes6', value: 1, checked: false, disabled: false, label: '예' },
  { id: 'radio_no6', value: 2, checked: false, disabled: false, label: '아니오' }
];
export const m_radio_yn3 = [
  { id: 'radio_yes7', value: 1, checked: false, disabled: false, label: '예' },
  { id: 'radio_no7', value: 2, checked: false, disabled: false, label: '아니오' }
];
export const m_radio_yn4 = [
  { id: 'radio_yes8', value: 1, checked: false, disabled: false, label: '예' },
  { id: 'radio_no8', value: 2, checked: false, disabled: false, label: '아니오' }
];
export const state0 = [
  { id: 'state', value: 1, checked: true, disabled: false, title: '양호' },
  { id: 'state0', value: 2, checked: false, disabled: false, title: '불량' }
];
export const state1 = [
  { id: 'state1', value: 1, checked: true, disabled: false, title: '양호' },
  { id: 'state2', value: 2, checked: false, disabled: false, title: '불량' }
];
export const state2 = [
  { id: 'state3', value: 1, checked: true, disabled: false, title: '많음' },
  { id: 'state4', value: 2, checked: false, disabled: false, title: '보통' },
  { id: 'state5', value: 3, checked: false, disabled: false, title: '적음' }
];
export const none_exist1 = [
  { id: 'none1', value: 1, checked: true, disabled: false, title: '없음' },
  { id: 'exist1', value: 2, checked: false, disabled: false, title: '있음' }
];
export const none_exist2 = [
  { id: 'none2', value: 1, checked: true, disabled: false, title: '없음' },
  { id: 'exist2', value: 2, checked: false, disabled: false, title: '있음' }
];
export const none_exist3 = [
  { id: 'none3', value: 1, checked: true, disabled: false, title: '없음' },
  { id: 'exist3', value: 2, checked: false, disabled: false, title: '있음' }
];
export const none_exist4 = [
  { id: 'none4', value: 1, checked: true, disabled: false, title: '없음' },
  { id: 'exist4', value: 2, checked: false, disabled: false, title: '있음' }
];
export const color = [
  { id: 'none_color', value: 1, checked: true, disabled: false, title: '무채색' },
  { id: 'exist_color', value: 2, checked: false, disabled: false, title: '유채색' }
];

export const car_radio1 = [
  { id: 'car_radio1-1', value: 1, checked: true, disabled: false, title: '현대' },
  { id: 'car_radio1-2', value: 2, checked: false, disabled: false, title: '기아' }
];
export const car_radio2 = [
  { id: 'car_radio2-1', value: 1, checked: true, disabled: false, title: '쏘나타' },
  { id: 'car_radio2-2', value: 2, checked: false, disabled: false, title: '그랜져' }
];
export const car_radio3 = [
  { id: 'car_radio3-1', value: 1, checked: true, disabled: false, title: '쏘나타 DN8 하이브리드(19년~현재)' },
  { id: 'car_radio3-2', value: 2, checked: false, disabled: false, title: '쏘나타 DN8 (19년 ~ 현재)' },
  { id: 'car_radio3-3', value: 3, checked: false, disabled: false, title: '쏘나타 DN8 하이브리드(19년~현재)' },
  { id: 'car_radio3-4', value: 4, checked: false, disabled: false, title: '쏘나타 DN8 (19년 ~ 현재)' },
  { id: 'car_radio3-5', value: 5, checked: false, disabled: false, title: '쏘나타 DN8 하이브리드(19년~현재)' },
  { id: 'car_radio3-6', value: 6, checked: false, disabled: false, title: '쏘나타 DN8 (19년 ~ 현재)' },
  { id: 'car_radio3-7', value: 7, checked: false, disabled: false, title: '쏘나타 DN8 하이브리드(19년~현재)' },
  { id: 'car_radio3-8', value: 8, checked: false, disabled: false, title: '쏘나타 DN8 (19년 ~ 현재)' },
  { id: 'car_radio3-9', value: 9, checked: false, disabled: false, title: '쏘나타 DN8 하이브리드(19년~현재)' },
  { id: 'car_radio3-10', value: 10, checked: false, disabled: false, title: '쏘나타 DN8 (19년 ~ 현재)' },
  { id: 'car_radio3-11', value: 11, checked: false, disabled: false, title: '쏘나타 DN8 하이브리드(19년~현재)' },
  { id: 'car_radio3-12', value: 12, checked: false, disabled: false, title: '쏘나타 DN8 (19년 ~ 현재)' },
  { id: 'car_radio3-13', value: 13, checked: false, disabled: false, title: '쏘나타 DN8 하이브리드(19년~현재)' },
  { id: 'car_radio3-14', value: 14, checked: false, disabled: false, title: '쏘나타 DN8 (19년 ~ 현재)' },
  { id: 'car_radio3-15', value: 15, checked: false, disabled: false, title: '쏘나타 DN8 하이브리드(19년~현재)' },
  { id: 'car_radio3-16', value: 16, checked: false, disabled: false, title: '쏘나타 DN8 (19년 ~ 현재)' },
  { id: 'car_radio3-17', value: 17, checked: false, disabled: false, title: '쏘나타 DN8 하이브리드(19년~현재)' },
  { id: 'car_radio3-18', value: 18, checked: false, disabled: false, title: '쏘나타 DN8 (19년 ~ 현재)' },
  { id: 'car_radio3-19', value: 19, checked: false, disabled: false, title: '쏘나타 DN8 하이브리드(19년~현재)' },
  { id: 'car_radio3-20', value: 20, checked: false, disabled: false, title: '쏘나타 DN8 (19년 ~ 현재)' },
  { id: 'car_radio3-21', value: 21, checked: false, disabled: false, title: '쏘나타 DN8 하이브리드(19년~현재)' },
  { id: 'car_radio3-22', value: 22, checked: false, disabled: false, title: '쏘나타 DN8 (19년 ~ 현재)' }
];
export const car_radio4 = [
  { id: 'car_radio4-1', value: 1, checked: true, disabled: false, title: '2.0 HEV' },
  { id: 'car_radio4-2', value: 2, checked: false, disabled: false, title: '3.0 HEV' }
];
export const car_radio5 = [
  { id: 'car_radio5-1', value: 1, checked: true, disabled: false, title: '스마트' },
  { id: 'car_radio5-2', value: 2, checked: false, disabled: false, title: '프리미엄' }
];
export const car_grade = [
  { id: 'car_grade-1', value: 1, checked: true, disabled: false, title: '스마트' },
  { id: 'car_grade-2', value: 2, checked: false, disabled: false, title: '프리미엄' },
  { id: 'car_grade-3', value: 3, checked: false, disabled: false, title: '프리미엄스페셜' },
  { id: 'car_grade-4', value: 4, checked: false, disabled: false, title: '모던' },
  { id: 'car_grade-5', value: 5, checked: false, disabled: false, title: '모던스페셜' }
];

export const radio_filter1 = [
  { id: 'chk-di', value: 1, checked: true, disabled: false, title: '전체' },
  { id: 'chk-domestic', value: 1, checked: true, disabled: false, title: '국산' },
  { id: 'chk-income', value: 1, checked: true, disabled: false, title: '수입' }
];
// 셀렉트 박스
export const MobilePhoneNumberSelectList = [
  { value: '1', label: '010' },
  { value: '2', label: '011' },
  { value: '3', label: '017' },
  { value: '4', label: '019' }
];

export const BankName = [
  { value: '1', label: 'KB은행' },
  { value: '2', label: '신한은행' },
  { value: '3', label: '기업은행' },
  { value: '3', label: 'SC은행' }
];

export const select1_list = [
  { value: '1', label: '영문명 긴급 문의' },
  { value: '2', label: '발권 및 티켓수령' },
  { value: '3', label: '결제 및 영수증' },
  { value: '4', label: '환불' },
  { value: '5', label: '수하물/동승자' },
  { value: '6', label: '공항/기내서비스' },
  { value: '7', label: '테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트' }
];
export const select2_list = [
  { value: '0', label: '국가선택' },
  { value: '1', label: '한국' },
  { value: '2', label: '중국' },
  { value: '3', label: '미국' },
  { value: '4', label: '일본' },
  { value: '5', label: '독일' },
  { value: '6', label: '프랑스' },
  { value: '7', label: '브라질' },
  { value: '7', label: '우크라이나' },
  { value: '7', label: '나이지리아' },
  { value: '7', label: '오스트리아' },
  { value: '7', label: '이탈리아' },
  { value: '7', label: '인도' },
  { value: '7', label: '인도네시아' }
];
export const select3_list = [
  { value: '0', label: '기아' },
  { value: '1', label: '현대' },
  { value: '2', label: '르노삼성' },
  { value: '3', label: 'GM대우' }
];
export const select_day_list = [
  { value: '1', label: '1일' },
  { value: '2', label: '2일' },
  { value: '3', label: '3일' },
  { value: '4', label: '4일' },
  { value: '5', label: '5일' },
  { value: '6', label: '6일' },
  { value: '7', label: '7일' },
  { value: '8', label: '8일' },
  { value: '9', label: '9일' },
  { value: '10', label: '10일' },
  { value: '11', label: '11일' },
  { value: '12', label: '12일' },
  { value: '13', label: '13일' },
  { value: '14', label: '14일' },
  { value: '15', label: '15일' },
  { value: '16', label: '16일' },
  { value: '17', label: '17일' },
  { value: '18', label: '18일' },
  { value: '19', label: '19일' },
  { value: '20', label: '20일' },
  { value: '21', label: '21일' },
  { value: '22', label: '22일' },
  { value: '23', label: '23일' },
  { value: '24', label: '24일' },
  { value: '25', label: '25일' },
  { value: '26', label: '26일' },
  { value: '27', label: '27일' },
  { value: '28', label: '28일' },
  { value: '29', label: '29일' },
  { value: '30', label: '30일' },
  { value: '31', label: '31일' }
];
export const mobile_select_day = [
  { id: 'radio_day_1', value: '1', label: '01', checked: false },
  { id: 'radio_day_2', value: '2', label: '02', checked: false },
  { id: 'radio_day_3', value: '3', label: '03', checked: false },
  { id: 'radio_day_4', value: '4', label: '04', checked: false },
  { id: 'radio_day_5', value: '5', label: '05', checked: false },
  { id: 'radio_day_6', value: '6', label: '06', checked: false },
  { id: 'radio_day_7', value: '7', label: '07', checked: false },
  { id: 'radio_day_8', value: '8', label: '08', checked: false },
  { id: 'radio_day_9', value: '9', label: '09', checked: false },
  { id: 'radio_day_10', value: '10', label: '10', checked: false },
  { id: 'radio_day_11', value: '11', label: '11', checked: false },
  { id: 'radio_day_12', value: '12', label: '12', checked: false },
  { id: 'radio_day_13', value: '13', label: '13', checked: false },
  { id: 'radio_day_14', value: '14', label: '14', checked: false },
  { id: 'radio_day_15', value: '15', label: '15', checked: false },
  { id: 'radio_day_16', value: '16', label: '16', checked: false },
  { id: 'radio_day_17', value: '17', label: '17', checked: false },
  { id: 'radio_day_18', value: '18', label: '18', checked: false },
  { id: 'radio_day_19', value: '19', label: '19', checked: false },
  { id: 'radio_day_20', value: '20', label: '20', checked: false },
  { id: 'radio_day_21', value: '21', label: '21', checked: false },
  { id: 'radio_day_22', value: '22', label: '22', checked: false },
  { id: 'radio_day_23', value: '23', label: '23', checked: false },
  { id: 'radio_day_24', value: '24', label: '24', checked: false },
  { id: 'radio_day_25', value: '25', label: '25', checked: false },
  { id: 'radio_day_26', value: '26', label: '26', checked: false },
  { id: 'radio_day_27', value: '27', label: '27', checked: false },
  { id: 'radio_day_28', value: '28', label: '28', checked: false },
  { id: 'radio_day_29', value: '29', label: '29', checked: false },
  { id: 'radio_day_30', value: '30', label: '30', checked: false },
  { id: 'radio_day_31', value: '31', label: '31', checked: false }
];
export const select_month_list = [
  { value: '1', label: '1월' },
  { value: '2', label: '2월' },
  { value: '3', label: '3월' },
  { value: '4', label: '4월' },
  { value: '5', label: '5월' },
  { value: '6', label: '6월' },
  { value: '7', label: '7월' },
  { value: '8', label: '8월' },
  { value: '9', label: '9월' },
  { value: '10', label: '10월' },
  { value: '11', label: '11월' },
  { value: '12', label: '12월' }
];
export const mobile_select_month = [
  { id: 'radio_year_1', value: '1', label: '01', checked: false },
  { id: 'radio_year_2', value: '2', label: '02', checked: false },
  { id: 'radio_year_3', value: '3', label: '03', checked: false },
  { id: 'radio_year_4', value: '4', label: '04', checked: false },
  { id: 'radio_year_5', value: '5', label: '05', checked: false },
  { id: 'radio_year_6', value: '6', label: '06', checked: false },
  { id: 'radio_year_7', value: '7', label: '07', checked: false },
  { id: 'radio_year_8', value: '8', label: '08', checked: false },
  { id: 'radio_year_9', value: '9', label: '09', checked: false },
  { id: 'radio_year_10', value: '10', label: '10', checked: false },
  { id: 'radio_year_11', value: '11', label: '11', checked: false },
  { id: 'radio_year_12', value: '12', label: '12', checked: false }
];
export const select_year_list = [
  { value: '1', label: '2018' },
  { value: '2', label: '2019' },
  { value: '3', label: '2020' },
  { value: '4', label: '2021' },
  { value: '5', label: '2022' },
  { value: '6', label: '2023' }
];
export const mobile_select_year = [
  { id: 'radio_year_1', value: '1', label: '2018', checked: false },
  { id: 'radio_year_2', value: '2', label: '2019', checked: false },
  { id: 'radio_year_3', value: '3', label: '2020', checked: false },
  { id: 'radio_year_4', value: '4', label: '2021', checked: false },
  { id: 'radio_year_5', value: '5', label: '2022', checked: false },
  { id: 'radio_year_6', value: '6', label: '2023', checked: false }
];
export const select_cash_list = [
  { value: '1', label: '발행' },
  { value: '2', label: '미발행' }
];
export const select_time_list = [
  { value: '1', label: '00:00' },
  { value: '2', label: '01:00' },
  { value: '3', label: '02:00' },
  { value: '4', label: '03:00' },
  { value: '5', label: '04:00' },
  { value: '6', label: '05:00' },
  { value: '7', label: '06:00' },
  { value: '8', label: '07:00' },
  { value: '9', label: '08:00' },
  { value: '10', label: '09:00' },
  { value: '11', label: '10:00' },
  { value: '12', label: '11:00' },
  { value: '13', label: '12:00' },
  { value: '14', label: '13:00' },
  { value: '15', label: '14:00' },
  { value: '16', label: '15:00' },
  { value: '17', label: '16:00' },
  { value: '18', label: '17:00' },
  { value: '19', label: '18:00' },
  { value: '20', label: '19:00' },
  { value: '21', label: '20:00' },
  { value: '22', label: '21:00' },
  { value: '23', label: '22:00' },
  { value: '24', label: '23:00' }
];
export const select_area = [
  { value: '1', label: '서울' },
  { value: '2', label: '인천' },
  { value: '3', label: '대전' },
  { value: '4', label: '대구' },
  { value: '5', label: '부산' },
  { value: '6', label: '울산' },
  { value: '7', label: '광주' },
  { value: '8', label: '경기' },
  { value: '9', label: '강원' },
  { value: '10', label: '충북' },
  { value: '11', label: '충남' },
  { value: '12', label: '경북' },
  { value: '13', label: '경남' },
  { value: '14', label: '전북' },
  { value: '15', label: '전남' },
  { value: '16', label: '제주' }
];
export const mobile_select_area = [
  { id: 'radio_area_1', value: 1, label: '서울', checked: false },
  { id: 'radio_area_2', value: 2, label: '인천', checked: false },
  { id: 'radio_area_3', value: 3, label: '대전', checked: false },
  { id: 'radio_area_4', value: 4, label: '대구', checked: false },
  { id: 'radio_area_5', value: 5, label: '부산', checked: false },
  { id: 'radio_area_6', value: 6, label: '울산', checked: false },
  { id: 'radio_area_7', value: 7, label: '광주', checked: false },
  { id: 'radio_area_8', value: 8, label: '경기', checked: false },
  { id: 'radio_area_9', value: 9, label: '강원', checked: false },
  { id: 'radio_area_10', value: 10, label: '충북', checked: false },
  { id: 'radio_area_11', value: 11, label: '충남', checked: false },
  { id: 'radio_area_12', value: 12, label: '경북', checked: false },
  { id: 'radio_area_13', value: 13, label: '경남', checked: false },
  { id: 'radio_area_14', value: 14, label: '전북', checked: false },
  { id: 'radio_area_15', value: 15, label: '전남', checked: false },
  { id: 'radio_area_16', value: 16, label: '제주', checked: false }
];
export const mobile_number_list = [
  { value: '1', label: '010' },
  { value: '2', label: '011' },
  { value: '3', label: '012' },
  { value: '4', label: '013' },
  { value: '5', label: '014' },
  { value: '6', label: '015' }
];
export const m_mobile_number_list = [
  { id: 'radio_local_1', value: '1', checked: true, disabled: false, label: '010' },
  { id: 'radio_local_2', value: '2', checked: false, disabled: false, label: '011' },
  { id: 'radio_local_3', value: '3', checked: false, disabled: false, label: '012' },
  { id: 'radio_local_4', value: '4', checked: false, disabled: false, label: '013' },
  { id: 'radio_local_5', value: '5', checked: false, disabled: false, label: '014' },
  { id: 'radio_local_6', value: '6', checked: false, disabled: false, label: '015' },
  { id: 'radio_local_7', value: '7', checked: false, disabled: false, label: '016' },
  { id: 'radio_local_8', value: '8', checked: false, disabled: false, label: '017' },
  { id: 'radio_local_9', value: '9', checked: false, disabled: false, label: '018' },
  { id: 'radio_local_10', value: '10', checked: false, disabled: false, label: '019' }
];
export const mailCompanylist = [
  { value: '-1', label: '직접입력' },
  { value: 'naver.com', label: '네이버' },
  { value: 'daum.net', label: '다음' },
  { value: 'gmail.com', label: 'Gmail' }
];
export const tel_number_list = [
  { value: '0010', label: '02' },
  { value: '0020', label: '031' },
  { value: '0030', label: '032' },
  { value: '0040', label: '033' },
  { value: '0050', label: '041' },
  { value: '0060', label: '042' },
  { value: '0070', label: '043' },
  { value: '0080', label: '044' },
  { value: '0090', label: '051' },
  { value: '0100', label: '052' },
  { value: '0110', label: '053' },
  { value: '0120', label: '054' },
  { value: '0130', label: '055' },
  { value: '0140', label: '061' },
  { value: '0150', label: '062' },
  { value: '0160', label: '063' },
  { value: '0170', label: '064' }
];
export const select_multi_sample = [
  { value: '1', label: '선루프' },
  { value: '2', label: 'LED' },
  { value: '3', label: '하이패스' },
  { value: '4', label: '옵션4' },
  { value: '5', label: '옵션5' },
  { value: '6', label: '옵션6' },
  { value: '7', label: '옵션7' },
  { value: '8', label: '옵션8' },
  { value: '9', label: '옵션9' },
  { value: '10', label: '옵션10' },
  { value: '11', label: '옵션11' },
  { value: '12', label: '옵션12' },
  { value: '13', label: '옵션13' },
  { value: '14', label: '옵션14' },
  { value: '15', label: '옵션15' },
  { value: '16', label: '옵션16' }
];

export const select_falseForSaleReport = [
  { value: '1', label: '팔린 매물' },
  { value: '2', label: '정보허위차량' },
  { value: '3', label: '기타 신고' }
];

// 목록 및 슬라이드(slick)
export const car_list = [
  {
    id: 1,
    name: '소나타소나타소나타소나타소나타소나타소나타',
    price: '220,909',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 20,
    isButton: true,
    buttonName: '온라인구매',
    tags: [{ color: 'blue60', value: 'EW' }],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    options: [{ color: 'red', value: '라이브' }],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 48
  },
  {
    id: 2,
    name: '투싼 Modern',
    price: '220,909',
    image: '/images/dummy/product-img-02.png',
    alt: '차량 이미지',
    discount: 20,
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'pink', value: '헛걸음' },
      { color: 'sky', value: '수입인증' }
    ],
    infos: ['15/07식', '7,989km', '디젤', '서울'],
    options: [
      { color: 'red', value: '라이브' },
      { color: 'blue60', value: '경매' }
    ],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 28
  },
  {
    id: 3,
    name: '아반떼 AD',
    price: '150,909',
    image: '/images/dummy/product-img-03.png',
    alt: '차량 이미지',
    discount: 10,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'gold', value: '프랜차이즈' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 30
  },
  {
    id: 4,
    name: '쏘나타 프리미엄',
    price: '123,456',
    image: '/images/dummy/product-img-04.png',
    alt: '차량 이미지',
    discount: 150,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 11
  },
  {
    id: 5,
    name: '그랜드 스타렉스 Limousine',
    price: '100,109',
    image: '/images/dummy/product-img-05.png',
    alt: '차량 이미지',
    discount: 5,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '192km', '디젤', '경남'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 1
  },
  {
    id: 6,
    name: '아반떼 AD',
    price: '111,027',
    image: '/images/dummy/product-img-06.png',
    alt: '차량 이미지',
    discount: 15,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 48
  },
  {
    id: 7,
    name: '아반떼 AD',
    price: '111,027',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 15,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 48
  },
  {
    id: 8,
    name: '아반떼 AD',
    price: '111,027',
    image: '/images/dummy/product-img-02.png',
    alt: '차량 이미지',
    discount: 15,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 48
  },
  {
    id: 9,
    name: '아반떼 AD',
    price: '111,027',
    image: '/images/dummy/product-img-03.png',
    alt: '차량 이미지',
    discount: 15,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 48
  },
  {
    id: 10,
    name: '아반떼 AD',
    price: '111,027',
    image: '/images/dummy/product-img-04.png',
    alt: '차량 이미지',
    discount: 15,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 48
  },
  {
    id: 11,
    name: '아반떼 AD',
    price: '111,027',
    image: '/images/dummy/product-img-03.png',
    alt: '차량 이미지',
    discount: 15,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17년식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 48
  },
  {
    id: 12,
    name: '아반떼 AD',
    price: '111,027',
    image: '/images/dummy/product-img-04.png',
    alt: '차량 이미지',
    discount: 15,
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17년식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 48
  }
];

export const car_list2 = [
  {
    id: 1,
    name: '현대 코나 1.6 4WD',
    price: '220,909',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 20,
    isButton: true,
    buttonName: '온라인구매',
    tags: [{ color: 'blue60', value: 'EW' }],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    options: [{ color: 'red', value: '라이브' }]
  },
  {
    id: 2,
    name: '투싼 Modern',
    price: '220,909',
    image: '/images/dummy/product-img-02.png',
    alt: '차량 이미지',
    discount: 20,
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'pink', value: '헛걸음' },
      { color: 'sky', value: '수입인증' }
    ],
    infos: ['15/07식', '7,989km', '디젤', '서울'],
    options: [
      { color: 'red', value: '라이브' },
      { color: 'blue60', value: '경매' }
    ]
  },
  {
    id: 3,
    name: '더뉴 아반떼 AD, 세로로 긴 이미지 테스트',
    price: '150,909',
    image: '/images/dummy/product-img-03.png',
    alt: '차량 이미지',
    discount: 10,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'gold', value: '프랜차이즈' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구']
  },
  {
    id: 4,
    name: '그랜드 스타렉스 Limousine',
    price: '100,109',
    image: '/images/dummy/product-img-05.png',
    alt: '차량 이미지',
    discount: 5,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '192km', '디젤', '경남']
  },
  {
    isMarkup: true,
    isNumber: 1
  },
  {
    name: '쏘나타 프리미엄',
    price: '123,456',
    image: '/images/dummy/product-img-04.png',
    alt: '차량 이미지',
    discount: 150,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구']
  },
  {
    name: '현대 코나 1.6 4WD',
    price: '220,909',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 20,
    isButton: true,
    buttonName: '온라인구매',
    tags: [{ color: 'blue60', value: 'EW' }],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    options: [{ color: 'red', value: '라이브' }]
  },
  {
    name: '투싼 Modern',
    price: '220,909',
    image: '/images/dummy/product-img-02.png',
    alt: '차량 이미지',
    discount: 20,
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'pink', value: '헛걸음' },
      { color: 'sky', value: '수입인증' }
    ],
    infos: ['15/07식', '7,989km', '디젤', '서울'],
    options: [
      { color: 'red', value: '라이브' },
      { color: 'blue60', value: '경매' }
    ]
  },
  {
    name: '더뉴 아반떼 AD, 세로로 긴 이미지 테스트',
    price: '150,909',
    image: '/images/dummy/product-img-03.png',
    alt: '차량 이미지',
    discount: 10,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'gold', value: '프랜차이즈' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구']
  },
  {
    name: '하버뷰 호텔',
    price: '111,027',
    image: '/images/dummy/product-img-06.png',
    alt: '차량 이미지',
    discount: 15,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구']
  },
  {
    name: '그랜드 스타렉스 Limousine',
    price: '100,109',
    image: '/images/dummy/product-img-05.png',
    alt: '차량 이미지',
    discount: 5,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '192km', '디젤', '경남']
  },
  {
    isMarkup: true,
    isNumber: 2
  },
  {
    name: '현대 코나 1.6 4WD',
    price: '220,909',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 20,
    isButton: true,
    buttonName: '온라인구매',
    tags: [{ color: 'blue60', value: 'EW' }],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    options: [{ color: 'red', value: '라이브' }]
  },
  {
    name: '투싼 Modern',
    price: '220,909',
    image: '/images/dummy/product-img-02.png',
    alt: '차량 이미지',
    discount: 20,
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'pink', value: '헛걸음' },
      { color: 'sky', value: '수입인증' }
    ],
    infos: ['15/07식', '7,989km', '디젤', '서울'],
    options: [
      { color: 'red', value: '라이브' },
      { color: 'blue60', value: '경매' }
    ]
  },
  {
    name: '더뉴 아반떼 AD, 세로로 긴 이미지 테스트',
    price: '150,909',
    image: '/images/dummy/product-img-03.png',
    alt: '차량 이미지',
    discount: 10,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'gold', value: '프랜차이즈' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구']
  },
  {
    isMarkup: true,
    isNumber: 3
  },
  {
    name: '그랜드 스타렉스 Limousine',
    price: '100,109',
    image: '/images/dummy/product-img-05.png',
    alt: '차량 이미지',
    discount: 5,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '192km', '디젤', '경남']
  },
  {
    name: '하버뷰 호텔',
    price: '111,027',
    image: '/images/dummy/product-img-06.png',
    alt: '차량 이미지',
    discount: 15,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구']
  },
  {
    name: '현대 코나 1.6 4WD',
    price: '220,909',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 20,
    isButton: true,
    buttonName: '온라인구매',
    tags: [{ color: 'blue60', value: 'EW' }],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    options: [{ color: 'red', value: '라이브' }]
  },
  {
    name: '투싼 Modern',
    price: '220,909',
    image: '/images/dummy/product-img-02.png',
    alt: '차량 이미지',
    discount: 20,
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'pink', value: '헛걸음' },
      { color: 'sky', value: '수입인증' }
    ],
    infos: ['15/07식', '7,989km', '디젤', '서울'],
    options: [
      { color: 'red', value: '라이브' },
      { color: 'blue60', value: '경매' }
    ]
  },
  {
    name: '더뉴 아반떼 AD, 세로로 긴 이미지 테스트',
    price: '150,909',
    image: '/images/dummy/product-img-03.png',
    alt: '차량 이미지',
    discount: 10,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'gold', value: '프랜차이즈' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구']
  },
  {
    name: '하버뷰 호텔',
    price: '111,027',
    image: '/images/dummy/product-img-06.png',
    alt: '차량 이미지',
    discount: 15,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구']
  },
  {
    name: '그랜드 스타렉스 Limousine',
    price: '100,109',
    image: '/images/dummy/product-img-05.png',
    alt: '차량 이미지',
    discount: 5,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '192km', '디젤', '경남']
  },
  {
    name: '쏘나타 프리미엄',
    price: '123,456',
    image: '/images/dummy/product-img-04.png',
    alt: '차량 이미지',
    discount: 150,
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'green', value: '금융인증' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구']
  },
  {
    isMarkup: true,
    isNumber: 4
  }
];

export const car_list3 = [
  {
    name: '그랜드 스타렉스 Limousine',
    price: '220,909',
    image: '/images/dummy/list-product-img-01.png',
    alt: '일반등록 차량 이미지',
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'pink', value: '헛걸음' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: '48'
  },
  {
    name: '투싼 Modern',
    price: '1,780',
    image: '/images/dummy/list-product-img-02.png',
    alt: '일반등록 차량 이미지',
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'pink', value: '헛걸음' }
    ],
    infos: ['17/07식', '7,989km', '디젤', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: '1,024'
  },
  {
    name: '쏘나타 프리미엄',
    price: '995',
    image: '/images/dummy/list-product-img-03.png',
    alt: '일반등록 차량 이미지',
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'pink', value: '헛걸음' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: '7'
  },
  {
    name: '코나 1.64WD 프리미엄',
    price: '2,100',
    image: '/images/dummy/list-product-img-04.png',
    alt: '일반등록 차량 이미지',
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'pink', value: '헛걸음' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: '48'
  },
  {
    name: '그랜드 스타렉스 Limousine',
    price: '2,100',
    image: '/images/dummy/list-product-img-05.png',
    alt: '일반등록 차량 이미지',
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'gold', value: '프랜차이즈' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: '48'
  }
];
export const car_list4 = [
  {
    id: 1,
    name: '그랜드 스타렉스 Limousine',
    price: '220,909',
    image: '/images/dummy/list-product-img-01.png',
    alt: '일반등록 차량 이미지',
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'pink', value: '헛걸음' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: '48'
  },
  {
    id: 2,
    name: '투싼 Modern',
    price: '1,780',
    image: '/images/dummy/list-product-img-02.png',
    alt: '일반등록 차량 이미지',
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'pink', value: '헛걸음' }
    ],
    infos: ['17/07식', '7,989km', '디젤', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: '1,024'
  },
  {
    id: 3,
    name: '쏘나타 프리미엄',
    price: '995',
    image: '/images/dummy/list-product-img-03.png',
    alt: '일반등록 차량 이미지',
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'pink', value: '헛걸음' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: '7'
  },
  {
    id: 4,
    name: '코나 1.64WD 프리미엄',
    price: '2,100',
    image: '/images/dummy/list-product-img-04.png',
    alt: '일반등록 차량 이미지',
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'pink', value: '헛걸음' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: '48'
  },
  {
    id: 5,
    name: '그랜드 스타렉스 Limousine',
    price: '2,100',
    image: '/images/dummy/list-product-img-05.png',
    alt: '일반등록 차량 이미지',
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'gold', value: '프랜차이즈' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: '48'
  },
  {
    id: 6,
    name: '그랜드 스타렉스 Limousine',
    price: '2,100',
    image: '/images/dummy/list-product-img-05.png',
    alt: '일반등록 차량 이미지',
    isButton: true,
    buttonName: '온라인구매',
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'gold', value: '프랜차이즈' }
    ],
    infos: ['17/07식', '26,530km', '가솔린', '대구'],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: '48'
  }
];
export const auction_list = [
  {
    id: 1,
    name: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    image: '/images/dummy/product-img-01.png',
    alt: '일반등록 차량 이미지',
    buttonName: '입찰하기',
    infos: ['19년식', '22km', '디젤', '서울'],
    limitTime: '- 10:45:21',
    limitNum: 21,
    interest: true,
    amt: 3200
  },
  {
    id: 2,
    name: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    image: '/images/dummy/product-img-01.png',
    alt: '일반등록 차량 이미지',
    buttonName: '입찰하기',
    infos: ['19년식', '22km', '디젤', '서울'],
    limitTime: '- 10:45:21',
    limitNum: 21
  },
  {
    id: 3,
    name: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    image: '/images/dummy/product-img-01.png',
    alt: '일반등록 차량 이미지',
    buttonName: '입찰가격 수정',
    infos: ['19년식', '22km', '디젤', '서울'],
    limitTime: '- 10:45:21',
    limitNum: 21
  },
  {
    id: 4,
    name: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    image: '/images/dummy/product-img-01.png',
    alt: '일반등록 차량 이미지',
    buttonName: '입찰하기',
    infos: ['19년식', '22km', '디젤', '서울'],
    limitTime: '- 10:45:21',
    limitNum: 21
  },
  {
    id: 5,
    name: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    image: '/images/dummy/product-img-01.png',
    alt: '일반등록 차량 이미지',
    buttonName: '입찰하기',
    infos: ['19년식', '22km', '디젤', '서울'],
    limitTime: '- 10:45:21',
    limitNum: 21
  },
  {
    id: 6,
    name: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    image: '/images/dummy/product-img-01.png',
    alt: '일반등록 차량 이미지',
    buttonName: '입찰하기',
    infos: ['19년식', '22km', '디젤', '서울'],
    limitTime: '- 10:45:21',
    limitNum: 21
  },
  {
    id: 7,
    name: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    image: '/images/dummy/product-img-01.png',
    alt: '일반등록 차량 이미지',
    buttonName: '입찰가격 수정',
    infos: ['19년식', '22km', '디젤', '서울'],
    limitTime: '- 10:45:21',
    limitNum: 21
  },
  {
    id: 8,
    name: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    image: '/images/dummy/product-img-01.png',
    alt: '일반등록 차량 이미지',
    buttonName: '입찰하기',
    infos: ['19년식', '22km', '디젤', '서울'],
    limitTime: '- 10:45:21',
    limitNum: 21,
    interest: false
  }
];

// 차트
const RandomValue = (limit = 10) => Math.floor(Math.random() * limit);
export const chartData = [
  { stime: '08-10', targetQuantity: RandomValue(100), productionQuantity: RandomValue(100) },
  { stime: '08-11', targetQuantity: RandomValue(100), productionQuantity: RandomValue(100) },
  { stime: '08-12', targetQuantity: RandomValue(100), productionQuantity: RandomValue(100) },
  { stime: '08-13', targetQuantity: RandomValue(100), productionQuantity: RandomValue(100) },
  { stime: '08-14', targetQuantity: RandomValue(100), productionQuantity: RandomValue(100) },
  { stime: '08-15', targetQuantity: RandomValue(100), productionQuantity: RandomValue(100) },
  { stime: '08-16', targetQuantity: RandomValue(100), productionQuantity: RandomValue(100) },
  { stime: '08-17', targetQuantity: RandomValue(100), productionQuantity: RandomValue(100) },
  { stime: '08-18', targetQuantity: RandomValue(100), productionQuantity: RandomValue(100) },
  { stime: '08-19', targetQuantity: RandomValue(100), productionQuantity: RandomValue(100) }
];

// TREE
export const dataProvider = [
  {
    value: 'Hyundai',
    label: '현대',
    count: 24230,
    level: 0,
    description: '',
    defaultChecked: true,
    children: [
      {
        category: '인기모델'
      },
      {
        value: '그랜저',
        label: '그랜저',
        count: 1505,
        level: 1,
        defaultChecked: true,
        children: [
          {
            value: '그랜저 IG',
            label: '그랜저 IG',
            count: 356,
            level: 2,
            description: '',
            children: [
              {
                value: 'LPG 3000cc',
                label: 'LPG 3000cc',
                count: 646,
                level: 3,
                description: '',
                children: [
                  {
                    value: '3.0 LPI 모던',
                    label: '3.0 LPI 모던',
                    count: 98,
                    level: 4,
                    description: ''
                  },
                  {
                    value: '3.0 LPI 익스클루시브',
                    label: '3.0 LPI 익스클루시브',
                    count: 241,
                    level: 4,
                    description: ''
                  },
                  {
                    value: '3.0 LPI 모던 베이직',
                    label: '3.0 LPI 모던 베이직',
                    count: 328,
                    level: 4,
                    description: ''
                  },
                  {
                    value: '3.0 LPI 익스클루시브',
                    label: '3.0 LPI 익스클루시브',
                    count: 120,
                    level: 4,
                    description: ''
                  }
                ]
              },
              {
                value: '가솔린 2400cc',
                label: '가솔린 2400cc',
                count: 0,
                level: 3,
                description: ''
              },
              {
                value: '가솔린 3000cc',
                label: '가솔린 3000cc',
                count: 0,
                level: 3,
                description: ''
              },
              {
                value: '가솔린 3300cc',
                label: '가솔린 3300cc',
                count: 0,
                level: 3,
                description: ''
              },
              {
                value: '디젤 2400cc',
                label: '디젤 2400cc',
                count: 0,
                level: 3,
                description: ''
              }
            ]
          },
          {
            value: 'deimos',
            label: '그랜저 IG 하이브리드',
            count: 11,
            level: 2,
            description: ''
          }
        ]
      },
      {
        category: '이름순'
      },
      {
        value: 'i30',
        label: 'i30',
        count: 45,
        level: 1
      },
      {
        value: 'i40',
        label: 'i40',
        count: 72,
        level: 1
      }
    ]
  },
  {
    value: '기아',
    label: '기아',
    count: 19203,
    level: 0,
    description: '',
    children: [
      {
        value: 'K3',
        label: 'K3',
        count: 11,
        level: 1,
        description: '',
        children: []
      },
      {
        value: 'K3',
        label: 'K3',
        count: 11,
        level: 1,
        description: '',
        children: []
      },
      {
        value: 'K5',
        label: 'K5',
        count: 11,
        level: 1,
        description: '',
        children: []
      },
      {
        value: 'K7',
        label: 'K7',
        count: 11,
        level: 1,
        description: '',
        children: []
      },
      {
        value: 'K9',
        label: 'K9',
        count: 11,
        level: 1,
        description: '',
        children: []
      },
      {
        value: '니로',
        label: '니로',
        count: 11,
        level: 1,
        description: '',
        children: []
      },
      {
        value: '레이',
        label: '레이',
        count: 11,
        level: 1,
        description: '',
        children: []
      }
    ]
  },
  {
    value: '제네시스',
    label: '제네시스',
    count: 1203,
    level: 0,
    description: '',
    children: [
      {
        value: 'G70',
        label: 'G70',
        count: 778,
        level: 1,
        description: '',
        children: []
      },
      {
        value: 'G80',
        label: 'G80',
        count: 150,
        level: 1,
        description: '',
        children: []
      },
      {
        value: 'G90',
        label: 'G90',
        count: 23,
        level: 1,
        description: '',
        children: []
      },
      {
        value: 'EQ900',
        label: 'EQ900',
        count: 12,
        level: 1,
        description: '',
        children: []
      }
    ]
  },
  {
    value: '쉐보레(GM대우)',
    label: '쉐보레(GM대우)',
    count: 6016,
    level: 0,
    description: '',
    children: []
  },
  {
    value: '르노삼성',
    label: '르노삼성',
    count: 5423,
    level: 0,
    description: '',
    children: []
  },
  {
    value: '쌍용',
    label: '쌍용',
    count: 5322,
    level: 0,
    description: '',
    children: []
  }
];

// 내차사기 > 상세 > 슬라이드 갤러리
export const car_gallery = [
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/avante/highlights/pip-avante-highlights-gasoline-1-point-6-premium-full-option.jpg',
    bAlt: '차량이미지01',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/avante/highlights/pip-avante-highlights-gasoline-1-point-6-premium-full-option.jpg',
    sAlt: '차량이미지01 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/avante/highlights/pip-avante-highlights-gasoline-1-point-6-premium-full-option-front-teal-blue.jpg',
    bAlt: '차량이미지02',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/avante/highlights/pip-avante-highlights-gasoline-1-point-6-premium-full-option-front-teal-blue.jpg',
    sAlt: '차량이미지02 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/grandeur/design/pip-grandeur-design-full-led-headlamp-and-cascading-grill-n.jpg',
    bAlt: '차량이미지03',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/grandeur/design/pip-grandeur-design-full-led-headlamp-and-cascading-grill-n.jpg',
    sAlt: '차량이미지03 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/grandeur/design/pip-grandeur-design-led-turn-signal-applied-outside-mirror-and-satin-chrome-molding-n.jpg',
    bAlt: '차량이미지04',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/grandeur/design/pip-grandeur-design-led-turn-signal-applied-outside-mirror-and-satin-chrome-molding-n.jpg',
    sAlt: '차량이미지04 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/grandeur/design/pip-grandeur-design-led-rear-combilamp-n.jpg',
    bAlt: '차량이미지05',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/grandeur/design/pip-grandeur-design-led-rear-combilamp-n.jpg',
    sAlt: '차량이미지05 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/grandeur/design/pip-grandeur-design-3-point-3-celebrity-full-options.jpg',
    bAlt: '차량이미지06',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/grandeur/design/pip-grandeur-design-3-point-3-celebrity-full-options.jpg',
    sAlt: '차량이미지06 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/grandeur/design/pip-grandeur-design-3-point-0-exclusive-special-and-jbl-sound-package-front.jpg',
    bAlt: '차량이미지07',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/grandeur/design/pip-grandeur-design-3-point-0-exclusive-special-and-jbl-sound-package-front.jpg',
    sAlt: '차량이미지07 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/grandeur/design/pip-grandeur-design-3-point-0-exclusive-special-and-jbl-sound-package-back.jpg',
    bAlt: '차량이미지08',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/grandeur/design/pip-grandeur-design-3-point-0-exclusive-special-and-jbl-sound-package-back.jpg',
    sAlt: '차량이미지08 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/i30/highlights/pip-i30-highlights-n-line-full-option.jpg',
    bAlt: '차량이미지09',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/i30/highlights/pip-i30-highlights-n-line-full-option.jpg',
    sAlt: '차량이미지09 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/i30/highlights/pip-i30-highlights-1-4-tubo-premium-full-option-and-n-line-full-option.jpg',
    bAlt: '차량이미지10',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/i30/highlights/pip-i30-highlights-1-4-tubo-premium-full-option-and-n-line-full-option.jpg',
    sAlt: '차량이미지10 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/veloster/style/pip-veloster-style-led-headlamp.jpg',
    bAlt: '차량이미지11',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/veloster/style/pip-veloster-style-led-headlamp.jpg',
    sAlt: '차량이미지11 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/veloster/style/pip-veloster-style-led-rear-combi-lamp.jpg',
    bAlt: '차량이미지12',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/veloster/style/pip-veloster-style-led-rear-combi-lamp.jpg',
    sAlt: '차량이미지12 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/veloster/style/pip-veloster-style-head-up-display-combiner-type.jpg',
    bAlt: '차량이미지13',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/veloster/style/pip-veloster-style-head-up-display-combiner-type.jpg',
    sAlt: '차량이미지13 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/veloster/style/pip-veloster-style-digital-performance-gauge.jpg',
    bAlt: '차량이미지14',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/veloster/style/pip-veloster-style-digital-performance-gauge.jpg',
    sAlt: '차량이미지14 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/veloster/style/pip-veloster-style-bucket-seat.jpg',
    bAlt: '차량이미지15',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/veloster/style/pip-veloster-style-bucket-seat.jpg',
    sAlt: '차량이미지15 미니'
  },
  {
    options: '',
    bImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/veloster/style/pip-veloster-style-gasoline-1-point-4-turbo-modern-core-pool-option-black-or-machine-red-interior.jpg',
    bAlt: '차량이미지16',
    sImg: 'https://www.hyundai.com/content/dam/hyundai/kr/ko/images/vehicles/veloster/style/pip-veloster-style-gasoline-1-point-4-turbo-modern-core-pool-option-black-or-machine-red-interior.jpg',
    sAlt: '차량이미지16 미니'
  }
];

export const textDummy = `안녕하세요?

더미 테스트 글입니다.
더미 테스트 글입니다.
더미 테스트 글입니다.
이런 형태로 불러오면 됩니다.`;

// 낙찰 정보
export const auction_table_list = [
  {
    location: '분당',
    date: '2019.10',
    name: '그랜저(IG) IG220<br />디젤 프리미엄',
    year: 2018,
    fuel: '디젤',
    km: '53,485',
    color: 'NU(9)<br />그랑블루',
    exhaust: '2,199',
    purpose: '법인/법인<br />상품',
    carNumber: 'KMHF<br />141RBJA<br />160647',
    grade: 'A6',
    initialRegist: '2018.03.30',
    mission: 'A/T',
    options: 'ABS VDC 스마트키 내비(일반)',
    price: '2,240'
  },
  {
    location: '시화',
    date: '2019.11',
    name: '그랜저(IG) IG220<br />디젤 프리미엄',
    year: 2018,
    fuel: '디젤',
    km: '53,485',
    color: 'NU(9)<br />그랑블루',
    exhaust: '2,199',
    purpose: '법인/법인<br />상품',
    carNumber: 'KMHF<br />141RBJA<br />160647',
    grade: 'A6',
    initialRegist: '2018.03.30',
    mission: 'A/T',
    options: 'ABS VDC 스마트키 내비(일반)',
    price: '2,240'
  },
  {
    location: '분당',
    date: '2019.11',
    name: '그랜저(IG) IG220<br />디젤 프리미엄',
    year: 2018,
    fuel: '디젤',
    km: '53,485',
    color: 'NU(9)<br />그랑블루',
    exhaust: '2,199',
    purpose: '법인/법인<br />상품',
    carNumber: 'KMHF<br />141RBJA<br />160647',
    grade: 'A6',
    initialRegist: '2018.03.30',
    mission: 'A/T',
    options: 'ABS VDC 스마트키 내비(일반)',
    price: '2,240'
  },
  {
    location: '시화',
    date: '2019.11',
    name: '그랜저(IG) IG220<br />디젤 프리미엄',
    year: 2018,
    fuel: '디젤',
    km: '53,485',
    color: 'NU(9)<br />그랑블루',
    exhaust: '2,199',
    purpose: '법인/법인<br />상품',
    carNumber: 'KMHF<br />141RBJA<br />160647',
    grade: 'A6',
    initialRegist: '2018.03.30',
    mission: 'A/T',
    options: 'ABS VDC 스마트키 내비(일반)',
    price: '2,240'
  },
  {
    location: '분당',
    date: '2019.10',
    name: '그랜저(IG) IG220<br />디젤 프리미엄',
    year: 2018,
    fuel: '디젤',
    km: '53,485',
    color: 'NU(9)<br />그랑블루',
    exhaust: '2,199',
    purpose: '법인/법인<br />상품',
    carNumber: 'KMHF<br />141RBJA<br />160647',
    grade: 'A6',
    initialRegist: '2018.03.30',
    mission: 'A/T',
    options: 'ABS VDC 스마트키 내비(일반)',
    price: '2,240'
  },
  {
    location: '시화',
    date: '2019.11',
    name: '그랜저(IG) IG220<br />디젤 프리미엄',
    year: 2018,
    fuel: '디젤',
    km: '53,485',
    color: 'NU(9)<br />그랑블루',
    exhaust: '2,199',
    purpose: '법인/법인<br />상품',
    carNumber: 'KMHF<br />141RBJA<br />160647',
    grade: 'A6',
    initialRegist: '2018.03.30',
    mission: 'A/T',
    options: 'ABS VDC 스마트키 내비(일반)',
    price: '2,240'
  },
  {
    location: '분당',
    date: '2019.11',
    name: '그랜저(IG) IG220<br />디젤 프리미엄',
    year: 2018,
    fuel: '디젤',
    km: '53,485',
    color: 'NU(9)<br />그랑블루',
    exhaust: '2,199',
    purpose: '법인/법인<br />상품',
    carNumber: 'KMHF<br />141RBJA<br />160647',
    grade: 'A6',
    initialRegist: '2018.03.30',
    mission: 'A/T',
    options: 'ABS VDC 스마트키 내비(일반)',
    price: '2,240'
  },
  {
    location: '시화',
    date: '2019.11',
    name: '그랜저(IG) IG220<br />디젤 프리미엄',
    year: 2018,
    fuel: '디젤',
    km: '53,485',
    color: 'NU(9)<br />그랑블루',
    exhaust: '2,199',
    purpose: '법인/법인<br />상품',
    carNumber: 'KMHF<br />141RBJA<br />160647',
    grade: 'A6',
    initialRegist: '2018.03.30',
    mission: 'A/T',
    options: 'ABS VDC 스마트키 내비(일반)',
    price: '2,240'
  },
  {
    location: '분당',
    date: '2019.10',
    name: '그랜저(IG) IG220<br />디젤 프리미엄',
    year: 2018,
    fuel: '디젤',
    km: '53,485',
    color: 'NU(9)<br />그랑블루',
    exhaust: '2,199',
    purpose: '법인/법인<br />상품',
    carNumber: 'KMHF<br />141RBJA<br />160647',
    grade: 'A6',
    initialRegist: '2018.03.30',
    mission: 'A/T',
    options: 'ABS VDC 스마트키 내비(일반)',
    price: '2,240'
  },
  {
    location: '시화',
    date: '2019.11',
    name: '그랜저(IG) IG220<br />디젤 프리미엄',
    year: 2018,
    fuel: '디젤',
    km: '53,485',
    color: 'NU(9)<br />그랑블루',
    exhaust: '2,199',
    purpose: '법인/법인<br />상품',
    carNumber: 'KMHF<br />141RBJA<br />160647',
    grade: 'A6',
    initialRegist: '2018.03.30',
    mission: 'A/T',
    options: 'ABS VDC 스마트키 내비(일반)',
    price: '2,240'
  }
];

// 경매정보 상세
export const slide_car_detail = [
  {
    id: 1,
    image: '/images/dummy/key-point-img-01.png',
    alt: '차량 이미지1'
  },
  {
    id: 2,
    image: '/images/dummy/key-point-img-02.png',
    alt: '차량 이미지2'
  },
  {
    id: 3,
    image: '/images/dummy/key-point-img-03.png',
    alt: '차량 이미지3'
  },
  {
    id: 4,
    image: '/images/dummy/key-point-img-01.png',
    alt: '차량 이미지4'
  },
  {
    id: 5,
    image: '/images/dummy/key-point-img-02.png',
    alt: '차량 이미지5'
  },
  {
    id: 6,
    image: '/images/dummy/key-point-img-03.png',
    alt: '차량 이미지6'
  },
  {
    id: 7,
    image: '/images/dummy/key-point-img-01.png',
    alt: '차량 이미지7'
  },
  {
    id: 8,
    image: '/images/dummy/key-point-img-02.png',
    alt: '차량 이미지8'
  },
  {
    id: 9,
    image: '/images/dummy/key-point-img-03.png',
    alt: '차량 이미지9'
  }
];

export const event_banner_list = [
  {
    id: 'eb1',
    imgUrl: '/images/dummy/temp-event-banner.jpg',
    href: '/event/eventView',
    alt: '이벤트 배너 alt 값'
  },
  {
    id: 'eb2',
    imgUrl: '/images/dummy/temp-event-banner.jpg',
    href: '/event/eventView',
    alt: '이벤트배너2'
  },
  {
    id: 'eb3',
    imgUrl: '/images/dummy/temp-event-banner.jpg',
    href: '/event/eventView',
    alt: '이벤트배너3'
  }
];

export const event_banner_list_m = [
  {
    id: 'eb1',
    imgUrl: '/images/mobile/dummy/temp-event-banner.jpg',
    href: '/event/eventView',
    alt: '이벤트 배너 alt 값'
  },
  {
    id: 'eb2',
    imgUrl: '/images/mobile/dummy/temp-event-banner.jpg',
    href: '/event/eventView',
    alt: '이벤트배너2'
  },
  {
    id: 'eb3',
    imgUrl: '/images/mobile/dummy/temp-event-banner.jpg',
    href: '/event/eventView',
    alt: '이벤트배너3'
  }
];

export const monthList = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' }
];
export const distanceList = [
  { value: '10000', label: '10000' },
  { value: '20000', label: '20000' },
  { value: '30000', label: '30000' },
  { value: '40000', label: '40000' }
];

export const homeMarkup1 = {
  isMarkup: true,
  isNumber: 1
};
export const homeMarkup2 = {
  isMarkup: true,
  isNumber: 2
};
export const homeMarkup3 = {
  isMarkup: true,
  isNumber: 3
};

export const event_list = [
  {
    id: 'eventList1',
    ingEvent: true,
    imgUrl: '/images/dummy/img-event-01.jpg',
    href: '/event/eventView',
    alt: '이벤트 배너 alt 값',
    startDate: '2019.08.01',
    endDate: '2019.10.30',
    title: '중고차 처리도 스마트하고 안전하게! 포인트 적립까지 든든하게!'
  },
  {
    id: 'eventList2',
    ingEvent: false,
    imgUrl: '/images/dummy/img-event-02.jpg',
    href: '/event/eventView',
    alt: '이벤트 배너 alt 값',
    startDate: '2019.08.01',
    endDate: '2019.10.30',
    title: '중고차 처리도 스마트하고 안전하게!'
  },
  {
    id: 'eventList3',
    ingEvent: true,
    imgUrl: '/images/dummy/img-event-03.jpg',
    href: '/event/eventView',
    alt: '이벤트 배너 alt 값',
    startDate: '2019.08.01',
    endDate: '2019.10.30',
    title: '중고차 처리도 스마트하고 안전하게! 포인트 적립까지 든든하게!'
  },
  {
    id: 'eventList4',
    ingEvent: false,
    imgUrl: '/images/dummy/img-event-04.jpg',
    href: '/event/eventView',
    alt: '이벤트 배너 alt 값',
    startDate: '2019.08.01',
    endDate: '2019.10.30',
    title: '중고차 처리도 스마트하고 안전하게! 포인트 적립까지 든든하게!중고차 처리도 스마트하고 안전하게! 포인트 적립까지 든든하게!'
  },
  {
    id: 'eventList5',
    ingEvent: true,
    imgUrl: '/images/dummy/img-event-05.jpg',
    href: '/event/eventView',
    alt: '이벤트 배너 alt 값',
    startDate: '2019.08.01',
    endDate: '2019.10.30',
    title: '중고차 처리도 스마트하고 안전하게!'
  },
  {
    id: 'eventList6',
    ingEvent: false,
    imgUrl: '/images/dummy/img-event-06.jpg',
    href: '/event/eventView',
    alt: '이벤트 배너 alt 값',
    startDate: '2019.08.01',
    endDate: '2019.10.30',
    title: '중고차 처리도 스마트하고 안전하게! 포인트 적립까지 든든하게!'
  }
];

export const event_detail = {
  id: 'eventList1',
  ingEvent: false,
  imgUrl: '/images/dummy/img-event-01-detail.jpg',
  alt: '이벤트 배너 alt 값',
  startDate: '2019.08.01',
  endDate: '2019.10.30',
  title: '중고차 처리도 스마트하고 안전하게! 포인트 적립까지 든든하게!',
  detailCopy:
    '안녕하십니까? 항상 저희 경매장을 애용해 주신 고객 여러분께 진심으로 감사드립니다.\n 저희 경매장은 경매장을 이용하시는 고객분들의 소중한 재산이자 자산인 자동차에 대해 객관적이고 정확한 성능점검을 실시하기 위해 끊임 없는 연구와 노력을 경주하고 있습니다.\n 이러한 노력의 결과로 성능점검 기준에 대한 개선작업을 일부 변경하오니 첨부된 파일을 참조하여 주시기 바랍니다.\n 감사합니다.'
};

export const yearList = [
  { value: '2010', label: '2010' },
  { value: '2011', label: '2011' },
  { value: '2012', label: '2012' }
];

// export const screenInfo = [
//   {
//     img: '/images/dummy/step-mobile-img-01.png',
//     alt: '이용 화면 01'
//   },
//   {
//     img: '/images/dummy/product-img-01.png',
//     alt: '이용 화면 02'
//   },
//   {
//     img: '/images/dummy/product-img-02.png',
//     alt: '이용 화면 03'
//   },
//   {
//     img: '/images/dummy/product-img-03.png',
//     alt: '이용 화면 04'
//   },
//   {
//     img: '/images/dummy/product-img-04.png',
//     alt: '이용 화면 05'
//   }
// ];

export const wishCarList = [
  {
    id: 1,
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    info1: ['00가0000', '09/12식(10년형)'],
    info2: ['84,761km', '오토', '디젤'],
    price: 7760,
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    location: '서울/강서구'
  },
  {
    id: 2,
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    info1: ['00가0000', '09/12식(10년형)'],
    info2: ['84,761km', '오토', '디젤'],
    price: 7760,
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    location: '서울/강서구'
  },
  {
    id: 3,
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    info1: ['00가0000', '09/12식(10년형)'],
    info2: ['84,761km', '오토', '디젤'],
    price: 7760,
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    location: '서울/강서구'
  },
  {
    id: 4,
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    info1: ['00가0000', '09/12식(10년형)'],
    info2: ['84,761km', '오토', '디젤'],
    price: 7760,
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    location: '서울/강서구'
  },
  {
    id: 5,
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    info1: ['00가0000', '09/12식(10년형)'],
    info2: ['84,761km', '오토', '디젤'],
    price: 7760,
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    location: '서울/강서구'
  }
];

export const MsgInquiryList = [
  {
    id: 1,
    date: '2019-09-19',
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    inquiryContent: '가격할인이 되나요?',
    replyState: '답변완료'
  },
  {
    id: 2,
    date: '2019-09-19',
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    inquiryContent: '가격할인이 되나요?',
    replyState: '답변완료'
  },
  {
    id: 3,
    date: '2019-09-19',
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    inquiryContent: '가격할인이 되나요?',
    replyState: '답변완료'
  },
  {
    id: 4,
    date: '2019-09-19',
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    inquiryContent: '가격할인이 되나요?',
    replyState: '답변완료'
  },
  {
    id: 5,
    date: '2019-09-19',
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    inquiryContent: '가격할인이 되나요?',
    replyState: '답변완료'
  }
];

export const serviceCarList = [
  {
    id: 1,
    date: '2019-09-19',
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    info1: ['00가0000', '09/12식(10년형)'],
    info2: ['84,761km', '오토', '디젤'],
    price: 7760,
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    status: '결제완료'
  },
  {
    id: 2,
    date: '2019-09-19',
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    info1: ['00가0000', '09/12식(10년형)'],
    info2: ['84,761km', '오토', '디젤'],
    price: 7760,
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    status: '결제완료'
  },
  {
    id: 3,
    date: '2019-09-19',
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    info1: ['00가0000', '09/12식(10년형)'],
    info2: ['84,761km', '오토', '디젤'],
    price: 7760,
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    status: '결제완료'
  },
  {
    id: 4,
    date: '2019-09-19',
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    info1: ['00가0000', '09/12식(10년형)'],
    info2: ['84,761km', '오토', '디젤'],
    price: 7760,
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    status: '결제완료'
  },
  {
    id: 5,
    date: '2019-09-19',
    imgSrc: '/images/dummy/product-img-06.png',
    imgAlt: '차량 이미지',
    subject: '현대 투싼 ix 디젤 2WD LX20 럭셔리',
    info1: ['00가0000', '09/12식(10년형)'],
    info2: ['84,761km', '오토', '디젤'],
    price: 7760,
    sellerName: '박현대',
    sellerMobile: '010-3333-7777',
    status: '결제완료'
  }
];

export const foreignBrandList = [
  {
    id: 1,
    name: '벤츠',
    image: '/images/dummy/product-img-01.png',
    alt: '벤츠 차량 이미지',
    link: '/buy/brandList'
  },
  {
    id: 2,
    name: 'BMW',
    image: '/images/dummy/product-img-02.png',
    alt: 'BMW 차량 이미지',
    link: '/buy/brandList'
  },
  {
    id: 3,
    name: '아우디',
    image: '/images/dummy/product-img-03.png',
    alt: '아우디 차량 이미지',
    link: '/buy/brandList'
  },
  {
    id: 4,
    name: '폭스바겐',
    image: '/images/dummy/product-img-04.png',
    alt: '폭스바겐 차량 이미지',
    link: '/buy/brandList'
  }
];

export const domesticBrandList = [
  {
    id: 1,
    name: '현대',
    image: '/images/dummy/product-img-01.png',
    alt: '현대 차량 이미지',
    link: '/buy/brandList'
  },
  {
    id: 2,
    name: '제네시스',
    image: '/images/dummy/product-img-02.png',
    alt: '제네시스 차량 이미지',
    link: '/buy/brandList'
  },
  {
    id: 3,
    name: '기아',
    image: '/images/dummy/product-img-03.png',
    alt: '기아 차량 이미지',
    link: '/buy/brandList'
  },
  {
    id: 4,
    name: '르노삼성',
    image: '/images/dummy/product-img-04.png',
    alt: '르노삼성 차량 이미지',
    link: '/buy/brandList'
  }
];

export const franchiseBrandList = [
  {
    id: 1,
    name: '렉서스',
    image: '/images/dummy/product-img-01.png',
    alt: '현대 차량 이미지',
    link: '/buy/brandList'
  },
  {
    id: 2,
    name: '닛산',
    image: '/images/dummy/product-img-02.png',
    alt: '제네시스 차량 이미지',
    link: '/buy/brandList'
  },
  {
    id: 3,
    name: '다이하쓰',
    image: '/images/dummy/product-img-03.png',
    alt: '기아 차량 이미지',
    link: '/buy/brandList'
  },
  {
    id: 4,
    name: '닷지',
    image: '/images/dummy/product-img-04.png',
    alt: '르노삼성 차량 이미지',
    link: '/buy/brandList'
  }
];

export const dummyNumber = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' }
];

export const carManageFilter = [
  { value: '1', label: '정상판매중' },
  { value: '2', label: '관리필요' },
  { value: '3', label: '판단보류' },
  { value: '4', label: '대기차량' },
  { value: '5', label: '판매완료' },
  { value: '6', label: '삭제차량' },
  { value: '7', label: '보류차량' }
];

export const compareList = [
  {
    id: 1,
    img: '/images/dummy/list-auction-img-1.png',
    alt: '차량 이미지',
    name: '현대 투싼ix 디젤 2WDLX20 럭셔리1',
    number: '01루6534',
    date: '2019.07.25',
    totalPrice: '878만원',
    price1: '800만원',
    price2: '78만원',
    price3: '73만 1천원',
    kind: 'SUV',
    model: '13/08식',
    km: '110,939 km',
    gear: '오토',
    color: '블랙',
    fuel: '가솔린/2,495 cc',
    seater: '7인승/4도어',
    optionsNum: 16,
    majorOptions: [
      { isClass: 'on', part: '헤드램프(HID)' },
      { isClass: null, part: '헤드램프(LED)' },
      { isClass: null, part: '파워 전동 트렁크' },
      { isClass: null, part: '열선 스티어링 휠' },
      { isClass: null, part: '전동 조절 스티어링 휠' },
      { isClass: null, part: '패들 시프트' },
      { isClass: 'on', part: '하이패스' }
    ],
    insurance: false,
    performance: false,
    certification: '인증',
    service: '홈서비스',
    seller: ['박현대', '010-5452-7455', '경기 김포시 아라육로']
  },
  {
    id: 2,
    img: '/images/dummy/list-auction-img-1.png',
    alt: '차량 이미지',
    name: '현대 투싼ix 디젤 2WDLX20 럭셔리 현대 투싼ix 디젤 2WDLX20 럭셔리 현대 투싼ix 디젤 2WDLX20 럭셔리 현대 투싼ix 디젤 2WDLX20 럭셔리2',
    number: '01루6534',
    date: '2019.07.25',
    totalPrice: '878만원',
    price1: '800만원',
    price2: '78만원',
    price3: '73만 1천원',
    kind: 'SUV',
    model: '13/08식',
    km: '110,939 km',
    gear: '오토',
    color: '블랙',
    fuel: '가솔린/2,495 cc',
    seater: '7인승/4도어',
    optionsNum: 16,
    majorOptions: [
      { isClass: 'on', part: '헤드램프(HID)' },
      { isClass: null, part: '헤드램프(LED)' },
      { isClass: null, part: '파워 전동 트렁크' },
      { isClass: null, part: '열선 스티어링 휠' },
      { isClass: null, part: '전동 조절 스티어링 휠' },
      { isClass: null, part: '패들 시프트' },
      { isClass: 'on', part: '하이패스' }
    ],
    insurance: false,
    performance: false,
    certification: '인증',
    service: '홈서비스',
    seller: ['박현대', '010-5452-7455', '경기 김포시 아라육로']
  },
  {
    id: 3,
    img: '/images/dummy/list-auction-img-1.png',
    alt: '차량 이미지',
    name: '현대 투싼ix 디젤 2WDLX20 럭셔리3',
    number: '01루6534',
    date: '2019.07.25',
    totalPrice: '878만원',
    price1: '800만원',
    price2: '78만원',
    price3: '73만 1천원',
    kind: 'SUV',
    model: '13/08식',
    km: '110,939 km',
    gear: '오토',
    color: '블랙',
    fuel: '가솔린/2,495 cc',
    seater: '7인승/4도어',
    optionsNum: 16,
    majorOptions: [
      { isClass: 'on', part: '헤드램프(HID)' },
      { isClass: null, part: '헤드램프(LED)' },
      { isClass: null, part: '파워 전동 트렁크' },
      { isClass: null, part: '열선 스티어링 휠' },
      { isClass: null, part: '전동 조절 스티어링 휠' },
      { isClass: null, part: '패들 시프트' },
      { isClass: 'on', part: '하이패스' }
    ],
    insurance: false,
    performance: false,
    certification: '인증',
    service: '홈서비스',
    seller: ['박현대', '010-5452-7455', '경기 김포시 아라육로']
  },
  {
    id: 4,
    img: '/images/dummy/list-auction-img-1.png',
    alt: '차량 이미지',
    name: '현대 투싼ix 디젤 2WDLX20 럭셔리4',
    number: '01루6534',
    date: '2019.07.25',
    totalPrice: '878만원',
    price1: '800만원',
    price2: '78만원',
    price3: '73만 1천원',
    kind: 'SUV',
    model: '13/08식',
    km: '110,939 km',
    gear: '오토',
    color: '블랙',
    fuel: '가솔린/2,495 cc',
    seater: '7인승/4도어',
    optionsNum: 16,
    majorOptions: [
      { isClass: 'on', part: '헤드램프(HID)' },
      { isClass: null, part: '헤드램프(LED)' },
      { isClass: null, part: '파워 전동 트렁크' },
      { isClass: null, part: '열선 스티어링 휠' },
      { isClass: null, part: '전동 조절 스티어링 휠' },
      { isClass: null, part: '패들 시프트' },
      { isClass: 'on', part: '하이패스' }
    ],
    insurance: false,
    performance: false,
    certification: '인증',
    service: '홈서비스',
    seller: ['박현대', '010-5452-7455', '경기 김포시 아라육로']
  }
];

export const excelData = [
  {
    no: 1,
    date: null,
    carNumber: null,
    carName: null,
    isSale: null,
    purchasePrice: null,
    sellingPrice: null,
    sellingDate: null
  },
  {
    no: 2,
    date: null,
    carNumber: null,
    carName: null,
    isSale: null,
    purchasePrice: null,
    sellingPrice: null,
    sellingDate: null
  },
  {
    no: 3,
    date: null,
    carNumber: null,
    carName: null,
    isSale: null,
    purchasePrice: null,
    sellingPrice: null,
    sellingDate: null
  },
  {
    no: 4,
    date: null,
    carNumber: null,
    carName: null,
    isSale: null,
    purchasePrice: null,
    sellingPrice: null,
    sellingDate: null
  },
  {
    no: 5,
    date: null,
    carNumber: null,
    carName: null,
    isSale: null,
    purchasePrice: null,
    sellingPrice: null,
    sellingDate: null
  },
  {
    no: 6,
    date: null,
    carNumber: null,
    carName: null,
    isSale: null,
    purchasePrice: null,
    sellingPrice: null,
    sellingDate: null
  },
  {
    no: 7,
    date: null,
    carNumber: null,
    carName: null,
    isSale: null,
    purchasePrice: null,
    sellingPrice: null,
    sellingDate: null
  }
];

export const mCarList = [
  {
    id: 1,
    name: '소나타소나타소나타소나타소나타소나타소나타',
    price: '20,909',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 20,
    tags: [{ color: 'blue60', value: 'EW' }],
    infos: ['17년식', '26,530km', '가솔린', '대구'],
    options: [{ color: 'red', value: '라이브' }],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 48
  },
  {
    id: 2,
    name: '소나타소나타소나타소나타소나타소나타소나타',
    price: '20,909',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 20,
    tags: [{ color: 'blue60', value: 'EW' }],
    infos: ['17년식', '26,530km', '가솔린', '대구'],
    options: [{ color: 'red', value: '라이브' }],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 48
  },
  {
    id: 3,
    name: '소나타소나타소나타소나타소나타소나타소나타',
    price: '20,909',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 20,
    tags: [{ color: 'blue60', value: 'EW' }],
    infos: ['17년식', '26,530km', '가솔린', '대구'],
    options: [{ color: 'red', value: '라이브' }],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 48
  },
  {
    id: 4,
    name: '소나타소나타소나타소나타소나타소나타소나타',
    price: '20,909',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 20,
    tags: [{ color: 'blue60', value: 'EW' }],
    infos: ['17년식', '26,530km', '가솔린', '대구'],
    options: [{ color: 'red', value: '라이브' }],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 48
  },
  {
    id: 5,
    name: '소나타소나타소나타소나타소나타소나타소나타',
    price: '20,909',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 20,
    tags: [{ color: 'blue60', value: 'EW' }],
    infos: ['17년식', '26,530km', '가솔린', '대구'],
    options: [{ color: 'red', value: '라이브' }],
    problems: ['사고이력:없음', '단순수리:없음', '압류/저당:0/0'],
    likes: 48
  }
];

export const mCarList2 = [
  {
    id: 1,
    name: '현대 코나 1.6 4WD',
    price: '20,909',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 20,
    buttonName: '온라인구매',
    tags: [{ color: 'blue60', value: 'EW' }],
    infos: ['17년식', '26,530km', '가솔린', '대구'],
    options: [{ color: 'red', value: '라이브' }]
  },
  {
    isMarkup: true,
    isNumber: 1
  },
  {
    isMarkup: true,
    isNumber: 3
  },
  {
    id: 2,
    name: '현대 코나 1.6 4WD',
    price: '20,909',
    image: '/images/dummy/product-img-01.png',
    alt: '차량 이미지',
    discount: 20,
    buttonName: '온라인구매',
    tags: [{ color: 'blue60', value: 'EW' }],
    infos: ['17년식', '26,530km', '가솔린', '대구'],
    options: [{ color: 'red', value: '라이브' }]
  },
  {
    id: 3,
    name: '투싼 Modern',
    price: '20,909',
    image: '/images/dummy/product-img-02.png',
    alt: '차량 이미지',
    discount: 20,
    tags: [
      { color: 'blue60', value: 'EW' },
      { color: 'purple', value: '홈서비스' },
      { color: 'sky', value: '수입인증' }
    ],
    infos: ['17년식', '7,989km', '디젤', '서울'],
    options: [
      { color: 'red', value: '라이브' },
      { color: 'blue60', value: '경매' }
    ]
  },
  {
    isMarkup: true,
    isNumber: 2
  }
];
export const dummyTime = [
  {
    id: '0',
    name: '소나타1 업데이트',
    time: [
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
      '24:00'
    ]
  },
  {
    id: '1',
    name: '소나타2 업데이트',
    time: [
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
      '24:00'
    ]
  },
  {
    id: '2',
    name: '소나타3 업데이트',
    time: [
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
      '24:00'
    ]
  },
  { id: '3', name: '소나타4 업데이트', time: ['08:00', '12:00', '16:00', '20:00'] },
  { id: '4', name: '소나타5 업데이트', time: ['08:00', '12:00', '16:00', '20:00'] },
  {
    id: '5',
    name: '소나타6 업데이트',
    time: [
      '01:30',
      '02:30',
      '03:30',
      '04:30',
      '05:30',
      '06:30',
      '07:30',
      '08:30',
      '09:30',
      '10:30',
      '11:30',
      '12:30',
      '13:30',
      '14:30',
      '15:30',
      '16:30',
      '17:30',
      '18:30',
      '19:30',
      '20:30',
      '21:30',
      '22:30',
      '23:30',
      '24:30'
    ]
  }
];

export const mScreenInfo = [
  {
    img: '/images/mobile/dummy/sell-step-img-01.png',
    alt: '모바일 이용 화면 01'
  },
  {
    img: '/images/mobile/dummy/sell-step-img-01.png',
    alt: '모바일 이용 화면 02'
  },
  {
    img: '/images/mobile/dummy/sell-step-img-01.png',
    alt: '모바일 이용 화면 03'
  },
  {
    img: '/images/mobile/dummy/sell-step-img-01.png',
    alt: '모바일 이용 화면 04'
  },
  {
    img: '/images/mobile/dummy/sell-step-img-01.png',
    alt: '모바일 이용 화면 05'
  },
  {
    img: '/images/mobile/dummy/sell-step-img-01.png',
    alt: '모바일 이용 화면 06'
  }
];

export const mScreenReview = [
  {
    img: '/images/mobile/dummy/mypage-review-img-01.jpg',
    alt: '모바일 이용 화면 01'
  },
  {
    img: '/images/mobile/dummy/mypage-review-img-01.jpg',
    alt: '모바일 이용 화면 02'
  },
  {
    img: '/images/mobile/dummy/mypage-review-img-01.jpg',
    alt: '모바일 이용 화면 03'
  },
  {
    img: '/images/mobile/dummy/mypage-review-img-01.jpg',
    alt: '모바일 이용 화면 04'
  }
];

export const mAuctionInfo = [
  {
    img: '/images/dummy/auction-info-img-01.jpg',
    alt: '모바일 오토벨 스마트옥션 앱 다운로드 01'
  },
  {
    img: '/images/dummy/auction-info-img-02.jpg',
    alt: '모바일 오토벨 스마트옥션 앱 다운로드 02'
  }
];

export const mobDataProvider = [
  {
    value: '더 뉴 그랜저IG',
    label: '더 뉴 그랜저IG',
    count: 12345,
    level: 0,
    description: '',
    children: [
      {
        value: 'LPG3000cc',
        label: 'LPG3000cc',
        count: 1505,
        level: 1,
        children: [
          {
            value: '그랜저 IG',
            label: '그랜저 IG',
            count: 356,
            level: 2,
            description: '',
            children: [
              {
                value: 'LPG 3000cc',
                label: 'LPG 3000cc',
                count: 646,
                level: 3,
                description: '',
                children: [
                  {
                    value: '가솔린 2400cc',
                    label: '가솔린 2400cc',
                    count: 98,
                    level: 4,
                    description: ''
                  },
                  {
                    value: '3.0 LPI 익스클루시브',
                    label: '3.0 LPI 익스클루시브',
                    count: 241,
                    level: 4,
                    description: ''
                  },
                  {
                    value: '3.0 LPI 모던 베이직',
                    label: '3.0 LPI 모던 베이직',
                    count: 328,
                    level: 4,
                    description: ''
                  },
                  {
                    value: '3.0 LPI 익스클루시브',
                    label: '3.0 LPI 익스클루시브',
                    count: 120,
                    level: 4,
                    description: ''
                  }
                ]
              },
              {
                value: '가솔린 2400cc',
                label: '가솔린 2400cc',
                count: 0,
                level: 3,
                description: ''
              },
              {
                value: '가솔린 3000cc',
                label: '가솔린 3000cc',
                count: 0,
                level: 3,
                description: ''
              },
              {
                value: '가솔린 3300cc',
                label: '가솔린 3300cc',
                count: 0,
                level: 3,
                description: ''
              },
              {
                value: '디젤 2400cc',
                label: '디젤 2400cc',
                count: 0,
                level: 3,
                description: ''
              }
            ]
          },
          {
            value: 'deimos',
            label: '그랜저 IG 하이브리드',
            count: 11,
            level: 2,
            description: ''
          }
        ]
      },
      {
        value: 'i30',
        label: 'i30',
        count: 45,
        level: 1
      },
      {
        value: 'i40',
        label: 'i40',
        count: 72,
        level: 1
      }
    ]
  },
  {
    value: '그랜저 IG',
    label: '그랜저 IG',
    count: 19203,
    level: 0,
    description: '',
    children: [
      {
        value: 'LPG3000cc',
        label: 'LPG3000cc',
        count: 11,
        level: 1,
        description: '',
        children: []
      },
      {
        value: '2.4 모던',
        label: '2.4 모던',
        count: 11,
        level: 1,
        description: '',
        children: []
      },
      {
        value: 'K5',
        label: 'K5',
        count: 11,
        level: 1,
        description: '',
        children: []
      },
      {
        value: 'K7',
        label: 'K7',
        count: 11,
        level: 1,
        description: '',
        children: []
      },
      {
        value: 'K9',
        label: 'K9',
        count: 11,
        level: 1,
        description: '',
        children: []
      },
      {
        value: '니로',
        label: '니로',
        count: 11,
        level: 1,
        description: '',
        children: []
      },
      {
        value: '레이',
        label: '레이',
        count: 11,
        level: 1,
        description: '',
        children: []
      }
    ]
  },
  {
    value: '그랜저 IG 하이브리드',
    label: '그랜저 IG 하이브리드',
    count: 1203,
    level: 0,
    description: '',
    children: [
      {
        value: 'G70',
        label: 'G70',
        count: 778,
        level: 1,
        description: '',
        children: []
      },
      {
        value: 'G80',
        label: 'G80',
        count: 150,
        level: 1,
        description: '',
        children: []
      },
      {
        value: 'G90',
        label: 'G90',
        count: 23,
        level: 1,
        description: '',
        children: []
      },
      {
        value: 'EQ900',
        label: 'EQ900',
        count: 12,
        level: 1,
        description: '',
        children: []
      }
    ]
  },
  {
    value: '더 럭셔리 그랜저',
    label: '더 럭셔리 그랜저',
    count: 6016,
    level: 0,
    description: '',
    children: []
  },
  {
    value: '그랜저 뉴 럭셔리',
    label: '그랜저 뉴 럭셔리',
    count: 5423,
    level: 0,
    description: '',
    children: []
  },
  {
    value: '그랜저 TG',
    label: '그랜저 TG',
    count: 5322,
    level: 0,
    description: '',
    children: []
  }
];

export const selectArea = [
  {
    value: '11',
    label: '서울'
  },
  {
    value: '21',
    label: '부산'
  },
  {
    value: '22',
    label: '대구'
  },
  {
    value: '23',
    label: '인천'
  },
  {
    value: '24',
    label: '광주'
  },
  {
    value: '25',
    label: '대전'
  },
  {
    value: '26',
    label: '울산'
  },
  {
    value: '29',
    label: '세종'
  },
  {
    value: '31',
    label: '경기'
  },
  {
    value: '32',
    label: '강원'
  },
  {
    value: '33',
    label: '충북'
  },
  {
    value: '34',
    label: '충남'
  },
  {
    value: '35',
    label: '전북'
  },
  {
    value: '36',
    label: '전남'
  },
  {
    value: '37',
    label: '경북'
  },
  {
    value: '38',
    label: '경남'
  },
  {
    value: '39',
    label: '제주'
  }
];

//GNB 메뉴
export const gnbMenu = [
  //{title: '내차시세', sub: []}
  {
    title: '내차사기',
    link: '',
    sub: [
      { title: '전체차량', link: '/buycar/buyCarList' },
      { title: '오토벨라이브', link: '/buycar/livestudio/buyCarList' },
      { title: '경매낙찰차량', link: '/buycar/auction/buyCarList' },
      { title: '인증몰', link: '/buycar/certificationmall/buyCarCertiMall' }
    ]
  },
  {
    title: '내차팔기',
    link: '',
    sub: [
      { title: '방문평가 판매', link: '/sellcar/visit/visitValuationRequest' },
      { title: '셀프등록 판매', link: '/sellcar/self/selfSellCuide' },
      { title: '무평가 판매', link: '/sellcar/nonValue/noneValuationGuide' }
    ]
  },
  {
    title: '제휴서비스',
    link: '',
    sub: [
      { title: '홈서비스', link: '/homeservice/homeService' },
      { title: '금융서비스', link: '' }
    ]
  },
  {
    title: '이용가이드',
    link: '',
    sub: [
      { title: 'EW상품', link: '/dealingguide/ewGoos' },
      { title: '서비스가이드', link: '/dealingguide/buyGuide' },
      { title: '매매가이드', link: '/dealingguide/salesGuide' },
      { title: '이용권안내', link: '/dealingguide/voucherGuide' }
    ]
  }
  /* {
    title: '이벤트',
    sub: [
      { title: '진행중 이벤트', link: '/event/eventView' },
      { title: '포인트제휴몰', link: '/event/pointmall' }
    ]
  },
  {
    title: '고객센터',
    sub: [
      { title: '공지사항', link: '/cscenter/noticeList' },
      { title: '1:1상담', link: '/cscenter/directConsultGuide' },
      { title: 'FAQ', link: '/cscenter/noticeList' }
    ]
  }*/
];

export const mSelectBid = [
  { id: 'm_radio_bid_1', value: 1, label: '전체', checked: true },
  { id: 'm_radio_bid_2', value: 2, label: '경매', checked: false },
  { id: 'm_radio_bid_3', value: 3, label: '부재자', checked: false },
  { id: 'm_radio_bid_4', value: 4, label: '후상담', checked: false },
  { id: 'm_radio_bid_5', value: 5, label: '지정시간', checked: false }
]

export const mSelectBidding = [
  { id: 'm_radio_bidding_1', value: 1, label: '전체', checked: true },
  { id: 'm_radio_bidding_2', value: 2, label: '부재자', checked: false },
  { id: 'm_radio_bidding_3', value: 3, label: '후상담', checked: false },
  { id: 'm_radio_bidding_4', value: 4, label: '지정시간', checked: false }
]

export const mSelectBidSellCar = [
  { id: 'm_radio_bid_sellcar_1', value: 1, label: '전체', checked: true },
  { id: 'm_radio_bid_sellcar_2', value: 2, label: '경매대기', checked: false },
  { id: 'm_radio_bid_sellcar_3', value: 3, label: '경매진행', checked: false },
  { id: 'm_radio_bid_sellcar_4', value: 4, label: '낙찰', checked: false },
  { id: 'm_radio_bid_sellcar_5', value: 5, label: '유찰', checked: false },
  { id: 'm_radio_bid_sellcar_6', value: 6, label: '출품취소', checked: false },
]


export const dealerBuyCarList = [
  {
    bImg: '/images/dummy/product-img-01.png',
    bAlt: '차량이미지01',
    sImg: '/images/dummy/product-img-01.png',
    sAlt: '차량이미지01 미니'
  },
  {
    bImg: '/images/dummy/product-img-02.png',
    bAlt: '차량이미지02',
    sImg: '/images/dummy/product-img-02.png',
    sAlt: '차량이미지02 미니'
  },
  {
    bImg: '/images/dummy/product-img-03.png',
    bAlt: '차량이미지03',
    sImg: '/images/dummy/product-img-03.png',
    sAlt: '차량이미지03 미니'
  },
  {
    bImg: '/images/dummy/product-img-04.png',
    bAlt: '차량이미지04',
    sImg: '/images/dummy/product-img-04.png',
    sAlt: '차량이미지04 미니'
  },
  {
    bImg: '/images/dummy/product-img-05.png',
    bAlt: '차량이미지05',
    sImg: '/images/dummy/product-img-05.png',
    sAlt: '차량이미지05 미니'
  }
]