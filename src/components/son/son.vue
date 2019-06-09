<template>
    <div class="son-box">
        <div>{{name}}</div>
        <span style='color:blue'>{{title}}</span>
        <button @click='dispatch'>搬救兵</button>
        <grand-son></grand-son>
        <div style='color:pink'>{{sos}}</div>
    </div>
</template>

<script>
import grandSon from './grandson';
export default {
    data() {
        return {
            title:'儿子说：我被揍了',
            sos:''
        }
    },
    inject:['name'],
    componentName:'son',
    components:{
        grandSon
    },
    methods:{
        dispatch(){
            this.$dispatch('dispatch','老爹我被揍了，赶快来救我')
        }
    },
    mounted() {
        this.$on('boradcast',res => {
            this.sos = res;
        })
    },
}
</script>

<style>

</style>
