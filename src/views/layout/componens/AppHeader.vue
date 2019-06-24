<template>
  <el-row :gutter="20">
    <el-col :span="10">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="5" :offset="5">
      <el-dropdown>
        <img width="30" :src="userInfo.photo" alt="">
        <span class="el-dropdown-link">
         {{ userInfo.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>尼玛</el-dropdown-item>
          <el-dropdown-item>你麻麻</el-dropdown-item>
          <el-dropdown-item>问候你麻麻</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      userInfo: {}
    };
  },
  created (){
    this.userInfo = JSON.parse(window.localStorage.getItem('urse_info'))
  }
};
</script>


<style lang ='less' scoped>
  .el-header {
  line-height: 60px;
}
</style>

