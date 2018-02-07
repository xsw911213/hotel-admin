<template>
	<section>
		<!--工具条-->
		<p>本页面用来设置管理员的账号信息，如果想要设置本人账号信息，请去个人中心设置</p>

		<el-form :model="ruleForm" :rules="ruleFormRules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top:20px;">
			<el-form-item label="选择用户：">
				<el-select v-model="userindex" placeholder="请选择" size="small" @change="changeUser">
					<el-option v-for="(item,index) in users" :key="item.value" :label="item.username" :value="index">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="用户名：" prop="username">
				<el-input v-model="ruleForm.username" class="w_350" placeholder="请填写名称"></el-input>
			</el-form-item>

			<el-form-item label="密码：" prop="password">
				<el-input v-model="ruleForm.password"  class="w_350" placeholder="请填写密码"></el-input>
			</el-form-item>

			<el-form-item label="名称：" prop="name">
				<el-input v-model="ruleForm.name"  class="w_350" placeholder="请填写名称"></el-input>
			</el-form-item>

			<el-form-item label="头像：">
				<!-- http://upload-z1.qiniu.com -->
				<el-upload
					class="avatar-uploader"
					action="//up.qbox.me/"
					:show-file-list="false"
					:data="uploadform"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload">
					<img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<el-input v-model="ruleForm.avatar"  style="width:500px;" placeholder="请填写名称"></el-input>
				<p>可点击头像进行本地上传，也可以输入头像的图片地址</p>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')" style="width:150px;">保存</el-button>
				<el-button @click="inituserinfo">恢复为默认值（出厂设置）</el-button>
			</el-form-item>
		</el-form>

	</section>
</template>
<script>
//import NProgress from 'nprogress'
export default {
  data() {
    return {
			userindex: 0,
			users:[],
			ruleForm: {
				username: "",
				password: "",
        name: "",
        avatar: ""
      },
      ruleFormRules: {
				selectuser: [{ required: true, message: "请选择用户"}],
				username: [{ required: true, message: "请填写用户名", trigger: "blur" }],
				password: [{ required: true, message: "请填写密码", trigger: "blur" }],
        name: [{ required: true, message: "请填写名称", trigger: "blur" }]
			},
			uploadform: {
        token: ""
      }
		};
  },
  methods: {
		changeUser(){
			let _this = this;
			let data = _this.users[_this.userindex]
			_this.ruleForm.username = data.username;
			_this.ruleForm.password = data.password;
			_this.ruleForm.name = data.name;
			_this.ruleForm.avatar = data.avatar;
		},
		handleAvatarSuccess(response, file, fileList) {
      this.ruleForm.avatar = `${this.host.imgBaseUrl}${response.key}`;
    },
    beforeAvatarUpload(file) {
      let isLt2M = file.size / 1024 / 1024 < 2;
      let _this = this;

      if (!isLt2M) {
        _this.$message.error("上传头像图片大小不能超过 2MB!");
      } else {
        let params = {
          fileName: file.name
        };

        return axios
          .get(_this.host.baseUrl + "/uploadimg", { params })
          .then(res => {
            if (res.data.code === "1") {
              _this.uploadform = {
                key: res.data.result.fileName,
                token: res.data.result.uploadToken
              };
            } else {
              _this.$message.error("上传图片失败");
            }
          })
          .catch(() => {
            _this.$message.error("上传图片失败");
          });
      }

      return isLt2M;
    },
    resetSucc(res) {
      let _this = this;
      this.$message({
        message: "修改成功！",
        type: "success"
      });
    },
    resetError(error) {
      this.$message.error("修改失败！");
    },
    submitForm(formName) {
      let _this = this;
      // console.log(formName)
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let url = _this.host.baseUrl + "/accountsetting";
          let user = JSON.parse(sessionStorage.getItem("user"));
          let data = _this.ruleForm;
          data.userid = _this.users[_this.userindex].userid;
          // alert('submit!');
          _this.ajax.http("put", url, data, _this.resetSucc, _this.resetError);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
		},
		inituserinfo (){
			this.ruleForm = {
				username: "admin",
				password: "123456",
        name: "管理员",
        avatar: "https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png"
      }
		}
	},
  mounted() {
		let _this = this;
		let url = _this.host.baseUrl + "/accountsetting";
		let user = JSON.parse(sessionStorage.getItem("user"));


		function getSucc(res){
			let data = res.data;
			_this.users = data;
			_this.changeUser();

		}
		function getError(error){
			console.log(error)
		}

		_this.ajax.http("get", url, {role:user.role}, getSucc, getError);
	}
};
</script>

<style>
.el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
    border-color: #d8dce5;
}
</style>