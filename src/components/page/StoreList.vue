<template>
    <div class="container">
        <el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="name" label="名称" style="width:20%" align="center"></el-table-column>
            <el-table-column prop="alias" label="省市区" width="200" align="center"></el-table-column>
            <el-table-column prop="address" label="详细地址" style="width:20%" align="center"></el-table-column>
            <el-table-column prop="phone" label="电话" width="200" align="center"></el-table-column>
            <el-table-column label="管理" width="200" align="center">
                <template slot-scope="scope">
                    <router-link :to="{path:'/StoreEdit',query:{id:scope.row.id}}">
                        <el-button type="text" icon="el-icon-edit">编辑</el-button>
                    </router-link>
                </template>
            </el-table-column>
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
</template>

<script>
    export default {
        data() {
            return {  
                page: 1,
                total: 0,
                per_page: 0,
                tableData: []
            }
        },
        mounted() {
            this.getArticle();
        },
        activated() {
            this.getArticle();
        },
        methods: {
            //获取列表
            getArticle() {
                this.$axios.post(
                    '/admin/store_list',
                    this.$qs.stringify({
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
                this.getArticle();
            }
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
