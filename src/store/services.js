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
import ComiteService from '@/services/catalogos/ComiteService'
import AnioService from '@/services/catalogos/AnioService'
import MesService from '@/services/catalogos/MesService'
import AutorizacionService from '@/services/catalogos/AutorizacionService'

/*Servicio de usuario*/
import UsuariosService from '@/services/usuario/UsuarioService'

/* Servicio de solicitud */
import SolicitudService from '@/services/solicitud/SolicitudService'

/* Servicio de servicio */
import ServicioService from '@/services/servicio/ServicioService'

/* Servicio de pagos */
import PagoService from '@/services/pago/PagoService'

/* Servicio de mis servicios */
import MiServicioService from '@/services/mis-servicios/MiServicioService'

/* Servicio de reportes */
import ReporteService from '@/services/reportes/ReporteService'

let baseUrl = 'http://www.sistema_agua.com'
//let baseUrl = 'http://161.35.114.1:8080'

const credentials = {
  GRANT_TYPE: 'password',
  GRANT_TYPE_REFRESH: 'refresh_token',
  CLIENT_ID: '1',
  CLIENT_SECRET: 'Cp72cbCgQ0AAkrERcuaNXtQ2pBblQjMfycXOx7aZ',
  //CLIENT_ID: '1',
  //CLIENT_SECRET: ''
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
  comiteService: new ComiteService(Axios, baseUrl),
  anioService: new AnioService(Axios, baseUrl),
  mesService: new MesService(Axios, baseUrl),
  autorizacionService: new AutorizacionService(Axios, baseUrl),

  /* Servicios de usuario */
  usuariosService: new UsuariosService(Axios, baseUrl),

  /* Servicio de solicitud */
  solicitudService: new SolicitudService(Axios, baseUrl),

  /* Servicio de servicio */
  servicioService: new ServicioService(Axios, baseUrl),

  /* Servicio de pago */
  pagoService: new PagoService(Axios, baseUrl),

  /* Servicio de mis servicios */
  miServicioService: new MiServicioService(Axios, baseUrl),

  /* Servicio de reporte */
  reporteService: new ReporteService(Axios, baseUrl),
}
