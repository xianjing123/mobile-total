<template>
    <div id="management">
        <mt-header fixed title="专题展示">
            <a slot="left" @click="$router.go(-1)">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
        <div class="management-conetnt">           
                <div class="examples">
                    <div class="bannerBox">
                        <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="theroad">
                                <label class="theroad-head">
                                    <!-- <img src="../assets/managements.png"> -->
                                    <span>道路</span>
                                </label>
                                <div class="option1">
                                    <linegraph :id="'bargraph'" :data="option"></linegraph>
                                </div>
                                <div class="option2">
                                    <linegraph :id="'bargraphs'" :data="option2"></linegraph>
                                </div>
                                    <label class="ththeroad-footer">巡检班次：3241次</label>
                                    <label class="ththeroad-footer">巡检上报：1921次</label>
                                    <label class="ththeroad-footer">抢修维护：1534次</label>
                                </div>                            
                            </div>
                            <div class="swiper-slide">
                                <div class="theroad">
                                <label class="theroad-head">
                                    <!-- <img src="../assets/managements.png"> -->
                                    <span>泵站</span>
                                </label>
                                <div class="option1">
                                    <linegraph :id="'bargraphw'" :data="option3"></linegraph>
                                </div>
                                <div class="option2">
                                    <linegraph :id="'bargraphse'" :data="option4"></linegraph>
                                </div>
                                    <label class="ththeroad-footer">巡检班次：3241次</label>
                                    <label class="ththeroad-footer">巡检上报：1921次</label>
                                    <label class="ththeroad-footer">抢修维护：1534次</label>
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
import Swiper from 'swiper' 
import linegraph from './echartscom.vue'
import 'swiper/css/swiper.css';
export default {
  data () {
    return {
      banner:[
        {picture_path:'1'},
        {picture_path:'2'},
        {picture_path:'3'},
        {picture_path:'4'}
      ],
      option2:{
        color: ['#FF9C68','#FF5050'],
        title:{
          text:'报警类型',
          x:'20%',
          y: '26%',
          textStyle:{
            fontWeight:'normal',
            fontSize:12,
            color:'#707070'
          },
        },
        legend: [{
	        top: '70%',
          left: 'center',  
          orient: "vertical",      
          formatter: function(name) {
              // 获取legend显示内容
              // let as = option
               return name;
          },
          data:[{name:'维护',icon:'circle'},{name:'事故抢修',icon:'circle'}],
	      }],
        series:[{
          name:'报警类型',
          type:'pie',
          center: ['40%', '30%'],
          radius:['50%','70%'],
          avoidLabelOverlap: false,
          data:[{value:700, name:'维护'},{value:400,name:'事故抢修'}],
          itemStyle:{ 
            normal:{
              label:{
                show:true,
                formatter: '{per|{d}%}',
                rich: {
                  per: {
                    padding: [-180, -36],
                  }
                }
              },
              labelLine :{show:false} 
            }
          }    
        }]
      },
      option:{
        color: ['#48C6F5','#eeeeee'],
        title:{
          text:'解决率',
          x:'20%',
          y: '26%',
          textStyle:{
            fontWeight:'normal',
            fontSize:15,
            color:'#707070'
          },
        },
        legend: [{
	        top: '70%',
          left: 'center',  
          orient: "vertical",      
          formatter: function(name) {
              // 获取legend显示内容
              // let as = option
               return name;
          },
          data:[{name:'解决率',icon:'circle'}],
	      }],
        series:[{
          name:'解决率',
          center: ['40%', '30%'],
          type:'pie',
          radius:['50%','70%'],
          avoidLabelOverlap: false,
          selectedMode: false,       
          data:[{value:600, name:'成功'},{value:400,name:'失败'}],
          itemStyle:{ 
            normal:{
              label:{
                show:true,
                formatter: '{per|{d}%}',
                padding: [-40, -10],
                rich: {
                    per: {
                        padding: [-100, -20],
                    }
                },
                
              },              
              labelLine :{show:false} 
            }
          }
        }]
      },
      option3:{
        color: ['#48C6F5','#D9D9D9',],
        title:{
          text:'解决率',
          x:'20%',
          y: '26%',
          textStyle:{
            fontWeight:'normal',
            fontSize:12,
            color:'#707070'
          },
        },
        legend: [{
	        top: '70%',
          left: 'center',  
          orient: "vertical",      
          formatter: function(name) {
              // 获取legend显示内容
              // let as = option
               return name;
          },
          data:[{name:'维护',icon:'circle'},{name:'事故抢修',icon:'circle'}],
	      }],
        series:[{
          name:'解决率',
          type:'pie',
           center: ['40%', '30%'],
          radius:['50%','70%'],
          avoidLabelOverlap: false,
          data:[{value:700, name:'维护'},{value:400,name:'事故抢修'}],
          itemStyle:{ 
            normal:{
            label:{
              show:true,
              formatter: '{per|{d}%}',
              rich: {
                per: {
                padding: [-180, -36],
                }
              }
            },
            labelLine :{show:false} 
            }
          }
        }]
      },
      option4:{
        color: ['#FF5050','#FFBF50','#C5C7C8'],
        title:{
          text:'报警类型',
          x:'20%',
          y: '26%',
          textStyle:{
            fontWeight:'normal',
            fontSize:12,
            color:'#707070'
          },
        },
        legend: [{
	        top: '70%',
          left: 'center',  
          orient: "vertical",      
          formatter: function(name) {
              // 获取legend显示内容
              // let as = option
               return name;
          },
          data:[{name:'电流异常',icon:'circle'},{name:'气体数据异常',icon:'circle'},{name:'运行数据异常',icon:'circle'}],
	      }],
        series:[{
          name:'报警类型',
          type:'pie',
          radius:['50%','70%'],
          center: ['40%', '30%'],
          avoidLabelOverlap: false,
          data:[{value:700, name:'电流异常'},{value:200,name:'气体数据异常'},{value:400,name:'运行数据异常'}],
          itemStyle:{ 
            normal:{
            label:{
              show:true,
              formatter: '{per|{d}%}',
              rich: {
                per: {
                padding: [-180, -36],
                }
            }
          },
          labelLine :{show:false} 
          }
       }
        }]
      }
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
  },  
  components: {linegraph},  
   
}
</script>
<style lang="scss" scoped>
#management{
    width: 100%;
    height: calc(100vh - 1.04rem);
    background-image: url('/imgs/bridgeback.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.management-conetnt{
    position: relative;
    top: 50%; /*偏移*/
    transform: translateY(-50%);
    width: 100%;
    height: 100%;
} 
.theroad{
  .option1,.option2{
    float: left;
    margin-top: 0%;
    width: 50%;
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
.theroad-head{
  display: inline-block;
  width: 100%;
  height: 10%;
  text-align: left;
  margin: 0 auto;
  margin-top: 10%;
  background-image: url("/imgs/managements.png");
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
.ththeroad-footer{
  float: left;
  width: 60%;
  height: 26px;
  margin: 1% auto;
  border:1px dashed rgba(78,163,244,1);
  box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  opacity:1;
  margin-left: 20%;
  border-radius:14px;
  line-height: 26px;
  overflow: hidden;
}
.ponding{
  .ponding-option1,.ponding-option2{
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
.ponding-head{
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
.sewage{
  .sewage-option1,.sewage-option2,.sewage-option3{
    float: left;
    margin-top: 0%;
    width: 100%;
    height: 27%;
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
.sewage-head{
  display: inline-block;
  width: 100%;
  height: 10%;
  text-align: left;
  margin: 0 auto;
  margin-top: 10%;
  background-image: url("/imgs/sewage (2).png");
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
</style>