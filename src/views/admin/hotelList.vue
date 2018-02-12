<template>
	<section>
		<div style="width:850px;">
			<el-table :data="hotels" height="350" border style="width: 100%">
				<el-table-column prop="userid" label="酒店ID" width="120"></el-table-column>
				<el-table-column prop="username" label="用户名" width="120"></el-table-column>
				<el-table-column prop="hotelname" label="酒店名称"></el-table-column>
				<el-table-column prop="tel" label="联系方式" width="150"></el-table-column>
				<el-table-column fixed="right" label="操作" align="center" width="80">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看/修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		
		<div class="sreach" style="margin:30px auto auto 100px;">
			<el-autocomplete class="inline-input" v-model="search.val" :fetch-suggestions="querySearch" placeholder="输入查找条件" @select="handleSelect" style="width:500px" >
				<el-select v-model="search.condition" slot="prepend" placeholder="请选择" @change="changeSearchCondition" style="width:150px">
					<el-option label="按照酒店名查找" value="hotelname"></el-option>
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
				<el-form-item label="酒店名称：" prop="hotelname">
					<el-input v-model="ruleForm.hotelname"></el-input>
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
        hotels: [
					{
						userid: '20160501',
						password:'123456',
						username:'rujia001',
						hotelname: '如家快捷酒店（建设路店）',
						tel: '13487652345',
						remark:'这里是备注'
					}, {
						userid: '20160502',
						password:'123456',
						username:'hanting001',
						hotelname: '橘子主题酒店',
						tel: '010-80873678',
						remark:'这里是备注'
					}, {
						userid: '20160504',
						password:'123456',
						username:'qitian001',
						hotelname: '你懂得快捷酒店',
						tel: '17709562456',
						remark:'这里是备注'
					}, {
						userid: '20160501',
						password:'123456',
						username:'juzi001',
						hotelname: '哼哼哈兮情趣酒店',
						tel: '18880240967',
						remark:'这里是备注'
					}, {
						userid: '20160508',
						password:'123456',
						username:'dali001',
						hotelname: '七天快捷酒店（五七路店）',
						tel: '010-80873678',
						remark:'这里是备注'
					}, {
						userid: '20160506',
						password:'123456',
						username:'wang001',
						hotelname: '汉庭快捷酒店（学院路店）',
						tel: '010-80873678',
						remark:'这里是备注'
					}, {
						userid: '20160507',
						password:'123456',
						username:'zhang001',
						hotelname: '盘古七星牛逼大酒店',
						tel: '010-80873678',
						remark:'这里是备注'
					},
					{
						userid: '20160501',
						password:'123456',
						username:'rujia002',
						hotelname: '如家快捷酒店（建设路店）',
						tel: '13487652345',
						remark:'这里是备注'
					}, {
						userid: '20160502',
						password:'123456',
						username:'hanting002',
						hotelname: '橘子主题酒店',
						tel: '010-80873678',
						remark:'这里是备注'
					}, {
						userid: '20160504',
						password:'123456',
						username:'qitian002',
						hotelname: '你懂得快捷酒店',
						tel: '17709562456',
						remark:'这里是备注'
					}, {
						userid: '20160501',
						password:'123456',
						username:'juzi002',
						hotelname: '哼哼哈兮情趣酒店',
						tel: '18880240967',
						remark:'这里是备注'
					}, {
						userid: '20160508',
						password:'123456',
						username:'dali002',
						hotelname: '七天快捷酒店（五七路店）',
						tel: '010-80873678',
						remark:'这里是备注'
					}, {
						userid: '20160506',
						password:'123456',
						username:'wang002',
						hotelname: '汉庭快捷酒店（学院路店）',
						tel: '010-80873678',
						remark:'这里是备注'
					}, {
						userid: '20160507',
						password:'123456',
						username:'zhang002',
						hotelname: '盘古七星牛逼大酒店',
						tel: '010-80873678',
						remark:'这里是备注'
					}
				],
				search: {
					condition:'hotelname',
					val:''
				},
				detailsShow: false,
				ruleForm: {
          username: '',
					password: '',
					hotelname:'',
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
					hotelname: [
            { required: true, message: '必填，请输入酒店名称', trigger: 'blur' }
          ]
        }
      }
		},
		methods: {
      handleClick(row) {
				this.ruleForm = row;
				this.detailsShow = true;
        console.log(row);
			},
			submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.detailsShow = false;
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
      }
		},
		mounted(){
			this.changeSearchCondition();
		}
  }
</script>

<style lang='scss'>

</style>