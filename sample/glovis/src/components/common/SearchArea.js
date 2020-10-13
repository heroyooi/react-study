import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import SmartFinder from '@src/components/common/SmartFinder';
import Input from '@lib/share/items/Input';
import Button from '@lib/share/items/Button';
import Autosuggest from 'react-autosuggest';

const SearchArea = ({ section, wrapperClass, width, height, value2, onChange, onClick }) => {
  const hasMobile = useSelector((state) => state.common.hasMobile);
  const [active, setActive] = useState(false);
  const [value, Setvalue] = useState('');
  const [suggestions, Setsuggestions] = useState([]);
  const [buttonActive, setButtonActive] = useState(false);
  const people = [
    {
      first: '그랜저',
      last: '하이브리드하이브리드하이브리드하이브리드하이브리드',
      twitter: 'dancounsell'
    },
    {
      first: '그랜저',
      last: '하이브리드',
      twitter: 'dancounsell'
    },
    {
      first: '그랜저',
      last: '하이브리드',
      twitter: 'dancounsell'
    },
    {
      first: '그랜저',
      last: '하이브리드',
      twitter: 'dancounsell'
    },
    {
      first: '그랜저',
      last: '하이브리드',
      twitter: 'dancounsell'
    },
    {
      first: '그랜저',
      last: '하이브리드',
      twitter: 'dancounsell'
    },
    {
      first: '그랜저',
      last: '하이브리드',
      twitter: 'dancounsell'
    },
    {
      first: '그랜저',
      last: '하이브리드',
      twitter: 'dancounsell'
    },
    {
      first: '그랜저',
      last: '하이브리드',
      twitter: 'dancounsell'
    },
    {
      first: '그랜저',
      last: '하이브리드',
      twitter: 'dancounsell'
    },
    {
      first: '그랜저',
      last: '하이브리드',
      twitter: 'dancounsell'
    },
    {
      first: '그랜저1',
      last: '하이브리드1',
      twitter: 'dancounsell1'
    },
    {
      first: '그랜저2',
      last: '하이브리드2',
      twitter: 'dancounsell2'
    },
    {
      first: '그랜저3',
      last: '하이브리드3',
      twitter: 'dancounsell3'
    },
    {
      first: '그랜저4',
      last: '하이브리드4',
      twitter: 'dancounsell4'
    },
    {
      first: '한진',
      last: '중공업',
      twitter: 'mtnmissy'
    },
    {
      first: 'Chloe',
      last: 'Jones',
      twitter: 'ladylexy'
    },
    {
      first: 'Chloe2',
      last: 'Jones2',
      twitter: 'ladylexy2'
    },
    {
      first: 'Cooper',
      last: 'King',
      twitter: 'steveodom'
    }
  ];

  // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
  function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('[' + escapedValue + ']', 'gi');
    //debugger;

    return people.filter((person) => regex.test(getSuggestionValue(person)));
  }

  function getSuggestionValue(suggestion) {
    return `${suggestion.first} ${suggestion.last}`;
  }

  function renderSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.first} ${suggestion.last}`;

    const matches = match(suggestionText, query);
    const parts = parse(suggestionText, matches);

    return (
      <span className={'suggestion-content ' + suggestion.twitter}>
        {suggestion.twitter}
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
      </span>
    );
  }
  const handleSearch = useCallback(
    (e) => {
      setActive(e.target.value !== '' ? true : false);
      if (onChange) onChange(e);
      document.addEventListener('click', closeSmartFinder);
    },
    [active]
  );

  const handleClick = useCallback((e) => {
    e.preventDefault();
    if (hasMobile) Router.push('/buy/listSearch');
    if (onClick) onClick(e);
  }, []);

  const closeSmartFinder = useCallback((e) => {
    e.stopPropagation();
    let container = document.getElementsByClassName(wrapperClass)[0];
    if (!container.contains(e.target)) {
      setActive(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener('click', closeSmartFinder);
    };
    
  }, []);

  const onSuggestionsFetchRequested = ({ value }) => {
    Setsuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    Setsuggestions([]);
  };

  const onChangeInput = (event, { newValue, method }) => {
    Setvalue(newValue);
    setButtonActive(newValue.trim() !== '' ? true : false);
  };

  const inputProps = {
    placeholder: "Type 'c'",
    value,
    onChange: onChangeInput
  };
  const inputProps2 = {
    placeholder: "브랜드, 모델명, 차량번호로 검색해 보세요.",
    value,
    onChange: onChangeInput
  };
  // if (hasMobile) inputProps.disabled = true;
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
          {/* <Input type="text" id="mv-smart-finder" width={337} height={44} onChange={handleSearch} /> */}
          <Button size="big" title="Search" className="mv-btn search" onClick={handleClick} nextLink={true} />
        </>
      )}
      {section === 'buy' && (
        <>
          {!hasMobile && (
            <>
              <span className="search-area">
                {/* <Input placeHolder="브랜드, 모델명으로 검색해 보세요." width="100%" height={60} onChange={handleSearch} />  */}
                
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                />
              </span>
              <Button size="full" background="blue80" title="검색" onClick={handleClick} />
            </>
          )}
          {hasMobile && 
            <>
              {/* <Input type="text" placeHolder="브랜드, 모델명, 차량번호로 검색해 보세요." id="input-tp3" uiType={3} height={48} onChange={handleSearch} /> */}

              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps2}
              />
              {/* <Input type="text" id="mv-smart-finder" width={337} height={44} onChange={handleSearch} /> */}
              <Button size="big" title="Search" className={!buttonActive ? "mv-btn search" : "mv-btn search active"} onClick={handleClick} nextLink={true} />
            </>
          }
        </>
      )}
      {/* <SmartFinder active={active} /> */}
    </div>
  );
};

export default SearchArea;
