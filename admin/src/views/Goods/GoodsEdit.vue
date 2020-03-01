<template>
	<div class="goods-edit">
		<h1>{{title}}物品</h1>
		<el-form ref="goodsEdit" :model="model" label-width="120px" @submit.native.prevent="save">
			<el-form-item label="名称"
				prop="name"
				:rules="[
					{required: true, message: '物品名称不能为空'}
				]">
				<el-input v-model="model.name"></el-input>
			</el-form-item>
			<el-form-item label="图标">
				<upload :item="model" filed="icon" />
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
				icon: ''
			},
		}
	},
	watch: {
		id() {
			const goodsEdit = this.$refs['goodsEdit'];
			this.model = {};
			goodsEdit.resetFields();
		}
	},
	methods: {
		async save() {
			const goodsEdit = this.$refs['goodsEdit'];
			goodsEdit.validate( async valid => {
				if (valid) {
					let model = null;
					if (this.id) {
						model = await this.$http.put(`rest/goods/${this.id}`, this.model);
					} else {
						model = await this.$http.post('rest/goods',this.model);
					}
					if (model) {
						this.$router.push('/goods/list');
						this.$message({
							message: this.id ? '修改成功' : '保存成功',
							type: 'success'
						})
					}
				}
			})
		},
		async getDetail() {
			const res = await this.$http.get(`rest/goods/${this.id}`);
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