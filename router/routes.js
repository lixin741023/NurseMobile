import {vueCase} from "../src/main";
import {routesTest} from './routesTest.js';
import empty from '../src/components/nav/empty.vue';
import login from '../src/components/login.vue';
import optionA from '../src/components/options/optionA.vue';
import optionB from '../src/components/options/optionB.vue';
import optionC from '../src/components/options/optionC.vue';
import optionD from '../src/components/options/optionD.vue';
import optionE from '../src/components/options/optionE.vue';
import YiZhuJiaoDui from '../src/components/function/YiZhuJiaoDui/YiZhuJiaoDui.vue';
import YiZhuJiaoDui_detail from '../src/components/function/YiZhuJiaoDui/YiZhuJiaoDui_detail.vue';
import SanCeDanLuRu from '../src/components/function/SanCeDanLuRu/SanCeDanLuRu.vue';
import SanCeDanLurRu_detail from '../src/components/function/SanCeDanLuRu/SanCeDanLuRu_detail.vue';

let routes=[
    {
        name:'empty',
        path:'/empty/:empty/:backDest',
        component:empty,
        props:true
    },
    {
        name:'login',
        path:'/login',
        component:login
    },
    {
        name:'optionA',
        path:'/optionA',
        component:optionA
    },
    {
        name:'optionB',
        path:'/optionB',
        component:optionB
    },
    {
        name:'optionC',
        path:'/optionC',
        component:optionC
    },
    {
        name:'optionD',
        path:'/optionD',
        component:optionD
    },
    {
        name:'optionE',
        path:'/optionE',
        component:optionE
    },
    {
        name:'YiZhuJiaoDui',
        path:'/function/YiZhuJiaoDui',
        component:YiZhuJiaoDui,
        beforeEnter:(a,b,c)=>{
            if(vueCase.$store.state.HuanZhe){
                c({name:'YiZhuJiaoDui_detail',params:{
                        YiZhuJiaoDui_detail:vueCase.$store.state.HuanZhe
                    }})
            }else{
                c()
            }
        }
    },
    {
        name:'YiZhuJiaoDui_detail',
        path:'/function/YiZhuJiaoDui/:YiZhuJiaoDui_detail',
        component:YiZhuJiaoDui_detail,
        props:true
    },
    {
        name:'SanCeDanLuRu',
        path:'/function/SanCeDanLuRu',
        component:SanCeDanLuRu
    },
    {
        name:'SanCeDanLuRu_detail',
        path:'/function/SanCeDanLurRu/:SanCeDanLuRu_detail',
        component:SanCeDanLurRu_detail,
        props:true
    },
    {//重定向
        name:'default',
        path:'/',
        redirect:login
    }
];

for(let i=0; i<routesTest.length; i++){
    routes.push(routesTest[i])
}
export {routes}
