<template>
  <div id="management">
    <mt-header fixed title="专题展示">
      <a slot="left" @click="$router.go(-1)">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="management-conetnt">
      <picker @fuck="childMethod($event)" ref="mychild"></picker>
      <div class="examples">
        <div class="bannerBox">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="theroad">
                  <label class="theroad-head">
                    <span>4个全县桥梁总数</span>
                    <span>4个全县隧道总数</span>
                  </label>
                  <div class="option1">
                    <linegraph
                      :id="'bargraph'"
                      :data="option1"
                      v-if="datalist1.length"
                      @echarts="echartsEvent1($event)"
                    ></linegraph>
                    <div class="subti">
                      <span>舞阳桥洞</span>
                      <label class="ththeroad-footer">解决率：{{shifts1}}</label>
                    </div>
                  </div>
                  <div class="option2">
                    <linegraph
                      :id="'bargraphs'"
                      :data="option2"
                      v-if="datalist2.length"
                      @echarts="echartsEvent2($event)"
                    ></linegraph>
                    <div class="subti">
                      <span>振兴桥洞</span>
                      <label class="ththeroad-footer">解决率：{{report1}}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="theroad">
                  <div class="option1">
                    <linegraph
                      :id="'bargraphw'"
                      :data="option3"
                      v-if="datalist3.length"
                      @echarts="echartsEvent3($event)"
                    ></linegraph>
                    <div class="subti">
                      <span>春晖桥洞</span>
                      <label class="ththeroad-footer">解决率：{{shifts3}}</label>
                    </div>
                  </div>
                  <div class="option2">
                    <linegraph :id="'bargraphse'" :data="option4" @echarts="echartsEvent4($event)"></linegraph>
                    <div class="subti">
                      <span>304立交桥洞</span>
                      <label class="ththeroad-footer">解决率：{{report3}}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import picker from "./mouth";
