import BingQuJiaoBan from '../src/components/function/BingQuJiaoBan/BingQuJiaoBan.vue';
import HuLiDanChaKan from '../src/components/function/HuLiDanChaKan/HuLiDanChaKan.vue';
import DianZiBingLiChaKan from '../src/components/function/DianZiBingLiChaKan/DianZiBingLiChaKan.vue';
import empty from '../src/components/nav/empty.vue';
import optionA from '../src/components/options/optionA.vue';
import optionD from '../src/components/options/optionD.vue';
import {vueCase} from "../src/main";
import YiZhuZhiXing from '../src/components/function/YiZhuZhiXing/YiZhuZhiXing.vue';
import YiZhuJiaoDui_detail from '../src/components/function/YiZhuJiaoDui/YiZhuJiaoDui_detail.vue';
import {routesTest} from './routesTest.js';
import optionE from '../src/components/options/optionE.vue';
import YiZhuJiaoDui from '../src/components/function/YiZhuJiaoDui/YiZhuJiaoDui.vue';
import TiWenDanLuRu_detail from '../src/components/function/TiWenDanLuRu/TiWenDanLuRu_detail.vue';
import JiaoBanChaXun from '../src/components/function/JiaoBanChaXun/JiaoBanChaXun.vue';
import TiWenDanChaKan from '../src/components/function/TiWenDanChaKan/TiWenDanChaKan.vue';
import TiWenDanChaKan_detail from '../src/components/function/TiWenDanChaKan/TiWenDanChaKan_detail.vue';
import HuanZheFeiYongChaXun from '../src/components/function/HuanZheFeiYongChaXun/HuanZheFeiYongChaXun.vue';
import HuanZheFeiYongChaXun_detail from '../src/components/function/HuanZheFeiYongChaXun/HuanZheFeiYongChaXun_detail.vue';
import JiaoBanChaXun_detail from '../src/components/function/JiaoBanChaXun/JiaoBanChaXun_detail.vue';
import ShuYeZhiXing from '../src/components/function/ShuYeZhiXing/ShuYeZhiXing.vue';
import HuLiBingLiChaKan from '../src/components/function/HuLiBingLiChaKan/HuLiBingLiChaKan.vue';
import login from '../src/components/login.vue';
import HuLiDanChaKan_detail from '../src/components/function/HuLiDanChaKan/HuLiDanChaKan_detail.vue';
import HuLiDanLuRu from '../src/components/function/HuLiDanLuRu/HuLiDanLuRu.vue';
import HuLiDanLuRu_detail from '../src/components/function/HuLiDanLuRu/HuLiDanLuRu_detail.vue';
import optionB from '../src/components/options/optionB.vue';
import DianZiBingLiChaKan_detail from '../src/components/function/DianZiBingLiChaKan/DianZiBingLiChaKan_detail.vue';
import TiWenDanLuRu from '../src/components/function/TiWenDanLuRu/TiWenDanLuRu.vue';
import optionC from '../src/components/options/optionC.vue';
import HuLiBingLiCHaKan_detail from '../src/components/function/HuLiBingLiChaKan/HuLiBingLiChaKan_detail.vue';
import KouFuYaoZhiXing from '../src/components/function/KouFuYaoZhiXing/KouFuYaoZhiXing.vue';

