<template>
  <div class="taskdetail">
    <Header>任务名称</Header>
    <div id="viewDiv" ref="map"></div>
    <div class="task_news">
      <div class="task_top">
        <img src="/imgs/logo.jpg" alt />
        <span class="top_tit">管道问题</span>
        <span class="top_adress">浙江省湖州市德清县科园路</span>
        <span class="nav">更改位置</span>
      </div>
      <div class="top_des">
        <div class="top_des_01">
          <span class="des_tit">详情描述</span>
          <label>
            <input type="file" @change="fileChange" ref="file" style="display:none" />
            <img src="/imgs/logo.jpg" alt ref="fileImg" />
            <input type="hidden" v-model="imgValue" />
          </label>
          <input class="inp_tit" type="text" value="管道破裂" placeholder="请输入原因.." v-model="what" />
        </div>
        <div class="top_des_02">
          <span class="des_name">上报人</span>
          <input type="text" class="inp_name" value="张三" placeholder="请输入名称" v-model="people" />
          <span class="inp_date" @click="openPicker()">{{tadevalue}}</span>
        </div>
        <div class="top_des_03">
          <span class="des_name">案件类型</span>
          <div class="show_pup" @click="showpup1()">
            <input type="text" class="inp_origin" v-model="type" />
          </div>
          <!-- <input type="text" class="inp_origin" value="一路一档信息管理系统" /> -->
        </div>
        <div class="top_des_04">
          <span class="des_name">案件等级</span>
          <div class="show_pup" @click="showpup()">
            <input type="text" class="inp_pup" v-model="levValue" />
          </div>
        </div>
        <div class="top_des_05">
          <span class="des_name">案件描述</span>
          <textarea width="100%" class="inp_des" v-model="desvalue"></textarea>
        </div>
        <div class="top_des_05" style="margin-top:.15rem">
          <span class="des_name">处理意见</span>
          <textarea width="100%" class="inp_des" v-model="advicevalue"></textarea>
        </div>
        <div class="top_des_05" style="margin-top:.15rem">
          <span class="des_name">备注</span>
          <textarea width="100%" class="inp_des" v-model="remvalue"></textarea>
        </div>
        <!-- <div class="top_des_05" style="margin-top:.15rem">
          <span class="des_name">附件</span>
          <div class="des_img">
            <img src alt />
          </div>
          <input type="textarea" class="inp_des" />
        </div>-->
      </div>
      <div class="btn">
        <button class="btn1" @click="btn_top">立即上报</button>
        <!-- <button class="btn2">取消</button> -->
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
      <mt-popup
        v-model="popupVisible1"
        popup-transition="popup-fade"
        closeOnClickModal="true"
        position="bottom"
      >
        <mt-picker :slots="slots1" @change="onValuesChange1" style="width: 7.5rem;" showToolbar>
          <div class="picker-toolbar-title">
            <span class="usi-btn-cancel" @click="popupVisible1 = !popupVisible1">取消</span>
            <div class="le">请选择等级</div>
            <span class="usi-btn-sure" @click="popupVisible1 = !popupVisible1">确定</span>
          </div>
        </mt-picker>
      </mt-popup>
      <div @touchmove.prevent>
        <mt-datetime-picker
          lockScroll="true"
          ref="datePicker"
          v-model="dateVal"
          type="date"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          @confirm="handleConfirm()"
        ></mt-datetime-picker>
      </div>
    </div>
    <!-- <mt-popup
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
    </mt-popup>-->
  </div>
</template>

<script>
import Header from "../../components/Header";
import esriLoader from "esri-loader";
import axios from "axios";
import { getCookie } from "../../components/cookie";
export default {
  data() {
    return {
      popupVisible: false,
      levValue: "案件等级",
      showToolbar: true,
      slots: [
        {
          values: ["案件等级", "一级", "二级", "三级"]
        }
      ],
      slots1: [
        {
          values: ["案件类型", "道路", "桥梁"]
        }
      ],
      what: "",
      people: "",

      dateVal: "",
      tadevalue: "2020-1-7",
      token: "",
      imgValue: "",
      popupVisible1: false,
      type: "案件类型",
      desvalue: "请输入描述",
      advicevalue: "请输入意见",
      remvalue: "请输入备注",
      targetId: ""
    };
  },
  components: {
    Header
  },
  mounted() {
    var that = this;
    this.id = this.$route.params.id;
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
        this.targetId = res.data.data.targetId;
        // this.name = res.data.data.username;
        // this.tadevalue = res.data.data.cycleExecuteTime;
        // this.describe = res.data.data.context;
        // this.Opinion = res.data.data.result;
        // this.imglink = this.$store.state.urls + res.data.data.link;
        // // this.newtasklist = res.data.data.records;
      });
  },
  methods: {
    onValuesChange(picker, values) {
      this.levValue = values;
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    onValuesChange1(picker, values) {
      this.type = values;
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    showpup() {
      this.popupVisible = true;
    },
    showpup1() {
      this.popupVisible1 = true;
    },
    openPicker() {
      this.$refs.datePicker.open();
      this.isShow = !this.isShow;
    },
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = "00";
      let f = "00";
      let s = "00";
      return y + "-" + m + "-" + d + " " + h + ":" + f + ":" + s;
    },
    handleConfirm() {
      // 输出格式化后的时间
      this.tadevalue = this.formatDate(this.$refs.datePicker.value);
      console.log(this.formatDate(this.$refs.datePicker.value));
      this.isShow = !this.isShow;
    },
    btn_top() {
      console.log("1");
      console.log(this.imgValue);
      let data = new FormData();
      data.append("location", this.targetId);
      data.append("reason", this.what);
      data.append("reportUserInfoId", this.people);
      data.append("createTime", this.tadevalue);
      data.append("file", this.imgValue);
      data.append("grade", this.levValue);
      data.append("caseDescribe", this.desvalue);
      data.append("advice", this.advicevalue);
      data.append("remark", this.remvalue);
      data.append("caseType", this.type);
      axios
        .post(
          this.$store.state.urls + "way/inspectionRecord/insertInspectionCase",
          data,
          {
            headers: {
              Authorization: this.token
            }
          }
        )
        .then(res => {
          console.log(res);
          if (res.data.code == "200") {
            MessageBox("提示", "接单成功");
          }
          // console.log("res=>", res);
        });
    },
    fileChange() {
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(this.$refs.file.files[0]);
      reader.onload = function() {
        that.$refs.fileImg.src = reader.result; //base64格式
        that.imgValue = that.$refs.file.files[0];
        console.log(that.imgValue);
      };
    }
  },
  destroyed() {
    this.$store.commit("commitShow", true);
  },
  created() {
    this.token = getCookie("token");
    // this.type = localStorage.getItem("type");
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
    height: 5.3rem;
    position: fixed;
    bottom: 1rem;
    left: 0;
    background-color: #fff;
    overflow-y: auto;
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
          line-height: 0.88rem;
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
  .btn {
    width: 100%;
    height: 1rem;
    // margin-top: 0.2rem;
    z-index: 999;
    position: fixed;
    bottom: 0%;
    left: 0;
    background-color: #fff;
    .btn1 {
      width: 80%;
      height: 0.8rem;
      background-color: rgba(50, 150, 250, 1);
      color: #fff;
      border: none;
      border-radius: 0.06rem;
      margin-left: 10%;
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
</style>
