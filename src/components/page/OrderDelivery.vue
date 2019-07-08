<template>
  <div class="container">
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label="姓名:">
          <span id="name"></span>
        </el-form-item>
        <el-form-item label="手机号:">
          <span id="mobile"></span>
        </el-form-item>
        <el-form-item label="地址:">
          <span id="address"></span>
        </el-form-item>
      <el-form-item prop="express_id" label="快递公司:" v-if="form.active == 1">
        <el-select v-model="form.express_id" placeholder="请选择" @change="change">
          <el-option v-for="(item, index) in deliver" :key="index" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="express_no" label="物流单号:" v-if="form.active == 1">
        <el-input v-model="form.express_no" type="number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-button type="primary" round @click="handleDelivery()">发货</el-button>
          <router-link class="back" to="/OrderList">
            <el-button type="primary" round>返回</el-button>
          </router-link>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "amend",
  data: function() {
    return {
      form: {
        express_id: "",
        express_no: "",
        active:''
      },
      deliver:[],
      page:1,
      
    };
  },
  activated() {
    this.form.id = this.$route.query.id;
    this.getUser();
    this.getOrderInfo();
  },
  mounted() {
    this.form.id = this.$route.query.id;
    this.getUser();
    this.getOrderInfo();
  },
  methods: {
    //
    change(){
      // console.log(this.form.express_id)
    },
    //处理发货
    handleDelivery() {
      this.$confirm("此操作将发货, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(this.form)
          this.$axios
            .post("/admin/deliver", this.$qs.stringify({
              order_id:this.form.id,
              express_id:this.form.express_id,
              express_no:this.form.express_no
            }))
            .then(res => {
              console.log(res);
              if (res.data.code == -1) {
                this.$message.warning("请登录！");
                this.$router.push("/login");
              } else if (res.data.code == 0) {
                this.$message.success(res.data.message);
                this.$router.push("/OrderList");
              } else {
                this.$message.warning(res.data.message);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发货"
          });
        });
    },
    //获取快递列表
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
            this.deliver = res.data.data.list;
            // console.log(this.deliver)
          } else {
            this.$message.warning(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取订单详细信息
    getOrderInfo() {
      this.$axios
        .post(
          "/admin/order_info",
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
            //写逻辑
            if(res.data.data.info.deliver == 1){
              this.form.active = 1;
              const address = document.getElementById("address");
            address.innerText = res.data.data.info.address.city + res.data.data.info.address.country + res.data.data.info.address.address
            }else{
              this.form.active = 2;
              const address = document.getElementById("address");
            address.innerText = res.data.data.info.store.name  + res.data.data.info.store.address
            }
            const name = document.getElementById("name");
            name.innerText = res.data.data.info.name;
            const mobile = document.getElementById("mobile");
            mobile.innerText = res.data.data.info.mobile;
            
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>
<style scoped>
</style>
