<template>
  <div>
    <Header>上报</Header>
    <div id="viewDiv" ref="map"></div>
    <div
      class="report-hide"
      :style="listShow?'transform:translateY(70%)':'transform:translateY(0)'"
    >
      <div class="problem">
        <div class="problem-title">{{name}}</div>
        <div class="problem-content">
          <p>{{name}}问题</p>
          <p>{{area}}</p>
        </div>
        <div class="report-update" @click="reportPut" v-if="!listShow">
          <img src="/imgs/report-update.png" alt />
          <span>更改位置</span>
        </div>
      </div>
      <div class="report-describe">
        <p class="describe-text">详情描述</p>
        <div class="describe-input">
          <div class="describe-input_img">
            <img src="/imgs/describe-img.png" alt />
          </div>
          <input type="text" class="describe-input_text" />
        </div>
        <div class="describe-submit" @click="actionSheet">立即上传</div>
      </div>
    </div>
    <div ref="chatBox" class="chat">
      <div class="chat-box">
        <span>浙江省湖州市德清县科源路辅路</span>
        <p @click="determine">确定</p>
      </div>
    </div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
import Header from "../../components/Header";
import map from "./js/map";
import { point } from "./js/point";
export default {
  data() {
    return {
      name: "", //标题
      area: "在地图确定问题位置", //地图点弹出层内容
      listShow: true, //管线描述提交
      sheetVisible: false, //立即上传-状态
      actions: [
        {
          name: "拍照",
          method: function(res) {
            console.log("拍照");
          }
        },
        {
          name: "上传图片",
          method: function(res) {
            console.log("上传图片");
          }
        }
      ] //导航栏内容
    };
  },
  methods: {
    //地图点点击
    determine() {
      this.listShow = false;
      this.area = "浙江省湖州市德清县科源路辅路";
      this.$refs.chatBox.style.display = "none";
    },
    //地图点内容隐藏
    reportPut() {
      this.listShow = true;
      this.area = "在地图确定问题位置";
    },
    //立即上传
    actionSheet() {
      this.sheetVisible = true;
    }
  },
  mounted() {
    this.$store.commit("commitShow", false);
    this.name = this.$route.query.name;
    //地图点
    point(this.$refs.chatBox);
  },
  destroyed() {
    this.$store.commit("commitShow", true);
  },
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
@import url("../../assets/css/map.css");
#viewDiv {
  position: absolute;
  top: 0.8rem;
  left: 0;
  height: calc(100vh - 2.4rem);
  width: 100%;
}
.report-hide {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 5.5rem;
  bottom: 0;
  background: white;
  padding: 0.3rem 0.3rem 0 0.3rem;
  box-sizing: border-box;
  transition: 0.3s;
  .problem {
    width: 100%;
    height: 1.4rem;
    background: white;
    position: relative;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(112, 112, 112, 1);
    .problem-title {
      width: 0.9rem;
      height: 0.9rem;
      border: 2px solid rgba(50, 150, 250, 1);
      border-radius: 50%;
      color: rgba(50, 150, 250, 1);
      line-height: 0.9rem;
      text-align: center;
      margin-right: 0.22rem;
      overflow: hidden;
      float: left;
    }
    .problem-content {
      height: 0.94rem;
      box-sizing: border-box;
      padding-top: 0.1rem;
      float: left;
      p:nth-of-type(1) {
        color: black;
        font-weight: bold;
      }
      p:nth-of-type(2) {
        font-size: 0.28rem;
        color: rgba(25, 31, 37, 1);
      }
    }
    .report-update {
      padding-top: 0.46rem;
      color: rgba(50, 150, 250, 1);
      font-size: 0.28rem;
      float: right;
      img {
        height: 0.28rem;
        position: relative;
        top: 0.05rem;
      }
    }
  }
  .report-describe {
    .describe-text {
      line-height: 1rem;
      color: rgba(25, 31, 37, 1);
    }
    .describe-input {
      height: 0.88rem;
      .describe-input_img {
        height: 100%;
        float: left;
        border-radius: 0.2rem;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
      .describe-input_text {
        height: 100%;
        float: right;
        width: 80%;
        border-radius: 0.2rem;
        border: 1px solid rgba(197, 199, 200, 1);
        outline: none;
        box-sizing: border-box;
        padding-left: 0.1rem;
      }
    }
    .describe-submit {
      width: 100%;
      height: 0.96rem;
      background: RGBA(50, 150, 250, 1);
      color: white;
      font-size: 0.36rem;
      line-height: 0.96rem;
      text-align: center;
      margin-top: 0.58rem;
    }
  }
}
.chat {
  display: none;
  position: absolute;
  width: 5.5rem;
  .chat-box {
    width: 100%;
    height: 0.8rem;
    background: url("/imgs/chat-box.png") no-repeat;
    background-size: cover;
    display: flex;
    line-height: 0.8rem;
    padding-left: 0.4rem;
    font-size: 0.28rem;
    position: relative;
    p {
      height: 0.4rem;
      position: absolute;
      right: 0.4rem;
      top: 0.2rem;
      padding-left: 0.2rem;
      line-height: 0.4rem;
      border-left: 1px solid black;
      color: RGBA(50, 150, 250, 1);
      font-weight: bold;
    }
    span {
      display: inline-block;
      width: 4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>