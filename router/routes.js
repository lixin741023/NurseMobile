import {routesTest} from './routesTest.js';
import login from '../src/components/login.vue';
import optionA from '../src/components/options/optionA.vue';
import optionB from '../src/components/options/optionB.vue';
import optionC from '../src/components/options/optionC.vue';
import optionD from '../src/components/options/optionD.vue';
import optionE from '../src/components/options/optionE.vue';

let routes=[
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
