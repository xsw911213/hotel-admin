<template>
	<section>
		<div style="width:600px">
			<el-table :data="alreadyHadPrinter" max-height="300" border style="width: 100%">
				<el-table-column prop="brand" label="品牌" ></el-table-column>
				<el-table-column prop="deviceNo" label="设备编号" ></el-table-column>
				<el-table-column prop="times" label="打印联数" ></el-table-column>
				<el-table-column label="操作" align="center" width="100">
					<template slot-scope="scope">
						<el-button @click="showPrinter(scope.row)" type="text" size="small">编辑</el-button>
						<el-button @click="deletePrinter(scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="addNewPrintter" style="margin-top:30px;">
			<el-button type="primary" @click="toggleForm(true)">添加打印机</el-button>
			<el-form v-show="formShow" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top:30px;">
				<el-form-item label="选择品牌:">
					<el-select v-model="brand" placeholder="选择打印机品牌" @change="changePrinterBrand">
						<el-option v-for="(item,index) in printersConfig" :label="item.brand" :value="index" :key="index"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="brand === 0" label="设备编号:">
					<el-input v-model="ruleForm.deviceNo" placeholder="请输入设备编号（deviceNo）" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item v-if="brand === 0" label="设备密钥:">
					<el-input v-model="ruleForm.key" placeholder="请输入设备密钥（key）" style="width:300px;"></el-input>
				</el-form-item>

				<el-form-item label="打印联数:">
					<el-input v-model="ruleForm.times" placeholder="请输入打印联数（key）" style="width:300px;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
			return {
				alreadyHadPrinter:[],
				printersConfig: [],
				formShow: false,
				brand:0,
				ruleForm: {
					
				},
				rules: {
          brand: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					],
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
            console.log(this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
			},
			toggleForm(boo){
				this.formShow = boo;
			},
      resetForm() {
				this.brand = 0;
				this.ruleForm = JSON.parse(JSON.stringify(this.printersConfig[this.brand]));
				this.toggleForm(false);
			},
			showPrinter(item){
				this.ruleForm = item;
				this.toggleForm(true);
			},
			deletePrinter(){

			}
		},
		mounted(){
			this.alreadyHadPrinter = [
				{
					brand: '365',
					deviceNo: '123ffdsgwa234234',
					key: '123',
					times: 1,
					urls:{
						addOrder:'http://open.printcenter.cn:8080/addOrder',
						queryOrder:'http://open.printcenter.cn:8080/queryOrder',
						queryPrinterStatus:'http://open.printcenter.cn:8080/queryPrinterStatus'
					}
				}
			];
			this.printersConfig.push(printer365);
			this.changePrinterBrand();
		}
  }

</script>

<style lang='scss'>

</style>