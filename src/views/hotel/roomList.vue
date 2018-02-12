<template>
	<section>
		<div class="addroom" style="position:relative;width:800px">
			<span style="display: inline-block; width: 100px; text-align: right; padding-right: 20px;">添加房间：</span>
			<el-input v-model="addHotelNum" placeholder="请输入房间号" style="width:200px;"></el-input>
			<el-button type="primary" @click="addroom">添加</el-button>
			
		</div>
		<div class="qr" style="display: flex;flex-wrap: wrap;width:1000px">
			<h3 class="qr-title">
				{{hotelname}}
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
				addHotelNum:'',
				hotelname:'远宇诚快远宇诚快捷酒店',
				hotelid: '001',
				roomList: ['0851','0852','0853','0854','0855','0856']
		  }
		},
		methods:{
			renderQR(domid,room){
				// console.log(this.host.qrBaseUrl)
				let url = `${this.host.qrBaseUrl}?hotelid=${this.hotelid}&room=${room}`
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
			init(){
				this.roomList.forEach((item,index) => {
					this.renderQR(`roomqr${index}`,item)
				});
			},
			addroom(){
				// 去掉字符串中所有空格
				this.addHotelNum = this.addHotelNum.replace(/\s/g,"");
				let max = this.roomList.length;
				if(this.addHotelNum){
					for(let i = 0; i < max ; i++){
						if(this.roomList[i] === this.addHotelNum){
							this.$message({
								message: '已经有该房间了',
								type: 'error'
							});
							return
						}
					}

					this.roomList.push(this.addHotelNum);
					setTimeout(()=>{
						this.renderQR(`roomqr${max}`,this.addHotelNum)
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
					this.roomList.splice(index,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
        });
				
			}
		},
		mounted(){
			// this.renderQR(document.getElementById('qr01'),'http://www.baidu.com')
			this.init()
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