import { createContext } from 'react'

// component api
export const api_list = {
  "button": [
    {
      property: 'size',
      description: '버튼 크기',
      type: 'string',
      default: '-'
    },
    {
      property: 'color',
      description: '버튼 글씨색',
      type: 'string',
      default: '-'
    },
    {
      property: 'background',
      description: '버튼 배경색',
      type: 'string',
      default: '-'
    },
    {
      property: 'line',
      description: '버튼 선색',
      type: 'string',
      default: '-'
    },
    {
      property: 'radius',
      description: '버튼 radius 유무',
      type: 'string',
      default: 'false'
    },
    {
      property: 'title',
      description: '버튼 명',
      type: 'string',
      default: '#'
    },
    {
      property: 'width',
      description: '버튼 너비 값',
      type: 'number',
      default: '-'
    },
    {
      property: 'height',
      description: '버튼 높이 값',
      type: 'number',
      default: '-'
    },
    {
      property: 'fontSize',
      description: '버튼 font-size 값',
      type: 'number',
      default: '-'
    },
    {
      property: 'lineHeight',
      description: '버튼 line-height 값',
      type: 'number',
      default: '-'
    },
    {
      property: 'circle',
      description: '버튼 타입이 원일 경우 true',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'iconType',
      description: '버튼 아이콘 타입',
      type: 'string',
      default: '-'
    },
    {
      property: 'marginLeft',
      description: '버튼 margin-left 값',
      type: 'number',
      default: '-'
    },
    {
      property: 'marginTop',
      description: '버튼 margin-top 값',
      type: 'number',
      default: '-'
    },
    {
      property: 'marginRight',
      description: '버튼 margin-right 값',
      type: 'number',
      default: '-'
    },
    {
      property: 'marginBottom',
      description: '버튼 margin-bottom 값',
      type: 'number',
      default: '-'
    },
    {
      property: 'nextLink',
      description: '페이지 전환 유무, true이면 페이지 전환 X, false이면 페이지 전환 O',
      type: 'boolean',
      default: '-'
    },
    {
      property: 'href',
      description: '버튼 href 값',
      type: 'string',
      default: ''
    },
    {
      property: 'target',
      description: '버튼 새창 띄우기 유무, _blank일 경우 새창',
      type: 'string',
      default: '_self'
    },
    {
      property: 'className',
      description: '버튼에 추가할 클래스명',
      type: 'string',
      default: '_self'
    },
    {
      property: 'onClick',
      description: '버튼에 추가할 onClick 이벤트 핸들러 함수',
      type: '(event) => void',
      default: '-'
    }
  ],
  "page_item": [
    {
      property: 'children',
      description: '페이지 내부에 마크업 node',
      type: 'node',
      default: '-'
    },
    {
      property: 'min',
      description: '페이지 첫번째 index',
      type: 'number',
      default: '1'
    },
    {
      property: 'max',
      description: '페이지 마지막 index',
      type: 'number',
      default: '-'
    },
    {
      property: 'initNum',
      description: '페이지 index 초기 값',
      type: 'number',
      default: '1'
    }
  ],
  "page_cont": [
    {
      property: 'children',
      description: '페이지 내부에 마크업 node',
      type: 'node',
      default: '-'
    },
    {
      property: 'id',
      description: '컨텐츠 index 값',
      type: 'number',
      default: '-'
    }
  ],
  "selectbox": [
    {
      property: 'options',
      description: '셀렉트박스 옵션에 들어갈 데이터',
      type: 'array',
      default: '-'
    },
    {
      property: 'disabled',
      description: '셀렉트박스 비활성화 유무',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'width',
      description: '셀렉트박스 너비 값',
      type: 'string',
      default: 'auto'
    },
    {
      property: 'height',
      description: '셀렉트박스 높이 값',
      type: 'string',
      default: 'auto'
    },
    {
      property: 'hoverColor',
      description: '옵션 색상 - 마우스 오버 시',
      type: 'string',
      default: '#f0f4ff'
    },
    {
      property: 'selectedColor',
      description: '옵션 색상 - 선택 했을 때',
      type: 'string',
      default: '#3f64c3'
    },
    {
      library: 'React Select',
      npm: 'npm i react-select',
      homepage: 'https://react-select.com/home'
    }
  ],
  "checkbox": [
    {
      property: 'id',
      description: '체크박스 Input & Label 매칭용 고유값',
      type: 'string',
      default: '-'
    },
    {
      property: 'className',
      description: '체크박스 디자인 선택<br />chip-* : 배경색<br />chk-* : 체크 색)',
      type: 'string',
      default: '-'
    },
    {
      property: 'title',
      description: '체크박스 Label 텍스트',
      type: 'string',
      default: '-'
    },
    {
      property: 'sub',
      description: '체크박스 Label 텍스트 중 다른 색 부분<br /><br />예시 페이지: /sell/visitApply - 마케팅 활동 동의 (선택항목)',
      type: 'string',
      default: '-'
    },
    {
      property: 'checked',
      description: '체크박스 체크 유무',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'disabled',
      description: '체크박스 비활성화 유무',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'onChange',
      description: 'change event handler',
      type: '(event) => void',
      default: '-'
    },
    {
      property: 'type',
      description: '체크박스 배경색이 투톤 컬러일 경우 사용 ',
      type: 'string',
      default: 'default'
    },
    {
      property: 'size',
      description: '체크박스 크기',
      type: 'string',
      default: 'large'
    },
    {
      property: 'isSelf',
      description: '체크박스 활성화/비활성화를 컴포넌트 내부에서 처리할 경우 true<br />컴포넌트 외부에서 처리항 경우 false',
      type: 'boolean',
      default: 'true'
    },
    {
      property: 'agreeType',
      description: 'CheckBoxGroup 컴포넌트에서 사용<br />일반 Checkbox 컴포넌트일 경우 false,<br />모두 동의 체크박스에 사용되는 Checkbox 컴포넌트일 경우 true<br /><br />예시 페이지: /homeService/serviceStep03_01',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'agreeAll',
      description: 'CheckBoxGroup 컴포넌트에서 사용<br />모두 동의 체크박스에 사용되는 Checkbox 컴포넌트일 경우 true<br /><br />예시 페이지: /homeService/serviceStep03_01',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'agreeEssential',
      description: 'CheckBoxGroup 컴포넌트에서 사용<br />필수 동의 체크박스에 사용되는 Checkbox 컴포넌트일 경우 true<br /><br />예시 페이지: /member/memberStep02',
      type: 'boolean',
      default: 'false'
    }
  ],
  "checkbox_group": [
    {
      property: 'title',
      description: '모두 동의하는 체크박스 Label 텍스트',
      type: 'string',
      default: '-'
    },
    {
      property: 'id',
      description: '모두 동의하는 체크박스 Input & Label 매칭용 고유값',
      type: 'string',
      default: '-'
    },
    {
      property: 'agree_list',
      description: '모두 동의하는 체크박스를 제외한 다른 체크박스들 데이터 목록',
      type: 'array',
      default: '-'
    },
    {
      property: 'type',
      description: '모두 동의 체크박스를 타입<br />약관 타입이면 terms<br />약관 타입일 경우 각각 약관의 팝업이 존재합니다.',
      type: 'array',
      default: 'normal'
    }
  ],
  "checkbox_item": [
    {
      property: 'children',
      description: '페이지 내부에 마크업 node',
      type: 'node',
      default: '-'
    },
    {
      property: 'id',
      description: '박스형 체크박스 컴포넌트 고유 id',
      type: 'string',
      default: '-'
    },
    {
      property: 'checked',
      description: '박스형 체크박스 컴포넌트 체크 활성화 유무',
      type: 'boolean',
      default: '-'
    },
    {
      property: 'size',
      description: '박스형 체크박스 컴포넌트 체크 사이즈 유무',
      type: 'string',
      default: 'large'
    }
  ],
  "radio_group": [
    {
      property: 'dataList',
      description: '라디오 버튼들 데이터 목록',
      type: 'array',
      default: '-'
    },
    {
      property: 'defaultValue',
      description: '라디오 버튼들 활성화된 라디오 index',
      type: 'number',
      default: '1'
    },
    {
      property: 'className',
      description: '라디오 버튼들 클래스명',
      type: 'string',
      default: '-'
    },
    {
      property: 'size',
      description: '라디오 버튼의 사이즈 - 기본은 large, 작은 사이즈는 small',
      type: 'string',
      default: 'large'
    },
    {
      property: 'children',
      description: '라디오 그룹 내부에 마크업 node',
      type: 'node',
      default: '-'
    },
    {
      property: 'boxType',
      description: '라디오 버튼 박스형 디자인인지 체크',
      type: 'boolean',
      default: 'false'
    }
  ],
  "input": [
    {
      property: 'type',
      description: '인풋의 타입',
      type: 'string',
      default: 'text'
    },
    {
      property: 'width',
      description: '인풋의 너비 값',
      type: 'string | number',
      default: '100%'
    },
    {
      property: 'height',
      description: '인풋의 높이 값',
      type: 'string | number',
      default: '48px'
    },
    {
      property: 'value',
      description: '인풋의 값',
      type: 'string',
      default: '-'
    },
    {
      property: 'closeButton',
      description: '인풋의 닫기 버튼 유무',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'placeType',
      description: '인풋의 플레이스홀더 타입',
      type: 'number',
      default: '1'
    },
    {
      property: 'placeLabel',
      description: '인풋의 플레이스홀더 타입이 2일 경우 Label 값',
      type: 'string',
      default: '-'
    },
    {
      property: 'placeHolder',
      description: '인풋의 플레이스홀더',
      type: 'string',
      default: '-'
    },
    {
      property: 'onChange',
      description: 'change event handler',
      type: '(event) => void',
      default: '-'
    },
    {
      property: 'readOnly',
      description: '인풋의 readonly 값',
      type: 'boolean',
      default: 'false'
    }
  ],
  "tab": [
    {
      property: 'type',
      description: '탭의 스타일',
      type: 'string',
      default: '-'
    },
    {
      property: 'defaultTab',
      description: '초기 활성화된 탭 인덱스',
      type: 'number',
      default: '0'
    },
    {
      property: 'action',
      description: '탭의 마우스 오버 효과',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'mount',
      description: '탭 내용의 마운트 유무 : true이면 언마운트, false이면 마운트',
      type: 'boolean',
      default: 'true'
    },
    {
      property: 'isScroll',
      description: 'true이면 내용 부분 스크롤로 한눈에 볼 수 있음',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'onClick',
      description: '탭에 추가할 onClick 이벤트 핸들러 함수',
      type: '(event) => void',
      default: '-'
    },
    {
      property: 'tabLink',
      description: "탭 링크 배열<br />예시) [{index:2, url:'/buy/viewA'}, {index:3, url:'/buy/list'}]",
      type: 'array',
      default: '-'
    },
    {
      property: 'mode',
      description: "탭의 방향 : 'horizon'은 가로, 'vertical'은 세로",
      type: 'string',
      default: 'horizon'
    },
    {
      property: 'className',
      description: "탭에 추가될 클래스명",
      type: 'string',
      default: '-'
    }
  ],
  "banner_item": [
    {
      property: 'name',
      description: '상품 이름',
      type: 'string',
      default: '-'
    },
    {
      property: 'price',
      description: '상품 가격',
      type: 'string',
      default: '-'
    },
    {
      property: 'image',
      description: '상품 이미지 경로',
      type: 'string',
      default: '-'
    },
    {
      property: 'alt',
      description: '상품 이미지 alt 값',
      type: 'string',
      default: '-'
    },
    {
      property: 'tags',
      description: '상품 태그',
      type: 'array',
      default: '[ ]'
    },
    {
      property: 'infos',
      description: '상품 정보',
      type: 'array',
      default: '[ ]'
    },
    {
      property: 'problems',
      description: '상품 문제들',
      type: 'array',
      default: '[ ]'
    },
    {
      property: 'options',
      description: '상품 옵션',
      type: 'array',
      default: '[ ]'
    },
    {
      property: 'likes',
      description: '상품 좋아요 수',
      type: 'number',
      default: '-'
    },
    {
      property: 'isMarkup',
      description: '배너 아이템 마크업 유무',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'bannerType',
      description: '배너 아이템 목록 타입 - horizon(가로형), vertical(세로형)',
      type: 'string',
      default: 'horizon'
    },
    {
      property: 'children',
      description: 'isMarkup이 true일 경우 배너 아이템 내부 마크업 노드',
      type: 'node',
      default: '-'
    },
    {
      property: 'buttonName',
      description: '버튼이 존재할 경우 버튼명',
      type: 'string',
      default: '-'
    },
    {
      property: 'btnClick',
      description: '버튼이 존재할 경우 버튼명',
      type: 'string',
      default: '-'
    },
    {
      property: 'btnId',
      description: '버튼 이벤트 처리를 위해 전달할 아이디 값',
      type: '',
      default: '-'
    }
  ],
  "slide_banner": [
    {
      property: 'car_list',
      description: '데이터 배열',
      type: 'string',
      default: '-'
    },
    {
      library: 'React Slick',
      npm: 'npm i react-slick',
      homepage: 'https://react-slick.neostack.com'
    }
  ],
  "tooltip": [
    {
      property: 'placement',
      description: '툴팁이 뜨는 방향',
      type: 'string',
      default: '-'
    },
    {
      property: 'width',
      description: '툴팁 너비 값',
      type: 'string',
      default: '-'
    },
    {
      property: 'event',
      description: '툴팁 이벤트 형태 - over면 오버, click면 클릭',
      type: 'string',
      default: 'over'
    },
    {
      property: 'simple',
      description: '툴팁 UI',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'disabled',
      description: '툴팁 비활성화',
      type: 'boolean',
      default: 'false'
    },
    {
      property: 'exception',
      description: '툴팁 UI 기본틀을 벗어난 CSS가 있는 경우 따로 붙여줄 클래스명',
      type: 'string',
      default: '-'
    },
    {
      property: 'zid',
      description: '툴팁 z-index 값',
      type: 'number',
      default: '-'
    }
  ],
  "popup": [
    {
      property: 'show',
      description: 'useState 훅을 사용하여 정의 - true와 false 값을 받는 state',
      type: 'boolean',
      default: '-'
    },
    {
      property: 'type',
      description: 'useState 훅을 사용하여 정의<br />- Options : zoom, fade, flip, door, rotate, slideUp, slideDown, slideLeft, slideRight ',
      type: 'string',
      default: '-'
    },
    {
      property: 'mode',
      description: '팝업 ui를 위한 옵션<br />- Options : normal, fullsize, no-padding',
      type: 'string',
      default: '-'
    },
    {
      property: 'width',
      description: '팝업 width값을 위한 옵션',
      type: 'number',
      default: '-'
    },
    {
      property: 'maxWidth',
      description: '팝업 max-width값을 위한 옵션',
      type: 'number',
      default: '-'
    },
    {
      property: 'size',
      description: '팝업 사이즈를 위한 옵션, mode가 normal 일 경우 사용<br />- Options : small, medium, large',
      type: 'string',
      default: '-'
    },
    {
      property: 'measure',
      description: '팝업 width 값 단위를 위한 옵션<br />- Options : px, %',
      type: 'string',
      default: '-'
    },
    {
      library: 'Rodal',
      npm: 'npm i rodal',
      homepage: 'https://www.npmjs.com/package/rodal'
    }
  ],
  "calendar": [
    {
      property: 'className',
      description: '달력 클래스명',
      type: 'string',
      default: '-'
    },
    {
      property: 'mode',
      description: '달력 모드 - time, date, month, year, decade',
      type: 'string',
      default: 'date'
    },
    {
      library: 'rc-calendar',
      npm: 'npm i rc-calendar',
      homepage: 'http://react-component.github.io/calendar'
    }
  ]
}

