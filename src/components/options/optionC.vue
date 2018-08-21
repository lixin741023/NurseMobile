<template>
    <div class="optionC">
        <div class="navTitle">
            <span v-for="(a,b) in mockData" :class="{'active_navTitle':active===a.id}" @click="active=a.id">
                {{a.name}}
            </span>
        </div>
        <mt-tab-container class="navBox" v-model="active" :swipeable="true"><!-- :swipeable="true"-->
            <mt-tab-container-item v-for="(a,b) in mockData" :id="a.id" :key="a.id">
                <div class="navContainer">
                    <div v-for="(a,b) in a.children" class="navContainer_item" @touchstart="gtouchstart(popupVisibleControl,a.id)" @touchmove="gtouchmove()" @touchend="gtouchend(R_fun,a.url)" >
                        <div class="set" v-show="class_top(a.id)||class_often(a.id)">
                            <span class="top" v-show="class_top(a.id)">顶置</span>
                            <span class="fav" v-show="class_often(a.id)">常用</span>
                        </div>
                        <em>{{a.url}}</em>
                        <img :src="url+a.icon">
                        <span class="name">{{a.name}}</span>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <bottomNavBlock></bottomNavBlock>

        <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom" class="popupText">
            <div v-show="setTop" @click="topControl('add')">设置到首页置顶</div>
            <div v-show="!setTop" @click="topControl('remove')" class="remove">从首页置顶中移除</div>
            <div v-show="setOften" @click="oftenControl('add')">设置到首页常用</div>
            <div v-show="!setOften" @click="oftenControl('remove')" class="remove">从首页常用中移除</div>
            <div class="cancel" @click="popupVisible=false">取消</div>
        </mt-popup>
    </div>
</template>

