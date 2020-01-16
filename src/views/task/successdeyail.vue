<template>
  <div class="taskdetail">
    <Header>任务名称</Header>
    <div id="viewDiv" ref="map"></div>
    <div class="task_news" ref="task_news">
      <div class="task_top">
        <img src="/imgs/logo.jpg" alt />
        <span class="top_tit">管道问题</span>
        <span class="top_adress">浙江省湖州市德清县科园路</span>
        <span class="nav">导航</span>
      </div>
      <div class="top_des">
        <div class="top_des_01">
          <span class="des_tit">详情描述</span>
          <img src="/imgs/logo.jpg" alt />
          <input class="inp_tit" type="text" value="管道破裂" />
        </div>
        <div class="top_des_02">
          <span class="des_name">上报人</span>
          <input type="text" class="inp_name" value="张三" v-model="name" />
          <input type="text" class="inp_date" value="2019/10/22 12:41:20" v-model="date" />
        </div>
        <div class="top_des_03">
          <span class="des_name">任务来源</span>
          <input type="text" class="inp_origin" value="一路一档信息管理系统" />
        </div>
        <div class="top_des_04">
          <span class="des_name">案件等级</span>
          <div class="show_pup" @click="showpup()">
            <input type="text" class="inp_pup" v-model="message" />
          </div>
        </div>
        <div class="top_des_05">
          <span class="des_name">案件描述</span>
          <textarea width="100%" class="inp_des" v-model="describe"></textarea>
          <!-- <input type="textarea" class="inp_des" /> -->
        </div>
        <div class="top_des_05" style="margin-top:.15rem">
          <span class="des_name">处理意见</span>
          <textarea width="100%" class="inp_des" v-model="Opinion"></textarea>
          <!-- <input type="textarea" class="inp_des" /> -->
        </div>
        <div class="top_des_05" style="margin-top:.15rem">
          <span class="des_name">附件</span>
          <div class="des_img">
            <img alt :src="imglink" />
          </div>
          <!-- <input type="textarea" class="inp_des" /> -->
        </div>
        <!-- <div class="btn">
          <button class="btn1">接单</button>
          <button class="btn2">取消</button>
        </div>-->
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      closeOnClickModal="true"
      position="bottom"
    >
      <mt-picker :slots="slots" @change="onValuesChange" style="width: 7.5rem;" showToolbar>
        <div class="picker-toolbar-title">
          <span class="usi-btn-cancel" @click="popupVisible = !popupVisible">取消</span>
          <div class="le">请选择等级</div>
          <span class="usi-btn-sure" @click="popupVisible = !popupVisible">确定</span>
        </div>
      </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import Header from "../../components/Header";
