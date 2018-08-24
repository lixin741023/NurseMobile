<template>
    <div class="login">
        <div style="display: block; position: absolute; left: 5px; top: 5px; opacity: 0.2"><input type="text" v-model="url"></div>
        <img class="loginImg" src="../images/login_Img.png" alt="移动医护">
        <span class="loginTitle">移动医护</span>
        <div class="box">
            <div class="row">
                <input type="text" placeholder="请输入账号" v-model="user" maxlength="24">
                <span v-show="user" class="fa fa-close" @click="clean('user',$event)"></span>
            </div>
            <div class="row">
                <input type="password" placeholder="请输入密码" v-model="pas" maxlength="24">
                <span v-show="pas" class="fa fa-close" @click="clean('pas',$event)"></span>
            </div>
            <span class="forgetPassword">忘记密码？</span>
            <button class="loginBtn" @click="login">登录</button>
        </div>
        <div class="more">更多</div>
    </div>
</template>

<script>
    import {tip,con,userId} from '../js/global.js';
    export default {
        name: "login",
        data:()=>({
            url:'http://7.0.0.116:8084/StarTrekMED',
            // url:'http://7.0.0.114:8083/StarTrekMED',
            user:1733,
            pas:123456
        }),
        methods:{
            clean:function (a,b) {
                this[a]=undefined;
                b.target.previousElementSibling.focus();
            },
            login:function () {
                let this_=this;
                $.ajax({
                    type:'post',
                    url:this.url+'/user/checkLogin',
                    async:false,
                    dataType:'json',
                    data:{
                        username:this.user,
                        password:this.pas
                    },
                    success:function(data){
                        con('登陆',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            tip.success('登陆成功',1000,function () {
                                sessionStorage.setItem('userId',data.resultDomain.user.id);
                                this_.$router.push({name:'optionA'});
                            });
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import url('../styles/custom.less');
    .login{
        .componentsInit;
        display: flex;
        height: 6.7rem;
        flex-direction: column;
        align-items: center;
        background-color: #617fde;
        .loginImg{
            margin-top: 0.5rem;
            width: 1.3rem;
            height: 1.3rem;
        }
        .loginTitle{
            margin-top: 0.3rem;
            margin-bottom: 0.33rem;
            color: #fff;
            font-size: 0.22rem;
            font-weight: bold;
        }
        .box{
            width: 3.1rem;
            .row{
                display: flex;
                padding: 0 0.05rem;
                justify-content: space-between;
                align-items: center;
                border-radius: 8px;
                margin-top: 0.2rem;
                background-color: #fff;
                height: 0.38rem;
                input{
                    width: 90%;
                    color: @formContainerColor;
                    font-size: 0.14rem;
                    outline: none;
                    height: 0.30rem;
                    border: 0;
                    text-indent: 5px;
                }
                .fa{
                    color: #ccc;
                    font-size: 0.14rem;
                    margin-right: 5px;
                }
            }
            .forgetPassword{
                display: inline-block;
                margin-top: 0.15rem;
                margin-left: 5px;
                font-size: 0.12rem;
                color: #dcdee4;
            }
            .loginBtn{
                display: block;
                margin-top: 0.38rem;
                width: 100%;
                background-color: #fff;
                color: #515B77;
                border-radius: 8px;
                padding: 0.14rem 0;
                outline: none;
                border: 0;
                font-size: 0.15rem;
                &:active{
                    background-color: #ccc;
                    color: #fff;
                }
            }
        }
        .more{
            margin-top: 0.46rem;
            color: #dcdee4;
            font-size: 0.14rem;
        }
    }
</style>