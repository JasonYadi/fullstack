<template>
	<div class="articles-edit">
		<h1>{{title}}文章</h1>
		<el-form ref="articlesEdit" :model="model" label-width="120px" @submit.native.prevent="save">
			<el-form-item label="所属分类">
				<el-select v-model="model.categories" multiple	>
					<el-option v-for="item in categories" :key="item._id" 
						:label="item.name" 
						:value="item._id"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="标题"
				prop="title"
				:rules="[
					{required: true, message: '文章标题不能为空'}
				]">
				<el-input v-model="model.title"></el-input>
			</el-form-item>
			<el-form-item label="详情">
				<vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import {VueEditor} from 'vue2-editor';
export default {
	props: {
		id: {}
	},
	data() {
		return {
			model: {
				title: '',
				categories: '',
			},
			categories: [],
		}
	},
	watch: {
		id() {
			const articlesEdit = this.$refs['articlesEdit'];
			this.model = {};
			articlesEdit.resetFields();
		}
	},
	methods: {
		async save() {
			const articlesEdit = this.$refs['articlesEdit'];
			articlesEdit.validate( async valid => {
				if (valid) {
					let model = null;
					if (this.id) {
						model = await this.$http.put(`rest/articles/${this.id}`, this.model);
					} else {
						model = await this.$http.post('rest/articles',this.model);
					}
					if (model) {
						this.$router.push('/articles/list');
						this.$message({
							message: this.id ? '修改成功' : '保存成功',
							type: 'success'
						})
					}
				}
			})
		},
		async getDetail() {
			const res = await this.$http.get(`rest/articles/${this.id}`);
			this.model = res.data;
		},
		async getCategories() {
			const res = await this.$http.get('rest/category');
			this.categories = res.data;
		},
		async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
			var formData = new FormData();
			formData.append("file", file);
			try {
				const res = await this.$http.post('upload', formData);
				Editor.insertEmbed(cursorLocation, "image", res.data.url);
				resetUploader();
			} catch (error) {
				console.log(error);
			}
		}
	},
	computed: {
		title() {
			return this.id ? '编辑' : '新增'
		}
	},
	async created() {
		await this.getCategories();
		if (this.id) {
			this.getDetail();
		}
	},
	components: {
		VueEditor
	}
};
</script>

<style>
</style>