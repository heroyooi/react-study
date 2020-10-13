
export const setComma = (number, option) => {
  const parsed = parseInt(number)

  return isNaN(parsed) ? 0 : parsed.toLocaleString(undefined, option)
}

export const getLabelFromArray = (labelList, value, label='label') => {
  if(!Array.isArray(labelList)){
      return ''
  }
  const target = labelList.find(obj => obj.value == value)

  return target ? target[label] : ''
}
