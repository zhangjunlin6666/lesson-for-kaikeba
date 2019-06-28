<template>
    <div class='toast_box' v-show='showToast' :style="{top:top + 'px'}">
        <div>
            <div>{{title}}</div>
            <div>{{content}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '提示'
        },
        content: {
            type: String,
            default: '',
            required:true
        },
        duration: {
            type: Number,
            default: 150
        },
    },
    data() {
        return {
            showToast:true,
            top:20
        }
    },
    methods: {
        show() {
            this.showToast = true;
            setTimeout(() => {
                this.remove();
            },this.duration);
        }
    },
}
</script>

<style>
.toast_box{
    position: fixed;
    left:50%;
    transform: translateX(-50%);
    width:fit-content;
    padding:5px 10px;
    border:1px solid red;
    text-align:center;
}
</style>
