<template>
	<div id="app">
		<son></son>

		<div v-if='sos'>
			<span style='color:pink'>爷爷收到消息：</span>
			<span style='color:red'>{{sos}}</span>
			<button @click="saveMySon">爸爸来救你了，别担心</button>
		</div>

		<tree></tree>
		<span>{{formModel.username}}{{formModel.password}}</span>
		<el-form ref='form' :model='formModel' :rules='rules'>
			<el-form-item label='用户名：' prop='username'>
				<el-input v-model='formModel.username'></el-input>
			</el-form-item>
			<el-form-item label='密码：' prop='password'>
				<el-input v-model='formModel.password'></el-input>
			</el-form-item>
		</el-form>

		<button @click='submitForm'>提交</button>

		<span>冲啊，手榴弹扔了{{$store.state.count}}个</span>
		<button @click='clickOne'>扔一个</button>
		<button @click='clickMore'>蓄力扔</button>
	</div>
</template>
<script>
import son from './components/son/son';
import tree from './components/tree/tree';
import elForm from './components/form/elForm';
import elFormItem from './components/form/elFormItem';
import elInput from './components/form/elInput';

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
		elForm,
		elFormItem,
		elInput
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
			this.$store.commit('setCount');
		},
		clickMore(){
			this.$store.dispatch('setCountMore', 8);
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
		console.log(obj1);
		console.log({});
		this.$on('dispatch',(res) => {
			this.sos = res;
		})
	}
}
</script>

<style lang="scss">
</style>
