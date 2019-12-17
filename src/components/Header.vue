<template>
  <div>
    <div class="header">
      <div>
        <i class="iconfont icon-xiangzuo" @click="historyGo"></i>
      </div>
      <div class="header-content">
        <slot></slot>
      </div>
    </div>
    <div class="div"></div>
  </div>
</template>

<script>
export default {
  methods: {
    historyGo() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 0.8rem;
  background: white;
  line-height: 0.8rem;
  font-size: 0.36rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(25, 31, 37, 1);
  position: fixed;
  left: 0;
  top: 0;
  .icon-xiangzuo {
    position: absolute;
    left: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  .header-content {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
.div {
  height:0.8rem;
}
</style>