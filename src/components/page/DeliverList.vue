<template>
  <div class="table">
    <div class="container">
      <router-link :to="{path:'/DeliverAdd'}">
        <el-button type="primary" icon="el-icon-edit" class="deliverAdd">添加快递公司</el-button>
      </router-link>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="100" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" width="300" align="center"></el-table-column>
        <el-table-column prop="code" label="代码" width="200" align="center"></el-table-column>
        <el-table-column label="操作" style="width: 10%" align="center">
          <template slot-scope="scope">
            <router-link :to="{path:'/DeliverEdit',query:{id:scope.row.id}}">
              <el-button type="text" icon="el-icon-edit">修改</el-button>
            </router-link>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row.id)">删除</el-button>
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
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "manageUser",
  data() {
    return {
      page: 1,
      total: 0,
      per_page: 0,
      tableData: []
    };
  },
  mounted() {
    this.getUser();
  },
  activated() {
    this.getUser();
  },
  methods: {
    //获取列表
    getUser() {
      this.$axios
        .post(
          "/admin/express_list",
          this.$qs.stringify({
            page: this.page
          })
        )
        .then(res => {
          // console.log(res);
          if (res.data.code == -1) {
            this.$message.warning("请登录！");
            this.$router.push("/login");
          } else if (res.data.code == 0) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.count;
            this.per_page = res.data.data.per_page;
          } else {
            this.$message.warning(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val;
      this.getUser();
    },
    //删除handleDelete
    handleDelete(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(
              "/admin/express_delete",
              this.$qs.stringify({
                id:id
              })
            )
            .then(res => {
              // console.log(res);
              if (res.data.code === 0) {
                this.$message.success(res.data.message);
                this.getUser();
              } else if (res.data.code === -1) {
                this.$message.warning("请登录！");
                this.$router.push("/login");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    }
  }
};
</script>

<style scoped>
.red {
  color: #ff0000;
}

.gehang {
  height: 20px;
}
.deliverAdd {
  margin-bottom: 20px;
}
.red {
  color: red;
  margin-left: 20px;
}
</style>
