import Axios from 'axios'
import LoginService from '../services/LoginService'
import HomeService from '../services/HomeService'
import store from './index'

/*  */
import PermisoService from '../services/acceso/PermisoService'

let baseUrl = 'http://www.sistema_agua.com'

const credentials = {
  GRANT_TYPE: 'password',
  GRANT_TYPE_REFRESH: 'refresh_token',
  CLIENT_ID: '1',
  CLIENT_SECRET: 'a4vjRLopDm1ePznpY4fifo3VEkLXO1tQT3kgf1n7'
}

Axios.defaults.headers.common.Accept = 'application/json'
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let originalRequest = {}
let subscribers = []
// Agregar interceptor a las peticiones
Axios.interceptors.request.use(function (config) {
  
  if (!config.url.includes("oauth/token")) {
    
    originalRequest = config

    let token = store.state.services.loginService.existingValidToken()
    
    if (!token && store.state.services.loginService.verifyAuthCredentials()) {
      subscribers = []
      store.state.services.loginService.refreshToken()
      .then(r =>{
        originalRequest.headers.Authorization = r
        
        const requestSubscribers = new Promise(resolve => {
          subscribeTokenRefresh(() => {
            resolve(Axios(originalRequest));
          });
        });
        onRefreshed();
        return requestSubscribers; 
      })
      .catch(err =>{
        return originalRequest
      })
    }
    else //if verifyAuthCredentials
    {
      originalRequest.headers.Authorization = token

      return originalRequest;
    }
  }
  else //if oauth-token
  {
    return config
  }
}, 
function (error) {
  // Do something with request error
  return Promise.reject(error);
});

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRefreshed() {
  subscribers.map(cb => cb());
}

export default {
  baseUrl,
  loginService: new LoginService(Axios, baseUrl, credentials),
  homeService: new HomeService(Axios, baseUrl),

  permisoService: new PermisoService(Axios, baseUrl),
}
