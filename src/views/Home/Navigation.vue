<template>
  <div class="navigation">
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sheetVisible: false,
      actions: [
        {
          name: "百度地图",
          method: function() {
            console.log("百度地图");
          }
        },
        {
          name: "高德地图",
          method: function() {
            console.log("高德地图");
          }
        }
      ] //导航栏内容
    };
  },
  mounted(){
    console.log(this.show)
  },
  updated () {
      console.log(this.show)
  },
  porps: ["show"]
};
</script>