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