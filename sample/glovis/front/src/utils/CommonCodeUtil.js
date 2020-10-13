export const convertForSelectBox = (codeList) => {
  let list = [];
  // console.log('convertForSelectBox', codeList, Array.isArray(codeList));
  if (Array.isArray(codeList)) {
    codeList.forEach((code) => {
      // console.log(code);
      list.push({
        label: code.cdNm,
        value: code.cdId
      });
    });
  }
  // if (Array.isArray(codeList)) {
  //   codeList.foreach((code) => {
  //   });
  // }
  // console.log('list', list);
  return list;
};
