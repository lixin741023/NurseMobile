<template>
    <div class="login">
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
        <div class="more" @click="more">更多</div>

        <div class="serverList">
            <ul>
                <li v-for="(a,b) in serverList" @click="makeSure_server(a)">
                    <span>{{a}}</span>
                    <span @click="remove_serverItem(b)" class="fa fa-close"></span>
                </li>
            </ul>
            <div class="addServer">
                <input type="text" maxlength="50" v-model="serverItem">
                <button @click="add_serverItem">add</button>
            </div>
        </div>
        <zzc-1 @click.native="cancel_more"></zzc-1>

    </div>
</template>

<script>
    import {tip,con,userId,platform_YiHu} from '../js/global.js';
    import zzc1 from './zzc/zzc1.vue';
    export default {
        name: "login",
        data:()=>({
            user:1733,
            pas:123456,
            serverList:[],
            serverItem:'',
            url:''
        }),
        components:{
            zzc1
        },
        methods:{
            makeSure_server(server){
                this.$store.commit('makeSure_url',server);
                this.url=this.$store.state.url;
                tip.fromTop(`服务器已切换到${this.url}`);
                $('.login .zzc1').fadeOut('fast');
                $('.login .serverList').fadeOut('');
            },
            remove_serverItem(b){
                event.stopPropagation();
                this.serverList.splice(b,1);
                localStorage.setItem('serverList',this.serverList);
            },
            add_serverItem(){
                if(this.serverItem){
                    this.serverList.push(this.serverItem);
                    this.serverItem='';
                    localStorage.setItem('serverList',this.serverList);
                }else{
                    tip.failed('请输入有效的地址',1500);
                }
            },
            more(){
                $('.login .zzc1').fadeIn('fast');
                $('.login .serverList').fadeIn('');
            },
            cancel_more(){
                $('.login .zzc1').fadeOut('fast');
                $('.login .serverList').fadeOut('');
            },
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
                        password:this.pas,
                        platformId:platform_YiHu
                    },
                    success:function(data){
                        con('登陆',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            tip.success('登陆成功',1000,function () {
                                localStorage.setItem('EchartsUrl',this_.url);
                                sessionStorage.setItem('userId',data.resultDomain.user.id);
                                this_.$router.push({name:'optionA'});
                                this_.$store.commit('makeSure_operation',data.resultDomain.user);
                            });
                        }
                    }
                })
            }
        },
        beforeMount:function () {
            this.serverList=localStorage.getItem('serverList').split(',');
            this.url=this.serverList[0];
        }
    }
</script>

<style scoped lang="less">
    @import url('../styles/custom.less');
    .login{
        .componentsInit;
        display: flex;
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
        .serverList{
            display: none;
            position: absolute;
            border-radius: 8px;
            z-index: 6;
            top: 2.7rem;
            width: 3rem;
            height: 3rem;
            background-color: #5F74B6;
            color: #fff;
            ul{
                overflow-y: auto;
                height: 2.5rem;
                border-bottom: 0.02rem solid #27B6F5;
            }
            li{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.1rem;
                border-bottom: 0.01rem solid #fff;
                span:nth-child(2){
                    font-size: 0.13rem;
                }
            }
            .addServer{
                margin-top: 0.1rem;
                padding: 0.08rem 0.1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.13rem;
                input{
                    width: 2.3rem;
                    border-bottom: 0.01rem solid #fff;
                    background-color: transparent;
                    color: #fff;
                    padding: 0 0.1rem;
                }
                button{
                    background-color: transparent;
                    border: 0;
                    color: #fff;
                    font-size: 0.16rem;
                    outline: none;
                }
            }
        }
    }
</style>