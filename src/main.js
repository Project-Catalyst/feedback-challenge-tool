import Vue from 'vue'
import Buefy from "buefy";
import App from './App.vue'
import router from './router'
import Clipboard from 'v-clipboard'
import './plugins/axios'
import './plugins/multiselect';

import "buefy/dist/buefy.css";
import "./assets/sass/main.scss";

Vue.config.productionTip = false
Vue.use(Buefy);
Vue.use(Clipboard)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
