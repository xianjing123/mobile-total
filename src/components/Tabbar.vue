<template>
  <ul class="tabbar">
    <router-link to="/home" activeClass="active" tag="li">
      <i class="iconfont icon-ditu"></i>
      地图监控
    </router-link>
    <router-link to="/task" activeClass="active" tag="li">
      <i class="iconfont icon-task"></i>
      任务管理
    </router-link>
    <router-link to="/special" activeClass="active" tag="li">
      <i class="iconfont icon-zhanshi"></i>
      专题展示
    </router-link>
    <router-link to="/mine" activeClass="active" tag="li">
      <i class="iconfont icon-geren"></i>
      个人中心
    </router-link>
  </ul>
</template>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 1.04rem;
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  font-size: 0.2rem;
  font-family: PingFang SC;
  font-weight: 400;
  .iconfont {
    display: block;
    width: 0.48rem;
    height: 0.48rem;
    font-size: 0.48rem;
    border: 1px solid rgba(236, 236, 236, 1);
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.1rem;
  }
  .icon-task {
    font-size: 0.4rem;
  }
}
.active {
  color: rgba(50, 150, 250, 1);
}
</style>