<template>
  <div class="project-container" v-loading="loading">
    <div class="add-project" @click="createProject">
        <el-icon :size="25">
          <component :is="Plus"></component>
        </el-icon>
        <div :style="{fontSize: '12px', marginTop: '5px'}">{{ "新建项目" }}</div>
    </div>
    <div v-for="item in projectList" :key="item.id">
      <project-item
        :id="item.id"
        :overviewImg="item.overviewImg"
        :projectName="item.projectName"
        :onDelete="handleDeleteProject"
      ></project-item>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import ProjectItem from "@/components/ProjectItem.vue";
import { Plus } from "@element-plus/icons-vue";
import { nanoid } from "nanoid";

export default defineComponent({
  name: "ProjectManage",
  components: {
    ProjectItem,
  },
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.project.loading);
    const projectList = computed(() => store.state.project.projectList);

    onMounted(() => {
      store.dispatch('getProject', {params: {id: store.state.uid}});
      store.dispatch('setPath', useRouter().currentRoute.value.fullPath);
    });

    function createProject() {
      store.dispatch('createProject', {id: nanoid(), overviewImg: 'https://dss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/1990359857.png', projectName: nanoid()});
			store.dispatch('getProject', {params: {id: store.state.project.uid}});
    }

    const handleDeleteProject = (id: number) => {
      //delete
      console.log("delete", id);
      store.dispatch('deleteProject', {params: {id}});
			store.dispatch('getProject', {params: {id: store.state.project.uid}});
    };

    return {
      projectList,
      loading,
      createProject,
      handleDeleteProject,
      Plus,
    };
  },
});
</script>

<style scoped>
.project-container {
  /* position: absolute; */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
}

.add-project {
  position: relative;
  display: flex;
	color: rgb(134, 134, 134);
  background-color: white;
	justify-content: center;
	align-items: center;
	flex-direction: column;
  width: 200px;
  height: 130px;
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid silver;
  cursor: pointer;
}

.add-project:hover {
	background-color: rgb(219, 219, 219);
}
</style>