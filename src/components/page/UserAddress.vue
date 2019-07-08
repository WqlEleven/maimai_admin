<template>
    <div class="table">
        <div class="container">
            <!-- 表格 -->
            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column prop="name" label="姓名" width="150" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号" width="200" align="center"></el-table-column>
                <el-table-column prop="province" label="省市县" width="200" align="center"></el-table-column>
                <el-table-column prop="address" label="收货地址" style="width:10%" align="center"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pagination">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-size="per_page"
                        layout="prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'manageUser',
        data() {
            return {
                form: {
                    real_name: '',
                    mobile: '',
                    role_id: ''
                },
                page: 1,
                total: 0,
                per_page: 0,
                tableData: []
            }
        },
        mounted(){
            this.form.id = this.$route.query.id;
            this.getUserAddress();
        },
        activated() {
            this.getUserAddress();
        },
        methods: {
            //获取用户列表
            getUserAddress() {
                this.form.id = this.$route.query.id;
                this.$axios.post(
                    '/admin/address_list',
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
                        var arr = res.data.data.list
                        for(var i = 0; i < arr.length;i++){
                            this.tableData[i].province= arr[i].province + arr[i].city + arr[i].country
                        }
                        this.total = res.data.data.count;
                        this.per_page = res.data.data.per_page;
                    } else {
                        this.$message.warning(res.data.message);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },

            // 分页
            handleCurrentChange(val) {
                this.page = val;
                this.getArtMsg();
            },

            //性别转换
            formatSex: function (row, column) {
                var sex = '未知';
                if (row.sex == 1) {
                    sex = '男';
                } else if (row.sex == 2) {
                    sex = '女';
                }
                return sex;
            },

            //状态转换
            formatStatus: function (row, column) {
                return row.status == 0 ? '启用' : '禁用';
            },
			
        }
    }

</script>

<style scoped>
    .red {
        color: #ff0000;
    }

    .gehang {
        height: 20px;
    }
    .el-button{
        margin-right: 50px;
    }
</style>
