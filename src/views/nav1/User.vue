<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" v-on:keydown.enter="findUser">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
            <el-button @click="findUser()" type="primary" >查询</el-button>
        </el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%" > 
			<el-table-column prop="id" label="OpenId" width="300" sortable>
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100"  sortable>
			</el-table-column>
			<el-table-column prop="regTime" label="注册时间" width="120" sortable>
			</el-table-column>
			<el-table-column prop="phone" label="联系号码" min-width="180" sortable>
			</el-table-column>
			<el-table-column  prop="status" label="状态" min-width="180" sortable :formatter="formatStatus" >
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<span v-if="scope.row.status == 1">
							<el-button size="small" @click="Editstatus(scope.$index, scope.row)" type="info">禁用</el-button>
					</span>
					<span v-if="scope.row.status == 0">
							<el-button size="small" @click="Editstatus(scope.$index, scope.row)"  type="warning">解禁</el-button>
					</span>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserList, removeUser, batchRemoveUser, editUser, addUser,editstatus,selectUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false
			}
		},
		methods: {
			findUser(){

				selectUser({'username':this.filters.name}).then(res =>{
						this.users = res.data.User;
				})
			},
			formatStatus(row,column){
				return row.status == 1? '正常':row.status == 0 ? '停用':'出错'
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				getUserList().then((res) => {
					this.users = res.data.User;
					this.listLoading = false;
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该用户吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { openid: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//修改禁用状态
			Editstatus: function (index, row) {
				let msg = row.status == 1 ? '禁用':'解禁';
				let status = (row.status == 1 ? 0 : 1);
				let para = { openid: row.id,status:status};
					editstatus(para).then((res) =>{
							this.$message({
							message: `${msg}成功！`,
							type: 'success',
							duration:'1000'
						});
						this.getUsers();
					});
					
			},
			selsChange: function (sels) {
				this.sels = sels;
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>