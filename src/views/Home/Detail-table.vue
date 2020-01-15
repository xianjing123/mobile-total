<template>
  <div class="detail-table">
    <div class="header" :class="wid?'police':'normal'">{{title}}</div>
    <div class="main">
      <table>
        <tbody>
          <tr v-for="(data,index) in datalist" :key="index">
            <td>{{data.name}}</td>
            <td>{{data.value}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return{
            wid:"" //wid判断是否为告警
        }
    },
    mounted(){
        this.wid = JSON.parse(localStorage.getItem('detail')).wid
    },
  props: ["datalist", "title"]
};
</script>

<style lang="scss" scoped>
$police: RGBA(242, 86, 67, 1);
$normal: RGBA(50, 150, 250, 1);
.normal {
    background:$normal
}
.police {
    background:$police
}
.detail-table {
  width: 100%;
  margin: 0.2rem 0;
  .header {
    width: 100%;
    height: 0.82rem;
    line-height: 0.82rem;
    border-radius: 12px 12px 0px 0px;
    color: white;
    box-sizing: border-box;
    padding-left: 0.16rem;
  }
  .main {
    width: 100%;
    table {
      width: 100%;
      border-collapse: collapse;
      box-sizing: border-box;
      td {
        width: 50%;
        line-height: 0.7rem;
        text-align: center;
        word-break: break-all;
      }
    }
    table,
    tbody,
    td {
      border: 1px solid RGBA(230, 230, 230, 1);
    }
  }
}
</style>