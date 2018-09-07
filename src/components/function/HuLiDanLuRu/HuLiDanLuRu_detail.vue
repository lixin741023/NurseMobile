<template>
    <div class="HuLiDanLuRu_detail">
        <div class="_global_normalHead">
            <span class="fa fa-chevron-left" @click="R_back"></span>
            <span>护理单录入</span>
        </div>
        <div class="_global_HuanZheBox">
            <span>{{HuanZhe_Info.bedName}}</span>
            <span>{{HuanZhe_Info.name}}</span>
            <span>（{{HuanZhe_Info.sex}} {{HuanZhe_Info.age}}）</span>
            <span>{{HuanZhe_Info.clinicNum}}</span>
        </div>
        <div class="_global_filter">
            <span>筛选</span>
            <span>分类</span>
        </div>

        <div class="tabTitle">
            <span v-for="(a,b) in tabOption" :class="{'checkSpan':currentTemplateId===a.storageId}" @click="active_currentTemplateId(a.storageId)">{{a.name}}</span>
        </div>
        <div class="template">

            <div class="row" v-for="(a,index_a) in templateData" v-if="a.type==='dateTime'" :field="a.field" :k="a.id" :key="a.id">
                <p>{{a.name}}</p>
                <div class="write">
                    <input type="text" placeholder="请选择时间" @click="open_datePicker" :id="a.id" v-model="chooseDay">
                </div>
            </div>

            <div class="row" v-for="(a,index_a) in templateData" v-if="a.type==='select'" :field="a.field" :k="a.id" :key="a.id">
                <p>{{a.name}}</p>
                <div class="write">
                    <select :id="a.id">
                        <option v-for="(b,index_b) in a.select" :value="b.id">{{b.name}}</option>
                    </select>
                </div>
            </div>

            <div class="row" v-for="(a,index_a) in templateData" v-if="a.type==='number'" :field="a.field" :k="a.id" :key="a.id">
                <p>{{a.name}}</p>
                <div class="write">
                    <input type="number" :placeholder="'请输入'+a.name" :id="a.id">
                </div>
            </div>

            <div class="row" v-for="(a,index_a) in templateData" v-if="a.type==='text'" :field="a.field" :k="a.id" :key="a.id">
                <p>{{a.name}}</p>
                <div class="write">
                    <input type="text" maxlength="50" :placeholder="'请输入'+a.name" :id="a.id">
                </div>
            </div>

        </div>

        <button class="entryBtn" @click="LuRu">录入</button>

        <mt-datetime-picker
                ref="datePicker"
                type="datetime"
                :startDate="new Date(Date.parse(inHospital_time))"
                v-model="dateValue"
                hourFormat="{value}时"
                minuteFormat="{value}分"
                @confirm="makeSure_date">
        </mt-datetime-picker>
        <!--:endDate="new Date(Date.parse(toDay))"-->
    </div>

</template>

