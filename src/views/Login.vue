<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>欢迎登录</span>
      </div>
      <el-form
        size="small"
        :model="loginFromObj"
        ref="loginform"
        :rules="rules"
        @submit.native.prevent
      >
        <el-form-item prop="username">
          <el-input v-model="loginFromObj.username">
            <template slot="prepend"
              ><i
                class="el-icon-user-solid
"
              ></i
            ></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginFromObj.password">
            <template slot="prepend"
              ><i
                class="el-icon-lock
"
              ></i
            ></template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit" @click="handle"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
      <!-- <el-input placeholder="请输入用户名" v-model="user" size="small">
        <template slot="prepend"><i class="el-icon-user-solid"></i></template>
      </el-input>

      <el-input placeholder="请输入密码" v-model="password" size="small">
        <template slot="prepend"><i class="el-icon-lock"></i></template>
      </el-input>

      <el-button type="primary" size="small" @click="login">登录</el-button> -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var checkpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        this.$refs.loginform.validateField("password");
      }
    };
    return {
      loginFromObj: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { validator: checkpassword, trigger: "blur" },
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
      // user: "admin",
      // password: "123456"
    };
  },
  // methods: {
  //   login() {
  //     this.$store.dispatch("tologin", {
  //       username: this.user,
  //       password: this.password
  //     });
  //   }
  // }
  methods: {
    handle() {
      this.$refs.loginform.validate();
      this.$api.login( this.loginFromObj, this.$message);
      // this.$http("login", this.loginFromObj, "POST").then(res => {
      //   this.$message({
      //     type: "success",
      //     message: res.meta.msg
      //   });
      //   this.$router.push({
      //     name: "home"
      //   });
      // });
      /*  fetch(
        "http://localhost:8889/api/private/v1/login?username=" +
          this.loginFromObj.username +
          "&password=" +
          this.loginFromObj.password,
        {
          method: "POST"
        }
      )
        .then(res => res.json())
        .then(res => {
          if (res.meta.status == 200) {
            setTimeout(() => {
              this.$router.push({
                name: "home"
              });
            }, 3000);

            this.$message({
              type: "success",
              message: res.meta.msg
            });
          } else {
            this.$message({
              type: "warning",
              message: res.meta.msg
            });
          }
        });
   */
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background: url(../assets/img/admin_background.jpg);
  background-size: cover;
  background-position: center;
}
.el-card {
  border-radius: 10px;
}

.box-card {
  width: 300px !important;
  position: absolute;
  right: 160px;
  top: 50%;
  transform: translateY(-50%);
  button {
    width: 100%;
  }
  // .el-input {
  //   margin-bottom: 30px;
  // }
  .clearfix {
    span {
      font-weight: 600;
      font-size: 14px;
    }
  }
}
.text {
  font-size: 14px;
}

// .item {
//   // margin-bottom: 18px;
// }

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
