import Axios from 'axios'
import LoginService from '../services/LoginService'
import HomeService from '../services/HomeService'
import store from './index'
import router from '../router'

/*  */
import PermisoService from '../services/acceso/PermisoService'
import RolService from '../services/acceso/RolService'
import UsuarioService from '../services/acceso/UsuarioService'

/* Servicios de catalogos */
import EstadoServicioService from '@/services/catalogos/EstadoServicioService'
import TipoPagoService from '@/services/catalogos/TipoPagoService'
import SectorService from '@/services/catalogos/SectorService'

let baseUrl = 'http://www.sistema_agua.com'
//let baseUrl = 'http://161.35.114.1:8080'

const credentials = {
  GRANT_TYPE: 'password',
  GRANT_TYPE_REFRESH: 'refresh_token',
  CLIENT_ID: '1',
  CLIENT_SECRET: '9IXczXWmnnIZJfO7YgA1lNm6gw6fqXaowGhjokS5',
  //CLIENT_ID: '1',
  //CLIENT_SECRET: ' fPaeYn5noUM5vyhpgEMIraDlrHIGTd2gVCCsJFua'
}

const instance = Axios.create();

Axios.defaults.headers.common.Accept = 'application/json'
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let originalRequest = {}
// Agregar interceptor a las peticiones

Axios.interceptors.request.use(function (config) {
  
  if (!config.url.includes("oauth/token")) {
    
    originalRequest = config

    let token = store.state.services.loginService.existingValidToken()
         
    if (!token && store.state.services.loginService.verifyAuthCredentials()) {

        return refreshToken().then(res => {
            let formato = store.state.services.loginService.formatRefresh(res.data)
            store.state.services.loginService.storeCredentials(formato)
            let token = store.state.services.loginService.existingValidToken()

            originalRequest.headers.Authorization = token
            
            return Promise.resolve(originalRequest)
        })
    }
    else if(!store.state.services.loginService.verifyAuthCredentials())
    {
       store.state.services.loginService.logout()
       return router.push('/login')
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

function refreshToken() {
    var data = store.state.services.loginService.refreshToken()
    return new Promise(function(resolve, reject) {
        instance.post(baseUrl + '/api/oauth/token', data)
            .then(r => {
                resolve(r)
            }).catch(e => {
                reject(r)
            })
    })
}

export default {
  baseUrl,
  loginService: new LoginService(Axios, baseUrl, credentials),
  homeService: new HomeService(Axios, baseUrl),

  permisoService: new PermisoService(Axios, baseUrl),
  rolService: new RolService(Axios, baseUrl),
  usuarioService: new UsuarioService(Axios, baseUrl),

  /* Servicios de catalogos*/
  estadoServicioService: new EstadoServicioService(Axios, baseUrl),
  tipoPagoService: new TipoPagoService(Axios, baseUrl),
  sectorService: new SectorService(Axios, baseUrl),
}
