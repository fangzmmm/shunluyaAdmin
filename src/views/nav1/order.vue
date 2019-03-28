<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" >
				<el-form-item>
					<el-input v-model="filters.selectparam" placeholder="" ></el-input>
				</el-form-item>
				<el-form-item>
				<el-select v-model="value" placeholder="请选择" style="width:100px">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
  			</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="selectOrder()">提交</el-button>
  			</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="orders" highlight-current-row v-loading="loading" style="width: 100%" height="700">
				<el-table-column prop="id"label="订单号" width="100">
				</el-table-column>
				<el-table-column prop="userId" label="下单人" width="350" sortable>
				</el-table-column>
				<el-table-column prop="time" label="出发时间" width="200"  sortable>
				</el-table-column>
				<el-table-column prop="startId" label="起始点" width="120" sortable :formatter="startaddressForma">
				</el-table-column>
				<el-table-column prop="endId" label="终点" width="120" sortable  :formatter="endaddressForma">
				</el-table-column>
				<el-table-column prop="peopleNumber" label="人数" min-width="180" sortable>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import { getUserList, getAllOrder,getAllAddress,selectOrder } from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				address:[],
				filters: {
					selectparam: ''
				},
				loading: false,
				orders: [
				],
				 options: [ {
          value: 'StartId',
          label: '起始点'
        }, {
          value: 'EndId',
          label: '终点'
				}],
				value:''
			}
		},
		methods: {
			//获取订单列表
			getOrder: function () {
				this.loading = true;
				getAllOrder().then((res) => {
					this.orders = res.data.Order;
					this.loading = false;
				});
				
			},
			getAddress(){
					getAllAddress().then((res) =>{
						this.address = res.data.data_address;
					})
			},
			startaddressForma:function(row){
					let addres = this.address.filter((addre)=>{
						return addre.id == row.startId
					})
					return addres[0].address;
			},
			endaddressForma:function(row){
					let addres =this.address.filter((addre)=>{
						return addre.id == row.endId
					})
					if(addres[0].address)
					return addres[0].address;
					else
					return '';
			},
			selectOrder(){
				if(this.value == ''){
					this.$notify.error({
						title: '请选择查询条件',
						duration:1000
					});
					return '';
				}
				if(this.filters.selectparam == ''){
					this.getOrder();
					return '';
				}
				let addresss = this.address.filter((addre)=>{
						return this.filters.selectparam == addre.address;
				})
				let param;
				if(addresss[0]){
				param ={
					selectparam:this.value,
					selectterm:addresss[0].id
				}
				}else{
						this.$notify.error({
						title: '请填写正确的数据',
						duration:1000
						});
						return ''
						}
						selectOrder(param).then((res)=>{
								this.orders = res.data.Order;
						})
				}
			},
		mounted() {
			this.getOrder();
			this.getAddress();
		}
	};

</script>

<style scoped>

</style>