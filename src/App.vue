<template>
  <div id="app">
    <div></div>
    <Tabbar v-if="$store.state.isShow" />
    <router-view />
  </div>
</template>

<script>
import Tabbar from "./components/Tabbar";
export default {
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
#app {
  margin-bottom: 1.04rem;
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
</style>