import esriLoader from "esri-loader";
import { getCookie } from "../../components/cookie";
import axios from "axios";
export default {
  data() {
    return {
      popupVisible: false,
      message: "请选择代理区域",
      showToolbar: true,
      slots: [
        {
          values: ["城市选择", "苏州", "常州", "杭州", "湖州", "上海", "南京"]
        }
      ],
      name: "",
      date: "",
      yuan: "",
      describe: "",
      Opinion: "",
      imglink: "",
      token: ""
    };
  },
  components: {
    Header
  },
  mounted() {
    var that = this;
    this.id = this.$route.params.id;
    this.$refs.task_news.ontouchstart = function(evt) {
      var downTop = evt.changedTouches[0].clientY;
      window.ontouchmove = function(evt) {
        if (evt.changedTouches[0].clientY - downTop > 0) {
          that.$refs.task_news.style.transform = "translateY(8rem)";
          that.slider = true;
        } else {
          that.$refs.task_news.style.transform = "translateY(0)";
          that.slider = false;
        }
      };
      window.ontouchend = function(evt) {
        window.ontouchmove = null;
        window.ontouchend = null;
      };
    };
    var options = { url: "https://js.arcgis.com/4.13/" };
    this.$store.commit("commitShow", false);
    esriLoader
      .loadModules(
        [
          "esri/Map",
          "esri/Basemap",
          "esri/views/SceneView",
          "esri/layers/MapImageLayer"
        ],
        options
      )
      .then(([Map, Basemap, SceneView, MapImageLayer]) => {
        var basemap = new Basemap({
          baseLayers: [
            new MapImageLayer({
              url:
                "http://192.168.2.89:6080/arcgis/rest/services/%E6%99%BA%E6%85%A7%E5%B8%82%E6%94%BF/%E5%BA%95%E5%9B%BE/MapServer",
              title: "Basemap"
            })
          ],
          title: "basemap",
          id: "basemap"
        });
        const map = new Map({
          basemap: basemap
        });
        var view = new SceneView({
          container: "viewDiv",
          map: map,
          spatialReference: {
            wkid: 4326
          },
          camera: {
            position: [119.94, 30.54, 20000]
          }
        });
        // 移除底部ESRI logo
        view.ui.remove("attribution");
        // 移除地图切换方式控件
        view.ui.empty("top-left");
      })
      .catch(err => {
        console.error(err);
      });
    axios
      .get(
        this.$store.state.urls + "way/inspectionRecord/selectOneInspectionById",
        {
          params: {
            Authorization: this.token,
            id: this.id
          }
        }
      )
      .then(res => {
        console.log(res);
        this.name = res.data.data.username;
        this.date = res.data.data.cycleExecuteTime;
        this.describe = res.data.data.context;
        this.Opinion = res.data.data.result;
        this.imglink = this.$store.state.urls + res.data.data.link;
        // this.newtasklist = res.data.data.records;
      });
  },
  methods: {
    onValuesChange(picker, values) {
      this.message = values;
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    showpup() {
      this.popupVisible = true;
    }
  },
  destroyed() {
    this.$store.commit("commitShow", true);
  },
  created() {
    this.token = getCookie("token");
    this.type = localStorage.getItem("type");
  }
};
</script>

<style lang="scss" scoped>
.taskdetail {
  width: 100%;
  height: 100%;
  // position: relative;
  #viewDiv {
    height: calc(100vh - 1.84rem);
    width: 100%;
  }
  .task_news {
    width: 100%;
    height: 12.6rem;
    position: fixed;
    bottom: 0rem;
    left: 0;
    transform: translateY(8rem);
    transition: 0.3s;
    background-color: #fff;
    .task_top {
      width: 100%;
      height: 1.76rem;
      border-bottom: 0.01rem solid #eeeeee;
      position: relative;
      img {
        width: 0.94rem;
        height: 0.94rem;
        position: absolute;
        top: 0.4rem;
        left: 0.32rem;
      }
      .top_tit {
        font-size: 0.28rem;
        position: absolute;
        top: 0.5rem;
        left: 1.58rem;
        font-weight: 600;
      }
      .top_adress {
        font-size: 0.24rem;
        position: absolute;
        top: 0.92rem;
        left: 1.48rem;
      }
      .nav {
        font-size: 0.2rem;
        color: rgba(50, 150, 250, 1);
        position: absolute;
        top: 0.96rem;
        right: 0.3rem;
      }
    }
    .top_des {
      width: 100%;
      height: 3.6rem;

      .top_des_01 {
        width: 100%;
        height: 1.58rem;
        position: relative;
        .des_tit {
          font-size: 0.24rem;
          position: absolute;
          top: 0.2rem;
          left: 0.32rem;
        }
        img {
          width: 0.88rem;
          height: 0.88rem;
          position: absolute;
          top: 0.7rem;
          left: 0.32rem;
        }
        .inp_tit {
          width: 76%;
          height: 0.88rem;
          position: absolute;
          top: 0.7rem;
          right: 0.32rem;
          border-radius: 0.12rem;
          border: 0.01rem solid #eee;
          text-align: center;
          color: rgba(112, 112, 112, 1);
        }
      }
      .top_des_02 {
        width: 100%;
        height: 1.2rem;
        position: relative;
        .des_name {
          font-size: 0.24rem;
          position: absolute;
          top: 0.54rem;
          left: 0.32rem;
        }
        .inp_name {
          width: 16.8%;
          height: 0.88rem;
          border: 0.01rem solid #eee;
          border-radius: 0.12rem;
          position: absolute;
          top: 0.26rem;
          left: 1.48rem;
          text-align: center;
          color: rgba(112, 112, 112, 1);
        }
        .inp_date {
          width: 56.8%;
          height: 0.88rem;
          border: 0.01rem solid #eee;
          border-radius: 0.12rem;
          text-align: center;
          position: absolute;
          top: 0.26rem;
          right: 0.32rem;
          color: rgba(112, 112, 112, 1);
        }
      }
      .top_des_03 {
        width: 100%;
        height: 1rem;
        position: relative;
        .des_name {
          font-size: 0.24rem;
          position: absolute;
          top: 0.35rem;
          left: 0.32rem;
        }
        .inp_origin {
          width: 76%;
          height: 0.56rem;
          position: absolute;
          top: 0.2rem;
          right: 0.32rem;
          border-radius: 0.12rem;
          border: 0.01rem solid #eee;
          text-align: center;
          color: rgba(112, 112, 112, 1);
        }
      }
      .top_des_04 {
        width: 100%;
        height: 0.8rem;
        position: relative;
        .des_name {
          font-size: 0.24rem;
          position: absolute;
          top: 0.1rem;
          left: 0.32rem;
        }
        .show_pup {
          width: 76%;
          height: 0.56rem;
          line-height: 0.56rem;
          position: absolute;
          top: 0rem;
          right: 0.32rem;
          border-radius: 0.12rem;
          // border: 0.01rem solid #eee;
          text-align: center;
          color: rgba(112, 112, 112, 1);
          font-size: 0.24rem;
          .inp_pup {
            width: 100%;
            height: 0.56rem;
            line-height: 0.56rem;
            border-radius: 0.12rem;
            border: 0.01rem solid #eee;
            text-align: center;
            color: rgba(112, 112, 112, 1);
          }
        }
      }
      .top_des_05 {
        width: 100%;
        height: 1.6rem;
        position: relative;
        .des_name {
          font-size: 0.24rem;
          position: absolute;
          top: 0.1rem;
          left: 0.32rem;
        }
        .inp_des {
          width: calc(76% - 0.1rem);
          height: 1.4rem;
          position: absolute;
          top: 0.01rem;
          right: 0.32rem;
          padding: 0.05rem;
          border-radius: 0.12rem;
          border: 0.01rem solid #eee;
          color: rgba(112, 112, 112, 1);
        }
        .des_img {
          width: 1rem;
          height: 1rem;
          position: absolute;
          top: 0.01rem;
          left: 1.48rem;
          border-radius: 0.12rem;
          border: 0.01rem solid #eee;
          color: rgba(112, 112, 112, 1);
        }
      }
      .btn {
        width: 100%;
        height: 0.6rem;

        .btn1 {
          width: 1.28rem;
          height: 0.6rem;
          background-color: rgba(50, 150, 250, 1);
          color: #fff;
          border: none;
          border-radius: 0.06rem;
          margin-left: 28%;
        }
        .btn2 {
          width: 1.28rem;
          height: 0.6rem;
          background-color: #fff;
          color: rgba(50, 150, 250, 1);
          border: 1px solid rgba(50, 150, 250, 1);
          border-radius: 0.06rem;
          margin-left: 10%;
        }
      }
    }
  }
     .picker-toolbar-title {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.16rem;
    position: relative;
  }
  .usi-btn-cancel {
    position: absolute;
    top: 0.05rem;
    left: 0.2rem;
    color: #ff6600;
  }
  .le {
    text-align: center;
    margin-top: 0.05rem;
  }
  .usi-btn-sure {
    position: absolute;
    top: 0.05rem;
    right: 0.2rem;
    color: #ff6600;
  }
}
</style>
