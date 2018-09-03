<template>
    <div class="message">
        <el-button @click="test">

        </el-button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Vuex from 'vuex';
    Vue.use(Vuex);

    const store = new Vuex.Store({
            state:{
                count:0
            },
            mutations:{
                increment(state){
                    state.count++;
                    console.log(store.state.count)
                }
            }
    });
    
    export default {
        name: 'tabs',
        data() {
            return {

            }
        },
        methods: {
            test(){
                store.commit('increment');
            }
        },
        computed: {
           
        }
    }

</script>