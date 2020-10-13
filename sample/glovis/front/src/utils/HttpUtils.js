import axios from 'axios';
import Cookies from 'js-cookie';
import { isEmpty, isUndefined } from 'lodash';

export const apiUrl = process.env.HOSTURL;
export const imgUrl = process.env.IMGURL;
export const imgUrls = process.env.IMGURLS;
export const frontUrl = process.env.FRONT_URL;
export const isProd = process.env.NODE_ENV === 'production';

const globalThis = require('globalthis')();
const protocol = globalThis?.window?.location?.protocol;
const type = protocol != undefined ? protocol.indexOf('http') : 0;

axios.defaults.baseURL = type != -1 ? apiUrl : apiUrl.replace('http', 'https');
axios.defaults.withCredentials = false; //isProd;
//axios.defaults.headers['Cache-Control'] = 'public, no-cache, must-revalidate, max-age=300';

axios.interceptors.request.use(
  function(config) {
    // console.log('config ::::::::::::: ', config);
    const accessToken = config.headers.get.Cookie?.accessToken ?? Cookies?.get('accessToken');
    console.log('accessToken :::::::::::::::::::::::::::::: ', accessToken);
    if (config.url === 'https://www.juso.go.kr/addrlink/addrLinkApi.do' || config.url === 'https://appleid.apple.com/auth/token') {
      // console.log();
    } else {
      if (accessToken) {
        config.headers.authorization = accessToken ?? null;
      } else {
        //config.headers.authorization = 'nologin';
      }
    }

    console.log("config :::::::::::::::::::::::::::::: ", config)
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    // console.log('::: axios.interceptors response {}', response);
    let returnCd = '';
    if (response && response.data && response.data.statusinfo) {
      returnCd = response.data.statusinfo.Returncd ? response.data.statusinfo.Returncd : response.data.statusinfo.returncd;
    }
    // console.log('::: axios.interceptors returnCd{}', returnCd);
    if (isEmpty(returnCd) || isUndefined(returnCd) || returnCd === 'SYS9999') {
      // console.log('알수없는 에러');
      // window.location.href = '/login'
      // response.redirect('/login');
      return response;
    }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export function config(isWait = true, accessToken = '', tokenflag = true) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 120000
  };

  if (isWait === true) {
    // console.log(isWait);
  }

  if (tokenflag) {
    // console.log('config>tokenflag=%o, accessToken=%o, Cookies?.get(accessToken)=%o ', tokenflag, accessToken, Cookies?.get('accessToken'));
    if (accessToken) {
      config.headers.authorization = accessToken ?? null;
    } else {
      config.headers.authorization = Cookies?.get('accessToken') ?? null;
    }
  }

  return config;
}

export function toggleWait() {
  // console.log('toggleWait');
}

export function aixosUpFile(url, data, isWait = false) {
  const con = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 120000
  };

  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config(isWait))
      .then((response) => {
        toggleWait();
        resolve(response);
      })
      .catch((err) => {
        toggleWait();
        reject(err);
      });
  });
}

export function axiosDown(url, isWait = false) {
  const option = config(isWait);

  return new Promise((resolve, reject) => {
    const urlOpt = {
      url: url,
      method: 'GET',
      responseType: 'blob' // important
    };

    axios(urlOpt, option)
      .then((response) => {
        toggleWait();
        resolve(response);
      })
      .catch((err) => {
        toggleWait();
        reject(err);
      });
  });
}

export function axiosGet(url, isWait = false, cancelToken = null, tokenflag = true) {
  const option = config(isWait, '', tokenflag);
  option.cancelToken = cancelToken;

  // console.log(url);
  // console.log(option);

  return new Promise((resolve, reject) => {
    axios
      .get(url, option)
      .then((response) => {
        toggleWait();
        resolve(response);
      })
      .catch((err) => {
        toggleWait();
        reject(err);
      });
  });
}

export async function axiosGetAsync(url, isWait = false, cancelToken = null) {
  let res = null;

  const option = config(isWait);
  option.cancelToken = cancelToken;

  try {
    res = await axios.get(url, option);
  } catch (err) {
    return err;
  }

  toggleWait();
  return res;
}

export function axiosDelete(url, params, isWait = true) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, params, config(isWait))
      .then((response) => {
        toggleWait();
        resolve(response);
      })
      .catch((err) => {
        toggleWait();
        reject(err);
      });
  });
}

export function axiosPost(url, data, tokenflag, refreshToken = '') {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config(true, refreshToken, tokenflag))
      .then((response) => {
        toggleWait();
        resolve(response);
      })
      .catch((err) => {
        toggleWait();
        reject(err);
      });
  });
}

export async function axiosPostAsync(url, data, isWait = true, cancelToken = null) {
  let res = null;

  const option = config(isWait);
  option.cancelToken = cancelToken;

  try {
    res = await axios.post(url, data, option);
  } catch (err) {
    return err;
  }
  toggleWait();

  return res;
}

export function axiosPut(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, config())
      .then((response) => {
        toggleWait();
        resolve(response);
      })
      .catch((err) => {
        toggleWait();
        reject(err);
      });
  });
}

export function axiosGetJson(url, jsonData) {
  const accessToken = Cookies.get('accessToken');
  const option = {
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 120000,
    params: jsonData
  };

  // console.log(accessToken);

  if (accessToken) {
    option.headers.authorization = accessToken;
  }

  return new Promise((resolve, reject) => {
    axios
      .get(url, option)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function aixosGetCert(url) {
  const option = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .get(url, option)
      .then((response) => {
        toggleWait();
        resolve(response);
      })
      .catch((err) => {
        toggleWait();
        reject(err);
      });
  });
}