let routes=[
    {
        name:'KouFuYaoZhiXing',
        path:'/function/KouFuYaoZhiXing',
        component:KouFuYaoZhiXing
    },
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
                c();
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
      name:'YiZhuZhiXing',
      path:'/function/YiZhuZhiXing',
      component:YiZhuZhiXing
    },
    {
      name:'ShuYeZhiXing',
      path:'/function/ShuYeZhiXing',
      component:ShuYeZhiXing
    },
    {
        name:'TiWenDanLuRu',
        path:'/function/TiWenDanLuRu',
        component:TiWenDanLuRu,
        beforeEnter:(a,b,next)=>{
            if(vueCase.$store.state.HuanZhe){
                next({
                    name:'TiWenDanLuRu_detail',params: {
                        TiWenDanLuRu_detail:vueCase.$store.state.HuanZhe
                    }
                })
            }else{
                next();
            }
        }
    },
    {
        name:'TiWenDanLuRu_detail',
        path:'/function/TiWenDanLuRu/:TiWenDanLuRu_detail',
        component:TiWenDanLuRu_detail,
        props:true
    },
    {
        name:'TiWenDanChaKan',
        path:'/function/TiWenDanChaKan',
        component:TiWenDanChaKan,
        beforeEnter:(a,b,c)=>{
            if(vueCase.$store.state.HuanZhe){
                c({
                    name:'TiWenDanChaKan_detail',
                    params:{
                        TiWenDanChaKan_detail:vueCase.$store.state.HuanZhe
                    }
                })
            }else{
                c();
            }
        }
    },
    {
        name:'TiWenDanChaKan_detail',
        path:'/function/TiWenDanChaKan/:TiWenDanChaKan_detail',
        component:TiWenDanChaKan_detail,
        props:true
    },
    {
        name:'HuanZheFeiYongChaXun',
        path:'/function/HuanZheFeiYongChaXun',
        component:HuanZheFeiYongChaXun,
        beforeEnter:(a,b,c)=>{
            if(vueCase.$store.state.HuanZhe){
                c({
                    name:'HuanZheFeiYongChaXun_detail',
                    params:{
                        HuanZheFeiYongChaXun_detail:vueCase.$store.state.HuanZhe
                    }
                })
            }else{
                c();
            }
        }
    },
    {
        name:'HuanZheFeiYongChaXun_detail',
        path:'/function/HuanZheFeiYongChaXun/:HuanZheFeiYongChaXun_detail',
        component:HuanZheFeiYongChaXun_detail,
        props:true
    },
    {
        name:'JiaoBanChaXun',
        path:'/function/JiaoBanChaXun',
        component:JiaoBanChaXun
    },
    {
        name:'JiaoBanChaXun_detail',
        path:'/function/JiaoBanChaXun/:JiaoBanChaXun_detail ',
        component:JiaoBanChaXun_detail,
        props:true
    },
    {
        name:'BingQuJiaoBan',
        path:'/function/BingQuJiaoBan',
        component:BingQuJiaoBan
    },
    {
        name:'HuLiDanChaKan',
        path:'/function/HuLiDanChaKan',
        component:HuLiDanChaKan,
        beforeEnter:(a,b,c)=>{
            if(vueCase.$store.state.HuanZhe){
                c({
                    name:'HuLiDanChaKan_detail',
                    params:{
                        HuLiDanChaKan_detail:vueCase.$store.state.HuanZhe
                    }
                })
            }else{
                c();
            }
        }
    },
    {
        name:'HuLiDanChaKan_detail',
        path:'/function/HuLiDanChaKan/:HuLiDanChaKan_detail',
        component:HuLiDanChaKan_detail,
        props:true
    },
    {
        name:'HuLiDanLuRu',
        path:'/function/HuLiDanLuRu',
        component:HuLiDanLuRu,
        beforeEnter:(a,b,c)=>{
            if(vueCase.$store.state.HuanZhe){
                c({
                    name:'HuLiDanLuRu_detail',
                    params:{
                        HuLiDanLuRu_detail:vueCase.$store.state.HuanZhe
                    }
                })
            }else{
                c();
            }
        }
    },
    {
        name:'HuLiDanLuRu_detail',
        path:'/function/HuLiDanLuRu/:HuLiDanLuRu_detail',
        component:HuLiDanLuRu_detail,
        props:true
    },
    {
        name:'DianZiBingLiChaKan',
        path:'/function/DianZiBingLiChaKan',
        component:DianZiBingLiChaKan,
        beforeEnter:(a,b,c)=>{
            if(vueCase.$store.state.HuanZhe){
                c({
                    name:'DianZiBingLiChaKan_detail',
                    params:{
                        DianZiBingLiChaKan_detail:vueCase.$store.state.HuanZhe
                    }
                })
            }else{
                c();
            }
        }
    },
    {
        name:'DianZiBingLiChaKan_detail',
        path:'/function/DianZiBingLiChaKan/:DianZiBingLiChaKan_detail',
        component:DianZiBingLiChaKan_detail,
        props:true
    },
    {
        name:'HuLiBingLiChaKan',
        path:'/function/HuLiBingLiChaKan',
        component:HuLiBingLiChaKan,
        beforeEnter:(a,b,c)=>{
            if(vueCase.$store.state.HuanZhe){
                c({
                    name:'HuLiBingLiChaKan_detail',
                    params:{
                        HuLiBingLiChaKan_detail:vueCase.$store.state.HuanZhe
                    }
                })
            }else{
                c();
            }
        }
    },
    {
        name:'HuLiBingLiChaKan_detail',
        path:'/function/HuLiBingLiChaKan/:HuLiBingLiChaKan_detail',
        component:HuLiBingLiCHaKan_detail,
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
