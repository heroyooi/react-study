import { useState, useEffect } from 'react';
import { imgUrl } from '@src/utils/HttpUtils'

const DealerCarPhoto = ({ frontImgUrl, backImgUrl }) => {
  console.log("DealerCarPhoto -> frontImgUrl", frontImgUrl)
  console.log("DealerCarPhoto -> backImgUrl", backImgUrl)
  const [ imgs, setImgs ] = useState({
    insShotPhtUrl1:frontImgUrl ? imgUrl+frontImgUrl : '',
    insShotPhtUrl2:backImgUrl ? imgUrl+backImgUrl : '',
  })

  const inputStyle = {
    position: 'absolute',
    left: 0, top: 0, bottom: 0, right: 0, width:'100%', height:'100%',
    opacity: 0,
    cursor: 'pointer',
  }

  const changeImg = e => {
    console.log('e : ', e)
    const { name, files } = e.target

    if(typeof URL) {
      setImgs({
        ...imgs,
        [name] : URL.createObjectURL(files[0])
      })
    }
  }

  useEffect(() => {
    setImgs({
      insShotPhtUrl1:frontImgUrl ? imgUrl+frontImgUrl : '',
      insShotPhtUrl2:backImgUrl ? imgUrl+backImgUrl : '',
    })
  },[ frontImgUrl, backImgUrl ])

  return (
    <>
      <fieldset>
        <div className="inspection-photo">
          <h4>점검 장면 촬영 사진<span>(견본 이미지를 참고하여, 자동차 점검 장면을 촬영한 후 업로드 해 주세요.)</span></h4>
          <ul>
            <li
              className="car-img-front"
              style={
                imgs.insShotPhtUrl1
                  ? { background: `center / cover no-repeat url(${imgs.insShotPhtUrl1}) #ececec`, position:'relative' }
                  : { background: `center / 100% no-repeat url(/images/dummy/car-img-front.png) #ececec`, position:'relative' }
              }
            >
              {imgs.insShotPhtUrl1 ? null : <span>자동차 정면 가이드 이미지</span>}
              <input type="file" name="insShotPhtUrl1" data-column-name="insShotPhtId1" accept='image/*' style={inputStyle} onChange={changeImg} />
            </li>
            <li
              className="car-img-back"
              style={
                imgs.insShotPhtUrl2
                  ? { background: `center / cover no-repeat url(${imgs.insShotPhtUrl2}) #ececec`, position:'relative' }
                  : { background: `center / 100% no-repeat url(/images/dummy/car-img-back.png) #ececec`, position:'relative' }
              }
            >
              {imgs.insShotPhtUrl2 ? null : <span>자동차 후면 가이드 이미지</span>}
              <input type="file" name="insShotPhtUrl2" data-column-name="insShotPhtId2" accept='image/*' style={inputStyle} onChange={changeImg} />
            </li>
          </ul>
          <p className="tx-exp-tp5">*점검사진은 성능점검장을 확인할 수 있는 점검장 일부(상호 또는 건물 등)를 배경으로 자도차 번호판 및 차량 전체가 식별할 수 있는 사진이 등록되어야 합니다.</p>

        </div>
      </fieldset>
    </>
  )
}

export default DealerCarPhoto