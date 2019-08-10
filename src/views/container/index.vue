<!--
 * @Author: jackson
 * @Date: 2019-07-22 23:10:44
 * @LastEditors: jackson
 * @LastEditTime: 2019-08-10 10:53:41
 -->
<template>
	<div id="app">
		<son></son>

		<div v-if='sos'>
			<span style='color:pink'>爷爷收到消息：</span>
			<span style='color:red'>{{sos}}</span>
			<button @click="saveMySon">爸爸来救你了，别担心</button>
		</div>

		<h2>第一个树形结构</h2>
		<tree></tree>

		<h2>第二个树形结构</h2>
		<node></node>

		<h2>{{formModel.username}}{{formModel.password}}</h2>
		<el-form ref='form' :model='formModel' :rules='rules'>
			<el-form-item label='用户名：' prop='username'>
				<el-input v-model='formModel.username'></el-input>
			</el-form-item>
			<el-form-item label='密码：' prop='password'>
				<el-input :value='formModel.password' @input='formModel.password=$e' v-model='formModel.password'></el-input>
			</el-form-item>
		</el-form>

		<button @click='submitForm'>提交</button>

		<span>冲啊，手榴弹扔了{{$kstore.state.count}}个</span>
		<button @click='clickOne'>扔一个</button>
		<button @click='clickMore'>蓄力扔</button>

		<c-table :tabelData='tabelData' :column='column' :typeItem='typeItem'>
			<template slot='status' slot-scope="{scope}">
				<span>{{scope.row.status === 0 ? "死了": "活蹦乱跳的"}}</span>
			</template>
			<template slot='action' slot-scope="{scope}">
				<el-button text='primary'>删除</el-button>
			</template>
		</c-table>
		
	</div>
</template>
<script>
import son from './../../components/son/son';
import tree from './../../components/tree/tree';
import node from './../../components/node'
import elForm from './../../components/form/elForm';
import elFormItem from './../../components/form/elFormItem';
import elInput from './../../components/form/elInput';
import cTable from "./../../components/Table/index";
export default {
	name:'app',
    data(){
        return {
			sos:'',
			formModel:{
				username:'',
				password:''
			},
			rules:{
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			},
			tabelData:[
				{
					name:'张三',
					sex:'男',
					age:30,
					height:178,
					status:1
				},
				{
					name:'李四',
					sex:'男',
					age:78,
					height:170,
					status:0
				},
				{
					name:'如花',
					sex:'女',
					age:23,
					height:172,
					status:1
				}
			],
			column:[
				{
					label:'姓名',
					prop:'name'
				},
				{
					label:'性别',
					prop:'sex'
				},
				{
					label:'年龄',
					prop:'age'
				},
				{
					label:'身高',
					prop:'height'
				},
				{
					label:'状态',
					slotName:'status'
				},
				{
					label:'操作',
					slotName:'action'
				}
			],
			typeItem:{
				type:'selection'
			}
        }
	},
	provide:{
		name:'provide结合inject进行通信'
	},
	componentName:'app',
	components:{
		son,
		tree,
		node,
		elForm,
		elFormItem,
		elInput,
		cTable
	},
	methods: {
		saveMySon(){
			this.$notice.info({
				duration:10000,
				content:'啊哈哈'
			})
			this.$boradcast('boradcast','爸爸来救你了')
		},
		submitForm(){
			this.$refs.form.validate(valid => {
				if(valid){
					alert('验证成功')
				} else {
					alert('验证失败')
				}
			})
		},
		clickOne(){
			this.$kstore.commit('setCount');
		},
		clickMore(){
			this.$toast({
				content:'你确定要扔一个这么大的石头？',
				duration:3000
			}).show();
			this.$kstore.dispatch('setCountMore', 8);
		}
	},
	mounted() {
		let obj = {
			name:'debug',
			print(){
				console.log(this.debug);
			}
		}
		let obj1 = Object.create(null);
		this.$on('dispatch',(res) => {
			this.sos = res;
		})
	}
}
</script>

<style lang="scss">
</style>
