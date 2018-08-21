<template>
    <div class="empty">
        <h2>empty</h2>
        {{empty.name}}
        <hr>
        {{backDest}}
    </div>
</template>

<script>
    export default {
        name: "empty",
        props:{
            empty:{
                required: true
            },
            backDest:{
                required: true
            }
        },
        data(){
            this.$router.replace({
                name:this.backDest,
                params:{
                    [this.backDest]:this.empty
                }
            });
            return{

            }
        }
    }
</script>

<style scoped>

</style>