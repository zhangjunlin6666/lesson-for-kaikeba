<template>
    <li>
        <div @click="toggle" class="display-flex">
            <h5 style='margin-right:10px;'>{{model.title}}</h5>
            <span v-if="isFile">{{ open ? '-' : '+'}}</span>
        </div>
        <ul v-if='isFile && open'>
            <item v-for='(child,index) in model.children' :model='child' :key='index'></item>
        </ul>
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

