<template>
    <div class="app">
        <router-view></router-view>
        <bottomNav v-if="whether_bottomNav"></bottomNav>
    </div>
</template>

<script>
    import bottomNav from './components/nav/bottomNav.vue';
    export default {
        data:()=>({
            whether_bottomNav:true
        }),
        components:{
            bottomNav
        },
        watch:{
            $route(a,b){
                let nextRouteName=a.name;
                switch (nextRouteName) {
                    case 'optionA':this.whether_bottomNav=true;break;
                    case 'optionB':this.whether_bottomNav=true;break;
                    case 'optionC':this.whether_bottomNav=true;break;
                    case 'optionD':this.whether_bottomNav=true;break;
                    case 'optionE':this.whether_bottomNav=true;break;
                    default:this.whether_bottomNav=false;break;
                }
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
        }
    }
</script>

<style scoped lang="less">
    @import url('./styles/custom.less');
    .app{
        .appInit;
        border-top: 1px solid red;
    }
</style>