<template>
  <div id="app" :style="'margin-bottom:'+Margin">
    <div></div>
    <Tabbar v-if="$store.state.isShow" />
    <router-view />
  </div>
</template>

<script>
import Tabbar from "./components/Tabbar";
export default {
  computed:{
    Margin () {
      if(this.$store.state.isShow){
        return "1.04rem"
      }else{
        return "0"
      }
    }
  },
  components: {
    Tabbar
  }
};
</script>

<style lang="scss">
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}
body {
  font-size: 0.32rem;
}
html,
body {
  height: 100%;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
.examples{
  position: absolute;
  width: 100%;
  height: 86%;
  top: 20%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: auto;
  font-size: 14px;
}
.bannerTxt{
    width:96px;
    height:22px;
    font-size:16px;
    font-family:PingFang SC;
    font-weight:bold;
    line-height:22px;
    color:rgba(255,255,255,1);
    opacity:1;
}
.bannerBox{
  position: relative;
  height: 80%;
  margin-top: 30px;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-container .swiper-wrapper .swiper-slide {
  width: 80% !important;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.swiper-container .swiper-wrapper .swiper-slide>div {
    position: absolute;
    width: 100%;
    height:100%;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 30px rgba(50,150,250,0.57);
    opacity:0.9;
    border-radius:10%;
    text-align: center;
}
.swiper-slide-prev,.swiper-slide-next{
    height: 80% !important;
    margin-top: 20px;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 30px rgba(50,150,250,0.57);
    opacity:0.32;
    border-radius:40px;
}
.swiper-container .swiper-wrapper .swiper-slide-prev div,.swiper-container .swiper-wrapper .swiper-slide-next div{
  width: 100%;
  height: 100%;
}
</style>
