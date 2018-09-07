import test1 from '../src/test/test1.vue';
import test2 from '../src/test/test2.vue';
import test3 from '../src/test/test3.vue';
import test4 from '../src/test/test4.vue';
import test5 from '../src/test/test5__.vue';
import test6 from '../src/test/test6.vue';
import test7 from '../src/test/test7.vue';
import test8 from '../src/test/test8.vue';
import test9 from '../src/test/test9.vue';
import test11 from '../src/test/test11.vue';
import test12 from '../src/test/test12.vue';
import test13 from '../src/test/test13.vue';


let routesTest=[
    {
        name:'test1',
        path:'/test1',
        component:test1
    },
    {
        name:'test2',
        path:'/test2',
        component:test2
    },
    {
        name:'test3',
        path:'/test3',
        component:test3
    },
    {
        name:'test4',
        path:'/test4',
        component:test4
    },
    {
        name:'test5',
        path:'/test5',
        component:test5
    },
    {
        name:'test6',
        path:'/test6/:x',
        component:test6,
        props:true
    },
    {
        name:'test7',
        path:'/test7',
        component:test7
    },
    {
        name:'test8',
        path:'/test8',
        component:test8
    },
    {
        name:'test9',
        path:'/test9',
        component:test9
    },
    {
        name:'test11',
        path:'/test11',
        component:test11
    },
    {
        name:'test12',
        path:'/test12',
        component:test12
    },
    {
        name:'test13',
        path:'/test13',
        component:test13
    }
];

export {routesTest}