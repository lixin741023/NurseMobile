<template>
    <div class="TiWenDanLuRu_detail">
        <div class="_global_normalHead" @click="showA">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>三测单录入</span>
        </div>
        <div class="_global_HuanZheBox">
            <span>{{HuanZhe_Info.bed}}</span>
            <span>{{HuanZhe_Info.patientName}}</span>
            <span>（{{HuanZhe_Info.patientSex}} {{HuanZhe_Info.patientAge}}）</span>
            <span>{{HuanZhe_Info.clinicNumber}}</span>
        </div>
        <div class="_global_timeFilter" style="margin-top: 0.16rem" @click="open_datePicker">
            <span>{{chooseDay}}</span>
            <img src="../../../images/datePicker.png" alt="">
        </div>
        <mt-datetime-picker
                ref="datePicker"
                type="date"
                :startDate="new Date(Date.parse(inHospital_time))"
                :endDate="new Date(Date.parse(toDay))"
                v-model="dateValue"
        @confirm="makeSure_date">
        </mt-datetime-picker>
        <div class="tabTitle">
            <span v-for="(a,b) in tabTitle" :class="{'active_tabTitle':active===a.id}" @click="active=a.id">{{a.name}}</span>
        </div>
        <mt-tab-container v-model="active" class="tabContent">
            <mt-tab-container-item id="a" class="a" >
                <div class="timing">
                    <span>时段：</span>
                    <select name="" id="" v-model.number="allData_i">
                        <option value="0">4:00</option>
                        <option value="1">8:00</option>
                        <option value="2">12:00</option>
                        <option value="3">16:00</option>
                        <option value="4">20:00</option>
                        <option value="5">24:00</option>
                    </select>
                    {{allData_i}}
                </div>
                <div class="row">
                    <p>体温</p>
                    <div>
                        <select name="" id="" v-model="default_TiWenLeiXing">
                            <option v-for="(a,b) in typeIds_option" :value="a.id">{{a.value}}</option>
                        </select>
                        <input :class="{'special_width':!whether_physicsCooling}" type="number" placeholder="录入体温" v-model.number="allData.tempers[allData_i]">
                        <span>&#8451;</span>
                        <input v-show="whether_physicsCooling" type="number" placeholder="物理降温" v-model.number="allData.physicsTemps[allData_i]" >
                        <mt-switch v-model="whether_physicsCooling"></mt-switch>
                    </div>
                </div>
                <div class="row">
                    <p>脉搏</p>
                    <div>
                        <input class="longInput" type="number" placeholder="这里录入脉搏" v-model.number="allData.pulses[allData_i]">
                        <span>次/每分</span>
                    </div>
                </div>
                <div class="row">
                    <p>心率（bpm）</p>
                    <div>
                        <input class="longInput" type="number" placeholder="在这里录入心率" v-model.number="allData.bpms[allData_i]">
                        <span>次/每分</span>
                    </div>
                </div>
                <div class="row">
                    <p>呼吸</p>
                    <div>
                        <input class="longInput" type="number" placeholder="在这里录入呼吸" v-model.number="allData.breathings[allData_i]">
                        <span>次/每分</span>
                    </div>
                </div>
                <div class="row">
                    <p>事件</p>
                    <div>
                        <select :class="allData.nurseEventIds[allData_i]===''?'eventSelect_color':''" name="" class="eventSelect" v-model="allData.nurseEventIds[allData_i]">
                            <option :value="selectUndefined">可选择事件</option>
                            <option v-for="(a,b) in nurseEventIds_option" :value="a.id">{{a.value}}</option>
                        </select>
                        <div class="eventTime" @click="open_timePicker">
                            <img src="../../../images/time.png" alt="">
                            <span v-show="!allData.eventTimes[allData_i]" style="color: #8F8F8F;">选择事件时间</span>
                            <span>{{allData.eventTimes[allData_i]}}</span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <p>备注</p>
                    <div>
                        <select :class="allData.marks[allData_i]===''?'eventSelect_color':''" name="" class="eventSelect" v-model="allData.marks[allData_i]">
                            <option value="">可选择备注</option>
                            <option v-for="(a,b) in marks_option" :value="a.id">{{a.value}}</option>
                        </select>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-datetime-picker
                    ref="timePicker"
                    type="time"
                    :startHour='startHour'
                    :endHour='endHour'
                    v-model="timeValue"
                    @confirm="makeSure_time">
            </mt-datetime-picker>
            <mt-tab-container-item id="b" class="b">
                <div class="morning row">
                    <p>上午·血压</p>
                    <div>
                        <input type="number" placeholder="收缩压" v-model.number="allData.amBloodsysPre">
                        <span>/</span>
                        <input type="number" placeholder="舒张压" v-model.number="allData.amBloodDiasPre">
                        <span>mmHg</span>
                    </div>
                </div>
                <div class="afternoon row">
                    <p>下午·血压</p>
                    <div>
                        <input type="number" placeholder="收缩压" v-model.number="allData.pmBloodsysPre">
                        <span>/</span>
                        <input type="number" placeholder="舒张压" v-model.number="allData.pmBloodDiasPre">
                        <span>mmHg</span>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="c" class="c" >
                <div class="row">
                    <p>尿量</p>
                    <div>
                        <input type="number" placeholder="这里录入尿量" v-model.number="allData.urineSize">
                        <span>ml</span>
                    </div>
                </div>
                <div class="row">
                    <p>24小时入液量</p>
                    <div>
                        <input type="number" placeholder="这里录入液量" v-model.number="allData.insertSize">
                        <span>ml</span>
                    </div>
                </div>
                <div class="row">
                    <p>24小时出液量</p>
                    <div>
                        <input type="number" placeholder="这里录入出液量" v-model.number="allData.outSize">
                        <span>ml</span>
                    </div>
                </div>
                <div class="row">
                    <p>大便</p>
                    <div>
                        <input type="number" placeholder="这里录入大便" v-model.number="allData.cacationCount">
                        <span>次</span>
                    </div>
                </div>
                <div class="row">
                    <p>体重</p>
                    <div>
                        <input type="number" placeholder="这里录入体重" v-model.number="allData.weight">
                        <span>kg</span>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
        <button class="LuRuBtn" @click="LuRu">录入</button>
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
    import {url,tip,con} from "../../../js/global";

    export default {
        name: "TiWenDanLuRu_detail",
        props:['TiWenDanLuRu_detail'],
        data:()=>({
            selectUndefined:'',
            typeIds_option:[],//体温类型选项
            nurseEventIds_option:[],//事件类型选项
            nurseEventIds_check:'',
            marks_option:[],//备注选项
            marks_check:undefined,
            allData:{
                clinicId:undefined,
                time:undefined,
                typeIds:['','','','','',''],//体温类型
                tempers:['','','','','',''],//温度
                physicsTemps:['','','','','',''],//物理降温
                pulses:['','','','','',''],//脉搏
                bpms:['','','','','',''],//心率
                breathings:['','','','','',''],//呼吸
                nurseEventIds:['','','','','',''],//事件类型
                eventTimes:['','','','','',''],//事件时间
                marks:['','','','','',''],//备注
                amBloodsysPre:undefined,//上午收缩压
                amBloodDiasPre:undefined,//上午舒张压
                pmBloodsysPre:undefined,//下午收缩压
                pmBloodDiasPre:undefined,//下午舒张压
                urineSize:undefined,//尿量
                insertSize:undefined,//入液量
                outSize:undefined,//出液量
                cacationCount:undefined,//大便次数
                weight:undefined//体重
            },
            allData_i:undefined,
            inHospital_time:undefined,
            HuanZhe_Info:{},
            toDay:'',
            chooseDay:'',
            currentTime:'',
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
            dateValue:undefined,
            timeValue:undefined,
            whether_physicsCooling:false
        }),
        methods:{
            showA(){//stand by
                console.log(this.allData);
            },
            makeSure_date(date){
                let year=date.getFullYear();
                let month=date.getMonth();
                let day=date.getDate();
                this.chooseDay=`${year}-${month+1}-${day}`;
            },
            makeSure_time(data){
                Vue.set(this.allData.eventTimes,this.allData_i,data);
            },
            R_back(){
                this.$router.go(-1);
            },
            open_datePicker() {
                this.$refs.datePicker.open();
            },
            open_timePicker(){
                if(!this.allData.nurseEventIds[this.allData_i]){
                    tip.failed('请先选择事件类型',1500);
                   return
                }
                this.$refs.timePicker.open();
            },
            query_HuanZhe_HuLi(){
                let this_=this;
                this_.allData={
                    clinicId:undefined,
                    time:undefined,
                    typeIds:['','','','','',''],//体温类型
                    tempers:['','','','','',''],//温度
                    physicsTemps:['','','','','',''],//物理降温
                    pulses:['','','','','',''],//脉搏
                    bpms:['','','','','',''],//心率
                    breathings:['','','','','',''],//呼吸
                    nurseEventIds:['','','','','',''],//事件类型
                    eventTimes:['','','','','',''],//事件时间
                    marks:['','','','','',''],//备注
                    amBloodsysPre:undefined,//上午收缩压
                    amBloodDiasPre:undefined,//上午舒张压
                    pmBloodsysPre:undefined,//下午收缩压
                    pmBloodDiasPre:undefined,//下午舒张压
                    urineSize:undefined,//尿量
                    insertSize:undefined,//入液量
                    outSize:undefined,//出液量
                    cacationCount:undefined,//大便次数
                    weight:undefined//体重
                };
                $.ajax({
                    type:'get',
                    url:url+'/threetest/queryNursingRecord',
                    async:false,
                    dataType:'json',
                    data:{
                        clinicId:this.TiWenDanLuRu_detail.clinicId,
                        time:this.chooseDay,
                        // time:'2018-8-21',
                        userId:sessionStorage.getItem('userId')
                    },
                    success:function (data) {
                        con('患者护理信息',data);
                        if(data.error){
                            tip.failed('数据传输错误',1500);
                        }else{
                            this_.allData.clinicId=this_.TiWenDanLuRu_detail.clinicId;
                            this_.allData.time=this_.chooseDay;
                            for(let i=0; i<data.resultDomains.length; i++){//体温类型
                                Vue.set(this_.allData.typeIds,i,data.resultDomains[i].typeId);
                            }
                            for(let i=0; i<data.resultDomains.length; i++){//温度
                                Vue.set(this_.allData.tempers,i,data.resultDomains[i].temper);
                            }
                            for(let i=0; i<data.resultDomains.length; i++){//物理降温
                                Vue.set(this_.allData.physicsTemps,i,data.resultDomains[i].physicsTemp);
                            }
                            for(let i=0; i<data.resultDomains.length; i++){//脉搏
                                Vue.set(this_.allData.pulses,i,data.resultDomains[i].pulse);
                            }
                            for(let i=0; i<data.resultDomains.length; i++){//心率
                                Vue.set(this_.allData.bpms,i,data.resultDomains[i].bpm);
                            }
                            for(let i=0; i<data.resultDomains.length; i++){//呼吸
                                Vue.set(this_.allData.breathings,i,data.resultDomains[i].breathing);
                            }
                            for(let i=0; i<data.resultDomains.length; i++){//事件类型
                                Vue.set(this_.allData.nurseEventIds,i,data.resultDomains[i].nurseEventId);
                            }
                            for(let i=0; i<data.resultDomains.length; i++){//事件时间
                                Vue.set(this_.allData.eventTimes,i,data.resultDomains[i].date);
                            }
                            for(let i=0; i<data.resultDomains.length; i++){//备注
                                Vue.set(this_.allData.marks,i,data.resultDomains[i].mark);
                            }
                            this_.allData.amBloodsysPre=data.resultDomain.amBloodsysPre;
                            this_.allData.amBloodDiasPre=data.resultDomain.amBloodDiasPre;
                            this_.allData.pmBloodsysPre=data.resultDomain.pmBloodsysPre;
                            this_.allData.pmBloodDiasPre=data.resultDomain.pmBloodDiasPre;
                            this_.allData.urineSize=data.resultDomain.urineSize;
                            this_.allData.insertSize=data.resultDomain.insertSize;
                            this_.allData.outSize=data.resultDomain.outSize;
                            this_.allData.cacationCount=data.resultDomain.cacationCount;
                            this_.allData.weight=data.resultDomain.weight;
                        }
                    }
                });
            },
            LuRu(){
                let this_=this;
                $.ajax({
                    type:'post',
                    url:url+'/threetest/saveOrUpdateRecord',
                    async:false,
                    dataType:'json',
                    traditional:true,
                    data:{
                        clinicId:this_.allData.clinicId,
                        time:this_.allData.time,
                        typeIds:this_.allData.typeIds,
                        tempers:this_.allData.tempers,
                        physicsTemps:this_.allData.physicsTemps,
                        pulses:this_.allData.pulses,
                        bpms:this_.allData.bpms,
                        breathings:this_.allData.breathings,
                        nurseEventIds:this_.allData.nurseEventIds,
                        eventTimes:this_.allData.eventTimes,
                        marks:this_.allData.marks,
                        amBloodsysPre:this_.allData.amBloodsysPre,
                        amBloodDiasPre:this_.allData.amBloodDiasPre,
                        pmBloodsysPre:this_.allData.pmBloodsysPre,
                        pmBloodDiasPre:this_.allData.pmBloodDiasPre,
                        urineSize:this_.allData.urineSize,
                        insertSize:this_.allData.insertSize,
                        outSize:this_.allData.outSize,
                        cacationCount:this_.allData.cacationCount,
                        weight:this_.allData.weight,
                        userId:sessionStorage.getItem('userId')
                    },
                    success:(data)=>{
                        con('录入结果',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            tip.success('录入成功');
                        }
                    }
                })
            }
        },
        watch:{
            chooseDay:function () {
                this.query_HuanZhe_HuLi();
            },
            allData(){

            }
        },
        beforeMount:function () {
            let this_=this;
            $.ajax({
                type:'get',
                url:url+'/patientInfo/findPatInfoByClinicId',
                async:false,
                dataType:'json',
                data:{
                    userId:sessionStorage.getItem('userId'),
                    clinicId:this.TiWenDanLuRu_detail.clinicId
                },
                success:function (data) {
                    con('患者信息',data);
                    if(data.error){
                        tip.failed(data.message,1500)
                    }else{
                        this_.HuanZhe_Info=data.patientInfo;
                        this_.inHospital_time=data.patientInfo.joinTime.split(' ')[0];
                    }
                }
            });
            $.ajax({
                type:'get',
                url:url+'/dateUtil/getDateMapInfo',
                async:false,
                dataType:'json',
                data:{
                    userId:sessionStorage.getItem('userId'),
                },
                success:function (data) {
                    con('获取的当天时间',data);
                    if(data.error){
                        tip.failed(data.message,1500);
                    }else{
                        this_.toDay=`${data.resultDomain.year}-${data.resultDomain.month}-${data.resultDomain.day}`;
                        this_.chooseDay=this_.toDay;
                        this_.currentTime=`${data.resultDomain.hour}-${data.resultDomain.minute}`;
                        let currentSJC=Math.round(Date.parse(`${this_.toDay} ${data.resultDomain.hour}:${data.resultDomain.minute}:${data.resultDomain.seconde}`)/1000);
                        con('当前的时间戳',currentSJC);
                        let timingSJC_arr=[];
                        timingSJC_arr[0]=Math.round(Date.parse(`${this_.toDay} 4:00`)/1000);
                        timingSJC_arr[1]=Math.round(Date.parse(`${this_.toDay} 8:00`)/1000);
                        timingSJC_arr[2]=Math.round(Date.parse(`${this_.toDay} 12:00`)/1000);
                        timingSJC_arr[3]=Math.round(Date.parse(`${this_.toDay} 16:00`)/1000);
                        timingSJC_arr[4]=Math.round(Date.parse(`${this_.toDay} 20:00`)/1000);
                        timingSJC_arr[5]=Math.round(Date.parse(`${this_.toDay} 24:00`)/1000);
                        con('时间段时间戳',timingSJC_arr);
                        let end_arr=[];
                        for(let i=0; i<timingSJC_arr.length; i++){
                            end_arr.push(Math.abs(currentSJC-timingSJC_arr[i]));
                        }
                        con('相互比较之后的时间戳',end_arr);
                        let min=Math.min.apply(null,end_arr);
                        for(let i=0; i<end_arr.length; i++){
                            if(end_arr[i]===min){
                                this_.allData_i=i
                            }
                        }
                    }
                }
            });
            $.ajax({//get_体温类型选项
                type:'get',
                url:url+'/threetest/queryTempType',
                async:false,
                dataType:'json',
                data:{
                    userId:sessionStorage.getItem('userId')
                },
                success:function (data) {
                    // con('体温类型选项',data);
                    if(data.error){
                        tip.failed('数据传输错误',1500);
                    }else{
                        for(let i=0; i<data.resultDomains.length; i++){
                            this_.typeIds_option.push(data.resultDomains[i])
                        }
                    }
                }
            });
            $.ajax({//get_事件类型选项
                type:'get',
                url:url+'/threetest/queryNurseEvent',
                async:false,
                dataType:'json',
                data:{
                    userId:sessionStorage.getItem('userId')
                },
                success:function (data) {
                    // con('事件类型选项',data);
                    if(data.error){
                        tip.failed('数据传输错误',1500);
                    }else{
                        for(let i=0; i<data.resultDomains.length; i++){
                            this_.nurseEventIds_option.push(data.resultDomains[i])
                        }
                    }
                }
            });
            $.ajax({//get_备注选项
                type:'get',
                url:url+'/threetest/queryNurseMark',
                async:false,
                dataType:'json',
                data:{
                    userId:sessionStorage.getItem('userId')
                },
                success:function (data) {
                    // con('备注选项',data);
                    if(data.error){
                        tip.failed('数据传输错误',1500);
                    }else{
                        for(let i=0; i<data.resultDomains.length; i++){
                            this_.marks_option.push(data.resultDomains[i])
                        }
                    }
                }
            })
        },
        mounted:function () {
            let this_=this;
        },
        computed:{
            default_TiWenLeiXing:{
                get(){
                    if(this.allData.typeIds[this.allData_i]){
                        return this.allData.typeIds[this.allData_i];
                    }else{
                        this.allData.typeIds[this.allData_i]='0296dd8922c54f2abc6a126a2d87e0a9';
                        return '0296dd8922c54f2abc6a126a2d87e0a9';
                    }
                },
                set(data){
                    this.allData.typeIds[this.allData_i]=data;
                    return data;
                }
            },
            startHour(){
                switch (this.allData_i) {
                    case 0 :return 0;break;
                    case 1 :return 4;break;
                    case 2 :return 8;break;
                    case 3 :return 12;break;
                    case 4 :return 16;break;
                    case 5 :return 20;break;
                }
            },
            endHour(){
                switch (this.allData_i) {
                    case 0 :return 3;break;
                    case 1 :return 7;break;
                    case 2 :return 11;break;
                    case 3 :return 15;break;
                    case 4 :return 19;break;
                    case 5 :return 23;break;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .TiWenDanLuRu_detail{
        .componentsInit;
        .special_width{
            width: 2rem!important;
        }
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
            /*border: 1px solid blue;*/
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
        .eventSelect{
            width: 1.8rem;
            height: 0.33rem;
            background-color: #E6E6E6;
        }
        .eventSelect_color{
            color: #8F8F8F;
        }
        .eventTime{
            display: flex!important;
            justify-content: flex-end!important;
            align-items: center!important;
            padding: 0!important;
            margin-top: 0!important;
            width: 1.5rem;
            height: 0.33rem;
            img{
                width: 0.22rem;
                height: 0.22rem;
                margin-right: 0.1rem;
            }
            &:active{
                background-color: @activeEvent;
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
    .TiWenDanLuRu_detail{
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