<template>
  <div>
    <Header>个人中心</Header>
    <div class="header_01">
      <img class="img_1" src="/imgs/bg_1.png" alt />
      <div class="bg"></div>
      <img class="img_2" src="imgs/header.png" alt />
      <span>张帅</span>
    </div>
    <mt-cell
      style="border-bottom:1px solid rgba(197, 199, 200, 1)"
      title="联系电话"
      value="18888888888"
    ></mt-cell>
    <mt-cell style="border-bottom:1px solid rgba(197, 199, 200, 1)" title="所属部门" value="排水科"></mt-cell>
    <mt-cell to="/updetepassword/" title="密码" is-link value="*******"></mt-cell>
    <div class="me_btn">退出登录</div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  components: {
    Header
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.header_01 {
  width: 100%;
  height: 4.04rem;
  //   background: url(/imgs/bg_1.png) no-repeat;
  //   background-size: 100%;
  //   filter: blur(5px);
  //   z-index: -1;
  position: relative;
  .img_1 {
    width: 100%;
    height: 100%;
    filter: blur(5px);
  }
  .bg {
    width: 100%;
    height: 100%;
    background: #000;
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0.5;
  }
  .img_2 {
    width: 1.92rem;
    height: 1.92rem;
    position: absolute;
    top: 0.98rem;
    left: 2.8rem;
  }
  span {
    font-size: 0.3rem;
    color: #fff;
    position: absolute;
    bottom: 0.52rem;
    left: 3.46rem;
  }
}
.me_btn {
  width: 90%;
  height: 0.96rem;
  background: rgba(50, 150, 250, 1);
  box-shadow: 0px 6px 20px rgba(50, 150, 250, 0.52);
  opacity: 1;
  border-radius: 6px;
  position: fixed;
  bottom: 13%;
  left: 5%;
  text-align: center;
  line-height: 0.96rem;
  color: #fff;
  font-size: 0.36rem;
}
</style>