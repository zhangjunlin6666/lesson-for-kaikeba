<template>
    <div class="date-box">
        <div @click='getlist(option.id)'>{{option.date}}({{option.num}})</div>
        <ul>
            <li v-for="(item,index) in list['list' + option.id]" :key='index'>
                <div>{{item.name}}</div>
                <div>{{item.title}}</div>
                <div>{{item.price}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            list:{}
        }
    },
    props:{
        option:{
            type:Object,
            default:''
        }
    },
    methods:{
        getlist(id){
            setTimeout(()=>{
                let arr = [
                    {
                        name:'a',
                        title:'第一天',
                        price:23
                    },
                    {
                        name:'b',
                        title:'第二天',
                        price:28
                    }
                ]
                // 如果list是个数组的话，每次请求会被覆盖，所以list不能是个数组，
                // 我们将传进来的日期id拼接list字符串可以为每个日期下面创建不能的数据，格式为;
                // 比喻第一个日期的id为1，第二个为2，以此类推.......
                list = {
                    list1:[
                        {
                            name:'a',
                            title:'第一天',
                            price:23
                        },
                        {
                            name:'b',
                            title:'第二天',
                            price:28
                        }
                    ],
                    list2:[
                        {
                            name:'a',
                            title:'第一天',
                            price:23
                        },
                        {
                            name:'b',
                            title:'第二天',
                            price:28
                        }
                    ]
                }
                this.$set(this.list,`list${this.option.id}`,arr);
            },2000)
        }
    }
}
</script>

<style>

</style>
