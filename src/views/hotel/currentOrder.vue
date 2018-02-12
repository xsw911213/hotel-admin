<template>
	<section style="width:900px;">
		<el-table :data="countOrder" max-height="300" border style="width: 100%">
			<el-table-column prop="room" label="房间号" width="100"></el-table-column>
			<el-table-column prop="time" label="下单时间" width="150"></el-table-column>
			<el-table-column prop="deviceNo" label="购买列表" >
				<template slot-scope="scope">
					<div v-for="(item,index) in scope.row.shoppingList" :key="index">
						<span>{{item.name}}</span> * <span>{{item.num}}</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="remark" label="备注" ></el-table-column>
			<el-table-column label="操作" align="center" width="100">
				<template slot-scope="scope">
					<el-button @click="showPrinter(scope.row)" type="text" size="small">已经处理</el-button>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	export default {
    data() {
			return {
				countOrder:[
					{
						room: '001',
						time: '2018-02-13 16:00',
						shoppingList:[
							{
								name:'农夫山泉',
								num:'2'
							},
							{
								name:'康师傅红烧牛肉面',
								num:'1'
							},
							{
								name:'农夫山泉',
								num:'2'
							},
							{
								name:'康师傅红烧牛肉面',
								num:'1'
							}
						],
						remark:'这里是备注'
					}
				],
		  }
    }
  }

</script>

<style lang='scss'>

</style>