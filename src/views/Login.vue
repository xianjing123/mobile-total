<template>
  <div class="login">
    <button @click="LoginTo">登录</button>
  </div>
</template>

<script>
import { setCookie } from "../components/cookie";
export default {
  mounted() {
    this.$store.commit("commitShow", false);
  },
  destroyed() {
    this.$store.commit("commitShow", true);
  },
  methods: {
    LoginTo() {
      // setCookie("name", "测试", "/", 1);
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  background: blue;
  button {
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
  }
}
</style>