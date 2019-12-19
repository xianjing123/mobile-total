<template>
  <div class="modal-total">
    <div class="modal" ref="modal">
      <div class="modal-title">{{name}}</div>
      <div class="modal-main">
        <div v-for="(data,index) in datalist" :key="index" class="modal-text">
          <p>{{data.name}}:</p>
          <p>{{data.value}}</p>
        </div>
      </div>
      <div class="modal-button">
        <div class="modal-detail" @click="determine">详情</div>
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
      datalist: [
        {
          name: "监测点编号",
          value: "0001"
        },
        {
          name: "检测点名称",
          value: "舞阳泵站"
        },
        {
          name: "状态",
          value: "正常"
        },
        {
          name: "更新时间",
          value: "2019.05.06 12.34.45"
        }
      ] //模态框内容
    };
  },
  methods: {
    //地图点点击
    determine() {
      this.$refs.modal.style.display = "none";
      this.$router.push(`/home/detail?name=${this.name}`);
    },
    //导航栏
    navigation() {
      this.$emit("navigation", true);
    }
  },
  props: ["name"]
};
</script>

<style lang="scss" scoped>
$police: RGBA(242, 86, 67, 1);
$normal: RGBA(50, 150, 250, 1);
.modal-total {
  display: none;
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
      background: $normal;
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