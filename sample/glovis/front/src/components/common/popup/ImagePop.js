import React from 'react'
import PropTypes from 'prop-types';

/**
 * 설명 : 이미지 팝업
 * @fileoverview
 * @requires title : 이미지 타이틀, imgSubFolder : 이미지 sub folder, imgFileNm : 이미지 파일명
 * @author 김지현
 */
const ImagePop = ({initImg}) => {
    
    const initImage = {
        border: '1px solid black',
        width: 790,
        height: 500,
        background:
          `center / cover no-repeat url(${initImg}) #f6f7f8`
    }
 
    return (
        <>
            <div style={initImage}></div>    
        </>
    );
}

ImagePop.propTypes = {
    initImg : PropTypes.String
};
  
export default ImagePop;
  
