<template>
	<section style="width:900px;">
		<el-table :data="countOrder" max-height="300" border style="width: 100%">
			<el-table-column prop="room" label="房间号" width="100"></el-table-column>
			<el-table-column prop="time" label="下单时间" width="150"></el-table-column>
			<el-table-column prop="deviceNo" label="购买列表" >
				<template slot-scope="scope">
					<div v-for="(item,index) in scope.row.orderContent.list" :key="index">
						<span>{{item.name}}</span> * <span>{{item.num}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="remark" label="备注" >
				<template slot-scope="scope">
					<span>{{scope.row.orderContent.remark}}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" width="100">
				<template slot-scope="scope">
					<el-button @click="dealOrder(scope.row,scope.$index)" type="text" size="small">已经处理</el-button>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	export default {
    data() {
			return {
				user:{},
				countOrder:[],
		  }
		},
		methods:{
			init(){
				this.user = JSON.parse(sessionStorage.getItem('user'));
        this.ajax.http('get', this.host.baseUrl + '/order', {userid:this.user.userid}, succ, error);
        let _this = this;
        function succ(res){
					console.log(res);
					res.forEach((item,index) => {
						let _time = item.orderNum;
						let year = _time.substring(0,4);
						let month = _time.substring(4,6);
						let day = _time.substring(6,8);
						let hour = _time.substring(8,10);
						let minute = _time.substring(10,12)
						item.time = `${year}-${month}-${day} ${hour}:${minute}`
						console.log(_time);
						console.log(year,month,day,hour,minute);
					});
          // console.log(_this.data);
					console.log('赋值');
					_this.countOrder = res;
					if(res.length > 0){
						_this.$notify({
							type: 'warning',
							title: '您有新的订单了',
							message: `您还有${res.length}条订单未处理`
						});
					}
        }
        function error(res){
          console.log(res);
				}
				
				setTimeout(()=>{
					let href = window.location.href
					if(href.indexOf('currentOrder') > 0){
						this.init();
					}
				},10000)
			},
			dealOrder(item,index){
				console.log(index);
				this.ajax.http('PUT', this.host.baseUrl + '/order', {orderNum:item.orderNum}, succ, error);
				let _this = this;
				function succ(res){
					console.log(res);
					_this.countOrder.splice(index,1);
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