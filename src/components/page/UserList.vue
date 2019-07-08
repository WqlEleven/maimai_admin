<template>
  <div class="table">
    <div class="container">
      <!-- 表单 -->
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="昵称:">
          <el-input v-model="form.keywords"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUser()">搜索</el-button>
        </el-form-item>
      </el-form> 
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="150" align="center"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="200" align="center"></el-table-column>
        <el-table-column prop="headimgurl" label="头像" width="100" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.headimgurl" min-width="70" height="70">
          </template>
        </el-table-column>
        <el-table-column prop="add_time" label="时间" width="200" align="center"></el-table-column>
        <!-- <el-table-column prop="address" label="收货地址" width="300" align="center"></el-table-column>
                <el-table-column prop="order" label="订单" width="100" align="center"></el-table-column>
        <el-table-column prop="log" label="日志" width="260" align="center"></el-table-column>-->
        <el-table-column label="操作" style="width: 8%" align="center">
          <template slot-scope="scope">
            <router-link :to="{path:'/UserAddress',query:{id:scope.row.id}}">
              <el-button type="text" icon="el-icon-search" class="el-button">查看收货地址</el-button>
            </router-link>
            <router-link :to="{path:'/UserOrder',query:{id:scope.row.id}}">
              <el-button type="text" icon="el-icon-search" class="el-button">查看订单</el-button>
            </router-link>
            <router-link :to="{path:'/UserLog',query:{id:scope.row.id}}">
              <el-button type="text" icon="el-icon-search" class="el-button">查看日志</el-button>
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
      form: {
        keywords:''
      },
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
    //获取用户列表
    getUser() {
      this.$axios
        .post(
          "/admin/user_list",
          this.$qs.stringify({
            keywords: this.form.keywords,
            page: this.page
          })
        )
        .then(res => {
          console.log(res);
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
.el-button {
  margin-right: 50px;
}
</style>
