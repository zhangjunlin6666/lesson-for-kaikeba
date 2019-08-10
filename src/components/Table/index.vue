<template>
    <el-table
        :data="tabelData"
        v-bind='$attrs'
        v-on='$listeners'
        border
        highlight-current-row>
        <el-table-column
            v-if='!!typeItem'
            v-bind="typeItem"
            align="center">
        </el-table-column>
        <el-table-column
            v-for="(item,index) in column" 
            :key='index'
            v-bind="item"
            align="center">
            <template slot-scope="scope">
                <span v-if='!item.slotName'>{{scope.row[item.prop]}}</span>
                <slot v-else :name='item.slotName' :scope='scope'></slot>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props:{
        // 传递给表格的数据
        tabelData:{
            type:Array,
            required:true,
            default(){
                return []
            }
        },

        // 列的配置，兼容elementui上列的所有属性
        column:{
            type:Array,
            required:true,
            default(){
                return []
            }
        },

        // 当列为type（selection/index/expand）类型时的配置,可传递elementui中table-column组件所有的属性
        typeItem:{
            type:Object,
            default(){
                return null
            }
        }
    }
    
}
</script>
