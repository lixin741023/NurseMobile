import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from '../router/routes.js';
import Vuex from 'vuex';
import {con} from './js/global';
Vue.use(VueRouter);
Vue.use(Vuex);

import 'mint-ui/lib/style.min.css';
import './styles/global.less';


import 'jquery';//exp
import 'better-scroll'//poz;
import './plugins/indigo.js';
import './js/localStorage.js';



import app from './app.vue';

const store=new Vuex.Store({
   state:{
       HuanZhe:undefined,
       operation:undefined,
       BingQuJiaoBan__check_KeShi:undefined,
       // url:undefined,
       url:'http://7.0.0.111:8084/StarTrekMED',
       optionC_tab_status:undefined,
   },
   mutations:{
       makeSure_HuanZhe(state,data){
            state.HuanZhe=data;
            con('VuexCommit_HuanZhe',data);
        },
       makeSure_operation(state,data){
            state.operation=data;
            con('VuexCommit_operation: ',data);
       },
       makeSure_BingQuJiaoBan__check_KeShi(state,data){
           state.BingQuJiaoBan__check_KeShi=data;
           con('VuexCommit_BingQuJiaoBan__check_KeShi: ',data);
       },
       makeSure_url(state,data){
           state.url=data;
           con('当前连接的服务器',data);
       },
       makeSure_optionC_tab_status(state,data){
            state.optionC_tab_status=data;
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

import mui from './plugins/mui-master/dist/js/mui.js';
mui.plusReady(function() {
    plus.navigator.setStatusBarStyle("UIStatusBarStyleBlackOpaque");
    plus.navigator.setStatusBarBackground('#617FDE');
});


export {vueCase};
