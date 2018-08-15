import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from '../router/routes.js';
import Vuex from 'vuex';
Vue.use(VueRouter);
Vue.use(Vuex);

/*styles*/
// import 'frozenui/css/frozen.css';
import 'mint-ui/lib/style.min.css';
import './styles/global.less';

/*script*/
import 'jquery';//expose
import 'better-scroll';//expose
import './plugins/indigo.js';

/*components*/
import app from './app.vue';

/*testUnit*/

const store=new Vuex.Store({
   state:{
       test:0
   }
});


const router=new VueRouter({
    routes
});
/*Entry*/
new Vue({
    render:(core)=>core(app),
    router,
    store
}).$mount('#app');

