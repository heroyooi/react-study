const os = require('os');
const fs = require('fs');
const querystring = require('querystring');
const dotenv = require('dotenv');
const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const router = express.Router();
const cacheableResponse = require('cacheable-response')

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';
const apiUrl = process.env.HOSTURL;
axios.defaults.baseURL = apiUrl;

axios.defaults.withCredentials = false; //isProd;
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.delete['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 2500;

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

console.log('process.env.API_PROXY_URL :::::::: ', process.env.API_PROXY_URL);

// const ssrCache = cacheableResponse({
//   ttl: 1000 * 60 * 5, // 5min
//   get: async ({ req, res }) => {
//     const data = await app.renderToHTML(req, res, req.path, {
//       ...req.query,
//       ...req.params,
//     })

//     // Add here custom logic for when you do not want to cache the page, for
//     // example when the page returns a 404 status code:
//     if (res.statusCode === 404) {
//       res.end(data)
//       return
//     }
//     return { data }
//   },
//   send: ({ data, res }) => res.send(data),
// })

const apiProxyOpts = {
  target: process.env.API_PROXY_URL,
  proxyTimeout: 35,
  timeout: 30,
  logLevel: 'error',
  changeOrigin: true,
  secure: false,
  error: 'error'
};

const getClientSecret = () => {
  // sign with RSA SHA256
  const privateKey = fs.readFileSync('/webroot/was/external/app/AuthKey_5469V8YZZ7.p8');
  //const privateKey = fs.readFileSync('./src/apple/AuthKey_5469V8YZZ7.p8');
  const headers = {
    kid: '5469V8YZZ7', //process.env.KEY_ID,
    typ: undefined // is there another way to remove type?
  };
  const claims = {
    iss: 'Y7L26573Q4', //process.env.TEAM_ID,
    aud: 'https://appleid.apple.com',
    sub: 'autobell.glovisaa.glovis' //process.env.CLIENT_ID,
  };

  token = jwt.sign(claims, privateKey, {
    algorithm: 'ES256',
    header: headers,
    expiresIn: '24h'
  });

  return token;
};

const getUserId = (token) => {
  const parts = token.split('.');
  try {
    return JSON.parse(new Buffer(parts[1], 'base64').toString('ascii'));
  } catch (e) {
    return null;
  }
};

app.prepare().then(() => {
  const server = express();

  function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
      return false;
    }

    return compression.filter(req, res);
  }

  server.disable('x-powered-by');
  server.use(compression({ filter: shouldCompress }));
  server.use(cors({
    methods: ['GET', 'POST']
  }));
  server.set('trust proxy', 'loopback');
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser());
  server.use('/api/*', proxy(apiProxyOpts));

  // server.get('/main', (req, res) => {
  //   return ssrCache({ req, res })
  // })

  server.get('/svc/system/environment', function (req, res) {
    const env = {
      apiProxyUrl: process.env.API_PROXY_URL,
      canonicalUrl: process.env.CANONICAL_URL,
      domain: process.env.DOMAIN,
      environment: process.env.ENVIRONMENT,
      nodeEnv: process.env.NODE_ENV
    };

    console.info(env);
    res.status(200);
    res.send(env);
  });

  server.get('/svc/system/now', function (req, res) {
    const toDay = new Date();

    res.header('Cache-Control', 'public, no-cache, must-revalidate, max-age=300');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 0);
    res.send(`${toDay.getFullYear()}-${toDay.getMonth() + 1}-${toDay.getDate()}`);
  });

  server.get('/svc/system/healthcheck', function (req, res) {
    res.status(200);
    res.send({
      platform: os.platform(),
      freemem: os.freemem(),
      hostname: os.hostname(),
      loadavg: os.loadavg(),
      uptime: os.uptime()
    });
  });
  server.get('/appleCallback', async (req, res) => {
    const clientSecret = getClientSecret();
    const requestBody = {
      grant_type: 'authorization_code',
      code: req.query.code,
      redirect_uri: 'https://testautobell.glovis.net/appleCallback', //process.env.REDIRECT_URI,
      //redirect_uri: 'http://aaa.autobell.com/appleCallback', //process.env.REDIRECT_URI,
      client_id: 'autobell.glovisaa.glovis', //process.env.CLIENT_ID,
      client_secret: clientSecret,
      scope: 'name email' //process.env.SCOPE
    };

    console.log('requestBody :::: ', requestBody);
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const result = await axios
      .request({
        method: 'POST',
        url: 'https://appleid.apple.com/auth/token',
        data: querystring.stringify(requestBody),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then((response) => {
        console.log(response);
        /*
        return res.json({
          success: true,
          data: getUserId(response.data.id_token)
        });*/
        console.log(response.data.id_token);

        return getUserId(response.data.id_token).sub;
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          success: false,
          error: error.response.data
        });
      });
    //const url = 'http://aaa.autobell.com/api/member/selectMbSnsCnt.do?mbSnsId=' + result + '&mbSnsKncd=0030';
    const url = 'https://testautobell.glovis.net/api/member/selectMbSnsCnt.do?mbSnsId=' + result + '&mbSnsKncd=0030';
    const configT = {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 120000
    };

    const result2 = await axios
      .get(url, configT)
      .then((response) => {
        console.log('response!!!!    ', response);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    if (result2 > 0) {
      console.log('기 가입된 회원임 ㅇㅇ', result2);
      const param = {
        mbSnsId: result,
        mbSnsKncd: '0030'
      };
      const accessTokenValidMinute = 1000 * 60 * 15; //15분
      const refreshTokenValidMinute = 1000 * 60 * 30; //30분
      await axios
        .post('/api/auth/token.do', param, false)
        .then(({ data }) => {
          console.log('=========================================');
          console.log('loginAction>data=' + JSON.stringify(data));

          if (data.statusinfo.returncd === 'SUCCESS' || data.statusinfo.returncd === 'MBR5001' || data.statusinfo.returncd === 'MBR5002' || data.statusinfo.returncd === 'MBR5003'|| data.statusinfo.returncd === 'MBR5005') {
            // 로그인 후 process
            console.log('===========================================================================1');
            console.log('loginReducer > data', data);
            console.log('loginReducer > jwt.decode', jwt.decode(data.accessToken));
            const decodeJWT = jwt.decode(data.accessToken);
            // userInfo = data;
            // isLogin = true;
            res.cookie('accessToken', data.accessToken, accessTokenValidMinute);
            res.cookie('accessTokenSession', data.accessToken); //세션 close >  쿠키삭제
            res.cookie('refreshToken', data.refreshToken, refreshTokenValidMinute);
            res.cookie('membertype', data.statusinfo.membertype, accessTokenValidMinute);
            res.cookie('id', decodeJWT.id, accessTokenValidMinute);
            res.cookie('name', decodeJWT.name, accessTokenValidMinute);
            res.cookie('type', 'member', accessTokenValidMinute);
            res.cookie('menuAuthruleCd', data.menuAuthruleCd, accessTokenValidMinute);
            res.cookie('mbLiveshotYn', data.mbLiveshotYn, accessTokenValidMinute);
            res.cookie('mbAuthCd', data.mbAuthCd, accessTokenValidMinute);
            // loginReturnCd = data.statusinfo.returncd;
            // console.log('loginReducer > decodeJWT.id', decodeJWT.id);
            // console.log('loginReducer > decodeJWT.name', decodeJWT.name);
            //createCookie('name', name, accessTokenValidMinute);
            // returnCd = 'SUCCESS';
            app.render(req, res, '/', req.query);
          } else {
            console.log('===========================================================================2');
            // isLogin = false;
            res.cookie('membertype', data.statusinfo.membertype, accessTokenValidMinute);
            // loginReturnCd = data.statusinfo.returncd;
            // loginReturnMsg = data.statusinfo.returnmsg;
            // returnCd = 'FAIL';
            app.render(req, res, '/error', req.query);
          }
        })
        .catch((err) => {
          console.log(err);
          app.render(req, res, '/error', req.query);
        });
    } else {
      const configT = {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 120000
      };
      // res.render('/main');
      // router.push('/main');
      console.log('result     ', result);
      //mbTpcd
      req.query.mbTpcd = '0010';
      req.query.mbSnsId = result;
      req.query.mbSnsKncd = '0030';
      req.query.isSnsReg = 'Y';
      console.log(' req.query     ', req.query);
      console.log(' req.param     ', req.param);

      app.render(req, res, '/member/memberPolicyAgreement', req.query);

      //res.render('/member/memberPolicyAgreement', { mbSnsId: result, mbSnsKncd: '0030' });
      //res.render('/login', {}, function(err, html) {
      //  console.log('####login');
      //});

      //  router.post('/', function(req, res, next) {
      //    const mbSnsId = req.body.result;
      //    const mbSnsKncd = '0030';
      //    console.log('### post request');
      //    res.render('login', { mbSnsId: mbSnsId, mbSnsKncd: mbSnsKncd, method: 'post' });
      //  });
      //  .then((response) => {
      //    console.log(response);
      //    return response.data.data;
      //  })
      //  .catch((error) => {
      //    console.log(error);
      //  });

      // res.redirect('/member/memberPolicyAgreement');
    }
    //res.status(200);
    //res.send(result2);
  });

  server.all('*', (req, res) => {
    axios.defaults.headers.get.Cookie = req.cookies || null;
    return handle(req, res);
  });

  const serverApp = server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

  console.log("serverApp.keepAliveTimeout before :", serverApp.keepAliveTimeout)
  console.log("serverApp.headersTimeout before :", serverApp.headersTimeout)

  // serverApp.keepAliveTimeout = 10 * 1000
  // serverApp.headersTimeout = 10 * 1000

  // console.log("serverApp.keepAliveTimeout after :", serverApp.keepAliveTimeout)
  // console.log("serverApp.headersTimeout after :", serverApp.headersTimeout)

});
