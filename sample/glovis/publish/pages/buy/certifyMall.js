import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import Link from 'next/link';
import AppLayout from '@src/components/layouts/AppLayout';
import SlideBanner from '@src/components/common/banner/SlideBanner';
import BannerItem from '@src/components/common/banner/BannerItem';
import MobFullpagePopup from '@src/components/common/MobFullpagePopup';
import Button from '@lib/share/items/Button';
import Buttons from '@lib/share/items/Buttons';
import SelectBox from '@lib/share/items/SelectBox';
import Input from '@lib/share/items/Input';
import Textarea from '@lib/share/items/Textarea';
import RodalPopup from '@lib/share/popup/RodalPopup';
import useRodal from '@lib/share/custom/useRodal';
import Radio from '@lib/share/items/Radio';

import { SECTION_BUY, MOBILE_HEADER_TYPE_SUB, MOBILE_CONTENT_STYLE, MOBILE_FULLPAGE_POPUP, MOBILE_FULLPAGE_POPUP_CLOSE } from '@src/actions/types';
import { select1_list, foreignBrandList, domesticBrandList, franchiseBrandList, mobile_number_list } from '@src/dummy';

const CertifyMall = () => {
  const dispatch = useDispatch();
  dispatch({ type: SECTION_BUY });
  const hasMobile = useSelector((state) => state.common.hasMobile);

  const [isCertify, setIsCertify] = useState(false);
  const handleCertify = useCallback((e) => {
    e.preventDefault();
    setIsCertify(true);
  }, []);

  const handleBtnClick = useCallback((e, id) => {
    alert(`이 상품의 차량 아이디 값은 ${id}입니다.`);
  }, []);

  const [storePopupShow, setStorePopupShow, openStorePopup, closeStorePopup] = useRodal(false, true);

  if (hasMobile) {
    dispatch({
      type: MOBILE_HEADER_TYPE_SUB,
      data: {
        title: '인증몰',
        options: ['back', 'gnb']
      }
    });
    dispatch({
      type: MOBILE_CONTENT_STYLE,
      data: {
        bottom: 0,
        color: '#fff'
      }
    });

    const mFullpagePopup = useSelector((state) => state.common.mFullpagePopup);   
    const [layer, setLayer] = useState(false); // 입점문의 팝업
    
    const handleFullpagePopup = useCallback((e) => {
      e.preventDefault();
      dispatch({
        type: MOBILE_FULLPAGE_POPUP,
        data: {
          isPopup: true,
          title: '인증몰 입점문의',
          options: ['close']
        }
      });
      setLayer(true);
      setTimeout(() => {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      }, 100);
    }, [layer]);

    const closeFullpagePopup = useCallback(
      (e) => {
        e.preventDefault();
        setLayer(false)
        dispatch({
          type: MOBILE_FULLPAGE_POPUP_CLOSE
        });
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
        setMPop(false);
      },
      [dispatch]
    );

    // 버튼식 라디오
    const [isValue1, setIsValue1] = useState(0);
    const handleChange1 = useCallback((e) => {
      e.preventDefault();
      setIsValue1(Number(e.target.value));
    }, [isValue1]);

    // 팝업
    const [mPop, setMPop, openMPop, closeDimmMPop] = useRodal(false);
    const closeMPop = useCallback(
      (e) => {
        e.preventDefault();
        setMPop(false);
      },
      [setMPop]
    );

    return (
      <AppLayout>
        <div className="content-wrap">
          <div className="list-wrap mt20">
            <div className="list-tit">
              <h4>수입인증<span>수입차 브랜드가 확인하고 판매하는 믿음직한 인증 중고차</span></h4>
            </div>

            <ul className="goods-list brand slider">
              <Slider
                slidesToShow={3}
                slidesToScroll={1}
              >
                {foreignBrandList.map((v, i) => {
                  return (<BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />);
                })}
              </Slider>
            </ul>

            {/* <ul className="goods-list brand">
              {foreignBrandList.map((v, i) => {
                if (i < 3) {
                  return (
                    <BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />
                  )
                }
              })}
            </ul> */}
          </div>

          <div className="list-wrap">
            <div className="list-tit">
              <h4>금융사 인증<span>금융사 인증 가이드 텍스트 영역입니다.</span></h4>
            </div>
            <ul className="goods-list brand">
              {domesticBrandList.map((v, i) => {
                if (i < 3) {
                  return (
                    <BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />
                  )
                }
              })}
            </ul>
          </div>

          <div className="list-wrap">
            <div className="list-tit">
              <h4>프랜차이즈 인증<span>프랜차이즈 인증 가이드 텍스트 영역입니다.</span></h4>
            </div>
            <ul className="goods-list brand">
              {franchiseBrandList.map((v, i) => {
                if (i < 3) {
                  return (
                    <BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />
                  )
                }
              })}
            </ul>
          </div>

        </div>
        <div className="certify-banner">
          <div className="content-wrap">
            <p>오토벨 인증몰 파트너사가 되어보세요</p>
            <Button size="mid" background="blue80" radius={true} title="입점문의" width={61} height={30} fontSize={12} marginTop={14} onClick={handleFullpagePopup}/>
          </div>
        </div>
        <MobFullpagePopup active={mFullpagePopup} paddingBottom={80}>
          {layer &&
          <>
            <div className="live-tit">
              <p>
                인증몰 입점에 관하여 궁금한 사항을 보내주시면<br />
                담당자 확인 후 보다 자세한 상담을 드릴 수 있도록<br />
                하겠습니다.
                </p>
            </div>
            <div className="content-wrap inquire-wrap">
              <form>
                <fieldset>
                  <legend className="away">인증몰 입점문의</legend>
                  <table summary="인증몰 입점문의에 대한 내용" className="table-tp2">
                    <caption className="away">인증몰 입점문의</caption>
                    <colgroup>
                      <col width="28%" />
                      <col width="72%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>구분</th>
                        <td>
                          <ul className="radio-block small">
                            <li><Radio className="txt" id="make1" label="수입인증" value={1} checked={isValue1} onChange={handleChange1} /></li>
                            <li><Radio className="txt" id="make2" label="금융사인증" value={2} checked={isValue1} onChange={handleChange1} /></li>
                            <li><Radio className="txt" id="make3" label="프랜차이즈" value={3} checked={isValue1} onChange={handleChange1} /></li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th>회사명</th>
                        <td><Input type="text" id="agency-name" /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="user-name">담당자 성함</label></th>
                        <td><Input type="text" id="user-name" /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="user-phone">전화번호</label></th>
                        <td><Input type="text" id="user-phone" /></td>
                      </tr>
                      <tr>
                        <th><label htmlFor="email">이메일 주소</label></th>
                        <td><Input type="text" id="email" /></td>
                      </tr>
                      <tr>
                        <th>문의내용</th>
                        <td><Textarea countLimit={200} type="tp1" height={176} /></td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="tx-sub">
                    메일이 아닌 담당자 직통 전화로도 바로 문의 가능합니다.<br />
                    담당자 전화문의 : 02-1234-1234
                  </p>
                </fieldset>
              </form>
              <Button className="fixed" size="full" background="blue80" title="문의하기" onClick={(e) => openMPop(e, 'fade')} />
            </div>

            <RodalPopup show={mPop} type={'fade'} closedHandler={closeDimmMPop} isMask={true} isButton={false} subPop={false}>
              <div className="con-wrap">
                <p className="tit1">인증몰 입점 문의가 접수되었습니다.</p>
                <p>빠른 시일안에 담당자가 연락드리겠습니다.</p>
                <Buttons align="right" marginTop={16}>
                  <Button fontSize={14} title="확인" color="blue80" fontWeight={500} href="/buy/certifyMall" onClick={closeFullpagePopup} />
                </Buttons>
              </div>
            </RodalPopup>
            </>
          }
          </MobFullpagePopup>
      </AppLayout>
    )
  }
  return (
    <AppLayout>
      <div className="list-nav-sec">
        <ul className="content-wrap">
          <li><Link href="list"><a><i className="ico-allcar"></i><span>전체차량</span></a></Link></li>
          <li><Link href="liveList"><a><i className="ico-livestudio"></i><span>라이브스튜디오</span></a></Link></li>
          <li><Link href="auctionList"><a><i className="ico-bid"></i><span>경매낙찰차량</span></a></Link></li>
          <li className="on"><Link href="certifyMall"><a><i className="ico-income"></i><span>인증몰</span></a></Link></li>
        </ul>
      </div>
      <div className="content-wrap buy-wrap">
        <div className="list-sec">
          <div className="list-banner certify">
            <p className="tit">인증몰</p>
            <p className="exp">
              오토벨이 엄선한 제휴 인증 차량들을 만나보실 수 있습니다.
            </p>
          </div>

          <div className="list-wrap">
            <div className="list-tit">
              <h4>수입인증<span>수입인증 인증 가이드 텍스트 영역입니다.</span></h4>
            </div>
            <SlideBanner slideType="banner-single" car_list={foreignBrandList} touch={false} autoplay={true} pagination={true} withCounter={true}>
              <div>
                <ul className="goods-list brand">
                  {foreignBrandList.map((v, i) => <BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />)}
                </ul>
              </div>
              <div>
                <ul className="goods-list brand">
                  {foreignBrandList.map((v, i) => <BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />)}
                </ul>
              </div>
              <div>
                <ul className="goods-list brand">
                  {foreignBrandList.map((v, i) => <BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />)}
                </ul>
              </div>
            </SlideBanner>
          </div>

          <div className="list-wrap">
            <div className="list-tit">
              <h4>금융사 인증<span>금융사 인증 가이드 텍스트 영역입니다.</span></h4>
            </div>
            <SlideBanner slideType="banner-single" car_list={domesticBrandList} touch={false} autoplay={true} pagination={true} withCounter={true}>
              <div>
                <ul className="goods-list brand">
                  {domesticBrandList.map((v, i) => <BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />)}
                </ul>
              </div>
              <div>
                <ul className="goods-list brand">
                  {domesticBrandList.map((v, i) => <BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />)}
                </ul>
              </div>
              <div>
                <ul className="goods-list brand">
                  {domesticBrandList.map((v, i) => <BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />)}
                </ul>
              </div>
            </SlideBanner>
          </div>

          <div className="list-wrap">
            <div className="list-tit">
              <h4>프랜차이즈 인증<span>프랜차이즈 인증 가이드 텍스트 영역입니다.</span></h4>
            </div>
            <SlideBanner slideType="banner-single" car_list={franchiseBrandList} touch={false} autoplay={true} pagination={true} withCounter={true}>
              <div>
                <ul className="goods-list brand">
                  {franchiseBrandList.map((v, i) => <BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />)}
                </ul>
              </div>
              <div>
                <ul className="goods-list brand">
                  {franchiseBrandList.map((v, i) => <BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />)}
                </ul>
              </div>
              <div>
                <ul className="goods-list brand">
                  {franchiseBrandList.map((v, i) => <BannerItem key={i} bannerType="brand" name={v.name} image={v.image} alt={v.alt} href={v.link} />)}
                </ul>
              </div>
            </SlideBanner>
          </div>
        </div>
      </div>
      <div className="certify-banner">
        <div className="content-wrap">
          <p>오토벨 인증몰 <span>파트너사</span>가 되어보세요</p>
          <Button size="mid" background="blue80" title="입점문의" width={140} marginTop={16} onClick={(e) => openStorePopup(e, "fade")} />
        </div>
      </div>

      <RodalPopup show={storePopupShow} type={'fade'} closedHandler={closeStorePopup} mode="normal" title="인증몰 입점문의" size="small">
        <div className="popup-inquire">
          <div className="inquire-wrap">
            {
              isCertify === false &&
              (
                <>
                  <p className="tx-tit">인증몰 입점에 관하여 궁금한 사항을 보내주시면<br />담당자 확인 후 보다 자세한 상담을 드릴 수 있도록 하겠습니다.</p>
                  <form>
                    <fieldset>
                      <legend className="away">인증몰 입점문의</legend>
                      <table summary="인증몰 입점문의에 대한 내용" className="table-tp2">
                        <caption className="away">인증몰 입점문의</caption>
                        <colgroup>
                          <col width="27.5%" />
                          <col width="72.5%" />
                        </colgroup>
                        <tbody>
                          <tr>
                            <th><label htmlFor="certify">구분</label></th>
                            <td><SelectBox id="certify" className="items-sbox" options={[
                              { value: '1', label: '수입인증' },
                              { value: '2', label: '금융사인증' },
                              { value: '3', label: '프랜차이즈' }
                            ]} width="100%" height={48} /></td>
                          </tr>
                          <tr>
                            <th><label htmlFor="agency-name">회사명</label></th>
                            <td><Input type="text" id="agency-name" /></td>
                          </tr>
                          <tr>
                            <th><label htmlFor="user-name">담당자 성함</label></th>
                            <td><Input type="text" id="user-name" /></td>
                          </tr>
                          <tr>
                            <th><label htmlFor="user-phone">전화번호</label></th>
                            <td>
                              <span className="bridge">
                                <SelectBox id="user-phone" className="items-sbox" options={mobile_number_list} width={119} height={48} />
                              </span>
                              <span className="bridge">
                                <Input type="text" id="user-phone2" width={119} />
                              </span>
                              <Input type="text" id="user-phone3" width={108} />
                            </td>
                          </tr>
                          <tr>
                            <th><label htmlFor="email">이메일 주소</label></th>
                            <td>
                              <span className="bridge2">
                                <Input type="text" id="email" width={168} />
                                <em className="mg8">@</em>
                                <Input type="text" id="email2" width={169} />
                              </span>
                              <span className="bridge2">
                                <SelectBox id="email3" className="items-sbox" options={select1_list} placeHolder="직접입력" width="100%" height={48} />
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <th>문의내용</th>
                            <td><Textarea countLimit={400} type="tp1" height={218} /></td>
                          </tr>
                        </tbody>
                      </table>
                    </fieldset>
                  </form>
                  <Buttons align="center" marginTop={20} className="w-line">
                    <Button size="big" background="gray" title="취소" width={180} height={60} />
                    <Button size="big" background="blue80" title="보내기" width={180} height={60} onClick={handleCertify} />
                  </Buttons>
                </>
              )
            }
            {
              isCertify === true &&
              (
                <>
                  <div className="co-wrap">
                    <p>
                      <span className="ico-wrap"><i className="ico-document"></i></span>
                      인증몰 입점 문의가<br />접수되었습니다.
                    </p>
                  </div>
                  <p className="tx-sub">* 빠른 시일안에 담당자가 연락드리겠습니다.</p>
                  <Buttons align="center" marginTop={40} className="w-line">
                    <Button size="big" background="blue80" title="확인" width={180} height={60} />
                  </Buttons>
                </>
              )
            }
          </div>
          {
            isCertify === false && (
              <div className="popup-bg bottom">
                <p className="tx">메일이 아닌 담당자 직통 전화로도 바로 문의 가능합니다.<br />
                  담당자 전화문의 : <span>00-0000-0000</span></p>
              </div>
            )
          }

        </div>
      </RodalPopup>
    </AppLayout>
  )
}

export default CertifyMall
