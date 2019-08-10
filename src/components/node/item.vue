<template>
    <li>
        <div @click="toggle" class="display-flex">
            <h5 style='margin-right:10px;'>{{model.title}}</h5>
            <span v-if="isFile">{{ open ? '-' : '+'}}</span>
        </div>
        <ul v-if='isFile && open'>
            <item v-for='(child,index) in model.children' :model='child' :key='index'></item>
        </ul>

        <!-- 当跳转至子路由的时候不显示父级的内容   -->
        <div>
            我是父级中的内容
        </div>

        <router-view></router-view>


    </li>
</template>

<script>
export default {
    name:'Item',
    data(){
        return {
            open:false
        }
    },
    computed:{
        isFile(){
            return this.model.children && this.model.children.length;
        }
    },
    props:{
        model:{
            type:Object,
            required:true
        }
    },
    methods: {
        toggle() {
            this.open = !this.open;
        }
    },
}
</script>

<style>
.display-flex{
    display:flex;
    align-items: center;
    cursor: pointer;
}
</style>

