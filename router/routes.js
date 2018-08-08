import login from '../src/components/login.vue';
import optionA from '../src/components/options/optionA.vue';

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
    {//重定向
        name:'default',
        path:'/',
        redirect:login
    }
];

export {routes}
