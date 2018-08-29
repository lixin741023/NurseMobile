// const url='http://7.0.0.116:8084/StarTrekMED';//龚帅
// const url='http://7.0.0.114:8083/StarTrekMED';//李吉平
const url='http://7.0.0.111:8084/StarTrekMED';//杨晓

/************************
 * whether_row1_special_red(a){
                return !(a === '8c03350ef1cf5933829989b7bc109ea0' || a === 'cc82870c48c750ef873905adc8c38095');
            },
 */

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
    console.log('----------------------------------------------------------------');
    console.log(text,data);
    console.log('----------------------------------------------------------------');
}

export {url,tip,con}