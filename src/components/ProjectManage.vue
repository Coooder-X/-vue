<template>
  <div class="project-container">
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
      ></project-item>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import ProjectItem from "@/components/ProjectItem.vue";
import { Plus } from "@element-plus/icons-vue";

export default defineComponent({
  name: "ProjectManage",
  components: {
    ProjectItem,
  },
  setup() {
    const projectList = [
      {
        id: 1,
        overviewImg: "",
        projectName: "prj1",
        authorList: [
          {
            name: 'lzx',
            role: 'admin',
          }, {
            name: 'hff',
            role: 'teamworker'
          }, {
            name: 'lyh',
            role: 'visitor'
          }
        ]
      },
      {
        id: 2,
        overviewImg: "",
        projectName: "prj2",
        authorList: [
          {
            name: 'lzx',
            role: 'admin',
          }
        ]
      },
      {
        id: 3,
        overviewImg: "",
        projectName: "prj3",
        authorList: [
          {
            name: 'lzx',
            role: 'admin',
          }
        ]
      },
    ];

    function createProject() {
      //
    }

    return {
      projectList,
      createProject,
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
	background-color: rgb(240, 240, 240);
}
</style>