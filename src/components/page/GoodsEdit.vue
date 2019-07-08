<template>
  <div class="container">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item prop="name" label="产品名称">
        <el-input v-model="form.name" id="markText" placeholder="产品名称字数不超过24个字"></el-input>
      </el-form-item>
      <el-form-item prop="alias" label="简称">
        <el-input v-model="form.alias"></el-input>
      </el-form-item>
      <el-form-item prop="picture" label="主图">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :with-credentials="true"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.picture" :src="pictureUrl(form.picture)" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="pictures" label="图片集">
        <el-upload
          :action="uploadUrl"
          :multiple="true"
          list-type="picture-card"
          :with-credentials="true"
          :file-list="file_list"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-error="handleError"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form-item>
      <el-form-item prop="color" label="颜色">
        <el-button
          type="primary"
          icon="el-icon-plus"
          plain
          @click.prevent="colorAdd"
          style="margin-bottom: 10px;"
        >添加颜色</el-button>
        <el-row v-for="(item, index) in form.color" :key="index" :span="4">
          <el-form-item
            :prop="'color.' + index + '.color'"
            label-width="30px"
            style="width: 180px;float: left;"
          >
            <el-input v-model="item.color"></el-input>
          </el-form-item>
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="colorRemove(item)"
            style="margin-left: 5px;"
          >删除</el-button>
        </el-row>
      </el-form-item>
      <el-form-item prop="size" label="规格">
        <el-button
          type="primary"
          icon="el-icon-plus"
          plain
          @click.prevent="sizeAdd"
          style="margin-bottom: 10px;"
        >添加规格</el-button>
        <el-row v-for="(item, index) in form.size" :key="index" :span="4">
          <el-form-item
            :prop="'size.' + index + '.size'"
            label-width="30px"
            style="width: 180px;float: left;"
          >
            <el-input v-model="item.size"></el-input>
          </el-form-item>
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="sizeRemove(item)"
            style="margin-left: 5px;"
          >删除</el-button>
        </el-row>
      </el-form-item>
      <el-form-item prop id="sureAdd" style="display: none;">
        <el-button type="success" plain @click.prevent="sureAdd" style="margin-bottom: 10px;">确认添加</el-button>
      </el-form-item>
      <el-form-item prop="specifications" style="margin-left: 0px;">
        <el-row
          v-for="(item, index) in form.specifications"
          :key="index"
          style="margin-left: -72px;"
        >
          <el-form-item
            :prop="'specifications.' + index + '.color'"
            label="颜色"
            label-width="70px"
            style="width: 150px;float: left;"
          >
            <el-input v-model="item.color"></el-input>
          </el-form-item>
          <el-form-item
            :prop="'specifications.' + index + '.size'"
            label="规格"
            label-width="50px"
            style="width: 130px;float: left;"
          >
            <el-input v-model="item.size"></el-input>
          </el-form-item>
          <el-form-item
            :prop="'specifications.' + index + '.price'"
            :rules="{required: true, message: '价格不能为空', trigger: 'blur'}"
            label="价格"
            label-width="50px"
            style="width: 120px;float: left;"
          >
            <el-input v-model="item.price"></el-input>
          </el-form-item>
          <el-form-item
            :prop="'specifications.' + index + '.listing_price'"
            :rules="{required: true, message: '挂牌价不能为空', trigger: 'blur'}"
            label="挂牌价"
            label-width="65px"
            style="width: 140px;float: left;"
          >
            <el-input v-model="item.listing_price"></el-input>
          </el-form-item>
          <el-form-item
            :prop="'specifications.' + index + '.stock'"
            :rules="{required: true, message: '库存不能为空', trigger: 'blur'}"
            label="库存"
            label-width="50px"
            style="width: 104px;float: left;"
          >
            <el-input v-model="item.stock"></el-input>
          </el-form-item>
          <el-form-item
            :prop="'specifications.' + index + '.business_code'"
            :rules="{required: true, message: '商家编码不能为空', trigger: 'blur'}"
            label="商家编码"
            label-width="78px"
            style="width: 170px;float: left;"
          >
            <el-input v-model="item.business_code"></el-input>
          </el-form-item>
          <el-form-item
            :prop="'specifications.' + index + '.bar_code'"
            :rules="{required: true, message: '商品条形码不能为空', trigger: 'blur'}"
            label="商品条形码"
            label-width="95px"
            style="width: 186px;float: left;"
          >
            <el-input v-model="item.bar_code"></el-input>
          </el-form-item>
          <el-form-item
            :prop="'specifications.' + index + '.picture'"
            :rules="{required: true, message: '请上传主图', trigger: 'blur'}"
            label="主图"
            label-width="50px"
            style="width: 100px;float: left;"
          >
            <el-upload
              class="picture-uploader"
              :action="uploadUrl"
              :data="{'index':index}"
              :show-file-list="false"
              :with-credentials="true"
              :on-success="handlePictureSuccess"
              :before-upload="beforePictureUpload"
            >
              <img
                v-if="form.specifications[index].picture"
                :src="pictureUrl(form.specifications[index].picture)"
                class="picture"
              >
              <i v-else class="el-icon-plus picture-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="specificationsRemove(item)"
            style="margin-left: 5px;"
          >删除</el-button>
        </el-row>
      </el-form-item>
      <el-form-item prop="business_code" label="商家编码">
        <el-input v-model="form.business_code"></el-input>
      </el-form-item>
      <el-form-item prop="bar_code" label="商品条形码">
        <el-input v-model="form.bar_code"></el-input>
      </el-form-item>
      <el-form-item prop="bar_code" label="价格" v-if="form.specifications.length == 0">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item prop="bar_code" label="挂牌价" v-if="form.specifications.length == 0">
        <el-input v-model="form.listing_price"></el-input>
      </el-form-item>
      <el-form-item prop="bar_code" label="库存" v-if="form.specifications.length == 0">
        <el-input v-model="form.stock"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input
          id="markTexts"
          type="textarea"
          prop="intro"
          v-model="form.intro"
          placeholder="字数不超过500字"
        ></el-input>
      </el-form-item>
      <el-form-item prop="content" label="商品详情">
        <quill-editor ref="myQuillEditor" v-model="form.content" :options="editorOption"></quill-editor>
      </el-form-item>
      <el-form-item prop="freight" label="运费">
        <el-input v-model="form.freight"></el-input>
      </el-form-item>
      <el-form-item prop="sort" label="排序">
        <el-input v-model="form.sort"></el-input>
      </el-form-item>
      <el-form-item prop="is_sell" label="是否预售">
        <el-switch v-model="form.is_sell" active-value="1" inactive-value="0" @change="changeSell"></el-switch>
      </el-form-item>
      <!-- <el-form-item prop="sell_date" label="预售日期" v-if="sell_show">
				<el-date-picker v-model="form.sell_date" type="date" placeholder="选择日期">
				</el-date-picker>
      </el-form-item>-->
      <el-form-item prop="delivery_date" label="发货日期" v-if="sell_show">
        <el-date-picker
          v-model="form.delivery_date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @blur="changeDate"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="is_shelve" label="是否上架">
        <el-switch
          v-model="form.is_shelve"
          active-value="1"
          inactive-value="0"
          @change="changeShelve"
        ></el-switch>
      </el-form-item>
      <el-form-item label>
        <el-row>
          <el-button type="primary" @click="handleEdit()" icon="el-icon-check" round>修改</el-button>
          <!-- <el-button type="danger" @click="handleDeletee()" icon="el-icon-delete" round>删除</el-button> -->
          <el-input v-model="form.temp" style="display: none;"></el-input>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
