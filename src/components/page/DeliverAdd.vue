<template>
	<div class="container">
	    <el-form :model="form" ref="form" label-width="100px">
	        <el-form-item prop="name" label="快递公司名称">
	            <el-input v-model="form.name"></el-input>
	        </el-form-item>
			<el-form-item prop="code" label="代码">
	            <el-input v-model="form.code"></el-input>
	        </el-form-item>
			<el-form-item label="">
			    <el-row>
			        <el-button type="primary" @click="DeliverAdd()" icon="el-icon-check" round>确认添加</el-button>
			    </el-row>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		data: function() {
			return {
				form: {
					name:'',
					code:''
				}
			}
		},
		methods: {
			DeliverAdd:function () {
				this.$axios.post(
				    '/admin/express_add',
				    this.$qs.stringify(this.form)
				).then((res) => {
				    //console.log(res);
				    if (res.data.code == -1) {
				        this.$message.warning('请登录！');
				        this.$router.push('/login');
				    } else if (res.data.code == 0) {
				        this.$message.success(res.data.message);
				        this.$router.push('/DeliverList');
				    } else {
				        this.$message.warning(res.data.message);
				    }
				}).catch((res) => {
				    console.log(res);
				});
			}	
		}
	}
</script>
<style scoped>

</style>
