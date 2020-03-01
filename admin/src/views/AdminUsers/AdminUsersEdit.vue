<template>
	<div class="adminUsers-edit">
		<h1>{{title}}管理员</h1>
		<el-form ref="adminUsersEdit" :model="model" label-width="120px" @submit.native.prevent="save">
			<el-form-item label="用户名"
				prop="username"
				:rules="[
					{required: true, message: '用户名不能为空'}
				]">
				<el-input v-model="model.username"></el-input>
			</el-form-item>
			<el-form-item label="密码"
				prop="password"
				:rules="[
					{required: true, message: '密码不能为空'}
				]">
				<el-input show-password v-model="model.password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	props: {
		id: {}
	},
	data() {
		return {
			model: {
				name: '',
				password: '',
			}
		}
	},
	watch: {
		id() {
			const adminUsersEdit = this.$refs['adminUsersEdit'];
			this.model = {};
			adminUsersEdit.resetFields();
		}
	},
	methods: {
		async save() {
			const adminUsersEdit = this.$refs['adminUsersEdit'];
			adminUsersEdit.validate( async valid => {
				if (valid) {
					let model = null;
					if (this.id) {
						model = await this.$http.put(`rest/adminUsers/${this.id}`, this.model);
					} else {
						model = await this.$http.post('rest/adminUsers',this.model);
					}
					if (model) {
						this.$router.push('/admin_users/list');
						this.$message({
							message: this.id ? '修改成功' : '保存成功',
							type: 'success'
						})
					}
				}
			})
		},
		async getDetail() {
			const res = await this.$http.get(`rest/adminUsers/${this.id}`);
			this.model = res.data;
		}
	},
	computed: {
		title() {
			return this.id ? '编辑' : '新增'
		}
	},
	async created() {
		if (this.id) {
			this.getDetail();
		}
	}
};
</script>

<style>
</style>