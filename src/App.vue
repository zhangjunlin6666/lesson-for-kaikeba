<!--
 * @Author: jackson
 * @Date: 2019-05-30 11:31:19
 * @LastEditors: jackson
 * @LastEditTime: 2019-08-10 19:03:13
 -->
<template>
	<div id="app">
		<container/>
		<kcontainer/>
		<kvuex></kvuex>
		<krouter-view></krouter-view>
	</div>
</template>
<script>
import container from "./views/container";
import kcontainer from "./views/kcontainer"
import kvuex from "./views/kvuex";
export default {
	components:{
		container,
		kcontainer,
		kvuex
	}
}
</script>

