# JSDoc

## 주석 표시 예시파일

\pages\mypage\dealer\sellcar\carDescription.js 

\pages\sellcar\nonValue\noneValuationGuide.js

\pages\sellcar\nonValue\noneValuationSellCarComplete.js

\src\actions\mypage\dealer\carDescriptionAction.js  

\src\components\sellcar\self\CarBasicInfoEditor.js

\src\utils\CommonUtil.js  

\src\reducers\homeservice\carAccidentHistoryReducer.js 

 

## 필수 입력사항

1. 파일헤더(pages 폴더 아래)

```javascript
/**
 * 설명 : 파일에 포함된 기능에 대해서 설명한다.
 * @fileOverview 파일설명(화면명)
 * @requires 필요모듈명 (import 항목중에 src 폴더 아래 있는 중요항목만 표기 / 더미데이터 제외 )
 * @author 작성자
 */
```
 

2. 함수(파일 최상단 함수/클래스만 작성)

```javascript
/**
 * 설명 : 해당 기능의 설명
 * @param {Type} 개요 설명
 * @returns [{type}] [description]
 */
```

3. 부가 입력사항

3. 함수 내 함수 주석 (선택적 입력)

```javascript 
/**
 * 설명 : 해당 기능의 설명
 * @module 최상단 함수/해당함수
 * @param {Type} 개요 설명
 * @returns [{type}] [description]
 */
```
 
4. 옵션 : 선택적으로 추가 설명이 필요할떄만 사용

```javascript 
/**
* @throws {Error} undefined입니다.
* @callback <namepath>
*/
```

5. 태그별 사용예

```javascript
/*
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
 */