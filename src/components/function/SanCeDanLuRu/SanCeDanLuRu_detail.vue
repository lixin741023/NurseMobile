<template>
    <div class="SanCeDanLuRu_detail">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>三测单录入</span>
        </div>
        <div class="_global_HuanZheBox">
            <span>22床</span>
            <span>苗琳</span>
            <span>（女 24岁）</span>
            <span>20180817222</span>
        </div>
        <div class="_global_timeFilter" style="margin-top: 0.16rem" @click="option_datePicker">
            <span>2015-02-33</span>
            <img src="../../../images/datePicker.png" alt="">
        </div>
        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue"></mt-datetime-picker>
        <div class="tabTitle">
            <span v-for="(a,b) in tabTitle" :class="{'active_tabTitle':active===a.id}" @click="active=a.id">{{a.name}}</span>
        </div>
        <mt-tab-container v-model="active" class="tabContent">
            <mt-tab-container-item id="a" class="a" >
                <div class="timing">
                    <span>时段：</span>
                    <select name="" id="" v-model="timing">
                        <option value="4">4:00</option>
                        <option value="8">8:00</option>
                        <option value="a3">12:00</option>
                        <option value="a4">16:00</option>
                        <option value="a5">20:00</option>
                        <option value="a6">24:00</option>
                    </select>
                </div>
                <div class="row">
                    <p>体温</p>
                    <div>
                        <select name="" id="">
                            <option value="">腋温</option>
                            <option value="">口温</option>
                            <option value="">肛温</option>
                        </select>
                        <input type="number" placeholder="录入温度">
                        <span>&#8451;</span>
                        <input type="number" placeholder="物理降温" >
                        <mt-switch v-model="whether_physicsCooling"></mt-switch>
                    </div>
                </div>
                <div class="row">
                    <p>脉搏</p>
                    <div>
                        <input class="longInput" type="number" placeholder="这里录入脉搏">
                        <span>次/每分</span>
                    </div>
                </div>
                <div class="row">
                    <p>心率（bpm）</p>
                    <div>
                        <input class="longInput" type="number" placeholder="在这里录入心率">
                        <span>次/每分</span>
                    </div>
                </div>
                <div class="row">
                    <p>呼吸</p>
                    <div>
                        <input class="longInput" type="number" placeholder="在这里录入呼吸">
                        <span>次/每分</span>
                    </div>
                </div>
                <div class="row">
                    <p>事件</p>
                    <div>
                        <select name="" id="">
                            <option value="">可选择事件</option>
                            <option value="">死亡</option>
                            <option value="">手术</option>
                            <option value="">转出</option>
                            <option value="">入院</option>
                            <option value="">出生</option>
                            <option value="">分娩</option>
                            <option value="">转入</option>
                        </select>
                    </div>
                </div>
                <div class="mark">
                    <span>备注：</span>
                    <textarea maxlength="300"></textarea>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="b" class="b">
                <div class="morning row">
                    <p>上午·血压</p>
                    <div>
                        <input type="number" placeholder="收缩压">
                        <span>/</span>
                        <input type="number" placeholder="舒张压">
                        <span>mmHg</span>
                    </div>
                </div>
                <div class="afternoon row">
                    <p>下午·血压</p>
                    <div>
                        <input type="number" placeholder="收缩压">
                        <span>/</span>
                        <input type="number" placeholder="舒张压">
                        <span>mmHg</span>
                    </div>
                </div>
                <div class="mark">
                    <span>备注：</span>
                    <textarea maxlength="300"></textarea>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="c" class="c" >
                <div class="row">
                    <p>尿量</p>
                    <div>
                        <input type="number" placeholder="这里录入尿量">
                        <span>ml</span>
                    </div>
                </div>
                <div class="row">
                    <p>24小时入液量</p>
                    <div>
                        <input type="number" placeholder="这里录入液量">
                        <span>ml</span>
                    </div>
                </div>
                <div class="row">
                    <p>24小时出液量</p>
                    <div>
                        <input type="number" placeholder="这里录入出液量">
                        <span>ml</span>
                    </div>
                </div>
                <div class="row">
                    <p>大便</p>
                    <div>
                        <input type="number" placeholder="这里录入大便">
                        <span>次</span>
                    </div>
                </div>
                <div class="row">
                    <p>体重</p>
                    <div>
                        <input type="number" placeholder="这里录入尿量">
                        <span>kg</span>
                    </div>
                </div>
                <div class="mark">
                    <span>备注：</span>
                    <textarea maxlength="300"></textarea>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <button class="LuRuBtn">录入</button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { DatetimePicker } from 'mint-ui';
    Vue.component(DatetimePicker.name, DatetimePicker);
    import { TabContainer, TabContainerItem } from 'mint-ui';
    Vue.component(TabContainer.name, TabContainer);
    Vue.component(TabContainerItem.name, TabContainerItem);
    import { Switch } from 'mint-ui';
    Vue.component(Switch.name, Switch);
    export default {
        name: "SanCeDanLuRu_detail",
        data:()=>({
            timing:'a2',
            tabTitle:[
                {
                    name:'三测信息',
                    id:'a'
                },
                {
                    name:'血压',
                    id:'b'
                },
                {
                    name:'出入量',
                    id:'c'
                }
            ],
            active:'a',
            pickerValue:undefined,
            whether_physicsCooling:false
        }),
        methods:{
            R_back(){
                this.$router.go(-1);
            },
            option_datePicker() {
                this.$refs.picker.open();
                let this_=this;
                setInterval(()=>{
                    console.log(typeof this_.pickerValue);
                    console.log(this_.pickerValue);
                },1000)
            }
        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .SanCeDanLuRu_detail{
        .componentsInit;
        .tabTitle{
            padding: 0.1rem 0 0 0;
            margin-top: 0.16rem;
            display: flex;
            justify-content: space-around;
            background-color: #fff;
            font-size: 0.13rem;
            border-bottom: 0.01rem solid #E4E4E4;
            span{
                padding: 0 0.1rem 0.08rem;
                border-bottom: 0.03rem solid transparent;
            }
            .active_tabTitle{
                border-bottom: 0.03rem solid #27B6F5;
            }
        }
        .tabContent{
            .a,.b,.c{
                background-color: #fff;
                padding-bottom: 0.2rem;
            }
            overflow-y: auto;
            border: 1px solid blue;
            height: 3.8rem;
            .mark{
                margin-top: 0.2rem;
                display: flex;
                align-items: center;
                padding-left: 0.08rem;
                font-size: 0.14rem;
                border-bottom: 0.01rem solid #EDEDED;
                padding-bottom: 0.05rem;
                textarea{
                    width: 3rem;
                    height: 0.5rem;
                }
            }
            .a{
                .longInput{
                    width: 2.7rem!important;
                }
                .timing{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 0.4rem;
                    font-size: 0.14rem;
                    border-bottom: 0.01rem solid #E4E4E4;
                    select{
                        border: 0;
                        font-size: 0.16rem;
                    }
                }
                .row{
                    margin-top: 0.2rem;
                    p{
                        padding-left: 0.08rem;
                        font-size: 0.14rem;
                        border-bottom: 0.01rem solid #EDEDED;
                        padding-bottom: 0.05rem;
                    }
                    div{
                        padding:0 0.08rem;
                        margin-top: 0.1rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        span{
                            font-size: 0.16rem;
                        }
                        input{
                            width: 1rem;
                            height: 0.33rem;
                            background-color: #E6E6E6;
                            padding-left: 0.12rem;
                            font-size: 0.16rem;
                        }
                        select{
                            font-size: 0.15rem;
                            border: 0;
                        }
                    }
                }
            }
            .b{
                .row{
                    margin-top: 0.2rem;
                    p{
                        padding-left: 0.08rem;
                        font-size: 0.14rem;
                        border-bottom: 0.01rem solid #EDEDED;
                        padding-bottom: 0.05rem;
                    }
                    div{
                        padding:0 0.08rem;
                        margin-top: 0.1rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        span{
                            font-size: 0.16rem;
                        }
                        input{
                            width: 1.3rem;
                            height: 0.33rem;
                            background-color: #E6E6E6;
                            padding-left: 0.12rem;
                            font-size: 0.16rem;
                        }
                    }
                }
            }
            .c{
                .row{
                    margin-top: 0.2rem;
                    p{
                        padding-left: 0.08rem;
                        font-size: 0.14rem;
                        border-bottom: 0.01rem solid #EDEDED;
                        padding-bottom: 0.05rem;
                    }
                    div{
                        padding:0 0.2rem 0 0.08rem;
                        margin-top: 0.1rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        span{
                            font-size: 0.16rem;
                        }
                        input{
                            width: 3rem;
                            height: 0.33rem;
                            background-color: #E6E6E6;
                            padding-left: 0.12rem;
                            font-size: 0.16rem;
                        }
                    }
                }
            }
        }
        .LuRuBtn{
            .buttonInit;
            margin-top: 0.2rem;
            background-color: #12B7F5;
            font-size: 0.16rem;
            border-radius: 8px;
            color: #fff;
            &:active{
                background-color: darken(#12B7F5,10%);
            }
        }
    }
</style>
<style lang="less">
    .SanCeDanLuRu_detail{
        .a{
            .mint-switch-core{
                width: 0.52rem;
                height: 0.32rem;
                &:before{
                    width: 0.5rem;
                    height: 0.3rem;
                }
                &:after{
                    width: 0.3rem;
                    height: 0.3rem;
                }
            }
        }
    }
</style>