import { constants } from "fs";

Quill.register("modules/ImageExtend", ImageExtend);

export default {
  name: "editor",
  data: function() {
    return {
      file_list: [],
      dialogImageUrl: "",
      dialogVisible: false,
      sell_show: false,
      form: {
        name: "",
        alias: "",
        picture: "",
        pictures: [],
        color: [],
        size: [],
        specifications: [],
        business_code: "",
        bar_code: "",
        price: 0,
        listing_price: 0,
        stock: 0,
        intro: "",
        content: "",
        freight: "",
        sort: "",
        is_sell: 0,
        sell_date: "",
        is_shelve: 0,
        temp: "",
        delivery_date: [],
        start_date: "",
        end_date: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入产品名称",
            trigger: "blur"
          }
        ],
        alias: [
          {
            required: true,
            message: "请输入简称",
            trigger: "blur"
          }
        ],
        picture: [
          {
            required: true,
            message: "请输入上传主图",
            trigger: "blur"
          }
        ],
        pictures: [
          {
            required: true,
            message: "请输入上传图集",
            trigger: "blur"
          }
        ],
        business_code: [
          {
            required: true,
            message: "请输入商家编码",
            trigger: "blur"
          }
        ],
        bar_code: [
          {
            required: true,
            message: "请输入商品条形码",
            trigger: "blur"
          }
        ],
        intro: [
          {
            required: true,
            message: "请输入简介",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "请输入详情",
            trigger: "blur"
          }
        ]
      },
      editorOption: {
        placeholder: "在这里输入商品详情！",
        modules: {
          ImageExtend: {
            loading: true,
            name: "file",
            action: this.BASE_URL + "/admin/upload_editor",
            headers: xhr => {
              xhr.withCredentials = true;
            },
            response: res => {
              return res.data.file;
            }
          },
          toolbar: {
            container: container,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              }
            }
          }
        }
      },
      uploadUrl: this.BASE_URL + "/admin/upload_image",
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  components: {
    quillEditor
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
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
    //预计发货时间
    changeDate() {
      this.form.start_date = this.form.delivery_date[0];
      this.form.end_date = this.form.delivery_date[1];
    },
    //确认添加
    sureAdd() {
      const size = this.form.size;
      const color = this.form.color;
      var arr = [];
      if (size.length == 0 && color.length != 0) {
        arr = color;
      } else if (color.length == 0 && size.length != 0) {
        arr = size;
      } else {
        for (var i = 0; i < size.length; i++) {
          for (var j = 0; j < color.length; j++) {
            arr.push({
              size: size[i].size,
              color: color[j].color
            });
          }
        }
      }
      for (var i = 0; i < arr.length; i++) {
        this.form.specifications.push(arr[i]);
      }
      this.form.size = [];
      this.form.color = [];
    },
    //尺码
    sizeAdd(res) {
      // console.log(this.form.size)
      this.form.size.push({});
      document.getElementById("sureAdd").style.display = "block";
    },
    sizeRemove(item) {
      var index = this.form.size.indexOf(item);
      if (index !== -1) {
        this.form.size.splice(index, 1);
      }
    },
    //颜色
    colorAdd(res) {
      console.log(this.form.color);
      this.form.color.push({});
      console.log(this.form.color);
      document.getElementById("sureAdd").style.display = "block";
    },
    colorRemove(item) {
      var index = this.form.color.indexOf(item);
      if (index !== -1) {
        this.form.color.splice(index, 1);
      }
    },
    specificationsAdd() {
      this.form.specifications.push({});
    },
    specificationsRemove(item) {
      var index = this.form.specifications.indexOf(item);
      if (index !== -1) {
        this.form.specifications.splice(index, 1);
      }
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(res) {
      var pic_url = res.url.split("/");
      var pic_arr = this.form.pictures;
      for (var i = 0; i < pic_arr.length; i++) {
        if(pic_url[4] === pic_arr[i]){
          pic_arr.splice(i,1)
        }
      }
    },
    handleError(err, file, fileList) {
      console.log(err);
    },
    handleSuccess(res, file) {
      console.log(res, file);
      //图片上传成功
      this.form.pictures.push(res.data.file);
      this.dialogImageUrl = this.IMAGE_URL + "/image/" + res.data.file;
    },
    beforeUpload(file) {
      //文件上传之前调用做一些拦截限制
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG, PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //处理输入事件
    handlekeyup() {
      const text = document.getElementById("markText").value;
      //中文字数统计
      const str = text.replace(/\w/g, "").length;
      //非汉字的个数
      const abcnum = text.length - str;
      const total = str + abcnum;
      if (total > 24) {
        this.over = 1;
      } else {
        this.over = 0;
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG, PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      // console.log(res)
      if (res.code == 0) {
        this.form.picture = res.data.file;
      }
    },
    pictureUrl(picture) {
      return this.IMAGE_URL + "/image/" + picture;
    },
    beforePictureUpload(file) {
      //文件上传之前调用做一些拦截限制
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG, PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handlePictureSuccess(res, file, fileList) {
      //console.log(res)
      //console.log(this.form.specifications)
      if (res.code == 0) {
        this.form.specifications[res.data.params.index].picture = res.data.file;
        //this.form.specifications.push({});
        this.form.temp = res.data.file;
      }
    },
    onEditorChange({ editor, html, text }) {
      this.form.content = html;
    },
    onReset() {
      this.$refs["form"].resetFields();
    },
    changeSell(res) {
      //console.log(res)
      if (res == 1) {
        this.sell_show = true;
      } else {
        this.sell_show = false;
      }
    },
    changeShelve(res) {
      //console.log(res)
    },
    //获取商品信息
    getArtMsg() {
      this.form.id = this.$route.query.id;
      this.$axios
        .post(
          "/admin/goods_info",
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
            var info = res.data.data.info;
            info.delivery_date = [];
            info.delivery_date[0] = info.start_date;
            info.delivery_date[1] = info.end_date;
            info.size = [];
            info.color = [];
            var file_list = [];
            for (var i in info.pictures) {
              var item = info.pictures[i];
              var url = this.IMAGE_URL + "/image/" + item;
              file_list.push({
                name: "",
                url: url
              });
            }
            this.file_list = file_list;
            this.form = info;
            if (info.is_sell == 1) {
              this.sell_show = true;
            } else {
              this.sell_show = false;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //修改
    handleEdit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.handlekeyup();
          if (this.over == 0) {
            this.$axios
              .post("/admin/goods_edit", this.$qs.stringify(this.form))
              .then(res => {
                // console.log(res);
                if (res.data.code == -1) {
                  this.$message.warning("请登录！");
                  this.$router.push("/login");
                } else if (res.data.code == 0) {
                  this.$message.success(res.data.message);
                  this.$router.push("/GoodsList");
                } else {
                  //console.log(res.data.message);
                  this.$message.warning(res.data.message);
                }
              })
              .catch(res => {
                console.log(res);
              });
          } else if (this.over == 1) {
            this.$message.warning("产品名称超出24个字");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除
    handleDeletee(text) {
      // console.log(this.form.id)
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(
              "/admin/goods_delete",
              this.$qs.stringify({
                id: this.form.id
              })
            )
            .then(res => {
              // console.log(res);
              if (res.data.code === 0) {
                this.$message.success(res.data.message);
                this.$router.push("/GoodsList");
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}

.avatar {
  width: 148px;
  height: 148px;
  display: block;
}

.picture-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.picture-uploader .el-upload:hover {
  border-color: #409eff;
}

.picture-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.picture {
  width: 50px;
  height: 50px;
  display: block;
}
</style>
