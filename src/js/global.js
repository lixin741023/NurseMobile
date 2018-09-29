const platform_YiHu='31b648901b0943ca8363b926de44758e';
const platform_YiSheng='28e11226288343b882fa2ac28c45a65a';

const url='123';

sessionStorage.setItem('userId','25064b69447a42329bc38fa0feaa7429');//stand by

import {Toast} from 'mint-ui';
class tip {
    static success(text,time=850,fun){
        Toast({
            message:text,
            position:'middle',
            duration:time,
            iconClass: 'fa fa-check'
        });
        if(!fun){return}
        setTimeout(()=>{
            fun()
        },time+100);
    };
    static failed(text,time=1250,fun){
        Toast({
            message:text,
            position:'bottom',
            duration:time,
        });
        if(!fun){return}
        setTimeout(()=>{
            fun()
        },time+100);
    };
    static fromTop(text,time=850,fun){
        Toast({
            message:text,
            position:'top',
            duration:time
        });
        if(!fun){return}
        setTimeout(()=>{
            fun()
        },time+100);
    }
}
function con(text,data) {
    console.log('----------------');
    console.log(text,data);
    console.log('--------------------------------');
}

export {url,tip,con,platform_YiHu,platform_YiSheng};
