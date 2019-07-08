<template>
	<div class="container">
	    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
	        <el-form-item prop="name" label="门店名称">
	            <el-input v-model="form.name"></el-input>
	        </el-form-item>
			<el-form-item label="省市区">
				<el-select v-model="form.province" @change="choseCity" placeholder="省级地区">
					<el-option v-for="item in province_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
				 <el-select v-model="form.city" @change="choseCountry" placeholder="市级地区" style="margin-left: 10px;">
					<el-option v-for="item in city_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
				<el-select v-model="form.country" placeholder="区级地区" style="margin-left: 10px;">
					<el-option v-for="item in country_list" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select> 
			</el-form-item>
			<el-form-item prop="address" label="详细地址">
				<el-input v-model="form.address"></el-input>
			</el-form-item>
			<el-form-item prop="phone" label="电话">
				<el-input v-model="form.phone"></el-input>
			</el-form-item>
			<el-form-item label="">
			    <el-row>
			        <el-button type="primary" @click="storeEdit()" icon="el-icon-check" round>修改</el-button>
			        <el-button type="danger" @click="storeDelete()" icon="el-icon-delete" round>删除</el-button>
			    </el-row>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	export default {
		name: 'amend',
		data: function() {
			return {
				province_list:[],
				city_list:[],
				country_list:[],
				form: {
					id: '',
					name: '',
					address: '',
					phone: '',
					province:'',
					city: '',
					country: '',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入门店名称',
						trigger: 'blur'
					}],
					region: [{
						required: true,
						message: '请输入省市区',
						trigger: 'blur'
					}],
					address: [{
						required: true,
						message: '请输入详细地址',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '请输入电话',
						trigger: 'blur'
					}],
				}
			}
		},
		activated() {
			this.form.id = this.$route.query.id;
			this.getArtMsg();
		    this.choseProvince();
		},
		 mounted() {
			this.form.id = this.$route.query.id;
			this.getArtMsg();
		    this.choseProvince();
		},
		
		created() {},
		methods: {
			choseProvince: function() {
				this.$axios.post('/admin/province')
				.then((res) => {
					console.log(res);
					if (res.data.code == -1) {
						this.$message.warning('请登录！');
						this.$router.push('/login');
					} else if (res.data.code == 0) {
						this.province_list = res.data.data.list;
						
					} else {
						this.$message.warning(res.data.message);
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			choseCity:function(res){
				console.log(res)
				var id = res;
				this.$axios.post(
					'/admin/city',this.$qs.stringify({province_id:id})
				).then((res) => {
					console.log(res);
					if (res.data.code == -1) {
						this.$message.warning('请登录！');
						this.$router.push('/login');
					} else if (res.data.code == 0) {
						console.log(this.city_list)
						this.city_list = res.data.data.list;
						// this.form.city ='';
						// this.form.country = '';
					} else {
						this.$message.warning(res.data.message);
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			choseCountry:function (res) {
				console.log(res)
				var id = res;
				this.$axios.post(
					'/admin/country',this.$qs.stringify({city_id:id})
				).then((res) => {
					console.log(res);
					if (res.data.code == -1) {
						this.$message.warning('请登录！');
						this.$router.push('/login');
					} else if (res.data.code == 0) {
						this.country_list = res.data.data.list;
						// this.form.country = '';
					} else {
						this.$message.warning(res.data.message);
					}
				}).catch((err) => {
					console.log(err);
				})
			},
// 			change:function(res){
// 				console.log(res)
// 				this.form.country = res;
// 			},
			storeAdd:function () {
				this.$axios.post(
				    '/admin/store_add',
				    this.$qs.stringify(this.form)
				).then((res) => {
				    //console.log(res);
				    if (res.data.code == -1) {
				        this.$message.warning('请登录！');
				        this.$router.push('/login');
				    } else if (res.data.code == 0) {
				        this.$message.success(res.data.message);
				        this.$router.push('/StoreList');
				    } else {
				        //console.log(res.data.message);
				        this.$message.warning(res.data.message);
				    }
				}).catch((res) => {
				    console.log(res);
				});
			},
			 //获取商品信息
			getArtMsg() {
			    this.form.id = this.$route.query.id;
			    this.$axios.post(
			        '/admin/store_info',
			        this.$qs.stringify({
			            id: this.form.id
			        })
			    ).then((res) => {
			        console.log(res);
			        if (res.data.code == -1) {
			            this.$message.warning('请登录！');
			            this.$router.push('/login');
			        } else if (res.data.code == 0) {
			            this.form = res.data.data.info;
			        }
			    }).catch((err) => {
			        console.log(err);
			    });
			},
			//修改
			storeEdit() {
			    this.$axios.post(
			        '/admin/store_edit',
			        this.$qs.stringify(this.form),
			    ).then((res) => {
			        console.log(res);
			        if (res.data.code == -1) {
			            this.$message.warning('请登录！');
			            this.$router.push('/login');
			        } else if (res.data.code == 0) {
			            this.$message.success(res.data.message);
			            this.$router.push('/storeList');
			        } else {
			            //console.log(res.data.message);
			            this.$message.warning(res.data.message);
			        }
			    }).catch((res) => {
			        console.log(res);
			    });
			},
			//删除
			storeDelete(text) {
			    // console.log(this.form.id)
			    this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
			        confirmButtonText: '确定',
			        cancelButtonText: '取消',
			        type: 'warning'
			    }).then(() => {
			        this.$axios.post(
			            '/admin/store_delete',
			            this.$qs.stringify({
			                id: this.form.id
			            })
			        ).then((res) => {
			            console.log(res);
			            if (res.data.code === 0) {
			                this.$message.success(res.data.message);
			                this.$router.push('/StoreList')
			            } else if (res.data.code === -1) {
			                this.$message.warning('请登录！');
			                this.$router.push('/login');
			            }
			        }).catch((err) => {
			            console.log(err);
			        });
			    }).catch(() => {
			        this.$message.info('已取消删除');
			    });
			}
			
		}
	}
</script>
<style scoped>

</style>
