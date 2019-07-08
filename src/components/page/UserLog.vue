<template>
    <div class="table">
        <div class="container">
            <!-- 表格 -->
            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column prop="add_time" label="时间" style="width: 50%" align="center"></el-table-column>
                <el-table-column prop="content" label="动作" style="width: 50%" align="center"></el-table-column>
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
                page: 1,
                total: 0,
                per_page: 0,
                tableData: []
            }
        },
        mounted(){
            this.getUser();
        },
        activated() {
            this.getUser();
        },
        methods: {
            //获取用户列表
            getUser() {
                this.$axios.post(
                    '/admin/log_list',
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
                });
            },

            // 分页
            handleCurrentChange(val) {
                this.page = val;
                this.getUser();
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
