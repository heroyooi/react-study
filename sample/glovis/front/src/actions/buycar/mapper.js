import { setComma } from '@src/utils/StringUtil';
/** <BannerItem> 에 맞게 데이터 매핑
 * 서버에서 전송 받은 정보를 화면에 맞는 정보로 매핑함
 * @param {Object} p 상품정보
 * @returns {object[]} 변환된 상품 정보
 */
//TODO: 연식 표현 어떻게 할 건지 정의 필요함
const mapper = (p) => {
  const data = { ...p };
  // data.id = p.dlrPrdId;
  data.name = p.mnfcNm + ' ' + p.mdlNm + ' ' + p.clsNm;
  // data.price = p.slAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  data.price = setComma(p.slAmt);
  data.image = p.delePhtUrl;
  data.alt = data.name;
  data.itrtProdYn = p.itrtProdYn;
  data.isButton = p.hsvcYn === 'Y' ? true : false;
  if (data.isButton) data.buttonName = '온라인구매';
  data.infos = [p.frstRegDt, setComma(p.drvDist) + 'km', p.fuelNm, p.locNm];
  data.tags = [];
  if (p.ewYn === 'Y') data.tags.push({ color: 'blue60', value: 'EW' });
  if (p.hsvcYn === 'Y') data.tags.push({ color: 'purple', value: '홈서비스' });
  if (p.impMallYn === 'Y') data.tags.push({ color: 'sky', value: '수입인증' });
  if (p.frnchsYn === 'Y') data.tags.push({ color: 'gold', value: '프랜차이즈' });
  if (p.capMallYn === 'Y') data.tags.push({ color: 'green', value: '금융인증' });
  data.options = [];
  if (p.lvstdYn === 'Y') data.options.push({ color: 'red', value: '라이브' });
  if (p.auctSbidYn === 'Y') data.options.push({ color: 'blue60', value: '경매' });
  return data;
};

export default mapper;
