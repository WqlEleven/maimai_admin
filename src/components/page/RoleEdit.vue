<template>
    <div class="container">
        <div class="form-box">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item prop="name" label="角色名称:">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="describe" label="角色描述:">
                    <el-input type="textarea" v-model="form.describe"></el-input>
                </el-form-item>
                <el-form-item prop="authority" label="角色权限:">
                    <el-checkbox-group v-model="form.authority">
                        <el-checkbox v-for="item in authority_list" :label="item.id" :key="item.id" name="type">
                            {{item.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" round @click="edit()">修改</el-button>
                    <router-link class="back" to='/RoleList'>
                        <el-button type="info" round>返回</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'amend',
        data: function () {
            return {
                form: {
                    id: '',
                    name: '',
                    describe: '',
                    authority: []
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入名称',
                        trigger: 'blur'
                    }],
                    describe: [{
                        required: true,
                        message: '请输入描述',
                        trigger: 'blur'
                    }],
                    authority: [{
                        required: true,
                        message: '请选择权限',
                        trigger: 'blur'
                    }],
                },
                authority_list: []
            }
        },
        created() {
            //this.form.id = this.$route.query.id;
        },
        mounted() {
            this.form.id = this.$route.query.id;
            this.getauthority();
            this.getArtMsg();
        },
        activated() {
            this.form.id = this.$route.query.id;
            this.getauthority();
            this.getArtMsg();
        },
        methods: {
            //修改
            edit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        var str = document.getElementsByName("type");
                        var objarray = str.length;
                        var chestr = [];
                        for (var i = 0; i < objarray; i++) {
                            if (str[i].checked == true) {
                                chestr[chestr.length] = str[i].value;
                            }
                        }
                        this.form.authority = chestr.join(',');
                        this.$axios.post(
                            '/admin/role_edit',
                            this.$qs.stringify(this.form)
                        ).then((res) => {
                            // console.log(res)
                            if (res.data.code == -1) {
                                this.$message.warning('请登录！');
                                this.$router.push('/login');
                            } else if (res.data.code == 0) {
                                this.$message.success(res.data.message);
                                this.$router.push('/RoleList')
                            } else {
                                this.$message.warning(res.data.message);
                            }
                        }).catch((err) => {
                            console.log(err)
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //动态获取权限列表
            getauthority() {
				// this.form.code = 'role';
                this.$axios.post(
                    '/admin/authority_all',
					this.$qs.stringify({})
                ).then((res) => {
                    // console.log(res)
                    if (res.data.code == -1) {
                        this.$message.warning('请登录！');
                        this.$router.push('/login');
                    } else if (res.data.code == 0) {
                        this.authority_list = res.data.data.list;
                    } else {
                        this.$message.warning(res.data.message);
                    }
                }).catch((err) => {
                    console.log(err)
                });
            },
            //获取角色信息
            getArtMsg() {
                //this.form.id = this.$route.query.id;
                this.$axios.post(
                    '/admin/role_info',
                    this.$qs.stringify({id: this.form.id})
                ).then((res) => {
                    // console.log(res);
                    if (res.data.code == -1) {
                        this.$message.warning('请登录！');
                        this.$router.push('/login');
                    } else if (res.data.code == 0) {
                        //写逻辑
                        this.form = res.data.data.info;
                        this.form.authority = res.data.data.info.authority.split(',');
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }
</script>
<style scoped>
    span {
        color: #666;
    }

    .back {
        margin-left: 10px;
    }
</style>