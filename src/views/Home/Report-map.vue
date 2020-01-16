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
            <img src="/imgs/describe-img.png" alt ref="fileImg" />
          </div>
          <input type="text" class="describe-input_text" ref="input_text"/>
        </div>
        <label>
          <input type="file" @change="fileChange" ref="file" style="display:none" />
          <div class="describe-submit">立即上传</div>
        </label>
      </div>
    </div>
    <div ref="chatBox" class="chat">
      <div class="chat-box">
        <span>请在地图上确定位置</span>
        <p @click="determine">确定</p>
      </div>
    </div>
    <div class="mask" ref="mask"></div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
import Header from "../../components/Header";
import map from "./js/map";
import esriLoader from "esri-loader";
import axios from 'axios'
export default {
  data() {
    return {
      name: "", //标题
      area: "在地图确定问题位置", //地图点弹出层内容
      listShow: true, //管线描述提交
      sheetVisible: false, //立即上传-状态
      actions: [
        //导航栏内容
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
      ],
      submitSrc:"", //图片路径
      location:"" //坐标位置
    };
  },
  methods: {
    //地图点点击
    determine() {
      this.listShow = false;
      this.area = "已确定位置";
      this.$refs.chatBox.style.display = "none";
      this.$refs.mask.style.display = "block";
    },
    //地图点内容隐藏
    reportPut() {
      this.listShow = true;
      this.area = "在地图确定问题位置";
      this.$refs.mask.style.display = "none";
    },
    //立即上传
    actionSheet() {
      this.sheetVisible = true;
    },
    //上传图片
    fileChange() {
      var that = this;
      var reader = new FileReader();
      reader.readAsDataURL(this.$refs.file.files[0]);
      reader.onload = function() {
        that.$refs.fileImg.src = reader.result; //base64格式
        that.submitSrc = that.$refs.file.files[0]
      };
    },
    //点击地图点-渲染坐标
    point(node) {
      var that = this
      var esri = map();
      esri.then(res => {
        var map = res.map;
        var view = res.view;
        var options = { url: "https://js.arcgis.com/4.13/" };
        esriLoader
          .loadModules(["esri/layers/GraphicsLayer", "esri/Graphic"], options)
          .then(([GraphicsLayer, Graphic]) => {
            var graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);
            var markerSymbol = {
              type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
              color: [38, 168, 162],
              outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
              }
            };
            var pointGraphic;
            view.on("click", e => {
              if (pointGraphic) {
                graphicsLayer.remove(pointGraphic);
              }
              var point = e.mapPoint;
              pointGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbol
              });
              graphicsLayer.add(pointGraphic);
              view.hitTest(e).then(res => {
                that.location = e.mapPoint.longitude.toFixed(7)+","+e.mapPoint.latitude.toFixed(7)
                var x = res.screenPoint.x;
                var y = res.screenPoint.y;
                node.style.display = "block";
                node.style.left = x + "px";
                node.style.top = y + "px";
                node.style.transform = "translate(-43%,-30%)";
              });
            });
          });
      });
    }
  },
  mounted() {
    this.$store.commit("commitShow", false);
    this.name = this.$route.query.name;
    //地图点
    this.point(this.$refs.chatBox);
  },
  destroyed() {
    this.$store.commit("commitShow", true);
  },
  watch:{
    submitSrc(res){
      var that = this
      var formData = new FormData()
      formData.append("location",this.location)
      formData.append("caseDescribe",this.$refs.input_text.value)
      formData.append("reportUserInfoId",1)
      axios({
        url:this.$store.state.urls+"cover/caseManagement/newCase",
        method:"post",
        data:formData
      }).then(data=>{
        if(data.data.code==200){
          console.log("data",data)
          var formdata = new FormData()
          formdata.append("cid",data.data.data)
          formdata.append("file",res)
          axios({
            url:this.$store.state.urls+"cover/caseManagement/uploadToFile",
            method:"post",
            data:formdata
          }).then(fileSuccess=>{
            console.log(fileSuccess.data)
            if(fileSuccess.data.code==200){
              location.reload()
            }
          })
        }
      })
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
@import url("../../assets/css/map.css");
.mask {
  width: 100%;
  height: calc(100vh - 6.3rem);
  position: absolute;
  top: 0.8rem;
  z-index: 98;
  display: none;
}
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
        width: 0.88rem;
        height: 100%;
        float: left;
        border-radius: 0.2rem;
        overflow: hidden;
        img {
          width: 100%;
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