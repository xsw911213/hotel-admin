<template>
	<section style="width:400px;">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名：" prop="username">
				<el-input v-model="ruleForm.username" placeholder="输入用户名"></el-input>
			</el-form-item>
			<el-form-item label="密码：" prop="password">
				<el-input v-model="ruleForm.password" placeholder="输入密码"></el-input>
			</el-form-item>
			<el-form-item label="酒店名称：" prop="name">
				<el-input v-model="ruleForm.name" placeholder="输入酒店名称"></el-input>
			</el-form-item>
			<el-form-item label="联系方式：" >
				<el-input v-model="ruleForm.tel" placeholder="输入联系方式"></el-input>
			</el-form-item>
			<el-form-item label="备注：" >
				<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入备注" v-model="ruleForm.remark"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          username: '',
					password: '',
					name:'',
					tel:'',
					remark:''
        },
        rules: {
          username: [
            { required: true, message: '必填，请输入活动名称', trigger: 'blur' },
            { min: 3, message: '长度不能少于 3 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '必填，请输入密码', trigger: 'blur' }
					],
					name: [
            { required: true, message: '必填，请输入酒店名称', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // accountsetting
            this.ajax.http('post', this.host.baseUrl + '/accountsetting', this.ruleForm, addSucc, addError)
            function addSucc(res){
              console.log(res);

              _this.$message({
                message: res.text,
                type: res.type
              });
            }
            function addError(res){
              console.log(222)
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang='scss'>

</style>