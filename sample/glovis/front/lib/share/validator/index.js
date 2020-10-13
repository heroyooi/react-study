import Ajv from 'ajv';

const defaultsOptions = {
  required: [],
  additionalProperties: true
};

const defaultProp = {
  type: 'string'
};

export const createValidator = (properties, options = {}, format = {}) => {
  const ajv = new Ajv({ allErrors: true, jsonPointers: true });
  const { required = [] } = options;

  ajv.addFormat('phone', /[0-9]{2,3}\-[0-9]{3,4}\-[0-9]{3,4}/);
  ajv.addFormat('phone-no-dash', /[0-9]{9,11}/);
  ajv.addFormat('crNo', /[가-힣]*[0-9]+[가-힣][0-9]{4}/);
  ajv.addFormat('time', /[0-9]{2}\:[0-9]{2}\:[0-9]{2}/);
  ajv.addFormat('dateTime', /[0-9]{4}\-[0-9]{2}\-[0-9]{2} [0-9]{2}\:[0-9]{2}\:[0-9]{2}/);
  ajv.addFormat('number', /^[0-9]*$/); //숫자로 이뤄진 문자
  ajv.addFormat('abc', /^[a-zA-Z]*$/);
  ajv.addFormat('abcNum', /^([a-zA-Z]?[0-9]?)*$/);
  ajv.addFormat('email', /.{0,}\@.{1,}\..{1,}/);

  Object.keys(format).forEach((key) => {
    ajv.addFormat(key, format[key]);
  });

  // Object.keys(properties).forEach((key) => {
  //   properties[key] = {
  //     ...defaultProp,
  //     ...properties[key]
  //   }
  //   if(properties[key]) properties[key]['nullable'] = !required.includes(key)
  // })

  const defaults = {
    type: 'object',
    ...defaultsOptions,
    properties,
    ...options
  };

  const complied = ajv.compile(defaults);

  const getPathAndTextByError = (error) => {
    const { keyword, params, dataPath } = error;
    const { type, format, limit, pattern, additionalProperty, missingProperty } = params;

    let fullPath = dataPath.split('/').slice(1);
    let messages = [];
    let field = fullPath[0];

    switch (keyword) {
      case 'type':
        type.split(',').forEach((k) => {
          messages.push(defaultFormatErrorText[k]);
        });
        break;
      case 'format':
        format.split(',').forEach((k) => {
          messages.push(defaultFormatErrorText[k]);
        });
        break;
      case 'maximum':
        messages.push(`최대 ${limit}까지 입력가능합니다.`);
        break;
      case 'minimum':
        messages.push(`최소 ${limit}이상 입력하십시오.`);
        break;
      case 'maxLength':
        messages.push(`최대 ${limit}글자까지 입력가능합니다.`);
        break;
      case 'minLength':
        messages.push(`최소 ${limit}글자 이상 입력하십시오.`);
        break;
      case 'minItems':
        messages.push(`최소 ${limit}개 이상 선택(입력)하십시오.`);
        break;
      case 'maxItems':
        messages.push(`최대 ${limit}개 이하 선택(입력)하십시오.`);
        break;
      case 'pattern':
        messages.push(`형식이 맞지 않습니다.`);
        break;
      case 'additionalProperties':
        field = additionalProperty;
        messages.push(`허용되지 않았습니다.`);
        fullPath = [additionalProperty];
        break;
      case 'required':
        field = missingProperty;
        messages.push(`필수 입력값입니다.`);
        fullPath = [missingProperty];
        break;
    }

    let label = properties[field]?.label || field;

    return {
      messages,
      field,
      fullPath,
      label
    };
  };

  const removeNullAndUndefinedValue = (data) =>
    Object.keys(data).reduce((obj, key) => {
      const item = data[key];
      if (item !== null && item !== undefined) {
        // ''
        if (!required.includes(key) || item !== '') {
          if (item.constructor === Object) {
            obj[key] = removeNullAndUndefinedValue(item);
          } else {
            obj[key] = item;
          }
        }
      }
      return obj;
    }, {});

  return {
    validate(data) {
      const validData = removeNullAndUndefinedValue(data);
      // console.log("validate -> validData", validData)
      const success = complied(validData);
      const { errors = [] } = complied;

      const error = errors && errors?.map((error, i) => {
          const pathAndText = getPathAndTextByError(error);
          const input = globalThis?.window?.document?.querySelector(`[name=${pathAndText?.field}]`);
          let {
            x = 15000, y = 15000, left = 15000, top = 15000,
          } = input?.getBoundingClientRect() || {}

          return {
            ...error,
            ...pathAndText,
            x,
            y,
            left,
            top,
          };
        }).sort((prev, next) => prev.top < next.top ? -1 : 1)
      
      return {
        success,
        error
      };
    }
  };
};

const defaultFormatErrorText = {
  null: '',
  array: '배열형식이 아닙니다.',
  object: '객체형식이 아닙니다.',
  string: '텍스트형식 이어야 합니다.',
  number: '숫자형식 이어야 합니다.',
  date: '날짜형식 이어야 합니다. (예: 2020-01-01)',
  time: '시간 형식이어야 합니다. (예: 16:30:00)',
  dateTime: '날짜&시간 형식이어야 합니다. (예: 2020-01-01 16:30:00)',
  email: '이메일 형식이어야 합니다. (예: abcd@gmail.com)',
  phone: '전화번호 형식이어야 합니다. (예: 010-0000-1111)',
  crNo: '차량번호 형식이어야 합니다. (예: 1가1234)',
  number: '숫자 형식이어야 합니다.',
  abc: '알파벳 형식이어야 합니다.',
  abcNum: '알파벳과 숫자만 입력가능합니다.'
};
