import axios from 'axios';

export function config(accessToken, isWait = false) {
  return {
    headers: {
      'Content-Type': 'application/json',
      authorization: accessToken
    },
    timeout: 120000
  };
}

export function axiosGet(url, cancelToken, isWait = false, accessToken) {
  const option = config(accessToken, isWait);
  option.cancelToken = cancelToken;

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

export async function axiosGetAsync(url, cancelToken, isWait = false, accessToken) {
  let res = null;

  const option = config(accessToken, isWait);
  option.cancelToken = cancelToken;

  try {
    res = await axios.get(url, option);
  } catch (err) {
    return err;
  }

  return res;
}

export function axiosDelete(url, isWait = true, accessToken) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, config(accessToken, isWait))
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function axiosPost(url, data, isWait = true, accessToken) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, config(accessToken, isWait))
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function axiosPostAsync(url, data, cancelToken, isWait = true, accessToken) {
  let res = null;

  const option = config(accessToken, isWait);
  option.cancelToken = cancelToken;

  try {
    res = await axios.post(url, data, option);
  } catch (err) {
    return err;
  }

  return res;
}

export function axiosPut(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, config())
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
