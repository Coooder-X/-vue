<template>
  <home-page />
  <!-- <router-view></router-view> -->
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HomePage from "./pages/HomePage.vue";

@Options({
  components: {
    HomePage,
  },
})
export default class App extends Vue {}
</script>

<style type="text/css">
html,body,#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
/* .el-main {
	padding: 0%;
} */
.el-aside {
  height: 100%;
}
 .el-tabs {
   height: calc(100% - 50px);
 }
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.el-tabs__content {
  height: 100%;
}
body {
  margin: 0px;
  background-color: rgb(240, 240, 240);
}
</style>
