<template>
    <div id="app">
                <transition name="move" mode="out-in">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                </transition>
                         <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>
<style>
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/
</style>
<script>
import Vue from 'vue';
 export default {
        name: 'dashboard',
        data() {
            return {
            }
        },
        methods: {

        },
        mounted() {

        },
        created() {
        this.$axios.get('api/person').then((res)=>{
            if(res.data.data.role !== 1){
                window.location.href = '/403'
            }
            sessionStorage.role = res.data.data.role;
        });
                
        }
    };

   
</script>
