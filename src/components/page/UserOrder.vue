<template>
	<div class="container">
		<el-table :data="tableData" border style="width: 100%" >
			<el-table-column prop="id" label="ID" width="40" align="center"></el-table-column>
			<el-table-column prop="order_no" label="订单标编号" width="150" align="center"></el-table-column>
			<el-table-column prop="add_time" label="下单时间" width="140" align="center"></el-table-column>
			<el-table-column prop="name" label="姓名" width="80" align="center"></el-table-column>
			<el-table-column prop="mobile" label="手机号" width="100" align="center"></el-table-column>
			<el-table-column prop="card" label="会员卡号" width="150" align="center"></el-table-column>
			<el-table-column prop="pay_type" label="付款方式" width="110" align="center" :formatter="payType"></el-table-column>
			<el-table-column prop="deliver" label="收货方式" width="100" align="center" :formatter="deliver"></el-table-column>
			<el-table-column prop="state" label="支付状态" width="80" align="center" :formatter="state"></el-table-column>
			<el-table-column prop="state" label="订单状态" width="80" align="center" :formatter="states"></el-table-column>
			<el-table-column prop="remark" label="备注" style="width: 5%;" align="center"></el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="pagination">
			<el-pagination @current-change="handleCurrentChange" :current-page="page" :page-size="per_page" layout="prev, pager, next, jumper"
			 :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'manage',
		data() {
			return {
				form: {
					keywords: '',
					category_id: ''
				},
				radio: '',
				page: 1,
				total: 0,
				per_page: 0,
				tableData: []
			}
		},
		mounted() {
			this.getOrder();
		},
		activated() {
			this.getOrder();
		},
		methods: {
			//获取订单列表
			getOrder() {
				this.$axios.post(
					'/admin/order_list',
					this.$qs.stringify({
						user_id : this.$route.query.id,
						page: this.page
					})
				).then((res) => {
					console.log(res);
					if (res.data.code == -1) {
						this.$message.warning('请登录！');
						this.$router.push('/login');
					} else if (res.data.code == 0) {
						this.tableData = res.data.data.list;
						this.total = res.data.data.count;
						this.per_page = res.data.data.per_page;
					} else {
						this.$message.warning(res.data.message);
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			// 分页
			handleCurrentChange(val) {
				this.page = val;
				this.getOrder();
			},

			payType: function(row, column) {
				var pay_type;
				if (row.pay_type == 0) {
					pay_type = '未知';
				}
				if (row.pay_type == 1) {
					pay_type = '微信支付';
				}
				if (row.pay_type == 2) {
					pay_type = '悦颐卡在线付款';
				}
				if (row.pay_type == 3) {
					pay_type = '到店付款';
				}
				if (row.pay_type == 4) {
					pay_type = '货到付款';
				}
				return pay_type;
			},

			state: function(row, column) {
				var state;
				if (row.state == 0) {
					state = '未支付';
				}
				if (row.state == 1) {
					state = '已支付';
				}
				return state;
			},
			deliver:function(row, column) {
				var deliver;
				if (row.deliver == 1) {
					deliver = '快递上门';
				}
				if (row.deliver == 2) {
					deliver = '门店自提';
				}
				return deliver;
			},
			states: function(row, column) {
				var state;
				if (row.state == -2) {
					state = '已退款';
				}
				if (row.state == -1) {
					state = '已取消';
				}
				if (row.state == 0) {
					state = '未付款';
				}
				if (row.state == 1) {
					state = '已付款';
				}
				if (row.state == 2) {
					state = '已发货';
				}
				if (row.state == 3) {
					state = '已收货';
				}
				if (row.state == 4) {
					state = '已评价';
				}
				return state;
			},
		}
	}
</script>

<style scoped>
	.el-radio {
		margin-right: 20px;
	}

	.handle-box {
		margin-bottom: 30px;
	}

	.red {
		color: #ff0000;
	}

	.el-button {
		margin-right: 15px;
	}
</style>