<script>
    import Vue from 'vue';
    import {con,tip} from "../../../js/global";
    export default {
        name: "HuLiDanLuRu_detail",
        props:['HuLiDanLuRu_detail'],
        data:()=>({
            url:'',
            HuanZhe_Info:{},
            inHospital_time:undefined,
            dateValue:undefined,
            toDay:'',
            chooseDay:'',
            allData:undefined,
            currentTemplateId:'',
            tabOption:[],
            templateData:[],

            clinicId:'',//
            patientId:'',//
            ndtdsid:''//


        }),
        watch:{
            currentTemplateId(){
                $.ajax({
                    type:'get',
                    url:this.url+'/threetest/findContentById',
                    async:false,
                    dataType:'json',
                    data:{
                        id:this.currentTemplateId,
                        userId:sessionStorage.getItem('userId')
                    },
                    success:(data)=>{
                        con('模板数据',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            this.templateData=data.data.content;
                            this.ndtdsid=data.data.ndtdsid;
                        }
                    }
                })
            }
        },
        methods:{
            active_currentTemplateId(storageId){
                this.chooseDay='';
                this.currentTemplateId=storageId;
            },
            open_datePicker(){
                this.$refs.datePicker.open();
            },
            makeSure_date(date){
                let year=date.getFullYear();
                let month=date.getMonth()+1;
                let month_;
                let day=date.getDate();
                let day_;
                let hour=date.getHours();
                let hour_;
                let minute=date.getMinutes();
                let minute_;
                if(month<10){
                    month_="0"+month;
                }else{
                    month_=month;
                }
                if(day<10){
                    day_="0"+day;
                }else{
                    day_=day;
                }
                if(hour<10){
                    hour_="0"+hour;
                }else{
                    hour_=hour;
                }
                if(minute<10){
                    minute_="0"+minute;
                }else{
                    minute_=minute;
                }
                this.chooseDay=`${year}-${month_}-${day_} ${hour_}:${minute_}:00`;
            },
            get_toDay(){
                $.ajax({
                    type:'get',
                    url:this.url+'/dateUtil/getDateMapInfo',
                    async:false,
                    dataType:'json',
                    data:{
                        userId:sessionStorage.getItem('userId')
                    },
                    success:(data)=>{
                        con('获取的当天时间',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            this.toDay=`${data.resultDomain.year}-${data.resultDomain.month}-${data.resultDomain.day}`;
                            // this.chooseDay=this.toDay;
                        }
                    }
                })
            },
            R_back(){
                this.$router.go(-1);
            },
            get_tabOption(){
                $.ajax({
                    type:'get',
                    url:this.url+'/threetest/queryAllNurByClinicId',
                    async:false,
                    dataType:'json',
                    data:{
                        clinicId:this.HuLiDanLuRu_detail.clinicId
                    },
                    success:(data)=>{
                        con('选项卡',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            this.tabOption=data.nurDets;
                            this.currentTemplateId=data.nurDets[0].storageId;
                        }
                    }
                })
            },
            LuRu(){
                let allRow=$('.HuLiDanLuRu_detail .template .row');
                let fields={};
                let obj={
                    content:[{

                    }],
                    clinicId:this.clinicId,
                    patientId:this.patientId,
                    ndtdsid:this.ndtdsid
                };
                for(let i=0; i<allRow.length; i++){
                    fields[allRow.eq(i).attr('k')]=allRow.eq(i).attr('field');
                }
                for(let i=0; i<allRow.length; i++){
                    obj.content[0][allRow.eq(i).find('.write *').attr('id')]=allRow.eq(i).find('.write *').val();
                    if(allRow.eq(i).find('.write *').attr('id')==='dateTime'){
                        if(allRow.eq(i).find('.write *').val()===''){
                            tip.failed('必须选择记录时间',1500);
                            return;
                        }
                    }
                }

                $.ajax({
                    type:'post',
                    url:this.url+'/threetest/saveOrUpdateContentMed',
                    async:false,
                    dataType:'json',
                    // traditional:true,
                    // contentType:'application/x-www-form-urlencoded',
                    // contentType:'application/json',
                    data:{
                        userId:sessionStorage.getItem('userId'),
                        fields:JSON.stringify(fields),
                        content:JSON.stringify(obj)
                    },
                    success:(data)=>{
                        con('录入结果',data);
                        if(data.error){
                            tip.failed(data.message,1500);
                        }else{
                            tip.success('录入成功');
                            this.$router.replace({
                                name:'empty',
                                params:{
                                    empty:this.HuLiDanLuRu_detail,
                                    backDest:'HuLiDanLuRu_detail'
                                }
                            })
                        }
                    }
                });
            }
        },
        created:function(){
            this.url=this.$store.state.url;
            this.url='http://7.0.0.114:8083/StarTrekMED';
        },
        beforeMount:function (){
            $.ajax({
                type:'get',
                url:this.url+'/user/queryByclinicIdMed',
                async:false,
                dataType:'json',
                data:{
                    clinicId:this.HuLiDanLuRu_detail.clinicId,
                    userId:sessionStorage.getItem('userId')
                },
                success:(data)=>{
                    con('患者信息',data);
                    if(data.error){
                        tip.failed(data.message,1500);
                    }else{
                        this.HuanZhe_Info=data.resultDomain;
                        this.inHospital_time=data.resultDomain.joinTime.split(' ')[0];
                        this.clinicId=data.resultDomain.clinicId;
                        this.patientId=data.resultDomain.patId;
                    }
                }
            });
            this.get_toDay();
            this.get_tabOption();
         }
    }
</script>

<style scoped lang="less">
    @import url('../../../styles/custom.less');
    .HuLiDanLuRu_detail{
        .componentsInit;
        .tabTitle{
            width: 100%;
            box-sizing: border-box;
            white-space: nowrap;
            overflow-x: auto;
            padding: 0.1rem 0.1rem 0 0.05rem;
            font-size: 0.13rem;
            margin-top: 0.2rem;
            background-color: #fff;
            border-bottom: 0.02rem solid #E4E4E4;
            span:last-child{
                margin-right: 0;
            }
            span{
                margin-right: 0.23rem;
                display: inline-block;
                padding: 0 0.04rem 0.09rem 0.04rem;
                border-bottom: 0.03rem solid transparent;
            }
            .checkSpan{
                color: #27B6F5;
                border-bottom: 0.03rem solid #27B6F5;
            }
        }
        .template{
            border-top: 0.01rem solid #E4E4E4;
            background-color: #fff;
            margin-top: 0.2rem;
            height: 3.6rem;
            overflow-y: auto;
            .row{
                margin-top: 0.2rem;
                p{
                    padding-left: 0.08rem;
                    font-size: 0.14rem;
                    padding-bottom: 0.05rem;
                    border-bottom: 0.01rem solid #ededed;
                }
                .write{
                    padding: 0.08rem;
                    input{
                        width: 100%;
                        height: 0.33rem;
                        background-color: #e6e6e6;
                        padding-left: 0.12rem;
                        font-size: 0.16rem;
                    }
                    select{
                        width: 100%;
                        height: 0.33rem;
                        background-color: #e6e6e6;
                        padding-left: 0.12rem;
                        font-size: 0.16rem;
                    }
                }
            }
        }
        .entryBtn{
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