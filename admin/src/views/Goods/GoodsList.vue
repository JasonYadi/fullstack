<template>
  <div class="category-list">
      <h1>物品列表</h1>
       <el-table
            :data="list"
            style="width: 100%"
            empty-text="还没有添加物品哦~">
            <el-table-column
                prop="_id"
                label="ID"
                width="230">
            </el-table-column>
            <el-table-column
                prop="name"
                label="物品名称">
            </el-table-column>
            <el-table-column
                prop="name"
                label="图标">
                <template scope="scope">
                    <img :src="scope.row.icon" :alt="scope.row.name" style="width: 3rem;">
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template scope="scope">                    
                    <el-button type="text" size="small" @click="$router.push(`/goods/edit/${scope.row._id}`)">编辑</el-button>
                    <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        async getList() {
            const res = await this.$http.get('rest/goods');
            this.list = res.data;
        },
        async remove(row) {
            const flag = await this.$confirm(`确认删除 ${row.name} 吗？`).catch(err => null && err);
            if (flag) {
                const res = await this.$http.delete(`rest/goods/${row._id}`);
                if (res) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getList();
                }
            }
        }
    },
    created() {
        this.getList();
    },
}
</script>

<style>

</style>