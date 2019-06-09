<template>
  <div class="about">
    <h1>This is an about page</h1>
    <list
    v-for="(item,index) in list"
    :key='index'
    :option='item'
    ></list>
  </div>
</template>
<script>
import list from './../components/list';
export default {
  data(){
    return {
      list: [
        {
          id:1,
          date:'3月28日',
          num:2
        },
        {
          id:2,
          date:'3月27日',
          num:10
        }
      ]
    }
  },
  components:{
    list
  }
}
</script>

