<template>
  <div class="header">
    <div>
      <i class="iconfont icon-xiangzuo" @click="historyGo"></i>
    </div>
    <div class="header-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    historyGo() {
      console.log(this.$router.go(-1));
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
  font-size: 0.32rem;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(25, 31, 37, 1);
  position: relative;
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
</style>