import { useSelector } from 'react-redux';
import Radio from '@lib/share/items/Radio';
import Link from 'next/link';
import qs from 'qs';

const defaultValues = {
  frnchsCrYn: 'N',
  hsvcCrYn: 'N',
  icmAcrtCrYn: 'N'
};

const MypageExposureType = ({item = {}, onChangeValues, memberInfo = {} }) => {
  const { authCd, mbAcntnoEnc, mbBankcd } =  memberInfo ?? {};
  const hasMobile = useSelector((state) => state.common.hasMobile);

  //frnchsCrYn hsvcCrYn icmAcrtCrYn
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValues = { ...defaultValues };
    if (name) {
      newValues[name] = value;
    }
    onChangeValues(newValues);
  };

  // const handleChangeHomeService = (e) => {
  //   const { name, value } = e.target;
  //   console.log("handleChangeHomeService -> name", name)
  //   console.log("handleChangeHomeService -> value", value)
  //   console.log("handleChangeHomeService -> memberInfo", memberInfo)
  //   console.log('handleChangeHomeService -> mbAcntnoEnc', mbAcntnoEnc);
  //   console.log('handleChangeHomeService -> mbBankcd', mbBankcd);
  // };

  if (hasMobile) {
    return (
      <fieldset>
        <legend className="away">노출유형</legend>
        <div className="register-exposure">
          <h4>노출유형</h4>
          <ul className="radio-block small">
            {authCd === '0010' && (
              <>
                <li>
                  <Radio
                    className="txt"
                    id="hsvcCrYn-1"
                    value={'Y'}
                    checked={item?.hsvcCrYn}
                    label="홈서비스"
                    size="large"
                    onChange={handleChange}
                    name="hsvcCrYn"
                    disabled={!mbAcntnoEnc || !mbBankcd}
                  />
                </li>
              </>
            )}
            {authCd === '0020' && (
              <>
                <li>
                  <Radio className="txt" id="frnchsCrYn-1" value={'Y'} checked={item?.frnchsCrYn} label="프랜차이즈" size="large" onChange={handleChange} name="frnchsCrYn" />
                </li>
              </>
            )}
            {authCd === '0030' && (
              <>
                <li>
                  <Radio className="txt" id="hsvcCrYn-1" value={'Y'} checked={item?.hsvcCrYn} label="홈서비스" size="large" onChange={handleChange} name="hsvcCrYn" />
                </li>
                <li>
                  <Radio className="txt" id="frnchsCrYn-1" value={'Y'} checked={item?.frnchsCrYn} label="프랜차이즈" size="large" onChange={handleChange} name="frnchsCrYn" />
                </li>
              </>
            )}
            {authCd === '0040' && (
              <>
                <li>
                  <Radio className="txt" id="icmAcrtCrYn-1" value={'Y'} checked={item?.icmAcrtCrYn} label="인증" size="large" onChange={handleChange} name="icmAcrtCrYn" />
                </li>
              </>
            )}
            <li>
              <Radio
                className="txt"
                id="common-2"
                value={'N'}
                checked={item?.frnchsCrYn !== 'Y' && item?.hsvcCrYn !== 'Y' && item?.icmAcrtCrYn !== 'Y' ? 'N' : 'Y'}
                label="일반"
                size="large"
                onChange={handleChange}
                name="frnchsCrYn"
              />
            </li>
          </ul>
        </div>
      </fieldset>
    );
  }
  return (
    <fieldset>
      <legend className="away">노출유형</legend>
      <div className="register-exposure">
        <h4>노출유형</h4>
        <div className="radio-group">
          <ul className="vertical">
            {authCd === '0010' && (
              <>
                <li>
                  <Radio
                    id="hsvcCrYn-1"
                    value={'Y'}
                    checked={item?.hsvcCrYn}
                    title="홈서비스"
                    size="large"
                    onChange={handleChange}
                    name="hsvcCrYn"
                    disabled={!mbAcntnoEnc || !mbBankcd}
                  />
                  {
                    (!mbAcntnoEnc || !mbBankcd) &&
                    <>
                      <span style={{
                        paddingLeft: '15px',
                        fontSize: '14px',
                        color:'#333',
                      }}>
                        <Link href={`/mypage/dealer/info/changeMember?${qs.stringify({backUrl:globalThis?.window?.location?.href})}`}>
                          <a><strong>계좌인증</strong></a>
                        </Link>
                        이 필요합니다
                      </span>
                    </>
                  }
                </li>
              </>
            )}
            {authCd === '0020' && (
              <>
                <li>
                  <Radio id="frnchsCrYn-1" value={'Y'} checked={item?.frnchsCrYn} title="프랜차이즈" size="large" onChange={handleChange} name="frnchsCrYn" />
                </li>
              </>
            )}
            {authCd === '0030' && (
              <>
                <li>
                  <Radio id="hsvcCrYn-1" value={'Y'} checked={item?.hsvcCrYn} title="홈서비스" size="large" onChange={handleChange} name="hsvcCrYn" />
                </li>
                <li>
                  <Radio id="frnchsCrYn-1" value={'Y'} checked={item?.frnchsCrYn} title="프랜차이즈" size="large" onChange={handleChange} name="frnchsCrYn" />
                </li>
              </>
            )}
            {authCd === '0040' && (
              <>
                <li>
                  <Radio id="icmAcrtCrYn-1" value={'Y'} checked={item?.icmAcrtCrYn} title="인증" size="large" onChange={handleChange} name="icmAcrtCrYn" />
                </li>
              </>
            )}
            <li>
              <Radio
                id="common-2"
                value={'N'}
                checked={item?.frnchsCrYn !== 'Y' && item?.hsvcCrYn !== 'Y' && item?.icmAcrtCrYn !== 'Y' ? 'N' : 'Y'}
                title="일반"
                size="large"
                onChange={handleChange}
                name="frnchsCrYn"
              />
            </li>
          </ul>
        </div>
      </div>
    </fieldset>
  );
};

export default MypageExposureType;
