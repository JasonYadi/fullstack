<template>
  <div class="ads-list">
      <h1>广告位列表</h1>
       <el-table
            :data="list"
            style="width: 100%"
            empty-text="还没有添加广告位哦~">
            <el-table-column
                prop="_id"
                label="ID"
                width="230">
            </el-table-column>
            <el-table-column
                prop="name"
                label="广告位名称">
            </el-table-column>
            <el-table-column
                label="操作">
                <template scope="scope">                    
                    <el-button type="text" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
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
            const res = await this.$http.get('rest/ads');
            this.list = res.data;
        },
        async remove(row) {
            const flag = await this.$confirm(`确认删除 ${row.name} 吗？`).catch(err => null && err);
            if (flag) {
                const res = await this.$http.delete(`rest/ads/${row._id}`);
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