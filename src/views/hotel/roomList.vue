<template>
	<section>
		<div class="addroom" style="position:relative;width:800px">
			<span style="display: inline-block; width: 100px; text-align: right; padding-right: 20px;">添加房间：</span>
			<el-input v-model="addRoomlNum" placeholder="请输入房间号" @keyup.enter.native='addroom' style="width:200px;"></el-input>
			<el-button type="primary" @click="addroom">添加</el-button>
			
		</div>
		<div id="qr" style="display: flex;flex-wrap: wrap;width:1000px">
			<h3 class="qr-title">
				{{user.name}}
				<!-- <el-button type="text" style="position:absolute;right:0;">导出成图片</el-button> -->
			</h3>
			<div v-for="(item,index) in roomList" :key="index" class="roomqr">
				<p>{{`${item} 房间`}} <el-button type="text" @click="removeRoom(index)">删除</el-button></p>
				<div :id="`roomqr${index}`"></div>
			</div>
		</div>
	</section>
</template>

<script>
	import QRCode from 'qrcodejs2'
	export default {
    data() {
			return {
				data:{},
				user:{},
				addRoomlNum:'',
				hotelname:'',
				userid: '',
				roomList: []
		  }
		},
		methods:{
			renderQR(domid,room){
				// console.log(this.host.qrBaseUrl)
				let url = `${this.host.qrBaseUrl}?userid=${this.data.userid}&room=${room}`
				let option =  {
					text: url,
					width: 200,
					height: 200,
					colorDark : '#000000',
					colorLight : '#ffffff',
					correctLevel : QRCode.CorrectLevel.L
				}
				new QRCode(document.getElementById(domid),option)
			},
			addroom(){
				// 去掉字符串中所有空格
				this.addRoomlNum = this.addRoomlNum.replace(/\s/g,"");
				let max = this.roomList.length;
				if(this.addRoomlNum){
					for(let i = 0; i < max ; i++){
						if(this.roomList[i] === this.addRoomlNum){
							this.$message({
								message: '已经有该房间了',
								type: 'error'
							});
							return
						}
					}

					this.roomList.push(this.addRoomlNum);
					setTimeout(()=>{
						this.renderQR(`roomqr${max}`,this.addRoomlNum)
						this.sendDataToServer('添加成功！');
					},0)
					
				}else{

				}
			},
			removeRoom(index){
				console.log(index);
				this.$confirm('此操作并不会导致二维码失效, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
					this.roomList.splice(index,1);
					this.sendDataToServer('删除成功!');
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
        });
				
			},
			sendDataToServer(text){
				console.log(this.data);
				this.ajax.http('put', this.host.baseUrl + '/baseinfosetting', this.data, succ, error);
				let _this = this;
				function succ(res){
					console.log(res)
					_this.$message({
						message: text,
						type: 'success'
					});
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
					_this.roomList = data.roomList;
					setTimeout(()=>{
						_this.roomList.forEach((item,index) => {
							_this.renderQR(`roomqr${index}`,item)
						},0);
					})
        }
        function error(res){
          console.log(res);
				}
			}
		},
		mounted(){
			// this.renderQR(document.getElementById('qr01'),'http://www.baidu.com')
			this.init();
		}
  }

</script>

<style lang='scss'>
	.qr-title{
		position: relative;
		width: 100%;
		text-align: center;
		margin: 20px 0 0 0;
	}
	.roomqr{
		display: inline-block;
		margin-left: 30px;
		text-align: center;
		& > span{
			display: inline-block;
			margin-bottom: 10px;
		}
		& > div{
			display: inline-block;
		}
	}
</style>