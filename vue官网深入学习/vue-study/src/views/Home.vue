<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :title='title' class='data-attr' style='color:red;' data-attr='自定义属性' msg="Welcome to Your Vue.js App"/>
    <button @click='updateTitle'>update title</button>
    <asyncCon></asyncCon>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'home',
  data() {
    return {
      title:'传递过去的值'
    }
  },
  components: {
    asyncCon:(resolve, reject) => {
        setTimeout(()=> {
          resolve({
            render:h => h('div',{},'I am async!')
          });
        }, 1000)
    },
    HelloWorld
  },
  methods: {
    updateTitle(){
      this.title = '更新的值'
    }
  },
}
</script>
