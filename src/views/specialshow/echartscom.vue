<template>
    <div v-bind:id=id v-bind:data=data></div>
</template>
 
<script>
    export default {
        name: "baseEchartsAllComponent",
      data(){
          return{
            ChartLineGraph:null,
          }
      },
      watch:{
          data:{
            handler(newvalue,oldvalue) {
              this.drawLineGraph(this.id,newvalue);
              this.setOption(datalist7)
            }
          },
          deep:true
      },
      props:["id","data"],
      mounted() {
          this.drawLineGraph(this.id,this.data);
 
      },
      methods:{
        drawLineGraph(id,data){
          let _this = this;
          let myChart = document.getElementById(id)
          this.ChartLineGraph = this.$echarts.init(myChart)
          _this.ChartLineGraph.clear();
          this.ChartLineGraph.setOption(data);
          window.addEventListener("resize",function () {
            _this.ChartLineGraph.resize();
          })
        }
      },
      beforeDestroy() {
          if(this.ChartLineGraph){
            this.ChartLineGraph.clear();
          }
      }
    }
</script>
 
<style scoped>
 
</style>