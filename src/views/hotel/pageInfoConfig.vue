<template>
	<section>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="155px" class="demo-ruleForm">
      <el-form-item label="酒店名称：">
				<el-input disabled v-model="ruleForm.name" placeholder="请输入前台联系电话" style="width:300px;"></el-input>
			</el-form-item>
      <el-form-item label="前台联系电话：">
				<el-input v-model="ruleForm.tel" placeholder="请输入前台联系电话" style="width:300px;"></el-input>
			</el-form-item>
			<el-form-item label="是否支持配送：" prop="delivery" >
				<el-switch v-model="ruleForm.delivery"></el-switch>
			</el-form-item>
			<el-form-item v-show="ruleForm.delivery" label="配送时间：">
				<el-time-picker v-model="ruleForm.startTime" placeholder="选择开始时间" style="width:150px;">
        </el-time-picker>
        至
        <el-time-picker v-model="ruleForm.endTime" placeholder="选择结束时间" style="width:150px;">
        </el-time-picker>
        （如果不选择时间则默认为全时配送）
			</el-form-item>
      <el-form-item v-show="ruleForm.delivery" label="下单成功后提示文字：" prop="marked">
				<el-input v-model="ruleForm.marked" placeholder="请输入下单成功后提示文字" style="width:500px;"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</section>
</template>

<script>
  export default {
    data() {
      return {
        user:{},
        data:{},
        ruleForm: {
          name:'',
          tel:'',
					delivery: false,
          startTime: '',
          endTime:'',
          marked:'您的订单我们已经收到，费用将在您退房时一并结算。'
        },
        rules: {
          marked: [
            { min: 3, max: 30, message: '长度在 3 到 30 个字之间', trigger: 'blur' }
					]
				}
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.ajax.http('put', this.host.baseUrl + '/baseinfosetting', this.data, succ, error);
            let _this = this;
            function succ(res){
              console.log(res)
              _this.$message({
                message: res.text,
                type: 'success'
              });
            }

            function error(res){
              console.log(res)
            }
          } else {
            console.log('error submit!!');
            return false;
         }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      init(){
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.ajax.http('get', this.host.baseUrl + '/baseinfosetting', {userid:this.user.userid}, succ, error);
        let _this = this;
        function succ(res){
          let data = res.data;
          _this.data = data;
          // console.log(_this.data);
          console.log('赋值');
          _this.ruleForm = data.pageInfo;
          _this.ruleForm.name = _this.user.name;
        }
        function error(res){
          console.log(res);
        }
      }
    },
    mounted(){
      this.init();
    }
  }
</script>

<style lang='scss'>
</style>