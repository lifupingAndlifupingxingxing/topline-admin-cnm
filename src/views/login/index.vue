<template>
  <div class="loginWrap">
    <div class="box">
      <div class="hehda">
        <img src="@/assets/logo_index.png" alt>
      </div>
      <el-form ref="form" :model="form" class="loginForm" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input v-model="form.code" placeholder="请输入验证码" class="xingxing"></el-input>
          <!-- <el-button @click="fn2" class="hehehe">获取验证码</el-button> -->
          <el-button
            @click="fn2"
            :disabled="!!codeTime"
            class="hehehe"
          >{{codeTime ? `剩余${codeTimeD}秒` : '获取验证码'}}</el-button>
        </el-form-item>

        <el-form-item prop="cal">
          <el-checkbox v-model="form.cal" class="bufu">
            我以
            <a href="javascript:;" style="color:red">阅读</a>
            并
            <a href="javascript:;" style="color:red">同意</a>
          </el-checkbox>
        </el-form-item>

        <el-form-item class="heheeheh">
          <el-button type="primary" @click.prevent="onSubmit" class="wwwww">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const cunChu = 60;
import axios from "axios";
import "@/vender/gt";
import { createHash } from "crypto";
import { clearInterval } from "timers";
import { saveUser }  from '@/utils/auth'
export default {
  name: "AppLogin",
  data() {
    return {
      form: {
        mobile: "",
        code: "",
        cal: ""
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // { len:11, message: '长度必须11位', trigger: 'blur' },
          { pattern: /\d{11}/, message: "长度必须11位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          // { len:11, message: '长度必须6位', trigger: 'blur' },
          { pattern: /\d{6}/, message: "长度必须是6位", trigger: "blur" }
        ],
        cal: [
          { required: true, message:"请阅读并同意"},
          { pattern: /true/, message:"请阅读并同意"}
        ]
      },
      codeTime: null, //倒计时定时器
      codeTimeD: cunChu //倒计时时间
    };
  },
  // 确定
  methods: {
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (!valid) {
          return;
        }
        this.queding();
      });
    },

    //确定提交函数封装
    queding() {
      axios({
        method: "POST",
        url: "http://toutiao.course.itcast.cn/mp/v1_0/authorizations",
        data: this.form
      }).then((res) => {
         const userInfo = res.data.data
         saveUser(userInfo)
          this.$message({
            message: "登陆成功",
            type: "success"
          })
          this.$router.push({
            name: "home"
          })
        }).catch(e => {
          this.$message.error("登陆失败");
        });
    },
    //验证码
    fn2() {
      this.$refs["form"].validateField("mobile", errorMessage => {
        if (errorMessage) {
          return;
        }
        this.yanZheng();
      });
    },
    //验证封装
    yanZheng() {
      const { mobile } = this.form;
      axios({
        method: "GET",
        url: `http://toutiao.course.itcast.cn/v1_0/captchas/${mobile}`
      }).then(res => {
        const { data } = res.data;
        window.initGeetest(
          {
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: data.new_captcha,
            product: "bind"
          },
          (captchaObj) => {
            captchaObj
              .onReady(() => {
                //验证码ready之后才能调用verify方法显示验证码
                captchaObj.verify(); //弹出验证码框
              })
              .onSuccess(() => {
                const {
                  geetest_challenge: challenge,
                  geetest_seccode: seccode,
                  geetest_validate: validate
                } = captchaObj.getValidate();
                axios({
                  methos: "GET",
                  url: `http://toutiao.course.itcast.cn/sms/codes/${mobile}`,
                  params: {
                    challenge,
                    validate,
                    seccode
                  }
                }).then(res => {
                  this.daoJi();
                });
              })
              .onError(function() {
                //your code
              });
          }
        );
      });
    },

    // 倒计时
    daoJi() {
      this.codeTime = window.setInterval(() => {
        this.codeTimeD--;
        if (this.codeTimeD <= 0) {
          window.clearInterval(this.codeTime);
          this.codeTimeD =cunChu ;
          this.codeTime = null;
        }
      }, 1000);
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
  height: 1;
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
/* .bufu {
 display: none
} */
.xingxing {
  width: 66%;
}
.hehehe {
  width: 30%;
  margin-left: 15px;
}
.wwwww {
  width: 100%;
  margin-bottom: -20px;
}
</style>

