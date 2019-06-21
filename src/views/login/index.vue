<template>
  <div class="loginWrap">
    <div class="box">
      <div class="hehda">
       <img src="@/assets/logo_index.png" alt="">
      </div>
      <el-form ref="form" :model="form" class="loginForm">
        <el-form-item>
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.code" placeholder="请输入验证码" class="xingxing"></el-input>
           <el-button  @click='fn2' class="hehehe">获取验证码</el-button>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="wwwww" >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from  'axios'
export default {
  name: "AppLogin",
  data() {
    return {
      form: {
        mobile: "",
        code: ""
      }
    };
  },
  // 确定
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //验证码
    fn2() {
      const { mobile } = this.form
     axios({
       method:'GET',
       url:`http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
     }).then(res => {
       console.log(res.data)
     })
    }
  }
};
</script>

<style lang = 'less' scoped>
.loginWrap {
  background: rgb(32, 27, 14);
  height: 100%;
  display: flex;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
}
.loginForm {
  padding: 10px;
}
.box {
  width: 500px;
  height: 300px;
  background: #fff;
}
.hehda img {
  margin: 0 auto;
  margin-top: 5px;
  display: block;
  width: 40%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.xingxing {
  width: 66%;
}
.hehehe {
  width: 30%;
  margin-left: 15px;
}
.wwwww {
  width: 100%;
}
</style>

