<template>
    <div class="natice-box">
        <div class='natice-content-box' v-for='(item,index) in notice' :key='index'>
            {{item.content}}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            notice: [],
            id:0
        }
    },
    methods:{
        add(options){
            options.id = 'kid' + this.id ++;
            this.notice.push(options);
            let duration = options.duration || 150
            setTimeout(() => {
                this.remove(options.id);
            },duration)
        },
        remove(id){
            let notice = this.notice;
            for(let i = 0,len = notice.length; i < len; i ++){
                if(notice[i].id === id) {
                    this.notice.splice(i,1);
                    break;
                }
            }
        }
    }
}
</script>

<style>
.natice-box{
    position: absolute;
    width:100%;
    top:0;
    pointer-events:none;
}
.natice-content-box{
    min-width:100px;
    text-align:center;
    width:fit-content;
    padding: 5px 10px;
    border:2px solid red;
    margin:10px auto;
}
</style>
