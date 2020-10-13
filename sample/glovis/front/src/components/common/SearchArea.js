import React, { memo, useCallback, useEffect, useState, useContext } from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Autosuggest from 'react-autosuggest';
import qs from 'qs';
import Router from 'next/router';
import { cloneDeep, isEmpty, isUndefined } from 'lodash';
import DynamicTag from '@lib/share/items/DynamicTag';
import Button from '@lib/share/items/Button';
import { getSuggestions, getSuggestionValue } from '@src/utils/searchUtil';
import { getSuggestWordList, setSuggestWord, setSearchCrNo } from '@src/actions/buycar/buyCarListAction';
import { objIsEmpty } from '@src/utils/CommonUtil';
import { axiosPost } from '@src/utils/HttpUtils';
import { SystemContext } from '@src/provider/SystemProvider';

const SearchArea = memo(({ searchTerm, section, wrapperClass, onClick }) => {
  const { showAlert, initAlert, showConfirm } = useContext(SystemContext);
  const dispatch = useDispatch();
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [value, SetValue] = useState(searchTerm || '');
  const [suggestions, SetSuggestions] = useState([]);
  const [buttonActive, setButtonActive] = useState(false);
  const wordList = useSelector((state) => state.buyCarList.suggestWordsList);
  let testtemp = '';

  useEffect(() => {
    if (!isUndefined(searchTerm)) SetValue(searchTerm);
  }, [searchTerm]);

  // 입력한 글자를 가지고 연관 검색어 출력
  const renderSuggestion = (suggestion, { query }) => {
    let suggestionText = '';

    if (suggestion.crDtlMdlNm !== undefined) suggestionText = `${suggestion.crMnfcNm} ${suggestion.crDtlMdlNm}`;
    else suggestionText = `${suggestion.crMnfcNm}`;

    const matches = match(suggestionText, query);
    const parts = parse(suggestionText, matches);
    return (
      <DynamicTag tagName={'span'} id={''} className={'suggestion-content '} dataContext={{ searchTerms: parts, suggestion }} onClick={onClickSuggest} onKeyDown={onKeydown}>
        <span className="name">
          {parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;
            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
        </span>
      </DynamicTag>
    );
  };

  // 검색기능 (연관검색어를 클릭했을때 실행)
  const onClickSuggest = useCallback(
    (e, deps) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      const tempMdlCd = cloneDeep(deps.suggestion.crMdlCd);
      const tempMdlNm = cloneDeep(deps.suggestion.crMdlNm);
      const tempDtlMdlCd = cloneDeep(deps.suggestion.crDtlMdlCd);
      const tempDtlMdlNm = cloneDeep(deps.suggestion.crDtlMdlNm);
      const sug = cloneDeep(deps.suggestion);
      sug.crMdlCd = isUndefined(tempMdlCd) ? '' : tempMdlCd;
      sug.crMdlNm = tempMdlNm ? '' : tempMdlNm;
      sug.crDtlMdlCd = [];
      if (tempDtlMdlCd) {
        sug.crDtlMdlCd.push(tempDtlMdlCd);
        sug.crDtlMdlNm = [];
        sug.crDtlMdlNm.push(tempDtlMdlNm);
      }
      sug.searchTerm = `${deps.suggestion.crMnfcNm} ${tempDtlMdlNm || ''}`;
      // 내차사기에서 오는 searchArea일때 onClick실행
      if (section === 'buy') {
        if (onClick) {
          onClick(e, sug);
        }
      } else {
        // 메인에서 오는 searchArea일때는 dispatch;
        Router.push('/buycar/buyCarList').then(() => {
          dispatch(setSearchCrNo(''));
          dispatch(setSuggestWord(sug));
        });
      }
    },
    [dispatch, onClick, section, value]
  );

  // 검색버튼 누를때 실행되는 검색기능
  const handleClick = useCallback(
    (e, sug) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      // if (section === 'main') {
      //  // Router.push('/buycar/buyCarList?crNo=' + value);
      // } else {
      // }

      // 2020.05.20  수정
      // if (section === 'main') {
      //   Router.push('/buycar/buyCarList');
      // }

      if (/[0-9]{1,3}[가-힣]{1}[0-9]{4}/.test(value)) {
        console.log('차량번호 입력 ', value);
        dispatch(setSuggestWord({}));
        dispatch(setSearchCrNo(value));
      } else {
        axiosPost('/api/buycar/selectSearchCode.do', { searchText: value }).then((res) => {
          if (isEmpty(res.data.data.code)) {
            if (section !== 'main') showAlert('검색 차량을 정확히 입력해주세요.');
          } else {
            const { code } = res.data.data;
            console.log('search data : ', code);
            const tempMdlCd = cloneDeep(code.crMdlCd);
            const tempMdlNm = cloneDeep(code.crMdlNm);
            const tempDtlMdlCd = cloneDeep(code.crDtlMdlCd);
            const tempDtlMdlNm = cloneDeep(code.crDtlMdlNm);
            const sug = cloneDeep(code);
            sug.crMdlCd = isUndefined(tempMdlCd) ? '' : tempMdlCd;
            sug.crMdlNm = tempMdlNm ? '' : tempMdlNm;
            sug.crDtlMdlCd = [];
            if (tempDtlMdlCd) {
              sug.crDtlMdlCd.push(tempDtlMdlCd);
              sug.crDtlMdlNm = [];
              sug.crDtlMdlNm.push(tempDtlMdlNm);
            }
            sug.searchTerm = `${code.crMnfcNm} ${tempDtlMdlNm || ''}`;
            // 검색된 결과들을 REDUCER로 보냄
            Router.push('/buycar/buyCarList').then(() => {
              dispatch(setSearchCrNo(''));
              dispatch(setSuggestWord(sug));
            });
          }
        });
      }
    },
    [section, value]
  );

  const closeSmartFinder = useCallback(
    (e) => {
      e.stopPropagation();
      const container = document.getElementsByClassName(wrapperClass)[0];
      if (!container.contains(e.target)) {
        //setActive(false);
      }
    },
    [wrapperClass]
  );

  const onSuggestionsFetchRequested = useCallback(
    (e) => {
      SetSuggestions(getSuggestions(e.value, wordList));
    },
    [wordList]
  );

  const onSuggestionsClearRequested = useCallback(() => {
    console.log('onSuggestionsClearRequested');
  }, []);

  const onChangeInput = (e, deps) => {
    SetValue(deps.newValue);
    testtemp = deps.newValu;
    if (hasMobile) {
      setButtonActive(deps.newValue.trim() !== '' ? true : false);
    }
    //setInput()
  };

  // 검색창에서 엔터 입력시
  const onKeydown = (event) => {
    if (event.keyCode === 13) {
      handleClick();
    }
  };

  const inputProps = {
    placeholder: '브랜드, 모델명, 차량번호로 검색해 보세요.',
    value,
    onChange: onChangeInput,
    onKeyDown: onKeydown
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('click', closeSmartFinder);
    };
  }, [closeSmartFinder]);

  useEffect(() => {
    if (objIsEmpty(wordList)) {
      dispatch(getSuggestWordList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={wrapperClass}>
      {section === 'main' && (
        <>
          <label htmlFor="mv-smart-finder">
            Smart
            <br />
            Finder
          </label>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            focusInputOnSuggestionClick={true}
          />
          <Button size="big" title="Search" className="mv-btn search" buttonMarkup={true} onClick={handleClick} />
        </>
      )}
      {section === 'buy' && (
        <>
          {!hasMobile && (
            <>
              <span className="search-area">
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                />
              </span>
              <Button size="full" background="blue80" title="검색" buttonMarkup={true} onClick={handleClick} />
            </>
          )}
          {hasMobile && (
            <>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
              <Button size="big" title="Search" className={!buttonActive ? 'mv-btn search' : 'mv-btn search active'} onClick={handleClick} />
            </>
          )}
        </>
      )}
    </div>
  );
});

SearchArea.propTypes = {
  searchTerm: PropTypes.string,
  section: PropTypes.string,
  wrapperClass: PropTypes.string,
  onClick: PropTypes.func
};
SearchArea.displayName = 'SearchArea';
export default SearchArea;
