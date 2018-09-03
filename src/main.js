import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from '../router/routes.js';
import Vuex from 'vuex';
import {con} from './js/global';
Vue.use(VueRouter);
Vue.use(Vuex);

import 'mint-ui/lib/style.min.css';
import './styles/global.less';

import 'jquery';//expose
import 'better-scroll';//expose
import './plugins/indigo.js';


import app from './app.vue';

const store=new Vuex.Store({
   state:{
       HuanZhe:undefined,
       test:123
   },
   mutations:{
        makeSure_HuanZhe(state,data){
            state.HuanZhe=data;
            con('VuexCommit: ',data);
        }
    }
});

const router=new VueRouter({
    routes
});

const vueCase=new Vue({
    render:(core)=>core(app),
    router,
    store
}).$mount('#app');

// setInterval(()=>{
//    con('AAA',store.state.HuanZhe)
// },1000);

export {vueCase};
