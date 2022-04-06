<template>
  <div
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    class="project-item"
    v-bind:style="{
      backgroundImage: `url(${overviewImg})`,
    }"
  >
    <div v-show="isHover">
      <mask-text
        :isHover="isHover"
        :text="projectName"
        :onDelete="showDialog"
        :onEditRight="onEditRight"
        :onViewDetail="onViewDetail"
      ></mask-text>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="提示" width="30%">
    <span>{{ `确认删除项目 ${projectName} ?` }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDeleteProject">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { Delete, MoreFilled } from "@element-plus/icons-vue";
import MaskText from "@/components/MaskText.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProjectItem",
  components: { MaskText },
  props: {
    id: Number,
    overviewImg: String,
    projectName: String,
    onDelete: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter();
    const isHover = ref(false);
    const dialogVisible = ref(false);

    const handleDeleteProject = () => {
      props.onDelete(props.id);
      dialogVisible.value = false;
    };

    const onEnter = () => {
      isHover.value = true;
    };

    const onLeave = () => {
      isHover.value = false;
    };

    const showDialog = () => {
      dialogVisible.value = true;
    };

    const onViewDetail = () => {
      console.log("查看信息");
    };
    const onEditRight = () => {
      console.log("编辑权限");
      router.push(`/authority/${props.projectName}`);
    };

    return {
      Delete,
      MoreFilled,
      isHover,
      dialogVisible,
      showDialog,
      handleDeleteProject,
      onViewDetail,
      onEditRight,
      onEnter,
      onLeave,
    };
  },
});
</script>

<style scoped>
.project-item {
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 200px;
  height: 130px;
  margin-left: 20px;
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid silver;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>