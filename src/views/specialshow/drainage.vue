<template>
    <div id="rain">
        <mt-header fixed title="专题展示">
            <a slot="left" @click="$router.go(-1)">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="rain-conetnt"> 
          <picker></picker>
          <div class="examples">
            <div class="bannerBox">
              <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="therain">
                    <label class="therain-head">
                      <span>雨水管网统计</span>
                    </label>
                  <label class="ththeroad-footer">雨水管网长度：39241 m</label>
                  <label class="ththeroad-footer">检查井数量：392 个 m</label>
                  <label class="ththeroad-footer">雨水篦数量：234 个 m</label>
                  <div class="option2">
                    <linegraph :id="'bargraphs'" :data="option"></linegraph>
                  </div>
                  </div>                            
                </div>
                <div class="swiper-slide">
                  <div class="therain">
                    <label class="therain-head"><span>污水管网统计</span></label>
                    <label class="ththeroad-footer">污水管网长度：39241 m</label>
                    <label class="ththeroad-footer">检查井数量：392 个</label>
                    <div class="optionty">
                      <linegraph :id="'bargraphse'" :data="option3"></linegraph>
                    </div>
                    <div class="leng">
                      <span>污水管网长度</span>
                      <div class="leng-left"><span>总数232 个</span></div>
                      <div class="leng-right">
                        <span>雨水泵站数量：231 个</span>
                        <span>污水泵站数量：232 个</span>
                        <span>雨污水泵站数量：231 个</span>
                      </div>
                    </div>
                  </div> 
                </div>
                <div class="swiper-slide">
                  <div class="therains">
                    <label class="therain-info"><span>积水点信息</span></label>
                    <label class="therain-num"><span>总数：</span></label>
                    <label class="therain-title"><span>结构性缺陷</span></label>
                    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
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
import picker from './mouth'
import Swiper from 'swiper' 
import linegraph from './echartscom.vue'
import 'swiper/css/swiper.css';
export default {
  data () {
    return {
      option:{
        xAxis: {
          type: 'category',
          data: ['舞阳', '振兴', '春晖', '304立交桥'],
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [ 80, 70, 110, 130],
          type: 'bar'
        }],
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#B1D6FD' // 0% 处的颜色
          },{
            offset: 1,
            color: 'white' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        lineStyle: {
          color: "#3196FA"
        }
      },
      option3:{
        xAxis: {
          type: 'category',
          data: ['舞阳', '振兴', '春晖', '304立交桥',],
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      },
    }
  },
  mounted:function(){
    new Swiper('.swiper-container', {
          direction: 'horizontal', //滑动方向，可设置水平(horizontal)或垂直(vertical)。
          loop: true, // 设置为true 则开启loop模式
          autoplay: 1000, // 自动切换时间
          slidesPerView: 'auto', // 设置slider容器能够同时显示的slides数量(carousel模式)。类型：number or auto
          centeredSlides: true, // 设定为true时，active slide会居中，而不是默认状态下的居左。
          spaceBetween: 20, // 在slide之间设置距离（单位px）。
          loopAdditionaSlider: 0, 
    });
    this.drawLine();
  }, 
  methods:{
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        this.axios.get('http://218.75.49.82:9997/sewage/monitorDevice/selectProblems?month=1').then(res => {
          const data = res.data.data;
          this.goods = data.data[0].value
          this.good = data.data
          if(this.goods == 0){
            this.good = [{value:500, name:'成功'},{value:500,name:'失败'}]
          }
          console.log(data);
          myChart.setOption({
          color: ['#48C6F5','#E4E4E4'],
          title:{
            text:'积水类型',
            x:'40%',
            y: '36%',
              textStyle:{
                fontWeight:'normal',
                fontSize:17,
                color:'#707070'
              },
            },
          series:[{
            name:'积水类型',
            type:'pie',
            center: ['50%', '40%'],
            radius:['40%','60%'],
            avoidLabelOverlap: false,
            data:this.good,
            itemStyle:{ 
              normal:{
                label:{
                  show:false,
                },
                labelLine :{show:false} 
              }
            }
          }]
        });
      })
    }
  },
  components: {linegraph,picker},   
}
</script>
<style lang="scss" scoped>
#rain{
    width: 100%;
    height: calc(100vh - 1.04rem);
    background-image: url('/imgs/drainageback.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.rain-conetnt{
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);
    width: 100%;
    height: 100%;
} 
.therain{
  .option2{
    float: left;
    margin-top: 0%;
    width: 100%;
    height: 58%;
    div{
      width: 100%;
      height: 100%;
      div{
        margin-top: -100%!important;
      }
    }
  }
}
.therain-head{
  display: inline-block;
  width: 100%;
  height: 10%;
  text-align: left;
  margin: 0 auto;
  margin-top: 10%;
  background-image: url("/imgs/rain (2).png");
  background-repeat: no-repeat;
  background-position: 10% 0;
  span{
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size:16px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:22px;
    color:rgba(155,77,255,1);
    opacity:1;
    margin-left: 20%;
  }
}
.ththeroad-footer{
  display: block;
  width: 70%;
  height: 26px;
  margin: 2% auto;
  color: #9A4CFF;
  border:1px dashed #9A4CFF;
  box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  opacity:1;
  border-radius:14px;
  line-height: 26px;
  overflow: hidden;
}
.therains{
  .option1{
    float: left;
    margin-top: 0%;
    width: 100%;
    height: 48%;
    div{
      width: 100%;
      height: 100%;
      div{
        width: 100%!important;
        height: 100%!important;
        margin-top: -100%!important;
      }
    }
  }
}
.therain{
.optionty{
    float: left;
    margin-top: -10%;
    width: 100%;
    height: 58%;
    div{
      width: 100%;
      height: 80%;
      div{
        margin-top: -100%!important;
      }
    }
  }
}
.therain-info{
  display: inline-block;
  width: 100%;
  height: 10%;
  text-align: left;
  margin: 0 auto;
  margin-top: 10%;
  background-image: url("/imgs/ponding.png");
  background-repeat: no-repeat;
  background-position: 10% 0;
  span{
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size:16px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:22px;
    color:rgba(76,161,243,1);
    opacity:1;
    margin-left: 20%;
  }
}
#bargraphse{
  height: 80%;
}
.therain-num{
  display: inline-block;
  width:86px;
  height:46px;
  border:1px solid rgba(155,78,255,1);
  box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  opacity:1;
  border-radius:14px;
}
.therain-title{
  display: block;
  margin-top: 30px;
}
.leng{
  float: left;
  width: 100%;
  height: 30%;
  margin-top: -26%;
  span{
    float: left;
    width:100%;
    height:13px;
    font-size:9px;
    margin-left: 10%;
    text-align: left;
    font-family:PingFang SC;
    font-weight:400;
    line-height:13px;
    color:rgba(73,73,73,1);
    opacity:1;
  }
  div{
    float: left;
    width: 50%;
    height: 100%;
    text-align: left;
  }
}
.leng-left{
  text-align: center;
  margin-top: 20px;
  span{
    float: left;
    width:86px;
    height:46px;
    font-size: 16px;
    border:1px dashed rgba(155,78,255,1);
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    opacity:1;
    border-radius:14px;
    text-align: center;
    margin-left: 20%;
    padding-top: 20px;
  }
}
.leng-right{
  margin-top: 20px;
  span{
  display: block;
  width: 100%;
  color: #9A4CFF;
   line-height: 30px;
   margin-top: 10px;
  }
}
</style>