<template>
	<section>
		<!--工具条-->
    <el-collapse v-model="activeName" style="width:800px;">
      <el-collapse-item title="基本资料修改" name="1">
        <el-form :model="ruleForm" :rules="ruleFormRules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
          <el-form-item label="用户名：">
            <el-input v-model="ruleForm.username" disabled class="w_350"></el-input>
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
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="密码修改" name="2">
        <el-form :model="passwords" :rules="passwordRules" ref="passwords" label-width="130px" class="demo-ruleForm">
          <el-form-item label="旧密码：" prop="oldPassword">
            <el-input type="password" v-model="passwords.oldPassword" class="w_350" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="newPassword1">
            <el-input type="password" v-model="passwords.newPassword1" class="w_350" auto-complete="off" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码：" prop="newPassword2">
            <el-input type="password" v-model="passwords.newPassword2" class="w_350" auto-complete="off" placeholder="请再次输入新密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitPassword('passwords')" style="width:150px;">确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>


	</section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    let validateOldPass = (rule, value, callback) => {
      let _this = this;
      let oldPassword = JSON.parse(sessionStorage.getItem("user")).password;
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else if (_this.passwords.oldPassword !== oldPassword) {
        callback(new Error("请输入正确的旧密码"));
      } else {
        callback();
      }
    };

    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.passwords.newPassword2 !== "") {
          this.$refs.passwords.validateField("newPassword2");
        }
        callback();
      }
    };

    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.passwords.newPassword1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      activeName: "1",
      ruleForm: {
        username: "",
        name: "",
        avatar: ""
      },
      ruleFormRules: {
        name: [{ required: true, message: "请填写名称", trigger: "blur" }]
        // date1: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // date2: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      },
      passwords: {
        oldPassword: "",
        newPassword1: "",
        newPassword2: ""
      },
      passwordRules: {
        oldPassword: [
          { required: true, validator: validateOldPass, trigger: "blur" }
        ],
        newPassword1: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        newPassword2: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      uploadform: {
        token: ""
      }
    };
  },
  methods: {
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw);
    // },
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
      // 更新sessionStorage
      let user = JSON.parse(sessionStorage.getItem("user"));
      user.name = _this.ruleForm.name;
      user.avatar = _this.ruleForm.avatar;
      sessionStorage.setItem("user", JSON.stringify(user));

      _this.$store.commit("USERNAME", _this.ruleForm.name);
      _this.$store.commit("USERAVATAR", _this.ruleForm.avatar);
      console.log(_this.$store.state);

      // _this.USERINFO.name = _this.ruleForm.name;
      // _this.USERINFO.avatar = _this.ruleForm.avatar;
    },
    resetError(error) {
      this.$message.error("修改失败！");
    },
    submitForm(formName) {
      let _this = this;
      // console.log(formName)
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let url = _this.host.baseUrl + "/personalsetting";
          let user = JSON.parse(sessionStorage.getItem("user"));
          let data = _this.ruleForm;
          data.userid = user.userid;
          data.flag = "basicinfo";
          // alert('submit!');
          _this.ajax.http("put", url, data, _this.resetSucc, _this.resetError);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitPassword(formName) {
      console.log(formName);

      let _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          let url = _this.host.baseUrl + "/personalsetting";
          let user = JSON.parse(sessionStorage.getItem("user"));
          let data = {
            newPassword: _this.passwords.newPassword2
          };
          data.userid = user.userid;
          data.flag = "password";
          // alert('submit!');
          _this.ajax.http("put", url, data, _this.resetSucc, _this.resetError);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    let _this = this;
    let url = _this.host.baseUrl + "/personalsetting";
    let user = JSON.parse(sessionStorage.getItem("user"));
    // console.log(user);
    function getMenuSucc(res) {
      let data = res.data;
      _this.ruleForm.username = data.username;
      _this.ruleForm.name = data.name;
      _this.ruleForm.avatar = data.avatar;
      // console.log(res)
      // _this.ruleForm = res;
    }
    function getMenuError(error) {
      console.log(error);
    }
    // console.log(user)

    _this.ajax.http(
      "get",
      url,
      { userid: user.userid },
      getMenuSucc,
      getMenuError
    );
    // _this.ajax.http('get',url,{userid:'02'},getMenuSucc,getMenuError,{})
    // this.menuList = this.$router.options.routes;
  },

  mounted() {}
};
</script>

<style>
.demo-ruleForm{
  margin-top: 42px;
}
.w_350 {
  width: 350px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #7c7c7c;
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
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
.el-collapse{
  border-left: 1px solid #e6ebf5;
  border-right: 1px solid #e6ebf5;
}
.el-collapse-item__header {
  font-size: 16px;
  padding: 0 20px;
  
}
.el-collapse-item.is-active .el-collapse-item__header{
  border-bottom-color: #e6ebf5;
}
.el-collapse-item__header:active, .el-collapse-item__header:focus{
  outline-width: 0;
}
</style>