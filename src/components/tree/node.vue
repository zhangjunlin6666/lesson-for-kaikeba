<template>
    <ul>
        <li class='tree_item-hover' v-for='(item,index) in list' :key='index'>
            <input type="checkbox" @change="change" v-model='item.checked' :value='item.title'>
            <span @click.stop='show(item)'>{{item.title}}</span>
            <node :list='item.children' v-show='item.expanded'></node>
        </li>
    </ul>
</template>

<script>
export default {
    name:'node',
    props:{
        list:{
            type:Array,
            default(){
                return []
            }
        }
    },
    created() {
        this.list.forEach(item => {
            this.$set(item,'checked',false);
        })
    },
    methods:{
        // 当tree默认是闭合时，必须添加上expanded属性，值为false即可，因为不添加的话这个属性就不会添加getter和setter从而做不到响应式，或者手动将属性转化成响应式
        show(item){
            if(item.children && item.children.length) item.expanded = !item.expanded;
        },

        change(){
            console.log(this.list);
        }
    }
}
</script>

<style>
.tree_item-hover{
    cursor: pointer;
}
</style>
