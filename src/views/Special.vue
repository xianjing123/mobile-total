<template>
<div>
  <Header>专题展示</Header>
    <div id="specialshow">
      <div class="content">
        <div class="management">
          <router-link to='/special/management' id="management">
            <img src="/imgs/management.png">
            <span>长效治理专题</span>
          </router-link>
        </div>
        <div class="drainage">
          <router-link to='/special/drainage' id="management">
            <img src="/imgs/drainage.png">
            <span>排水专题</span>
          </router-link>
        </div>
        <div class="road">
          <router-link to='/special/road' id="management">
            <img src="/imgs/road (2).png">
            <span>道路专题</span>
          </router-link>
        </div>
        <div class="bridge">
          <router-link to='/special/bridge' id="management">
            <img src="/imgs/bridge.png">
            <span>桥遂专题</span>
          </router-link>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import Header from '../components/Header'
export default {
  data () {
    return {
      selected:0
    }
  },
  components:{
    Header
  }
}
</script>
<style scoped>
#specialshow{
  width: 100%;
  height: calc(100vh - 1.84rem);
}
.content{
  width: 100%;
  height: 100%;
}
.management{
  width: 100%;
  height: 25%;
  background: #3C9BFA;
  border-radius: 20px;
}
.drainage{
  width: 100%;
  height: 25%;
  background: #994AFF;
  border-radius: 20px;
  margin-top: -30px;
}
.road{
  width: 100%;
  height: 25%;
  background: #7167F5;
  border-radius: 20px;
  margin-top: -30px;
}
.bridge{
  width: 100%;
  height: 25%;
  background: #23BFAB;
  border-radius: 20px;
  margin-top: -30px;
}
#management{
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center
}
#management>span{
  display: block;
  color: #FFFFFF;
}
</style>