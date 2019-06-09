<template>
    <div class="el_form-item">
        <label v-if='label'>{{label}}</label>
        <slot></slot>
        <div v-if='error' style='color:red'>{{error}}</div>
    </div>
</template>

<script>
import schema from 'async-validator';
export default {
    data() {
        return {
            error:''
        }
    },
    inject:['elform'],
    props:{
        label:{
            type:String,
            default:''
        },
        prop:{
            type:String,
            default:''
        }
    },
    methods:{
        // 这里需要有返回值 validator.validate() 方法会返回一个promise，需要将该promise抛出
        validate(){
            let form = this.elform,
                desc = {
                    [this.prop]: this.elform.rules[this.prop]
                },
                value ={
                    [this.prop]: this.elform.model[this.prop]
                };
            let validator  = new schema(desc);
            return validator.validate(value,(errors,fields) => {
                this.error = errors;
                if(errors){
                    this.error = errors[0].message;
                }
            })
        }
    },
    mounted() {
        this.$on('validate',this.validate);
    }
}
</script>

<style>

</style>
