<template>
  <div class="person1">
      <div class="list">月份</div>
    <div v-for="(item,index) in lists"  @click="clickAdd(index)" :key="index" :class="{red:i === index}">
      <div class="list">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      i: null,
      lists: [
        {id: 1, name: '1'},
        {id: 2, name: '2'},
        {id: 3, name: '3'},
        {id: 4, name: '4'},
        {id: 5, name: '5'},
        {id: 6, name: '6'},
        {id: 7, name: '7'},
        {id: 8, name: '8'},
        {id: 9, name: '9'},
        {id: 10, name: '10'},
        {id: 11, name: '11'},
        {id: 12, name: '12'},
      ]
    }
  },
  methods: {
    clickAdd (index) {
      this.i = index
      this.$emit("fuck",this.i + 1)
    }
  },
  watch: {
  }
}
</script>

<style>
.person1{
    width: 100%;
    height: 40px;
    padding-top: 24%;
    font-size:16px;
    font-family:PingFang SC;
    font-weight:400;
    line-height:20px;
    color:rgba(255,255,255,1);
    opacity:0.8;
    padding-left: 4%;
}
.list{
    float: left;
    margin-left: 3%;
}
  li{
    list-style: none;
    float: left;
  }
  .red{
    font-size: 22px;
  }
</style>

