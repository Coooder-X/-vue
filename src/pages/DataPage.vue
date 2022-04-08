<template>
  <el-container>
    <el-aside width="250px">
      <tree-bar :onImport="goDataImport" />
    </el-aside>
    <el-main class="main-container"> <router-view></router-view> </el-main>
  </el-container>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import TreeBar from '@/components/TreeBar.vue';
import { useRouter } from "vue-router";
import DataImport from "@/components/DataImport.vue";

export default defineComponent({
  components: {
    TreeBar,
    DataImport,
  },
  setup() {
    const router = useRouter();
    const goDataImport = () => {
      console.log('inport');
			router.push('/data/dataImport')
		};
    return {
      goDataImport
    };
  },
});
</script>

<style scoped>
.tree-container {
  position: relative;
  float: left;
  width: 200px;
  height: 100%;
}
.el-aside {
  background-color: white;
}
.el-tree {
  height: calc(100% - 35px);
}
.main-container {
  float: right;
  width: 100%;
  height: 100%;
  margin-left: 10px;
  padding: 0px;
  background-color: white;
}
.button-container {
  display: flex;
  flex-wrap: nowrap;
  /* align-items: center; */
  /* padding: 0%; */
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-around;
  align-items: center;
  /* align-content: center; */
}
.el-button {
  color: gray;
}
.el-button:hover {
  color: #4970e7;
}
</style>