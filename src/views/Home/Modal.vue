<template>
  <div class="modal-total">
    <div class="modal" ref="modal">
      <div :class="'modal-title '+datalist.wid?'police-title':'normal-title'">{{datalist.name||datalist.pumpStation}}</div>
      <div class="modal-main">
        <div class="modal-text">
          <p>监测点编号:</p>
          <p>{{datalist.code||datalist.stationKey}}</p>
        </div>
        <div class="modal-text">
          <p>监测点名称:</p>
          <p>{{datalist.name||datalist.pumpStation}}</p>
        </div>
        <div class="modal-text">
          <p>状态:</p>
          <p>{{datalist.status}}</p>
        </div>
        <div class="modal-text">
          <p>更新时间:</p>
          <p>{{datalist.createTime||datalist.date}}</p>
        </div>
      </div>
      <div class="modal-button">
        <div :class="datalist.wid?'police':'normal'" @click="determine">详情</div>
        <div class="modal-navigation" @click="navigation">导航</div>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datalist: null //动态数据
    };
  },
  methods: {
    //地图点点击
    determine() {
      this.$router.push(`/home/detail?name=${this.datalist.name}`);
    },
    //导航栏
    navigation() {
      this.$emit("navigation", true);
    }
  },
  //创建弹出层时赋值给 datalist
  created() {
    this.datalist = this.data;
  },
  props: ["name", "data"]
};
</script>

<style lang="scss" scoped>
$police: RGBA(242, 86, 67, 1);
$normal: RGBA(50, 150, 250, 1);
.normal {
  color: $normal;
  border: 1px solid $normal;
}
.police {
  color: $police;
  border: 1px solid $police;
}
.normal-title {
  background: $normal;
}
.police-title {
  background: $normal;
}
.modal-total {
  .mask {
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 98;
  }
  .modal {
    width: 6rem;
    z-index: 99;
    height: 4.5rem;
    background: white;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 10%);
    border-radius: 0.2rem;
    overflow: hidden;
    .modal-title {
      width: 100%;
      height: 0.8rem;
      color: white;
      box-sizing: border-box;
      padding-left: 0.2rem;
      line-height: 0.8rem;
    }
    .modal-main {
      padding: 0.2rem 0;
      .modal-text {
        display: flex;
        line-height: 0.5rem;
        font-size: 0.3rem;
        p:nth-of-type(1) {
          width: 40%;
          box-sizing: border-box;
          padding-left: 0.2rem;
        }
        p:nth-of-type(2) {
          width: 70%;
          box-sizing: border-box;
          padding-left: 0.3rem;
        }
      }
    }
    .modal-button {
      height: 1rem;
      display: flex;
      padding: 0 0.5rem;
      line-height: 1rem;
      font-size: 0.4rem;
      justify-content: space-between;
      div {
        height: 100%;
        width: 2rem;
        text-align: center;
        border-radius: 0.1rem;
      }
      .modal-detail {
        color: $normal;
        border: 1px solid $normal;
      }
      .modal-navigation {
        color: white;
        background: $normal;
      }
    }
  }
}
</style>