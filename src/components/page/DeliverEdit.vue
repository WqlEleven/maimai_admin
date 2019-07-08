<template>
  <div class="container">
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item prop="name" label="快递公司名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="代码">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-row>
          <el-button type="primary" @click="DeliverEdit()" round>修改</el-button>
          <router-link to="/DeliverList">
            <el-button type="primary" round>返回</el-button>
          </router-link>
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
        name: "",
        code: ""
      }
    };
  },
  activated() {
    this.form.id = this.$route.query.id;
    this.getArtMsg();
  },
  mounted() {
    this.form.id = this.$route.query.id;
    this.getArtMsg();
  },
  methods: {
    //获取信息
    getArtMsg() {
      this.form.id = this.$route.query.id;
      this.$axios
        .post(
          "/admin/express_info",
          this.$qs.stringify({
            id: this.form.id
          })
        )
        .then(res => {
          console.log(res);
          if (res.data.code == -1) {
            this.$message.warning("请登录！");
            this.$router.push("/login");
          } else if (res.data.code == 0) {
            this.form = res.data.data.info;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改
    DeliverEdit() {
      this.$axios
        .post("/admin/express_edit", this.$qs.stringify(this.form))
        .then(res => {
          console.log(res);
          if (res.data.code == -1) {
            this.$message.warning("请登录！");
            this.$router.push("/login");
          } else if (res.data.code == 0) {
            this.$message.success(res.data.message);
            this.$router.push("/DeliverList");
          } else {
            this.$message.warning(res.data.message);
          }
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style scoped>
</style>
