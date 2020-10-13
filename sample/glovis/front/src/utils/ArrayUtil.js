export function compareBy() {
  const fields = [].slice.call(arguments);
  const fieldLength = fields.length;

  return function(A, B) {
    let a;
    let b;
    let field;
    let key;
    let reverse;
    let result;
    // let primer;
    for (let i = 0, l = fieldLength; i < l; i++) {
      result = 0;
      field = fields[parseInt(i)];

      key = typeof field === 'string' ? field : field.name;

      a = A[key.toString()];
      b = B[key.toString()];

      if (typeof field.primer !== 'undefined') {
        a = field.primer(a);
        b = field.primer(b);
      }

      reverse = field.reverse ? -1 : 1;

      if (a < b) result = reverse * -1;
      if (a > b) result = Number(reverse);
      if (result !== 0) break;
    }
    return result;
  };
}

export function groupBy(arr, keyGetter) {
  const map = new Map();
  arr.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function removeObject(arr, keyGetter, item) {
  const index = arr.findIndex((x) => keyGetter(x) === keyGetter(item));
  arr.splice(index, 1);
}

export function optionOtherTypes(code) {
  if (code === '3' || code === '4' || code === '5' || code === '6' || code === '7' || code === '8' || code === '9') {
    return true;
  }

  return false;
}
export function sortBy(arr, compare) {
  return arr.sort(compare);
}

export function firstOrDefault(arr) {
  if (arr && arr.length > 0) {
    return arr[0];
  }

  return {};
}
