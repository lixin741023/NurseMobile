<template>
    <div class="app">
        <transition :name="animate">
            <router-view></router-view>
        </transition>
        <bottomNav v-if="whether_bottomNav"></bottomNav>
    </div>
</template>

<script>
    import {con} from "./js/global";
    import bottomNav from './components/nav/bottomNav.vue';
    export default {
        data:()=>({
            whether_bottomNav:true,
            animate:undefined
        }),
        methods:{
            animationControlOFroute(c,d){
                let targetRoute_name=c.name;
                let sourceRoute_name=d.name;
                let targetRoute_length=c.path.split('/').length;
                let sourceRoute_length=d.path.split('/').length;
                if(sourceRoute_name==='login'){
                    con('路由动画-登陆','fade');
                    this.animate='fade';
                    return
                }
                if(targetRoute_length===sourceRoute_length){
                    con('路由动画-平级','fade');
                    this.animate='fade';
                    return
                }
                if(targetRoute_length>sourceRoute_length){
                    con('路由动画-子TO父','towards_left');
                    this.animate='towards_left';
                    return;
                }
                if(targetRoute_length<sourceRoute_length){
                    con('路由动画-父TO子','towards_right');
                    this.animate='towards_right';
                    return
                }
            }
        },
        components:{
            bottomNav
        },
        watch:{
            $route(a,b){
                con('当前Vuex值',this.$store.state);
                let nextRouteName=a.name;
                switch (nextRouteName) {
                    case 'optionA':this.whether_bottomNav=true;break;
                    case 'optionB':this.whether_bottomNav=true;break;
                    case 'optionC':this.whether_bottomNav=true;break;
                    case 'optionD':this.whether_bottomNav=true;break;
                    case 'optionE':this.whether_bottomNav=true;break;
                    default:this.whether_bottomNav=false;break;
                }
                this.animationControlOFroute(a,b);
            }
        },
        beforeMount:function(){
            let currentRouteName=this.$route.name;
            switch (currentRouteName) {
                case 'optionA':this.whether_bottomNav=true;break;
                case 'optionB':this.whether_bottomNav=true;break;
                case 'optionC':this.whether_bottomNav=true;break;
                case 'optionD':this.whether_bottomNav=true;break;
                case 'optionE':this.whether_bottomNav=true;break;
                default:this.whether_bottomNav=false;break;
            }
        },
        computed:{

        }
    }
</script>

<style scoped lang="less">
    @import url('./styles/custom.less');
    .app{
        .appInit;
    }
</style>