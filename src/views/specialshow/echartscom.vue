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
          ChartLineGraph(val, oldVal) {
            // handler(newvalue,oldvalue) {
              console.log(this.ChartLineGraph)
              this.ChartLineGraph.clear()
              this.drawLineGraph(this.id,this.data);
            // }
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
          // _this.ChartLineGraph.clear();
          this.ChartLineGraph.setOption(data);
          this.$emit("echarts",{
            ChartLineGraph:this.ChartLineGraph,
            id,
            data
          })
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