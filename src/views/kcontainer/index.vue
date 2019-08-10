<!--
 * @Author: jackson
 * @Date: 2019-08-10 11:06:03
 * @LastEditors: jackson
 * @LastEditTime: 2019-08-10 11:21:22
 -->
<template>
    <div>
        <krouter-link v-for="(link,index) in linkList" :key='index' :to="link.path">{{link.name}}</krouter-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            linkList:[
                {
                    path:'/khome',
                    name:'home'
                },
                {
                    path:'/kabout',
                    name:'about'
                }
            ]
        }
    }
}
</script>