// state, action, reducer
export const menuState = {
  isMenu: [
    {
      property: 'Button',
      active: true
    },
    {
      property: 'Typography',
      active: false
    },
    {
      property: 'Menu',
      active: false
    },
    {
      property: 'Pagination Menu',
      active: false
    },
    {
      property: 'Steps',
      active: false
    },
    {
      property: 'Icon',
      active: false
    },
    {
      property: 'Badge & Label',
      active: false
    },
    {
      property: 'Checkbox',
      active: false
    },
    {
      property: 'Radio',
      active: false
    },
    {
      property: 'Selectbox',
      active: false
    },
    {
      property: 'Input',
      active: false
    },
    {
      property: 'Tab',
      active: false
    },
    {
      property: 'Table',
      active: false
    },
    {
      property: 'List',
      active: false
    },
    {
      property: 'Slide',
      active: false
    },
    {
      property: 'Tooltip',
      active: false
    },
    {
      property: 'Design Module',
      active: false
    },
    {
      property: 'Popup',
      active: false
    },
    {
      property: 'Calendar',
      active: false
    }
  ]
}

export const CLICK_MENU = 'CLICK_MENU'

export const reducer = (state, action) => {
  switch (action.type) {
    case CLICK_MENU:
      const isMenu = [...state.isMenu];
      for(let i in isMenu) {
        isMenu[i].active = false;
      }
      isMenu[action.num].active = true;
      return {
        ...state,
        isMenu
      }
    default:
      return state;
  }
}

// context
export const GuideContext = createContext()