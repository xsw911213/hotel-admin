<template>
	<section>
		<div label-width="80px">
			<p>已有类别：{{category.join('、')}}</p>
			<div >
				<el-input v-model="addCategoryName" style="width:300px;" placeholder="请输入商品类别名称"></el-input>
				<el-button type="primary" style="transform: translateY(-1px);">添加类别</el-button>
			</div>
		</div>
		<el-tabs v-model="activeName2" type="card" @tab-click="handleClick" closable style="margin-top:30px;">
			<el-tab-pane v-for="(item,index) in commodities" :label="item.categoryName" :name="`${index}`" :key="index">
				<div v-if="item.details.length > 0" style="width:700px">
					<el-table :data="item.details" max-height="300" border style="width: 100%">
						<el-table-column prop="name" label="商品名称" ></el-table-column>
						<el-table-column prop="price" label="单价" width="80"></el-table-column>
						<el-table-column prop="unit" label="单位" width="80"></el-table-column>
						<el-table-column prop="putaway" label="上架状态" width="100">
							<template slot-scope="scope">
								<div v-if="scope.row.putaway">
									是
									<el-button type="text" size="small" style="margin-left:20px;">下架</el-button>
								</div>
								<div v-else>
									否
									<el-button type="text" size="small" style="margin-left:20px;">上架</el-button>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" align="center" width="80">
							<template slot-scope="scope">
								<el-button @click="showCommodity(scope.row)" type="text" size="small">查看/修改</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<el-button type="primary" @click="addNewCommoditiy" style="margin-top:20px">添加商品</el-button>
			</el-tab-pane>
			<div v-show="commoditiyDetails" class="commoditiy-details" style="width:700px;margin-top:30px;">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="商品名称：" prop="name">
						<el-input v-model="ruleForm.name" placeholder="输入商品名称" style="width:300px"></el-input>
					</el-form-item>
					<el-form-item label="商品单价：" prop="price">
						<el-input v-model="ruleForm.price" placeholder="输入商品单价" style="width:150px"></el-input> / 元
					</el-form-item>
					<el-form-item label="价格单位：" prop="unit">
						<el-input v-model="ruleForm.unit" placeholder="输入价格单位" style="width:150px"></el-input>
						（件、个、瓶等等）
					</el-form-item>
					<el-form-item label="是否上架：" prop="putaway">
						<el-switch v-model="ruleForm.putaway"></el-switch>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
						<el-button @click="resetForm">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
			<!-- <el-tab-pane label="用户管理" name="1">用户管理</el-tab-pane>
			<el-tab-pane label="配置管理" name="2">配置管理</el-tab-pane>
			<el-tab-pane label="角色管理" name="3">角色管理</el-tab-pane>
			<el-tab-pane label="定时任务补偿" name="4">定时任务补偿</el-tab-pane> -->
		</el-tabs>
	</section>
</template>

<script>
export default {
  data() {
    return {
			category: [],
			addCategoryName:'',
			activeName2: '0',
			commodities: [],
			commoditiyDetails: '',
			ruleForm:{
				name: '',
				price: '',
				unit: '',
				putaway: ''
			},
			rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
					],
					price: [
            { required: true, message: '请输入商品价格', trigger: 'blur' }
					],
					unit: [
            { required: true, message: '请输入价格单位', trigger: 'blur' }
          ]
        }
    };
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab);
		},
		showCommodity(item){
			this.ruleForm = item;
			this.commoditiyDetails = true;
			console.log(item);
		},
		addNewCommoditiy(){
			this.resetForm();
			this.commoditiyDetails = true;
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.ruleForm = {
				name: '',
				price: '',
				unit: '',
				putaway: ''
			}
			this.commoditiyDetails = false;
		},
		init(){
			let ajaxData = {
				userid: "001",
				commodities: [
					{
						categoryName: "酒水服务",
						details: [
							{
								id: "1-1",
								name: "康师傅矿泉水1-1",
								price: "1.5",
								unit: "瓶",
								image:
									"https://img.alicdn.com/imgextra/i2/TB1Qg.BRpXXXXb6XpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg",
								putaway: true
							},
							{
								id: "1-2",
								name: "康师傅绿茶1-2",
								price: "3",
								unit: "瓶",
								image:
									"https://img.alicdn.com/imgextra/i2/TB1Qg.BRpXXXXb6XpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg",
								putaway: false
							},
							{
								id: "1-3",
								name: "康师傅红茶1-3",
								price: "1.5",
								unit: "瓶",
								image:
									"https://img.alicdn.com/imgextra/i2/TB1Qg.BRpXXXXb6XpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg",
								putaway: false
							}
						]
					},
					{
						categoryName: "酒水服务2",
						details: [
							{
								id: "2-1",
								name: "康师傅矿泉水2-1",
								price: "1.5",
								unit: "瓶",
								image:
									"https://img.alicdn.com/imgextra/i2/TB1Qg.BRpXXXXb6XpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg",
								putaway: false
							},
							{
								id: "2-2",
								name: "康师傅绿茶2-2",
								price: "3",
								unit: "瓶",
								image:
									"https://img.alicdn.com/imgextra/i2/TB1Qg.BRpXXXXb6XpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg",
								putaway: false
							},
							{
								id: "2-3",
								name: "康师傅红茶2-3",
								price: "1.5",
								unit: "瓶",
								image:
									"https://img.alicdn.com/imgextra/i2/TB1Qg.BRpXXXXb6XpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg",
								putaway: false
							}
						]
					}
				]
			};
			this.commodities = ajaxData.commodities
			
			this.commodities.forEach((item,index) => {
				this.category.push(item.categoryName)
			});
		}
	},
  mounted() {
    this.init();
  }
};
</script>

<style lang='scss'>

</style>