<template>
	<div class="category-edit">
		<h1>{{title}}分类</h1>
		<el-form ref="categoryEdit" :model="model" label-width="120px" @submit.native.prevent="save">
			<el-form-item label="上级分类">
				<el-select v-model="model.parent">
					<el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="名称"
				prop="name"
				:rules="[
					{required: true, message: '分类名称不能为空'}
				]">
				<el-input v-model="model.name"></el-input>
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
			model: {},
			parents: [], // 上级分类集
		}
	},
	watch: {
		id() {
			const categoryEdit = this.$refs['categoryEdit'];
			this.model = {};
			categoryEdit.resetFields();
		}
	},
	methods: {
		async save() {
			const categoryEdit = this.$refs['categoryEdit'];
			categoryEdit.validate( async valid => {
				if (valid) {
					let model = null;
					if (this.id) {
						model = await this.$http.put(`rest/category/${this.id}`, this.model);
					} else {
						model = await this.$http.post('rest/category',this.model);
					}
					if (model) {
						this.$router.push('/category/list');
						this.$message({
							message: this.id ? '修改成功' : '保存成功',
							type: 'success'
						})
					}
				}
			})
		},
		async getDetail() {
			const res = await this.$http.get(`rest/category/${this.id}`);
			this.model = res.data;
		},
		async getPrents() {
			const res = await this.$http.get(`rest/category`);
			this.parents = res.data;
		}
	},
	computed: {
		title() {
			return this.id ? '编辑' : '新增'
		}
	},
	async created() {
		await this.getPrents();
		if (this.id) {
			this.getDetail();
		}
	}
};
</script>

<style>
</style>