<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-active="$route.path" router :default-openeds="['1']" unique-opened>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>内容管理</template>
                    <el-menu-item-group title="物品">
                      <el-menu-item index="/goods/create">新增物品</el-menu-item>
                      <el-menu-item index="/goods/list">物品列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="英雄">
                      <el-menu-item index="/heroes/create">新增英雄</el-menu-item>
                      <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="文章">
                      <el-menu-item index="/articles/create">新增文章</el-menu-item>
                      <el-menu-item index="/articles/list">文章列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
				<el-submenu index="2">
                    <template slot="title"><i class="el-icon-message"></i>运营管理</template>
					<el-menu-item-group label="广告位">
                      <el-menu-item index="/ads/create">新增广告位</el-menu-item>
                      <el-menu-item index="/ads/list">广告位列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
				<el-submenu index="3">
                    <template slot="title"><i class="el-icon-message"></i>系统设置</template>
                    <el-menu-item-group title="分类">
                      <el-menu-item index="/category/create">新增分类</el-menu-item>
                      <el-menu-item index="/category/list">分类列表</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="管理员">
                      <el-menu-item index="/admin_users/create">新增管理员</el-menu-item>
                      <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
            </el-header>
            <el-main>
              <router-view/>
            </el-main>
        </el-container>
    </el-container>

</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
        return {
        }
    },
  };
</script>