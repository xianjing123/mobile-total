<template>
  <div>
    <div id="app"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
  #app {
    width:1rem;
    height:1rem;
    background:red;
  }
  * {
    margin:0;
    padding:0;
  }
  html,body{
    height:100%;
  }
  ul{
    list-style: none;
  }
  a {
    text-decoration: none;
  }
</style>
