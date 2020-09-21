import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
/* Importar middleware */
import guest from './middleware/guest'
import auth from './middleware/auth'
import menu from './middleware/menu'
import middlewarePipeline from './middleware/middlewarePipeline'

/* Importacion de componentes hacia las rutas */
import home from '@/components/InicioComponent';
import login from '@/components/auth/LoginComponent';

/* Importación de componentes del menu de acceso */
import permiso from '@/components/acceso/permiso/Inicio';

import rol from '@/components/acceso/rol/Inicio';
import rolNuevo from '@/components/acceso/rol/Nuevo';
import rolEditar from '@/components/acceso/rol/Editar';

import usuario from '@/components/acceso/usuario/Inicio';
import usuarioRoles from '@/components/acceso/usuario/Roles';

/* Componentes de catalogos*/
/* Componentes de estado servicio */
import estadoServicio from '@/components/catalogos/estado_servicio/Inicio';
import estadoServicioNuevo from '@/components/catalogos/estado_servicio/Nuevo';
import estadoServicioEditar from '@/components/catalogos/estado_servicio/Editar';

/* Componentes de tipo pago*/
import tipoPago from '@/components/catalogos/tipo_pago/Inicio';
import tipoPagoNuevo from '@/components/catalogos/tipo_pago/Nuevo';
import tipoPagoEditar from '@/components/catalogos/tipo_pago/Editar';

/* Componentes de sector*/
import sector from '@/components/catalogos/sectores/Inicio';
import sectorNuevo from '@/components/catalogos/sectores/Nuevo';
import sectorEditar from '@/components/catalogos/sectores/Editar';

/* Componentes de sector*/
import comite from '@/components/catalogos/comite/Inicio';
import comiteNuevo from '@/components/catalogos/comite/Nuevo';
import comiteEditar from '@/components/catalogos/comite/Editar';

/*Componentes de usuario*/
import usuarios from '@/components/usuarios/Inicio';
import usuariosNuevo from '@/components/usuarios/Nuevo';
import usuariosEditar from '@/components/usuarios/Editar';

/* Componentes de usuario */
import solicitud from '@/components/solicitud/Inicio';
import solicitudNuevo from '@/components/solicitud/Nuevo';
import solicitudEditar from '@/components/solicitud/Editar';
import solicitudAprobar from '@/components/solicitud/Aprobar';
import solicitudRechazar from '@/components/solicitud/Rechazar';

/* Componentes de servicio */
import servicio from '@/components/servicios/Inicio';
import servicioDetalle from '@/components/servicios/Detalle';

/* Componentes de pagos */
import pago from '@/components/pagos/Inicio';
import pagoNuevo from '@/components/pagos/Nuevo';
import pagoDetalle from '@/components/pagos/Detalle';

Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/' },
  {path:'/login', name:'login', component:login, meta: { middleware: [guest] }},
  {path:'/', name:'home', component:home, meta: { middleware: [auth] }},

  /* Rutas del menu de acceso */
  {path:'/permisos', name:'permiso', component:permiso, meta: { middleware: [auth,menu] }},

  {path:'/roles', name:'rol', component:rol, meta: { middleware: [auth,menu] }},
  {path:'/roles/nuevo', name:'rolNuevo', component:rolNuevo, meta: { middleware: [auth,menu] }},
  {path:'/roles/editar/:id', name:'rolEditar', component:rolEditar, meta: { middleware: [auth,menu] }},

  {path:'/usuarios-rol', name:'usuario', component:usuario, meta: { middleware: [auth,menu] }},
  {path:'/usuarios-rol/roles/:id', name:'usuarioRoles', component:usuarioRoles, meta: { middleware: [auth,menu] }},

  /* Rutas de estado servicio */
  {path:'/estado-servicio', name:'estado_servicio', component:estadoServicio, meta: { middleware: [auth,menu] }},
  {path:'/estado-servicio/nuevo', name:'estado_servicio_nuevo', component:estadoServicioNuevo, meta: { middleware: [auth,menu] }},
  {path:'/estado-servicio/editar/:id', name:'estado_servicio_editar', component:estadoServicioEditar, meta: { middleware: [auth,menu] }},

  /* Rutas de tipo pago */
  {path:'/tipo-pago', name:'tipo_pago', component:tipoPago, meta: { middleware: [auth,menu] }},
  {path:'/tipo-pago/nuevo', name:'tipo_pago_nuevo', component:tipoPagoNuevo, meta: { middleware: [auth,menu] }},
  {path:'/tipo-pago/editar/:id', name:'tipo_pago_editar', component:tipoPagoEditar, meta: { middleware: [auth,menu] }},

  /* Rutas de sectores */
  {path:'/sectores', name:'sectores', component:sector, meta: { middleware: [auth,menu] }},
  {path:'/sectores/nuevo', name:'sectores_nuevo', component:sectorNuevo, meta: { middleware: [auth,menu] }},
  {path:'/sectores/editar/:id', name:'sectores_editar', component:sectorEditar, meta: { middleware: [auth,menu] }},

  /* Rutas de comite */
  {path:'/comite', name:'comite', component:comite, meta: { middleware: [auth,menu] }},
  {path:'/comite/nuevo', name:'comite_nuevo', component:comiteNuevo, meta: { middleware: [auth,menu] }},
  {path:'/comite/editar/:id', name:'comite_editar', component:comiteEditar, meta: { middleware: [auth,menu] }},

  /* Rutas de usuarios*/
  {path:'/usuarios', name:'usuarios', component:usuarios, meta: { middleware: [auth,menu] }},
  {path:'/usuarios/nuevo', name:'usuarios_nuevo', component:usuariosNuevo, meta: { middleware: [auth,menu] }},
  {path:'/usuarios/editar/:id', name:'usuarios_editar', component:usuariosEditar, meta: { middleware: [auth,menu] }},

  /* Rutas de solicitudes */
  {path:'/solicitudes', name:'solicitud', component:solicitud, meta: { middleware: [auth,menu] }},
  {path:'/solicitudes/nuevo', name:'solicitud_nuevo', component:solicitudNuevo, meta: { middleware: [auth,menu] }},
  {path:'/solicitudes/editar/:id', name:'solicitud_editar', component:solicitudEditar, meta: { middleware: [auth,menu] }},
  {path:'/solicitudes/aprobar/:id', name:'solicitud_aprobar', component:solicitudAprobar, meta: { middleware: [auth,menu] }},
  {path:'/solicitudes/rechazar/:id', name:'solicitud_rechazar', component:solicitudRechazar, meta: { middleware: [auth,menu] }},

  /* Rutas de servicio */
  {path:'/servicios', name:'servicio', component:servicio, meta: { middleware: [auth,menu] }},
  {path:'/servicios/detalle/:id', name:'servicio_detalle', component:servicioDetalle, meta: { middleware: [auth,menu] }},

  /* Rutas de pagos */
  {path:'/pagos', name:'pagos', component:pago, meta: { middleware: [auth,menu] }},
  {path:'/pagos/nuevo/:id', name:'pagosNuevo', component:pagoNuevo, meta: { middleware: [auth,menu] }},
  {path:'/pagos/detalle/:id', name:'pagosDetalle', component:pagoDetalle, meta: { middleware: [auth,menu] }},
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
      return next()
  }
  const middleware = to.meta.middleware

  const context = {
      to,
      from,
      next,
      store
  }
  return middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1)
  })

})

export default router
