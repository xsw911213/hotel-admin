<template>
	<section>
		<div style="width:850px;">
			<el-table :data="hotels" height="350" border style="width: 100%">
				<!-- <el-table-column prop="userid" label="酒店ID" width="120"></el-table-column> -->
				<el-table-column prop="username" label="用户名" width="120"></el-table-column>
				<el-table-column prop="name" label="酒店名称"></el-table-column>
				<el-table-column prop="rooms" label="房间数" width="100"></el-table-column>
				<el-table-column prop="tel" label="联系方式" width="150"></el-table-column>
				<el-table-column fixed="right" label="操作" align="center" width="80">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看/修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<p style="color:#606266;font-size:18px;">小计：总酒店数：{{hotels.length}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 总房间数：{{totalrooms}}</p>

		
		<div class="sreach" style="margin:30px auto auto 100px;">
			<el-autocomplete class="inline-input" v-model="search.val" :fetch-suggestions="querySearch" placeholder="输入查找条件" @select="handleSelect" style="width:500px" >
				<el-select v-model="search.condition" slot="prepend" placeholder="请选择" @change="changeSearchCondition" style="width:150px">
					<el-option label="按照酒店名查找" value="name"></el-option>
					<el-option label="按照用户名查找" value="username"></el-option>
				</el-select>
				<!-- <el-button slot="append" icon="el-icon-search"></el-button> -->
			</el-autocomplete>
		</div>
		<div v-show="detailsShow" style="width:600px;margin-top:30px;">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名：" prop="username">
					<el-input disabled v-model="ruleForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码：" prop="password">
					<el-input v-model="ruleForm.password"></el-input>
				</el-form-item>
				<el-form-item label="酒店名称：" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="联系方式：" >
					<el-input v-model="ruleForm.tel"></el-input>
				</el-form-item>
				<el-form-item label="备注：" >
					<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4}" placeholder="请输入备注" v-model="ruleForm.remark"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
				</el-form-item>
			</el-form>
		</div>
	</section>
</template>

<script>
  export default {
    data() {
      return {
        hotels: [],
				search: {
					condition:'name',
					val:''
				},
				totalrooms: 0,
				detailsShow: false,
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
      }
		},
		methods: {
      handleClick(row) {
				console.log(row);
				
				this.ruleForm = row;
				this.detailsShow = true;
			},
			submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
						console.log(this.ruleForm);
						delete this.ruleForm.value;
						this.ajax.http('put', this.host.baseUrl + '/accountsetting',this.ruleForm,putSuccess,putError);
						let _this = this;
						function putSuccess(res){
							console.log(res);
							_this.$message({
                message: '修改成功',
                type: 'success'
              });
						}
						function putError(res){
							console.log(res)
						}
            // this.detailsShow = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
			},
			changeSearchCondition(){
				this.hotels.forEach((item,index)=>{
					item.value = item[this.search.condition];
				})
			},
			querySearch(queryString, cb) {
				var restaurants = this.hotels;
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				// 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant[this.search.condition].toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
			},
      handleSelect(item) {
				console.log(item)
				this.ruleForm = item;
				this.detailsShow = true;
			},
			getHotels(){
				let _this = this;
				_this.ajax.http('get', this.host.baseUrl + '/accountsetting', {role:'master'}, getSucc, getError)
				function getSucc(res){
					let data = res.data;
					let times = data.length - 1;
					data.forEach((item,index) => {
						_this.ajax.http('get', _this.host.baseUrl + '/baseinfosetting', {userid:item._id}, succ, error);
						function succ(res) {
							data[index].rooms = res.data.roomList.length;
							_this.totalrooms += data[index].rooms;
							if(index === times){
								_this.hotels = data;
							}
						}
						function error(res){
							console.log(res);
						}
					})
					
					console.log(data);
					
					_this.changeSearchCondition();
				}
				function getError(res){
					console.log(222)
				}
			}
		},
		mounted(){
			this.getHotels();
			
		}
  }
</script>

<style lang='scss'>

</style>