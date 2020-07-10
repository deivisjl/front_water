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

Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/' },
  {path:'/login', name:'login', component:login, meta: { middleware: [guest] }},
  {path:'/', name:'home', component:home, meta: { middleware: [auth] }},

  /* Rutas del menu de acceso */
  {path:'/permisos', name:'permiso', component:permiso, meta: { middleware: [auth] }},
  {path:'/roles', name:'rol', component:rol, meta: { middleware: [auth] }},
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
