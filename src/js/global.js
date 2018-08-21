const url='http://7.0.0.116:8084/StarTrekMED';
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
    console.log('--------------------------------');
    console.log(text,data);
    console.log('')
}

export {url,tip,con}