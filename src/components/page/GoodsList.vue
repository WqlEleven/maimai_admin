<template>
    <div class="container">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" align="center"></el-table-column>
            <el-table-column prop="picture" label="图片" width="100" align="center">
				<template   slot-scope="scope">            
                    <img :src="pictureUrl(scope.row.picture)"  min-width="70" height="70" />
                 </template> 
			</el-table-column>
            <el-table-column prop="alias" label="简称" style="width: 40%" align="center"></el-table-column>
            <el-table-column prop="stock" label="库存" width="100" align="center"></el-table-column>
            <el-table-column prop="sales" label="销量" width="100" align="center"></el-table-column>
			<el-table-column prop="sort" label="排序" width="100" align="center"></el-table-column>
			<el-table-column prop="is_sell" label="预售状态" width="150" align="center" :formatter="formatSell"></el-table-column>
			<el-table-column prop="is_shelve" label="上架状态" width="150" align="center" :formatter="formatShelve"></el-table-column>
            <el-table-column label="管理" width="200" align="center">
                <template slot-scope="scope">
                    <router-link :to="{path:'/GoodsEdit',query:{id:scope.row.id}}">
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
                    '/admin/goods_list',
                    this.$qs.stringify({
//                         keywords: this.form.keywords,
//                         category_id: this.form.category_id,
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
            },

            formatClick:function (row, column) {
                return row.share + '/' + row.click;
            },
			formatSell: function (row, column) {
			    var is_sell ;
			    if (row.is_sell == 1) {
			        is_sell = '预售';
			    } else if (row.is_sell == 0) {
			        is_sell = '未预售';
			    }
			    return is_sell;
			},		
			formatShelve: function (row, column) {
			    var is_shelve ;
			    if (row.is_shelve == 1) {
			        is_shelve = '上架';
			    } else if (row.is_shelve == 0) {
			        is_shelve = '下架';
			    }
			    return is_shelve;
			},
            pictureUrl(picture) {
                return this.IMAGE_URL + '/image/' + picture;
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
