<template>
    <div class="optionC">
        <div class="navTitle">
            <span v-for="(a,b) in mockData" :class="{'active_navTitle':active===a.id}" @click="tabControl(a)">
                {{a.name}}
            </span>
        </div>
        <mt-tab-container class="navBox" v-model="active" style="border: 1px solid red" :swipeable="true"><!-- :swipeable="true"-->
            <mt-tab-container-item v-for="(a,b) in mockData" :id="a.id" :key="a.id">
                <div class="navContainer">
                    <div v-for="(a,b) in a.children" class="navContainer_item" @click="popupVisibleControl()">
                        <em>{{a.url}}</em>
                        <img :src="url+a.icon">
                        <span>{{a.name}}</span>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <bottomNavBlock></bottomNavBlock>

        <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom" class="popupText">
            <div>设置到首页置顶</div>
            <div>设置到首页常用</div>
            <div class="remove">从首页置顶中移除</div>
            <div class="remove">从首页常用中移除</div>
            <div class="cancel" @click="cancelPopupVisible">取消</div>
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

    export default {
        name: "optionC",
        data:()=>({
            popupVisible:true,
            url:url,
            mockData:undefined,
            active:'tab-container1'
        }),
        methods:{
            tabControl:function(a){
                this.active=a.id;
            },
            popupVisibleControl(){
                this.popupVisible=true;
            },
            cancelPopupVisible(){
                this.popupVisible=false;
            }
        },
        components:{
            bottomNavBlock:bottomNav_block
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
                        tip.failed(data.message,1500)
                    }else{
                        this.mockData=data.resultDomains;
                        this.active=this.mockData[0].id;
                    }
                }
            });
        }
    }
</script>

<style scoped lang="less">
    @import url('../../styles/custom.less');
    .optionC{
        .navTitle{
            box-sizing: border-box;
            border-bottom: 0.015rem solid #F4F4F4;
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
            box-sizing: border-box;
            padding: 0.1rem 0.1rem 0 0.1rem;
        }
        .navContainer{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            .navContainer_item{
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
                img{
                    width: 0.5rem;
                    height: 0.5rem;
                }
                span{
                    margin-top: -0.2rem;
                    font-size: 0.14rem;
                }
                em{
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