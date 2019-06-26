<template>
  <el-row :gutter="20">
    <el-col :span="10">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="5" :offset="5">
      <el-dropdown>
        <img width="30" :src="userInfo.photo" alt class="imagess">
        <span class="el-dropdown-link">
          {{ userInfo.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>尼玛</el-dropdown-item>
          <el-dropdown-item>你麻麻</el-dropdown-item>
          <el-dropdown-item  @click.native="chetui()">问候你麻麻</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
import {removeUser,getUser} from "@/utils/auth"
export default {
  name: "AppHeader",
  data() {
    return {
      userInfo: {}
    };
  },
  created() {
      this.userInfo = getUser()
  },
  methods: {
    chetui() {
      this.$confirm("你确定退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          
          removeUser()
          
          this.$router.push({name:'login'})
          this.$message({
            type: "success",
            message: "已取消退出!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "退出成功"
          })
        })
    }
  }
};
</script>


<style lang ='less' scoped>
img {
  margin-top: 10px;
}
</style>

