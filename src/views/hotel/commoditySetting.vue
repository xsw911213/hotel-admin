<template>
	<section>
		<div label-width="80px">
			<div >
				<el-input v-model="addCategoryName" style="width:300px;" @keyup.enter.native='addCategory' placeholder="请输入商品类别名称"></el-input>
				<el-button type="primary" :disabled="addCategoryName.length === 0" style="transform: translateY(-1px);" @click="addCategory">添加类别</el-button>
			</div>
		</div>
		<el-tabs v-model="activeName2" type="card" @tab-click="handleClick" @tab-remove="removeTab" closable style="margin-top:30px;">
			<el-tab-pane v-for="(item,index) in commodities" :label="item.categoryName" :name="`${index}`" :key="index">
				<div v-if="item.details.length > 0" style="width:700px">
					<el-table :data="item.details" max-height="300" border style="width: 100%">
						<el-table-column prop="name" label="商品名称" ></el-table-column>
						<el-table-column prop="price" label="单价" width="80"></el-table-column>
						<el-table-column prop="unit" label="单位" width="80"></el-table-column>
						<el-table-column prop="putaway" label="上架状态" width="80">
							<template slot-scope="scope">
								<div v-if="scope.row.putaway">
									是
									<!-- <el-button type="text" size="small" style="margin-left:20px;">下架</el-button> -->
								</div>
								<div v-else>
									否
									<!-- <el-button type="text" size="small" style="margin-left:20px;">上架</el-button> -->
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
					<el-form-item label="商品图片：" prop="img" class="commodity-img" style="margin-bottom:20px;">
						<el-upload class="avatar-uploader" action="//up.qbox.me/" :show-file-list="false" :data="uploadform" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="ruleForm.img" :src="ruleForm.img" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<el-input v-model="ruleForm.img" style="position:relative;margin-top:20px;width:400px;" placeholder="填写图片地址"></el-input>
						<p>建议上传图片大小为200*200(w*h)，且图片大小上限为1M</p>
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
import axios from "axios";
export default {
  data() {
    return {
			user:{},
      data:{},
			addCategoryName:'',
			activeName2: '0',
			commodities: [],
			commoditiyDetails: false,
			isAdd: true,
			uploadform: {
        token: ""
      },
			ruleForm:{
				name: '',
				img:'',
				price: '',
				unit: '',
				putaway: ''
			},
			rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
					],
					img: [
						{ required: true, message: '请上传图片或填写图片地址', trigger: 'blur'}
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
		addCategory(){
			let obj = {
				categoryName:this.addCategoryName,
				details:[]
			}
			this.commodities.push(obj);
			
		},
		removeTab(item){
			let index = item - 0;
			this.commodities.splice(index,1);
			this.saveData();
		},
		handleClick(tab, event) {
			console.log(tab);
			console.log(this.activeName2)
			this.commoditiyDetails = false;
			this.isAdd = true;
		},
		showCommodity(item){
			this.ruleForm = item;
			this.commoditiyDetails = true;
			this.isAdd = false;
		},
		addNewCommoditiy(){
			this.resetForm();
			this.commoditiyDetails = true;
			this.isAdd = true;
		},
		saveData(){
			console.log()
			this.data.commodityList.forEach((item,index)=>{
				item.id = `${index}`,
				item.details.forEach((ite,inde)=>{
					ite.id = `${index}-${inde}`
				})
			})
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
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if(this.isAdd){
						this.commodities[this.activeName2 - 0].details.push(this.ruleForm);
					}
					this.saveData();
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.ruleForm = {
				name: '',
				img:'',
				price: '',
				unit: '',
				putaway: ''
			}
			this.commoditiyDetails = false;
			this.isAdd = true;
		},
		handleAvatarSuccess(response, file, fileList) {
      this.ruleForm.img = `${this.host.imgBaseUrl}${response.key}`;
    },
    beforeAvatarUpload(file) {
      let isLt2M = file.size / 1024 / 1024 < 1;
      let _this = this;

      if (!isLt2M) {
        _this.$message.error("上传图片大小不能超过 1MB!");
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
		init(){
			this.user = JSON.parse(sessionStorage.getItem('user'));
			this.ajax.http('get', this.host.baseUrl + '/baseinfosetting', {userid:this.user.userid}, succ, error);
			let _this = this;
			function succ(res){
				let data = res.data;
				_this.data = data;
				// console.log(_this.data);
				console.log('赋值');
				_this.commodities = data.commodityList;
			}
			function error(res){
				console.log(res);
			}
			
		}
	},
  mounted() {
    this.init();
  }
};
</script>

<style lang='scss'>
.commodity-img {
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
		border: 1px dashed #8c939d;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>