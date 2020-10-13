import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

/**
 * 설명 : 카카오맵 조회 (신주소 명이 정확해야 marker가 정확히 표시됩니다.)
 * @fileoverview
 * @requires {props.style, props.addr} style : 영역 지정, addr : 지도에 표시할 주소
 * @author 김지현
 */

class KakaoMap extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.async = true;
    //script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=17ef86ebc3d01b6398711a1cf903c60b&autoload=false&libraries=services";
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=ebd4a9b3f55e3d80a330f96186c9895e&autoload=false&libraries=services';
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        // const el = document.getElementById(this.props.id || 'map');
        // const map = new kakao.maps.Map(el, {
        //   center: new kakao.maps.LatLng(33.450701, 126.570667), //new kakao.maps.Coords(33.450701, 126.570667),
        //   level: 3
        // });

        // // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        // const zoomControl = new kakao.maps.ZoomControl();
        // if (this.props.mode === null) {
        //   map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);
        // }

        if (isEmpty(this.props.addr)) return;

        this.timer = setTimeout(() => this.searchAddr(), 30);
      });
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.addr === prevProps.addr) return;
    const script = document.createElement('script');
    script.async = true;
    //script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=17ef86ebc3d01b6398711a1cf903c60b&autoload=false&libraries=services";
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=ebd4a9b3f55e3d80a330f96186c9895e&autoload=false&libraries=services';
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        if (isEmpty(this.props.addr)) return;
        this.timer = setTimeout(() => this.searchAddr(), 30);
      });
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  searchAddr = () => {
    const container = document.getElementById(this.props.id || 'map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 위도경도
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    const zoomControl = new kakao.maps.ZoomControl();
    if (this.props.mode === null) {
      map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);
    }

    const geocoder = new kakao.maps.services.Geocoder(); // 주소로 좌표를 검색

    geocoder.addressSearch(this.props.addr, function(result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        //yy = result[0].x;
        //xx = result[0].y; // 결과값으로 받은 위치를 마커로 표시
        const marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });
        map.setCenter(coords);
      } else {
        console.log('kakao address search failed, status >', status);
      }
    });
  };

  render() {
    return (
      <>
        <div id={this.props.id || 'map'} style={this.props.style} />
      </>
    );
  }
}

export default KakaoMap;

KakaoMap.propTypes = {
  id: PropTypes.string,
  mode: PropTypes.string,
  addr: PropTypes.string,
  style: PropTypes.object
};
