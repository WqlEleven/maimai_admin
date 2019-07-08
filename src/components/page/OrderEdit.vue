<template>
  <div class="container">
    <div class="form-box">
      <el-form ref="form" :model="form" label-width="130px">
        <el-form-item label="ID:">
          <span id="id"></span>
        </el-form-item>
        <el-form-item label="订单编号:">
          <span id="order_no"></span>
        </el-form-item>
        <el-form-item label="下单时间:">
          <span id="add_time"></span>
        </el-form-item>
        <el-form-item label="姓名:">
          <span id="name"></span>
        </el-form-item>
        <el-form-item label="手机号:">
          <span id="mobile"></span>
        </el-form-item>
        <el-form-item label="地址:">
          <span id="address"></span>
        </el-form-item>
        <el-form-item label="会员卡号:">
          <span id="card"></span>
        </el-form-item>
        <el-form-item label="商品名称:">
          <span id="goodsName"></span>
        </el-form-item>
        <el-form-item label="商品规格:">
          <span id="goodsSize"></span>
        </el-form-item>
        <el-form-item label="商品数量:">
          <span id="goodsNum"></span>
        </el-form-item>
        <el-form-item label="付款方式:">
          <span id="pay_type"></span>
        </el-form-item>
        <el-form-item label="收货方式:">
          <span id="deliver"></span>
        </el-form-item>
        <el-form-item prop="state" label="支付状态:">
          <el-select v-model="form.state" placeholder="请选择">
            <el-option label="已支付" value="1"></el-option>
            <el-option label="未支付" value="0"></el-option>
            <el-option label="已发货" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item prop="deliver" label="收货方式:">
          <el-select v-model="form.deliver" placeholder="请选择">
            <el-option label="快递" value="1"></el-option>
            <el-option label="自提" value="2"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item prop="mobile" label="物流信息:" v-if="form.deliver == 1">
          <el-row>
            <span id="express_no"></span>
            <el-button type="primary" round @click="search" id="search">查看物流信息</el-button>
          </el-row>
        </el-form-item>
        <el-form-item prop="remark" label="增量备注:">
          <el-input v-model="form.remark" placeholder="例子: 2019-03-10 12:00 修改收货方式为自提，劲松服务站 "></el-input>
        </el-form-item>
        <el-form-item prop="status" label="订单状态:">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option label="正常" value="0"></el-option>
            <el-option label="废弃" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="express_id" label="快递公司:" v-if="form.active == 1">
          <el-select v-model="form.express_id" placeholder="请选择"  @change="change">
            <el-option
              v-for="(item, index) in deliver"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="express_no" label="物流单号:" v-if="form.active == 1">
          <el-input v-model="form.express_no" type="number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-button type="primary" round @click="handleDelivery()">发货</el-button>
            <el-button type="primary" round @click="handleedit()">修改</el-button>
            <router-link class="back" to="/OrderList">
              <el-button type="primary" round>返回</el-button>
            </router-link>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "amend",
  data: function() {
    return {
      form: {
        id: "",
        order_no: "",
        sex: "",
        mobile: "",
        role_id: "",
        name: "",
        password: "",
        status: "",
        state: "",
        express_id: "",
        express_no: "",
        active:''
      },
      deliver:[],
    };
  },
  activated() {
    this.form.id = this.$route.query.id;
    this.getUser();
    this.getExpress();
  },
  mounted() {
    this.form.id = this.$route.query.id;
    this.getUser();
    this.getExpress();
  },
  methods: {
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
    getExpress() {
      this.$axios
        .post(
          "/admin/express_list",
          this.$qs.stringify({
            page: this.page
          })
        )
        .then(res => {
          console.log(res);
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
    getUser() {
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
            this.form = res.data.data.info;
             if(res.data.data.info.deliver == 1){
              this.form.active = 1;
            }else{
              this.form.active = 2;
            }
            this.form.password = "";
            const id = document.getElementById("id");
            id.innerText = res.data.data.info.id;
            const order_no = document.getElementById("order_no");
            order_no.innerText = res.data.data.info.order_no;
            const add_time = document.getElementById("add_time");
            add_time.innerText = res.data.data.info.add_time;
            const name = document.getElementById("name");
            name.innerText = res.data.data.info.name;
            const mobile = document.getElementById("mobile");
            mobile.innerText = res.data.data.info.mobile;
            const address = document.getElementById("address");
            address.innerText =
              res.data.data.info.address.city +
              res.data.data.info.address.country +
              res.data.data.info.address.address;
            const card = document.getElementById("card");
            card.innerText = res.data.data.info.card;
            const goodsName = document.getElementById("goodsName");
            goodsName.innerText = res.data.data.info.goods.name;
            const goodsSize = document.getElementById("goodsSize");
            goodsSize.innerText =
              res.data.data.info.size + res.data.data.info.color;
            const goodsNum = document.getElementById("goodsNum");
            goodsNum.innerText = res.data.data.info.num;

            const pay_type = document.getElementById("pay_type");
            if (res.data.data.info.pay_type == 0) {
              pay_type.innerText = "未知";
            }
            if (res.data.data.info.pay_type == 1) {
              pay_type.innerText = "微信支付";
            }
            if (res.data.data.info.pay_type == 2) {
              pay_type.innerText = "悦颐卡在线付款";
            }
            if (res.data.data.info.pay_type == 3) {
              pay_type.innerText = "到店付款";
            }
            if (res.data.data.info.pay_type == 4) {
              pay_type.innerText = "货到付款";
            }
            if (res.data.data.info.status == false) {
              res.data.data.info.status == 0;
            } else {
              res.data.data.info.status == 2;
            }
            // deliver
            const deliver = document.getElementById("deliver");
            if (res.data.data.info.deliver == 1) {
              deliver.innerText = "快递上门";
            } else if (res.data.data.info.deliver == 2) {
              deliver.innerText = "门店自提";
            }
            var express;
            const express_no = document.getElementById("express_no");
            if(res.data.data.info.express_id == 0){
              express = '未选择快递公司或未发货'
            }
            if(res.data.data.info.express_id == 1){
              express = '百世汇通快递'
            }
            if(res.data.data.info.express_id == 2){
              express = '中通快递'
            }
            if(res.data.data.info.express_id == 3){
              express = '圆通速递'
            }
            if(res.data.data.info.express_id == 4){
              express = '申通快递'
            }
            if(res.data.data.info.express_id == 5){
              express = '韵达快递'
            }
            if(res.data.data.info.express_id == 6){
              express = '顺丰快递'
            }
            if(res.data.data.info.express_id == 7){
              express = '天天快递'
            }
            if(res.data.data.info.express_id == 9){
              express = '邮政国内'
            }
            if(res.data.data.info.express_id == 10){
              express = '德邦物流'
            }
            express_no.innerText =express +
              " " +
              res.data.data.info.express_no;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //连接到百度查物流
    search() {
      window.location.href = "http://www.kuaidi100.com";
    },
    //处理修改
    handleedit() {
      this.$confirm("此操作将修改订单信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/admin/order_edit", this.$qs.stringify(this.form))
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
            message: "已取消修改"
          });
        });
    }
  }
};
</script>
<style scoped>
span {
  color: #666;
}

.back {
  margin-left: 10px;
}

.active {
  display: none;
}
#search {
  margin-left: 10px;
}
</style>
