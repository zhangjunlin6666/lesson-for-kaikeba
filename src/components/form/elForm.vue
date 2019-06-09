<template>
    <div class="el_form">
        <slot></slot>
    </div>
</template>

<script>
export default {
    provide(){
        return {
            'elform':this
        }
    },
    props:{
        model:{
            type:Object,
            default(){
                return null
            }
        },
        rules:{
            type:Object,
            default(){
                return null
            }
        }
    },
    methods:{
        validate(cb){
            let child = this.$children.filter(v =>v.prop).map(child => child.validate());
            Promise.all(child).then(_=> {
                cb(true)
            }).catch(_=> {
                cb(false)
            })
        }
    }
}
</script>

<style>

</style>
