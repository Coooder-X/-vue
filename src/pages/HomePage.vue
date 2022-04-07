/* eslint-disable */
<template>
  <el-container>
    <el-header><top-header /></el-header>
    <el-main>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="demo-tabs">
        <el-tab-pane label="项目管理" name="project">
          <!-- 项目管理<project-manage /> -->
          <keep-alive><router-view></router-view></keep-alive>
        </el-tab-pane>
        <el-tab-pane label="数据导入" name="data">
          <keep-alive><router-view></router-view></keep-alive>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import TopHeader from "@/components/Header.vue";
import ProjectManage from "@/components/ProjectManage.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "HomePage",
  components: {
    TopHeader,
    ProjectManage,
  },
  methods: {
    // handleClick(tab: TabsPaneContext, event: Event) {
    //   console.log(tab, event);
    //   // this.$store.commit('changeTab', event)
    //   // this.$router.push(tab.paneName);
    // }
  },
  setup() {
    const router = useRouter();

    const activeName = ref("project");

    const handleClick = (tab: TabsPaneContext) => {
      // console.log(tab, event);
      console.log(tab.paneName);
      router.push(`/${tab.paneName}`);
      // this.$store.commit('changeTab', event)
      // this.$router.push(tab.paneName);
    };

    return {
      activeName,
      handleClick,
    };
  },
});
</script>

<style scoped>
.el-tab-pane {
  /* height: calc(100% - 50px); */
  height: 100%;
  background-color: rgb(240, 240, 240);
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  height: 100%;
}
.tabContainer .el-tabs__header {
  background-color: white;
}

.el-header {
  height: 50px;
  padding: 0%;
}

.el-main {
  padding-top: 0%;
  height: 100%;
}
</style>