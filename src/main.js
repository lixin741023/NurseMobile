import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from '../router/routes.js';
Vue.use(VueRouter);

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


const router=new VueRouter({
    routes
});
/*Entry*/
new Vue({
    render:(core)=>core(app),
    router
}).$mount('#app');

setInterval(()=>{
    console.log(`当前的userId是：   ${sessionStorage.getItem('userId')}`)
    console.log('')
},10000);
