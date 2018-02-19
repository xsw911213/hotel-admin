<template>
	<section>
		<div style="width:600px">
			<el-table :data="alreadyHadPrinter" max-height="300" border style="width: 100%">
				<el-table-column prop="brand" label="品牌" ></el-table-column>
				<el-table-column prop="deviceNo" label="设备编号" ></el-table-column>
				<el-table-column prop="times" label="打印联数" ></el-table-column>
				<el-table-column label="操作" align="center" width="100">
					<template slot-scope="scope">
						<el-button @click="showPrinter(scope)" type="text" size="small">编辑</el-button>
						<el-button @click="deletePrinter(scope)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="addNewPrintter" style="margin-top:30px;">
			<el-button type="primary" @click="addPrinter">添加新打印机</el-button>
			<el-form v-show="formShow" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top:30px;">
				<el-form-item label="选择品牌:">
					<el-select v-model="brand" placeholder="选择打印机品牌" @change="changePrinterBrand">
						<el-option v-for="(item,index) in printersConfig" :label="item.brand" :value="index" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="brand === 0" label="设备编号:" prop="deviceNo">
					<el-input v-model="ruleForm.deviceNo" placeholder="请输入设备编号（deviceNo、机器号）" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item v-if="brand === 0" label="设备密钥:" prop="key">
					<el-input v-model="ruleForm.key" placeholder="请输入设备密钥（key、密钥）" style="width:300px;"></el-input>
				</el-form-item>

				<el-form-item label="打印联数:">
					<el-input v-model="ruleForm.times" placeholder="请输入打印联数（key）" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
					<el-button @click="resetForm">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
		
	</section>
</template>

<script>
	import printer365 from './data/printer-365';
	export default {
    data() {

			var checkDeviceNo = (rule, value, callback) => {
				let arr = this.data.printers
				let max = arr.length;
				for(let i = 0 ; i < max ; i++){
					if(this.isAdd && arr[i].brand === this.ruleForm.brand && arr[i].deviceNo === value){
						callback(new Error('已有同一个机器，请查证后再输入'));
						return;
					}
				}

				callback();
        // if (value === '') {
        //   callback(new Error('请再次输入密码'));
        // } else if (value !== this.ruleForm2.pass) {
        //   callback(new Error('两次输入密码不一致!'));
        // } else {
        //   callback();
        // }
			};
			
			return {
				data:{},
				user:{},
				alreadyHadPrinter:[],
				printersConfig: [],
				formShow: false,
				isAdd:true,
				brand:0,
				ruleForm: {
					
				},
				rules: {
          brand: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
					deviceNo:[
						{ required: true, validator: checkDeviceNo, trigger: 'blur' },
					],
					key:[
						{ required: true, message: '请输入密钥', trigger: 'blur' },
					]
				}
		  }
		},
		methods:{
			changePrinterBrand(){
				this.ruleForm = JSON.parse(JSON.stringify(this.printersConfig[this.brand]));
			},
			submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
						let text = '修改成功！'
						if(this.isAdd){
							// 如果是新添加
							this.data.printers.push(this.ruleForm);
							text = '添加成功'
						}
						
						this.ajax.http('put', this.host.baseUrl + '/baseinfosetting', this.data, succ, error);
            let _this = this;
            function succ(res){
              console.log(res)
              _this.$message({
                message: text,
                type: 'success'
							});
							_this.resetForm();
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
			toggleForm(boo){
				this.formShow = boo;
				if(!boo){
					this.isAdd = true;
				}
			},
      resetForm() {
				this.brand = 0;
				this.ruleForm = JSON.parse(JSON.stringify(this.printersConfig[this.brand]));
				this.toggleForm(false);
			},
			showPrinter(item){
				console.log(item)
				this.ruleForm = this.data.printers[item.$index];
				this.toggleForm(true);
				this.isAdd = false;
			},
			addPrinter(){
				this.brand = 0;
				this.isAdd = true;
				this.ruleForm = JSON.parse(JSON.stringify(this.printersConfig[this.brand]));
				this.toggleForm(true);
			},
			deletePrinter(item){
				this.data.printers.splice(item.$index,1)
				this.ajax.http('put', this.host.baseUrl + '/baseinfosetting', this.data, succ, error);
				let _this = this;
				function succ(res){
					console.log(res)
					_this.$message({
						message: '删除成功',
						type: 'success'
					});
					_this.resetForm();
				}

				function error(res){
					console.log(res)
				}
			},
			init(){
				this.user = JSON.parse(sessionStorage.getItem('user'));
        this.ajax.http('get', this.host.baseUrl + '/baseinfosetting', {userid:this.user.userid}, succ, error);
        let _this = this;
        function succ(res){
          let data = res.data;
          _this.data = data;
					console.log(_this.data);
					
					console.log('赋值');
					_this.alreadyHadPrinter = data.printers;
        }
        function error(res){
          console.log(res);
				}
			}
		},
		mounted(){
			this.init();
			this.printersConfig.push(printer365);
			this.changePrinterBrand();
		}
  }

</script>

<style lang='scss'>

</style>