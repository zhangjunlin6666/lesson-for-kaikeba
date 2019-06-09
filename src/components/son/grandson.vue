<template>
    <div class="grand-son-box">
        <div>{{name}}</div>
        <span style="color:#ace789">{{title}}</span>
        <span v-if="sos" style='color:red'> ————{{sos}}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title:'孙子说：',
            sos:''
        }
    },
    inject:['name'],
    componentName:'grandson',
    mounted() {
        this.$on('boradcast',res => {
            this.sos = '糟糕，收到爷爷的通知，老爹被揍了，火速救援';
        })
    },
}
</script>

<style>

</style>
