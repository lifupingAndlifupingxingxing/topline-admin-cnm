<template>
  <el-container>
    <el-aside width="200px" class="a">
        <!-- 侧边栏 -->
      <AppAside/>
    </el-aside>
    <el-container>
        <!-- 头部 -->
      <el-header>
        <AppHeader/>
      </el-header>

      <el-main>
          <router-view/>
          <!-- 发布文章 文章内部  评论等 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from "./componens/AppAside"
import AppHeader from "./componens/AppHeader"
export default {
  components: {
    AppAside,
    AppHeader
  },
  data() {
    return {}
  }
}
</script>

<style lang='less' scoped>
.el-container {
  height: 100%;
}
.el-aside {
  height: 100%;
  background: rgb(32, 35, 37);
}
.el-header {
  background: rgb(61, 63, 63);
  line-height: 60px;
}
img {
   margin-top: 10px;
}
.imagess {
  margin-top: 30px;
}
.el-main {
  background: blue;
}
</style>


