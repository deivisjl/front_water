import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
/* Importar middleware */
import guest from './middleware/guest'
import auth from './middleware/auth'
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
import usuarioNuevo from '@/components/acceso/usuario/Nuevo';
import usuarioEditar from '@/components/acceso/usuario/Editar';
import usuarioRoles from '@/components/acceso/usuario/Roles';

Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/' },
  {path:'/login', name:'login', component:login, meta: { middleware: [guest] }},
  {path:'/', name:'home', component:home, meta: { middleware: [auth] }},

  /* Rutas del menu de acceso */
  {path:'/permisos', name:'permiso', component:permiso, meta: { middleware: [auth] }},

  {path:'/roles', name:'rol', component:rol, meta: { middleware: [auth] }},
  {path:'/roles/nuevo', name:'rolNuevo', component:rolNuevo, meta: { middleware: [auth] }},
  {path:'/roles/editar/:id', name:'rolEditar', component:rolEditar, meta: { middleware: [auth] }},

  {path:'/usuarios', name:'usuario', component:usuario, meta: { middleware: [auth] }},
  {path:'/usuarios/nuevo', name:'usuarioNuevo', component:usuarioNuevo, meta: { middleware: [auth] }},
  {path:'/usuarios/editar/:id', name:'usuarioEditar', component:usuarioEditar, meta: { middleware: [auth] }},
  {path:'/usuarios/roles/:id', name:'usuarioRoles', component:usuarioRoles, meta: { middleware: [auth] }},
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