<script>
    import {url,con,tip} from '../../js/global.js';
    import Vue from 'vue';
    import { TabContainer, TabContainerItem } from 'mint-ui';
    Vue.component(TabContainer.name, TabContainer);
    Vue.component(TabContainerItem.name, TabContainerItem);
    import bottomNav_block from '../nav/bottomNav_block.vue';
    import { Popup } from 'mint-ui';
    Vue.component(Popup.name, Popup);

    let timeOutEvent;
    export default {
        name: "optionC",
        data:()=>({
            whether:undefined,
            whetherSettingArray:false,
            itemId:undefined,
            settingArray:{
                top:[],
                often:[]
            },
            popupVisible:false,
            url:url,
            mockData:undefined,
            active:'tab-container1'
        }),
        components:{
            bottomNavBlock:bottomNav_block
        },
        computed:{
            setTop(){
                return this.settingArray.top.indexOf(this.itemId)===-1;
            },
            setOften(){
                return this.settingArray.often.indexOf(this.itemId)===-1;
            }
        },
        methods:{
            class_top(id){
                return this.settingArray.top.indexOf(id) !== -1;
            },
            class_often(id){
                return this.settingArray.often.indexOf(id) !== -1;
            },
            topControl(type){
                if(type==='add'){
                    if(this.settingArray.top.length===4){
                        tip.failed('最多只能设置4项顶置哦');
                        return;
                    }
                   this.settingArray.top.push(this.itemId);
                }else if(type==='remove'){
                    this.settingArray.top.splice(this.settingArray.top.indexOf(this.itemId),1)
                }
                this.whetherSettingArray=true;
                tip.fromTop('设置成功');
            },
            oftenControl(type){
                if(type==='add'){
                    if(this.settingArray.often.length===8){
                        tip.failed('最多只能设置8项常用哦');
                        return;
                    }
                    this.settingArray.often.push(this.itemId)
                }else if(type==='remove'){
                    this.settingArray.often.splice(this.settingArray.often.indexOf(this.itemId),1)
                }
                this.whetherSettingArray=true;
                tip.fromTop('设置成功');
            },
            popupVisibleControl(id){
                this.popupVisible=true;
                this.itemId=id;
            },
            gtouchstart:function gtouchstart(fun,id){
                timeOutEvent = setTimeout(function(){
                    timeOutEvent = 0;
                    fun(id);
                },500);
                return false;
            },
            gtouchmove:function gtouchmove(){
                clearTimeout(timeOutEvent);
                timeOutEvent = 0;
            },
            gtouchend:function gtouchend(fun,url){
                clearTimeout(timeOutEvent);
                if(timeOutEvent!=0){
                    fun(url);
                }
                return false;
            },
            R_fun(url){
                this.$router.push({name:url});
            }
        },
        beforeMount:function () {
            $.ajax({
                type:'post',
                url:url+'/operatorAddress/queryUserOpeToAdd',
                async:false,
                dataType:"json",
                data:{
                    userId:sessionStorage.getItem('userId')
                },
                success:(data)=>{
                    con('菜单权限',data);
                    if(data.error){
                        tip.failed(data.message,1500);
                    }else{
                        this.whether=data.parameter;
                        this.mockData=data.resultDomains;
                        this.active=this.mockData[0].id;
                        for(let i=0; i<data.resultDomains.length; i++){
                            for(let x=0; x<data.resultDomains[i].children.length; x++){
                                if(data.resultDomains[i].children[x].top){
                                    this.settingArray.top.push(data.resultDomains[i].children[x].id)
                                }
                                if(data.resultDomains[i].children[x].often){
                                    this.settingArray.often.push(data.resultDomains[i].children[x].id)
                                }
                            }
                        }
                    }
                }
            });
        },
        beforeRouteLeave(a,b,next){
            if(!this.whetherSettingArray){
                next()
            }else{
                $.ajax({
                    type:'post',
                    url:url+'/operatorAddress/saveAndUpdateMed',
                    async: false,
                    dataType:'json',
                    data:{
                        'id':this.whether,
                        'userId.id':sessionStorage.getItem('userId'),
                        'content':JSON.stringify(this.settingArray)
                    },
                    success:function (data) {
                        con('配置上传返回',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            tip.success('设置保存成功',1000,function () {
                                next()
                            })
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import url('../../styles/custom.less');
    .optionC{
        .componentsInit;
        .navTitle{
            box-sizing: border-box;
            border-bottom: 0.015rem solid #E4E4E4;
            padding: 0 0.1rem;
            font-size: 0.15rem;
            white-space: nowrap;
            overflow-x: scroll;
            span{
                display: inline-block;
                margin-right: 0.2rem;
                height: 100%;
                padding: 0.08rem 0.1rem;
            }
            .active_navTitle{
                color: #27B6F5;
                border-bottom: 0.03rem solid #27B6F5;
            }
        }
        .navBox{
            /*border: 1px solid red;*/
            box-sizing: border-box;
            padding: 0.1rem 0.1rem 0 0.1rem;
            overflow-y: auto;
            height: 5.2rem;

        }
        .navContainer{
            display: flex;
            flex-wrap: wrap;
            .navContainer_item{
                margin-left: 0.05rem;
                box-sizing: border-box;
                padding-top: 0.18rem;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-around;
                position: relative;
                width: 1.1rem;
                height: 1.1rem;
                border: 1px solid #CDCDCD;
                margin-bottom: 0.1rem;
                &:active{
                    background-color: @activeEvent;
                }
                .set{
                    display: flex;
                    box-sizing: border-box;
                    justify-content: space-around;
                    position: absolute;
                    top: 0.1rem;
                    right: -0.3rem;
                    width: 100%;
                    padding: 0.02rem 0.23rem;
                    transform: rotateZ(40deg);
                    background-color: #27b6f5;
                    color: #fff;
                    font-size: 0.12rem;
                }
                img{
                    width: 0.4rem;
                    height: 0.4rem;
                }
                .name{
                    font-size: 0.14rem;
                }
                em{
                    /*display: none;*/
                    position: absolute;
                    top: 10px;
                }
            }
        }
        .popupText{
            width: 100%;
            background-color: #808080;
            div{
                background-color: #fff;
                display: block;
                text-align: center;
                border-bottom: 0.02rem solid #F7F7F7;
                font-size: 0.16rem;
                padding: 0.15rem 0;
                &:last-child{
                    border-bottom: 0;
                }
                &:active{
                    background-color: @activeEvent;
                }
            }
            .remove{
                color: #ff0000;
            }
            .cancel{
                margin-top: 0.1rem;
            }
        }
    }
</style>