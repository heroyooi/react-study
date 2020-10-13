export function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getSuggestionValue(suggestion) {
  let suggestionText = '';
  if (suggestion.crDtlMdlNm !== undefined) {
    suggestionText = `${suggestion.crMnfcNm} ${suggestion.crDtlMdlNm}`;
  } else {
    suggestionText = `${suggestion.crMnfcNm}`;
  }

  return suggestionText;
}

export function getSuggestions(value, wordList) {
  const escapedValue = escapeRegexCharacters((value || '').trim());

  if (escapedValue === '') {
    return [];
  }
  // eslint-disable-next-line security/detect-non-literal-regexp
  const regex = new RegExp(escapedValue, 'i');
  return wordList.filter((word) => regex.test(getSuggestionValue(word)));
}
