<template>
	<section>
		<!--工具条-->
		<div class="inputhotel">
			<p>添加酒店</p>
			<el-input placeholder="请输入酒店名称" v-model="inputhotelname" style="width:400px;margin-bottom:15px;" ></el-input>
			<br>
			<el-input placeholder="请输入联系人" v-model="inputhotelcontact" style="width:400px;margin-bottom:15px;" ></el-input>
			<br>
			<el-input placeholder="请输入联系方式" v-model="inputhotelphone" style="width:400px;margin-bottom:15px;" @keyup.enter.native="addhotel"></el-input>
			<br>
			<el-button type="primary" @click="addhotel">添加</el-button>
		</div>

		<div v-show="addingtags.length > 0" class="addinghotel">
			<p>将要添加的酒店</p>
			<div class="tags">
				<el-card  v-for="(tag,index) in addingtags" :key="index" :body-style="{ padding: '0px' }" style="display:inline-block;width:220px; margin-right:20px;">
					<div style="padding: 14px;">
						<span>{{tag.name}}</span>
						<div class="bottom clearfix">
							<time class="time">{{tag.contact}}</time>
							<time class="time">{{tag.phone}}</time>
							<el-button type="text" class="button" @click="deleteAddinTags(index)">删除</el-button>
						</div>
					</div>
				</el-card>
			</div>
			<el-button type="primary" @click="addhotels">保存</el-button>
			<span>(添加的酒店一定要点击<b style="color:red">“保存”</b>按钮，否则在关闭页面的时候，将不会保存)</span>
		</div>

		<div class="addinghotel">
			<p>已经添加过的酒店</p>
			<div class="tags">
				<el-card  v-for="(tag,index) in hotels" :key="index" :body-style="{ padding: '0px' }" style="display:inline-block;width:220px; margin-right:20px;">
					<div style="padding: 14px;">
						<span>{{tag.name}}</span>
						<div class="bottom clearfix">
							<time class="time">{{tag.contact}}</time>
							<time class="time">{{tag.phone}}</time>
							<el-button type="text" class="button" @click="deleteHotel(index)">删除</el-button>
						</div>
					</div>
				</el-card>
			</div>
			<!-- http://cnodejs.org/topic/57ce9c546dac8a4a47ab20d7 批量删除-->
		</div>

		<div v-show="deleteHotels.length > 0" class="addinghotel">
			<p>将要删除的酒店</p>
			<div class="tags">
				<el-card  v-for="(tag,index) in deleteHotels" :key="index" :body-style="{ padding: '0px' }" style="display:inline-block;width:220px; margin-right:20px;">
					<div style="padding: 14px;">
						<span>{{tag.name}}</span>
						<div class="bottom clearfix">
							<time class="time">{{tag.contact}}</time>
							<time class="time">{{tag.phone}}</time>
							<el-button type="text" class="button" @click="revocation(index)">撤销</el-button>
						</div>
					</div>
				</el-card>
			</div>
			<!-- http://cnodejs.org/topic/57ce9c546dac8a4a47ab20d7 批量删除-->
			<el-button type="danger" @click="danger">确认删除</el-button>
		</div>
		

	</section>
</template>
<script>
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      inputhotelname: "",
      inputhotelcontact: "",
      inputhotelphone: "",
      addingtags: [],
			hotels: [],
			deleteHotels:[],
			deleteHotelsId:[]
    };
  },
  methods: {
    addhotel() {
      let _this = this;
      let obj = {
        name: _this.inputhotelname,
        contact: _this.inputhotelcontact,
        phone: _this.inputhotelphone
      };

			if(obj.name === '' || obj.phone === ''){
				_this.$message.error("请至少填写酒店名称和联系方式");
				return
			}

			let hasTheSameName = false;
			// 重名检验
			_this.addingtags.find((item) =>{
				if(item.name === obj.name){
					hasTheSameName = true;
					return true
				}
			})

			_this.hotels.find((item) =>{
				if(item.name === obj.name){
					hasTheSameName = true;
					return true
				}
			})

			if(!hasTheSameName){
				_this.addingtags.push(obj);
				_this.inputhotelname = "";
				_this.inputhotelcontact = "";
				_this.inputhotelphone = "";
			}else{
				_this.$message.error("已经存在名称相同的酒店，请重新输入");
			}

      
      // console.log('你按了回车键！');
      // if(ev.keyCode==13){
      // 	console.log('你按了回车键！');
      // }
    },
    deleteAddinTags(index) {
      this.addingtags.splice(index, 1);
		},
		addhotels (){
			let _this = this;
			let url = _this.host.baseUrl + "/hotelsetting";

			function getSucc(res) {
				_this.addingtags = [];
				let data = res.data;
				_this.getHotels();
			}
			function getError(error) {
				console.log(error);
			}
			
			_this.ajax.http("post",url,_this.addingtags,getSucc,getError);
		},
		getHotels (){
			let _this = this;
			let url = _this.host.baseUrl + "/hotelsetting";
			// console.log(user);
			function getSucc(res) {
				let data = res.data;
				_this.hotels = data;
			}
			function getError(error) {
				console.log(error);
			}
			// console.log(user)

			_this.ajax.http("get",url,{},getSucc,getError);
		},
		deleteHotel (index){
			let obj = this.hotels[index]
			obj.index = index;
			this.deleteHotels.push(obj);
			this.deleteHotelsId.push(obj._id);
			this.hotels.splice(index, 1);
			console.log(this.deleteHotels);
			console.log(this.deleteHotelsId);
		},
		revocation (index){
			let obj = this.deleteHotels[index]
			// 添加回原数组
			this.hotels.splice(obj.index,0,obj);
			// 删除相应的参数
			this.deleteHotels.splice(index, 1);
			this.deleteHotelsId.splice(index, 1);

			console.log(this.hotels);
		},
		danger (){
			this.$confirm('此操作将永久删除这些酒店，且不可恢复, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {

				let _this = this;
				let url = _this.host.baseUrl + "/hotelsetting";
				// console.log(user);
				function getSucc(res) {
					let data = res.data;
					_this.deleteHotels = [];
					_this.deleteHotelsId = [];
				}
				function getError(error) {
					console.log(error);
				}
				// getSucc('123');
				// console.log(user)

				this.ajax.http("delete",url,{idcollection: this.deleteHotelsId},getSucc,getError);

				// this.deleteHotelsId
				// this.$message({
				// 	type: 'success',
				// 	message: '删除成功!'
				// });
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		}
	},
	created() {
    this.getHotels();
    // _this.ajax.http('get',url,{userid:'02'},getMenuSucc,getMenuError,{})
    // this.menuList = this.$router.options.routes;
  },
  mounted() {
    // this.hotels = [
		// 	{ name: "七天快捷酒店",contact:'徐劭伟',phone:'13015237964'}
		// ];
  }
};
</script>

<style scoped>
.addinghotel {
  position: relative;
  margin-top: 20px;
}
.tags {
  position: relative;
  width: 900px;
  margin: 10px 0;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>