import Swiper from "swiper";
import linegraph from "./echartscom.vue";
import "swiper/css/swiper.css";
export default {
  data() {
    return {
      url: "http://192.168.2.208:8080",
      mounth: "1",
      option1: {
        color: ["#48C6F5", "#eeeeee"],
        series: [
          {
            name: "解决率",
            center: ["50%", "60%"],
            type: "pie",
            radius: ["50%", "40%"],
            avoidLabelOverlap: false,
            selectedMode: false,
            data: [
              { value: 600, name: "成功" },
              { value: 400, name: "失败" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{per|{d}%}",
                  padding: [-40, -10],
                  rich: {
                    per: {
                      padding: [-100, -20]
                    }
                  }
                },
                labelLine: { show: false }
              }
            }
          }
        ]
      },
      option2: {
        color: ["#FF9C68", "#FF5050"],
        series: [
          {
            name: "报警类型",
            center: ["50%", "60%"],
            type: "pie",
            radius: ["50%", "40%"],
            avoidLabelOverlap: false,
            data: [
              { value: 700, name: "维护" },
              { value: 400, name: "事故抢修" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{per|{d}%}",
                  rich: {
                    per: {
                      padding: [-180, -36]
                    }
                  }
                },
                labelLine: { show: false }
              }
            }
          }
        ]
      },
      option3: {
        color: ["#FF5050", "#FFBF50", "#C5C7C8"],
        series: [
          {
            name: "报警类型",
            type: "pie",
            radius: ["50%", "40%"],
            center: ["50%", "30%"],
            avoidLabelOverlap: false,
            data: [
              { value: 700, name: "电流异常" },
              { value: 400, name: "运行数据异常" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{per|{d}%}",
                  rich: {
                    per: {
                      padding: [-180, -36]
                    }
                  }
                },
                labelLine: { show: false }
              }
            }
          }
        ]
      },
      option4: {
        color: ["#FF5050", "#FFBF50", "#C5C7C8"],
        series: [
          {
            name: "报警类型",
            type: "pie",
            radius: ["50%", "40%"],
            center: ["50%", "70%"],
            avoidLabelOverlap: false,
            data: [
              { value: 700, name: "电流异常" },
              { value: 400, name: "运行数据异常" }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{per|{d}%}",
                  rich: {
                    per: {
                      padding: [-180, -36]
                    }
                  }
                },
                labelLine: { show: false }
              }
            }
          }
        ]
      },
      shifts1: "",
      report1: "",
      shifts3: "",
      report3: "",
      swipers: "",
      datalist1: [],
      data1: null,
      datalist2: [],
      data2: null,
      datalist3: [],
      data3: null,
      datalist4: [],
      data4: null
    };
  },
  mounted: function() {
    var that = this;
    new Swiper(".swiper-container", {
      direction: "horizontal", //滑动方向，可设置水平(horizontal)或垂直(vertical)。
      loop: true, // 设置为true 则开启loop模式
      autoplay: 1000, // 自动切换时间
      slidesPerView: "auto", // 设置slider容器能够同时显示的slides数量(carousel模式)。类型：number or auto
      centeredSlides: true, // 设定为true时，active slide会居中，而不是默认状态下的居左。
      spaceBetween: 20, // 在slide之间设置距离（单位px）。
      loopAdditionaSlider: 0,
      initialSlide: 0,
      on: {
        slideChangeTransitionStart: function(item) {
          that.swipers = this.realIndex;
        }
      }
    });
    this.$nextTick(function() {
      var _this = this;
      `这一步很重要`;
      _this.axios
        .get(
          "" +
            _this.url +
            "/way/bridge/mobileTerminalDisplay2?month=" +
            _this.mounth +
            "",
               {
            params: {
             
              cid: this.id
            },
            headers: {
 Authorization: this.token
            }
          }
        )
        .then(res => {
          const data = res.data.data;
          _this.datalist3 = data["304桥洞"];
          _this.datalist4 = data["春晖桥洞"];
          _this.shifts3 =
            (data["304桥洞"][1].value / data["304桥洞"][0].value) * 100;
          _this.report3 =
            (data["春晖桥洞"][1].value / data["春晖桥洞"][0].value) * 100;
          _this.option3.series[0].data = _this.datalist3;
          _this.option4.series[0].data = _this.datalist4;
        });
    });
    this.$nextTick(function() {
      var _this = this;
      `这一步很重要`;
      _this.axios
        .get(
          "" +
            _this.url +
            "/way/bridge/mobileTerminalDisplay1?month=" +
            _this.mounth +
            "",
               {
            params: {
             
              cid: this.id
            },
            headers: {
 Authorization: this.token
            }
          }
        )
        .then(res => {
          const data = res.data.data;
          _this.datalist1 = data["振兴桥洞"];
          _this.datalist2 = data["舞阳桥洞"];
          _this.shifts1 =
            (data["振兴桥洞"][1].value / data["振兴桥洞"][0].value) * 100;
          _this.report1 =
            (data["舞阳桥洞"][1].value / data["舞阳桥洞"][0].value) * 100;
          // _this.maintain1 = data.抢修维护
          _this.option1.series[0].data = _this.datalist1;
          _this.option2.series[0].data = _this.datalist2;
        });
    });
  },
  methods: {
    childMethod(evt) {
      var _this = this;
      `这一步很重要`;
      _this.mounth = evt;
      // alert(this.swipers)
      if (_this.swipers == 0) {
        //这是舞阳桥洞
        _this.axios
          .get(
            "" +
              _this.url +
              "/way/bridge/mobileTerminalDisplay1?month=" +
              _this.mounth +
              "",
            {
              params: {
                cid: this.id
              },
              headers: {
                Authorization: this.token
              }
            }
          )
          .then(res => {
            const data = res.data.data;
            _this.datalist1 = data["振兴桥洞"];
            _this.datalist2 = data["舞阳桥洞"];
            _this.shifts1 =
              (data["振兴桥洞"][1].value / data["振兴桥洞"][0].value) * 100;
            _this.report1 =
              (data["舞阳桥洞"][1].value / data["舞阳桥洞"][0].value) * 100;
            // _this.maintain1 = data.抢修维护
            _this.option1.series[0].data = _this.datalist1;
            _this.option2.series[0].data = _this.datalist2;
          });
      } else if (_this.swipers == 1) {
        //这是泵站
        _this.axios.get( "" +_this.url +"/way/bridge/mobileTerminalDisplay2?month=" +_this.mounth + "",
            {
              params: {
                cid: this.id
              },
              headers: {
                Authorization: this.token
              }
            }
          )
          .then(res => {
            const data = res.data.data;
            _this.datalist3 = data["304桥洞"];
            _this.datalist4 = data["春晖桥洞"];
            _this.shifts3 =
              (data["304桥洞"][1].value / data["304桥洞"][0].value) * 100;
            _this.report3 =
              (data["春晖桥洞"][1].value / data["春晖桥洞"][0].value) * 100;
            _this.option3.series[0].data = _this.datalist3;
            _this.option4.series[0].data = _this.datalist4;
          });
      }
    },
    echartsEvent1(data, id, haha) {
      this.data1 = data;
    },
    echartsEvent2(data, id, haha) {
      this.data2 = data;
    },
    echartsEvent3(data, id, haha) {
      this.data3 = data;
    },
    echartsEvent4(data, id, haha) {
      this.data4 = data;
    }
  },
  watch: {
    datalist1(val, oldVal) {
      let _this = this;
      this.data1.ChartLineGraph.clear();
      this.data1.ChartLineGraph.setOption(this.data1.data);
      this.data2.ChartLineGraph.clear();
      this.data2.ChartLineGraph.setOption(this.data2.data);
    },
    datalist3(val, oldVal) {
      let _this = this;
      this.data3.ChartLineGraph.clear();
      this.data3.ChartLineGraph.setOption(this.data3.data);
      this.data4.ChartLineGraph.clear();
      this.data4.ChartLineGraph.setOption(this.data4.data);
    }
  },
  created() {
    this.token = getCookie("token");
    this.type = localStorage.getItem("type");
  },
  components: { linegraph, picker }
};
</script>
<style lang="scss" scoped>
#management {
  width: 100%;
  height: calc(100vh - 1.04rem);
  background-image: url("/imgs/bridgeback.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.management-conetnt {
  position: relative;
  top: 50%; /*偏移*/
  transform: translateY(-50%);
  width: 100%;
  height: 100%;
}
.theroad {
  .option1,
  .option2 {
    float: left;
    margin-top: 5%;
    width: 100%;
    height: 38%;
    div {
      width: 50%;
      height: 100%;
      div {
        margin-top: -100% !important;
      }
    }
  }
}
.theroad-head {
  display: inline-block;
  width: 100%;
  height: 53px;
  text-align: left;
  margin: 0 auto;
  margin-top: 10%;
  background-repeat: no-repeat;
  background-position: 10% 0;
  span {
    display: inline-block;
    width: 96px;
    height: 53px;
    border: 1px dashed rgba(99, 92, 203, 1);
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 22px;
    color: rgba(76, 161, 243, 1);
    opacity: 1;
    margin-left: 10%;
    border-radius: 10px;
    text-align: center;
    padding-top: 10px;
  }
}

