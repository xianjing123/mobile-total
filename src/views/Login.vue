<template>
  <div class="login">
    <div v-if="loading">
      <div class="login-logo">
        <img src="/imgs/logo-login.png" alt />
      </div>
      <div class="login-loading">
        <div class="loading-photo">
          <div class="photo1"></div>
          <div class="photo2"></div>
          <div class="photo3"></div>
        </div>
        <div class="loading-text">掌上市政</div>
      </div>
    </div>
    <div v-else>
      <div class="welcome">
        <div class="logo">
          <img src="/imgs/logo-login.png" alt />
        </div>
        <div class="welcome-text">
          <p>欢迎来到</p>
          <p>掌上市政平台</p>
        </div>
      </div>
      <div class="login-block">
        <div class="login-input">
          <div class="username" ref="usernameBlock">
            <label>
              <img src="/imgs/username.png" alt />
              <input type="text" placeholder="用户名" ref="username" v-model="username" />
            </label>
          </div>
          <div class="password" ref="passwordBlock">
            <label>
              <img src="/imgs/password.png" alt />
              <input type="password" placeholder="密码" ref="password" v-model="password" />
            </label>
          </div>
          <div class="remember" @click="rememberClick">
            <div v-if="isRemember">
              <img src="/imgs/map-active.png" alt />
            </div>
            <div v-else>
              <img src="/imgs/noactive.png" alt />
            </div>
            <span>记住密码</span>
          </div>
        </div>
        <div class="immediately-login" @click="LoginTo">
          <img src="/imgs/login.png" alt />
        </div>
      </div>
      <span class="login-area">德清市政</span>
    </div>
  </div>
</template>

<script>
import { setCookie, getCookie, removeCookie } from "../components/cookie";
import { Encrypt, Decrypt } from '../components/secret'
import axios from "axios";
export default {
  data() {
    return {
      loading: true, //加载时
      isRemember: true, //记住密码
      username: "",
      password: ""
    };
  },
  mounted() {
    this.$store.commit("commitShow", false);
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  destroyed() {
    this.$store.commit("commitShow", true);
  },
  watch:{
    loading () {
      if(!this.loading){
        this.$nextTick(()=>{
          if(getCookie("username")){
            this.username = Decrypt(getCookie("username"))
            if(getCookie("password")){
              this.password = Decrypt(getCookie("password"))
            }
          }
        })
      }
    }
  },
  methods: {
    //点击登录
    LoginTo() {
      var that = this
      if (this.username === "") {
        this.$refs.usernameBlock.style.border = "1px solid orange";
      }
      if (this.password === "") {
        this.$refs.passwordBlock.style.border = "1px solid orange";
      }
      if (
        this.username === "" ||
        this.password === ""
      ) {
        return;
      }
      axios
        .post(this.$store.state.urls + "security/subject/login", {
          username: this.username,
          password: this.password
        })
        .then(function(response) {
          if (response.data.code == "200") {
            setCookie("token", response.data.data.jwt, "/", 1);
            if(that.isRemember){
              setCookie("username",Encrypt(that.username),'/',30)
              setCookie("password",Encrypt(that.password),'/',30)
            } else {
              setCookie("username",Encrypt(that.username),'/',30)
              if(getCookie("password")){
                removeCookie("password")
              }
            }
            that.$router.push("/home");
          } else {
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    rememberClick() {
      this.isRemember = !this.isRemember;
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  background: url("/imgs/login-background.png") no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  .login-logo {
    width: 3rem;
    height: 2.38rem;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
    background: url("/imgs/logo-background.png") no-repeat;
    background-size: cover;
    img {
      height: 100%;
    }
  }
  .login-loading {
    position: absolute;
    left: 50%;
    bottom: 15%;
    transform: translateX(-50%);
    .loading-photo {
      width: 0.8rem;
      height: 0.26rem;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      animation: photo 1s linear infinite alternate;
      div {
        width: 0.2rem;
        background: white;
        height: 100%;
        transform: skewX(-30deg);
      }
      @keyframes photo {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0.1;
        }
      }
      .photo2 {
        opacity: 0.5;
      }
      .photo3 {
        opacity: 0.2;
      }
    }
    .loading-text {
      color: white;
      font-size: 0.4rem;
      line-height: 0.64rem;
    }
  }
  .welcome {
    position: absolute;
    left: 0.72rem;
    top: 20%;
    display: flex;
    .logo {
      width: 1.46rem;
      height: 1.24rem;
      img {
        width: 100%;
      }
    }
    .welcome-text {
      margin-left: 0.12rem;
      color: white;
      p:nth-of-type(1) {
        margin-top: 0.2rem;
        font-size: 0.4rem;
        line-height: 0.36rem;
      }
      p:nth-of-type(2) {
        font-size: 0.56rem;
        line-height: 0.76rem;
      }
    }
  }
  .login-block {
    width: 6.06rem;
    height: 5.1rem;
    background: white;
    position: absolute;
    left: 0.72rem;
    bottom: 22%;
    border-radius: 0.24rem;
    .login-input {
      width: 5.24rem;
      margin: 0 auto;
      position: relative;
      .username,
      .password {
        width: 100%;
        height: 0.8rem;
        border-bottom: 1px dashed black;
        box-sizing: border-box;
        padding-top: 0.2rem;
        margin-top: 0.5rem;
        label {
          margin-left: 0.2rem;
          input {
            margin-left: 0.2rem;
            height: 0.4rem;
            font-size: 0.3rem;
            outline: none;
            border: none;
            padding-left: 0.1rem;
          }
        }
      }
      .remember {
        font-size: 0.32rem;
        color: rgba(112, 112, 112, 1);
        float: right;
        margin-top: 0.2rem;
        display: flex;
        img {
          height: 0.18rem;
          position: relative;
          left: -0.05rem;
        }
      }
    }
  }
  .login-area {
    color: white;
    font-size: 0.2rem;
    position: absolute;
    left: 50%;
    bottom: 0.96rem;
    transform: translateX(-50%);
    opacity: 0.5;
  }
  .immediately-login {
    width: 5.86rem;
    margin-left: 0.1rem;
    margin-top: 0.8rem;
    img {
      width: 100%;
    }
  }
}
</style>