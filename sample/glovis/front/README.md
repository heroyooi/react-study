# Glovis Publish Repository

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node (node-v12.14.0-x86.msi)

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v10.15.3

    $ npm --version
    6.4.1

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

### ESLInt installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g eslint

1. 셋팅 오픈(Ctrl + ,) "format on save" 검색 해서 check

---

## Install

    $ git clone http://jira.polarium.tech:40300/projects/POLD0SS000/repos/pub_repo/browse
    $ cd pub_repo\pub_glovis_pc
    $ yarn install

## Configure app

Open `.env` then edit it with your settings. You will need:

- PORT setting;
- Another setting;
- One more setting;

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build
    $ yarn start:prod

<hr />

## VSCode Extenions

### extensions

1. ESLint
1. Git Graph
1. Git HBistory
1. GitLens
1. Prettier

### settings.json

```json
{
  "editor.minimap.enabled": false,
  "editor.formatOnSave": true,
  "eslint.format.enable": true,
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "**/*.code-search": true,
    "**/.git": true,
    "**/tmp": true,
    "**/build": true
  },
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/node_modules": true
  },
  "files.watcherExclude": {
    "**/.git/objects/**": true,
    "**/.git/subtree-cache/**": true,
    "**/node_modules/*/**": true,
    "**/.hg/store/**": true
  }
}
```

## 설정

### 절대경로 사용

```
import someFunction from '@src/xxx/yyy/zzz';
import someLibrary from '@lib/xxx/yyy/zzz';
```

## ESLint & Prettier

The preferred way to include one of these characters is to use the HTML escape code.

- `>` can be replaced with `&gt;`
- `"` can be replaced with `&quot;`, `&ldquo;`, `&#34;` or `&rdquo;`
- `'` can be replaced with `&apos;`, `&lsquo;`, `&#39;` or `&rsquo;`
- `}` can be replaced with `&#125;`

<hr />

## 코딩맵 URL

[http://localhost](글로비스 코딩맵)

[http://localhost/commonStyle](공통 컴포넌트 정리)

[http://localhost/sample/redux-sample](리덕스 샘플)

[http://localhost/sample/fetching-sample](SSR 에서 초기 데이터 가져오기)

<hr />

## 폴더 & 파일

- pages : 페이지 마크업
- public/images: 이미지 요소
- public/css : 스타일 요소
- public/css/style.css : guide 전용 css(배포대상 X)
- src/commonStyle.js : 컴포넌트 요소 정리 (배포대상 X)
- src/components/common : 공통 컨텐츠 부분
- lib/share : 공통 컴포넌트 요소들(예: 체크박스, 라디오, 셀렉트박스, 툴팁, 팝업 등등...)
- src/dummy : 더미 데이터 및 가이드 API 정보(배포대상 X)

<hr />

## 브랜치

- master: 리액트 프론트엔드 개발팀에 전달할 목적으로 운영

<hr />

## CSS 구조 설명

### 공통 css (./public/css)

- reset.css
- common.css
- layout.css

### 플러그인 css

- slick.css
- slick-theme.css
- calendar.css
- rodal.css
- input-range.css

### 섹션별 css

- main.css
- buy.css
- sell.css
- marketPrice.css
- homeService.css
- mypage.css

### 가이드 css

- prism.css
- style.css

<hr />

### jsDOC 가이드

- 주석 표시 예시파일

```
\pages\mypage\dealer\sellcar\carDescription.js
\pages\sellcar\nonValue\noneValuationGuide.js
\pages\sellcar\nonValue\noneValuationSellCarComplete.js
\src\actions\mypage\dealer\carDescriptionAction.js
\src\components\sellcar\self\CarBasicInfoEditor.js
\src\utils\CommonUtil.js
\src\reducers\homeservice\carAccidentHistoryReducer.js
```

- [필수 입력사항]파일헤더(pages 폴더 아래)

```
/**
 * 설명 : 파일에 포함된 기능에 대해서 설명한다.
 * @fileOverview 파일설명(화면명)
 * @requires 필요모듈명
 * @author 작성자
 */
```

- [필수 입력사항]함수(파일 최상단 함수/클래스만 작성)

```
/**
 * 설명 : 해당 기능의 설명
 * @param {Type} 개요 설명
 * @returns [{type}] [description]
 */
```

- 함수 내 함수 주석 (선택적 입력)

```
/**
 * 설명 : 해당 기능의 설명
 * @module 최상단 함수/해당함수
 * @param {Type} 개요 설명
 * @returns [{type}] [description]
 * @throws {Error} undefined입니다.
 * @callback <namepath>
 */
```

- 태그별 사용예

```
 * @requires module:xyzcorp/helper
 * @requires xyzcorp/helper.ShinyWidget#polish
 * @param somebody
 * @param {number} responseCode
 * @param {string} somebody
 * @param {String} lastName 성
 * @param {Object} employee - The employee who is responsible for the project.
 * @param {Requester~requestCallback} cb - The callback that handles the response.
 * @param {string} [somebody] - Somebody's name.
 * @param {(string|string[])} [somebody=John Doe] - Somebody's name, or an array of names.
 * @param {...number} num - A positive or negative number.
 * @returns {number} Sum of a and b
 * @returns {Promise} Promise object represents the sum of a and b
 * @returns {(number|Array)} Sum of a and b or an array that contains a, b and the sum of a and b.
 * @callback requestCallback
```

<hr />
