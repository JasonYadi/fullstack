<template>
    <el-upload
        class="avatar-uploader"
        :action="$http.defaults.baseURL + 'upload'"
        :show-file-list="false"
        :headers="getAuthHeaders()"
        :on-success="res => $set(item, filed, res.url)"
    >
        <img v-if="item[filed]" :src="item[filed]" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
export default {
    props: {
        item: Object,
        filed: String
    }
}
</script>

<style>

</style>