#bargraph,
#bargraphs {
  float: right;
  width: 50%;
}
#bargraphw,
#bargraphse {
  float: right;
  width: 50%;
  margin-top: 10%;
}
.subti {
  float: left;
  span {
    display: inline-block;
    text-align: left;
    margin-left: 10%;
    width: 100%;
    height: 20%;
    margin-top: 25%;
  }
  .ththeroad-footer {
    float: left;
    width: 90%;
    height: 26px;
    margin: 3% auto;
    border: 1px dashed #635ccb;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    margin-left: 10%;
    border-radius: 14px;
    line-height: 26px;
    overflow: hidden;
  }
}
.ponding {
  .ponding-option1,
  .ponding-option2 {
    float: left;
    margin-top: 5%;
    width: 100%;
    height: 38%;
    div {
      width: 50%;
      height: 100%;
      div {
        // width: 50%!important;
        // height: 100%!important;
        margin-top: -100% !important;
      }
    }
  }
}
.ponding-head {
  display: inline-block;
  width: 100%;
  height: 10%;
  text-align: left;
  margin: 0 auto;
  margin-top: 10%;
  background-image: url("/imgs/ponding.png");
  background-repeat: no-repeat;
  background-position: 10% 0;
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 22px;
    color: rgba(76, 161, 243, 1);
    opacity: 1;
    margin-left: 20%;
  }
}
.sewage {
  .sewage-option1,
  .sewage-option2,
  .sewage-option3 {
    float: left;
    margin-top: 0%;
    width: 100%;
    height: 27%;
    div {
      width: 100%;
      height: 100%;
      div {
        width: 100% !important;
        height: 100% !important;
        margin-top: -100% !important;
      }
    }
  }
}
.sewage-head {
  display: inline-block;
  width: 100%;
  height: 10%;
  text-align: left;
  margin: 0 auto;
  margin-top: 10%;
  background-image: url("/imgs/sewage (2).png");
  background-repeat: no-repeat;
  background-position: 10% 0;
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 22px;
    color: rgba(76, 161, 243, 1);
    opacity: 1;
    margin-left: 20%;
  }
}
</style>