<template>
	<div class="heroes-edit">
		<h1>{{title}}英雄</h1>
		<el-form ref="heroesEdit" :model="model" label-width="120px" @submit.native.prevent="save">
			<el-tabs value="basic" type="border-card">
				<el-tab-pane label="基础信息" name="basic">
					<el-form-item label="名称"
						prop="name"
						:rules="[
							{required: true, message: '英雄名称不能为空'}
						]">
						<el-input v-model="model.name"></el-input>
					</el-form-item>
					<el-form-item label="头像">
						<upload :item="model" filed="avatar" />
					</el-form-item>
					<el-form-item label="称号">
						<el-input v-model="model.title"></el-input>
					</el-form-item>
					<el-form-item label="类型">
						<el-select v-model="model.categories" multiple>
							<el-option v-for="item in categories" 
							:key="item._id" 
							:label="item.name"
							:value="item._id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="难度">
						<el-rate :max="10" show-score v-model="model.scores.difficult"></el-rate>
					</el-form-item>
					<el-form-item label="技能">
						<el-rate :max="10" show-score v-model="model.scores.skills"></el-rate>
					</el-form-item>
					<el-form-item label="攻击">
						<el-rate :max="10" show-score v-model="model.scores.attack"></el-rate>
					</el-form-item>
					<el-form-item label="生存">
						<el-rate :max="10" show-score v-model="model.scores.survive"></el-rate>
					</el-form-item>
					<el-form-item label="顺风出装">
						<el-select v-model="model.goods1" multiple>
							<el-option v-for="item in goods" 
							:key="item._id" 
							:label="item.name"
							:value="item._id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="逆风出装">
						<el-select v-model="model.goods2" multiple>
							<el-option v-for="item in goods" 
							:key="item._id" 
							:label="item.name"
							:value="item._id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="使用技巧">
						<el-input type="textarea" v-model="model.usageTips"></el-input>
					</el-form-item>
					<el-form-item label="对抗技巧">
						<el-input type="textarea" v-model="model.battleTips"></el-input>
					</el-form-item>
					<el-form-item label="团战思路">
						<el-input type="textarea" v-model="model.teamTips"></el-input>
					</el-form-item>
				</el-tab-pane>
				<el-tab-pane label="技能" name="skills">
					<el-button size="small" @click="model.skills.push({})"> <i class="el-icon-plus"></i> 添加技能 </el-button>
					<el-row type="flex" style="flex-wrap: wrap;">
						<el-col class="skill-item" :md="12" v-for="(item, i) in model.skills" :key="i">
							<el-form-item label="名称">
								<el-input v-model="item.name"></el-input>
							</el-form-item>
							<el-form-item label="图标">
								<el-upload
									class="avatar-uploader"
									:action="$http.defaults.baseURL + 'upload'"
									:show-file-list="false"
									:on-success="res => $set(item, 'icon', res.url)"
								>
									<img v-if="item.icon" :src="item.icon" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</el-form-item>
							<el-form-item label="描述">
								<el-input autosize type="textarea" v-model="item.description"></el-input>
							</el-form-item>
							<el-form-item label="小提示">
								<el-input autosize type="textarea" v-model="item.tips"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button size="small" type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-tab-pane>
			</el-tabs>
			<el-form-item style="margin-top: 1rem;">
				<el-button type="primary" native-type="submit">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
const model = {
	name: '',
	avatar: '',
	scores: {
		difficult: 0,
		skills: 0,
		attack: 0,
		survive: 0,
	},
	skills: []
}
export default {
	props: {
		id: {}
	},
	data() {
		return {
			model: Object.assign({}, model),
			categories: [], // 类型
			goods: [], // 顺风装备
		}
	},
	watch: {
		id() {
			const heroesEdit = this.$refs['heroesEdit'];
			this.model = Object.assign({}, model);
			heroesEdit.resetFields();
		}
	},
	methods: {
		async save() {
			const heroesEdit = this.$refs['heroesEdit'];
			heroesEdit.validate( async valid => {
				if (valid) {
					let model = null;
					if (this.id) {
						model = await this.$http.put(`rest/heroes/${this.id}`, this.model);
					} else {
						model = await this.$http.post('rest/heroes',this.model);
					}
					if (model) {
						this.$router.push('/heroes/list');
						this.$message({
							message: this.id ? '修改成功' : '保存成功',
							type: 'success'
						})
					}
				}
			})
		},
		async getDetail() {
			const res = await this.$http.get(`rest/heroes/${this.id}`);
			Object.assign(this.model, res.data);
		},
		async getCategories() {
			const res = await this.$http.get('/rest/category');
			this.categories = res.data;
		},
		async getGoods() {
			const res = await this.$http.get('/rest/goods');
			this.goods = res.data;
		}
	},
	computed: {
		title() {
			return this.id ? '编辑' : '新增'
		}
	},
	async created() {
		await this.getCategories();
		await this.getGoods();
		if (this.id) {
			this.getDetail();
		}
	}
};
</script>

<style lang="scss">
	.el-rate{
		margin-top: .65rem;
	}
	.skill-item{
		padding: 60px;
		&:nth-child(2n-1){
			border-right: 1px solid #ccc;
		}
	}
</style>