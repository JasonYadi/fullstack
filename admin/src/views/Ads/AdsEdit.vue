<template>
	<div class="ads-edit">
		<h1>{{title}}广告位</h1>
		<el-form ref="adsEdit" :model="model" label-width="130px" @submit.native.prevent="save">
			<el-form-item label="名称"
				prop="name"
				:rules="[
					{required: true, message: '名称不能为空'}
				]">
				<el-input v-model="model.name"></el-input>
			</el-form-item>
			<el-form-item label="广告">
				<el-button size="small" @click="model.items.push({})"> <i class="el-icon-plus"></i> 添加图片 </el-button>
				<div :class="{'items-item': model.items.length}">
				<el-row type="flex" style="flex-wrap: wrap;">
					<el-col :md="24" v-for="(item, i) in model.items" :key="i">
						<el-form-item label="跳转链接（URL）">
							<el-input v-model="item.url"></el-input>
						</el-form-item>
						<el-form-item label="图片" style="margin-top:20px;">
							<upload :item="item" filed="image" />
						</el-form-item>
						<el-form-item>
							<el-button size="small" type="danger" @click="model.items.splice(i, 1)">删除</el-button>
						</el-form-item>
					</el-col>
				</el-row>
				</div>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
const model ={
		name: '',
		items: [],
	}
export default {
	props: {
		id: {}
	},
	data() {
		return {
			model: Object.assign({}, model)
		}
	},
	watch: {
		id() {
			const adsEdit = this.$refs['adsEdit'];
			Object.assign(this.model, model);
			adsEdit.resetFields();
		}
	},
	methods: {
		async save() {
			const adsEdit = this.$refs['adsEdit'];
			adsEdit.validate( async valid => {
				if (valid) {
					let model = null;
					if (this.id) {
						model = await this.$http.put(`rest/ads/${this.id}`, this.model);
					} else {
						model = await this.$http.post('rest/ads',this.model);
					}
					if (model) {
						this.$router.push('/ads/list');
						this.$message({
							message: this.id ? '修改成功' : '保存成功',
							type: 'success'
						})
					}
				}
			})
		},
		async getDetail() {
			const res = await this.$http.get(`rest/ads/${this.id}`);
			this.model = res.data;
		},
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

<style lang="scss" scope>
.items-item{
	border: 1px solid #eee;
	padding: 8px;
}
</style>