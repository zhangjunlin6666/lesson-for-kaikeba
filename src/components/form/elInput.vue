<template>
    <div class="el_input">
        <input :type="type" :value='value' @blur='toBlur' @input='toInput'>
    </div>
</template>

<script>
export default {
    props:{
        type:{
            type:String,
            default:'text'
        },
        value:{
            default:''
        }
    },
    methods: {
        toInput(e){
            this.$emit('input',e.target.value);
        },
        toBlur(){
            this.$dispatch('validate');
        }
    }
}
</script>

<style>

</style>
