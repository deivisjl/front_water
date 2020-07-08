import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
/* Importar middleware */
import guest from './middleware/guest'
import auth from './middleware/auth'
import middlewarePipeline from './middleware/middlewarePipeline'

/* Importacion de componentes hacia las rutas */
import home from '@/components/HelloWorld';
import prueba from '@/components/PruebaComponent';
import login from '@/components/auth/LoginComponent';

Vue.use(VueRouter)

const routes = [
  {path:'/login', name:'login', component:login, meta: { middleware: [guest] }},
  {path:'/', name:'home', component:home, meta: { middleware: [auth] }},
  {path:'/prueba', name:'prueba', component:prueba, meta: { middleware: [auth] } },
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
