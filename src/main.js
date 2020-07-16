import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {i18n} from './plugins/i18n'

//import toastr
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'

//import sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import _ from 'lodash'

window.auth_siscap = false

const options = {
  confirmButton: 'primary',
  cancelButtonColor: '#ff5252',
  confirmButtonText: "Confirmar",
  cancelButtonText: "Cancelar"
}

//lodash
Vue.use(_)

Vue.use(VueSweetalert2,options);

window.toastr = require('toastr')
Vue.use(VueToastr2)

Vue.config.productionTip = false

window.events = new Vue();

Vue.prototype.$eventHub = new Vue(); // Global event bus

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
