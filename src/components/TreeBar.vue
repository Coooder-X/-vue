<template>
  <div class="button-container">
    <el-button type="text" :icon="FolderAdd" @click="createCategory"
      >创建分类</el-button
    >
    <el-button type="text" :icon="Download">导入数据</el-button>
  </div>
  <!-- @node-click="handleNodeClick" -->
  <el-tree :data="data"
    ><template #default="{ node, data }">
      <span class="tree-node">
        <div v-if="isEditing && data.label === ''">
          <el-input
            v-model="newCategoryName"
            size="small"
            :ref="setRef"
            @blur="commitCreate"
          ></el-input>
        </div>
        <el-tooltip
          v-else
          effect="dark"
          :show-after="1000"
          :content="node.label"
          placement="top-start"
        >
          <el-input
            v-model="renameFlag.newName"
            v-if="renameFlag.isRenaming && renameFlag.renameId === node.data.id"
            size="small"
            @blur="commitRename"
            :ref="setRef"
          ></el-input>
          <div v-else>
            <el-icon :size="15" v-if="showIcon(data)">
              <component :is="showIcon(data)"></component>
            </el-icon>
            {{ node.label }}
          </div>
        </el-tooltip>
        <span>
          <el-dropdown trigger="click">
            <el-button type="text" circle :icon="MoreFilled"> </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in option"
                  :key="item.value"
                  @click="item.onClick(node.data.id, node.data.label)"
                >
                  {{ item.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </span>
    </template>
  </el-tree>
</template>

<script lang='ts'>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";

import { nextTick } from "vue";
// import { FileType, TreeData } from "@/type";
import {
  FolderAdd,
  Download,
  Folder,
  Menu,
  MoreFilled,
  Document,
} from "@element-plus/icons-vue";
import { nanoid } from "nanoid";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export enum FileType {
  Category,
  Folder,
  File,
}
export interface TreeData {
  id: string;
  label: string;
  type: FileType;
  children?: TreeData[];
}

export default defineComponent({
  setup() {
    const store = useStore();
    const isEditing = ref(false);
    const renameFlag = reactive({
      isRenaming: false,
      renameId: "",
      newName: "",
    });
    const data = computed(() => store.state.dataset.dataTree);
    const newCategory = reactive({} as TreeData);
    const newCategoryName = ref("");
    const inputFocus = ref();

    const setRef = (el: any) => {//	自动获取 input 焦点
      inputFocus.value = el;
      if (el) nextTick(() => inputFocus.value.focus());
    };

    onMounted(() => {
      store.dispatch("getDataSet", { params: { uid: store.state.uid } });
      store.dispatch("setPath", useRouter().currentRoute.value.fullPath);
    });

    const createCategory = () => {
      isEditing.value = true;
      const newId = nanoid();
      newCategory.id = newId;
      newCategory.label = "";
      newCategory.children = [];
      newCategory.type = FileType.Category;
      if (!data.value.children) {
        data.value.children = [];
      }
      data.value.push(newCategory);
    };

    const commitCreate = () => {
      isEditing.value = false;
      if (newCategoryName.value === "") {
        //	取消新建分类
        data.value.pop();
        return;
      }
      newCategory.label = newCategoryName.value;
      newCategoryName.value = "";
      data.value.pop(); //	删掉 tmp node，等待后端刷过来新数据
      store.dispatch("createCategory", {
        uid: store.state.uid,
        data: newCategory,
      });
      store.dispatch("getDataSet", { params: { uid: store.state.uid } });
    };

    const showIcon = (data: any) => {
      if (!data.type) return null;
      return data.type === FileType.Category
        ? null
        : data.type === FileType.Folder
        ? Folder
        : Document;
    };

    const handleRename = (id: string, label: string) => {
      renameFlag.isRenaming = true;
      renameFlag.renameId = id;
			renameFlag.newName = label;
    };

    const commitRename = () => {
      renameFlag.isRenaming = false;
      if (renameFlag.newName === "") {
        return;
      }
      store.dispatch("renameFolder", {
        uid: store.state.uid,
        fid: renameFlag.renameId,
        newName: renameFlag.newName,
      });
      renameFlag.renameId = renameFlag.newName = "";
      store.dispatch("getDataSet", { params: { uid: store.state.uid } });
    };

    const handleDeleteFolder = (id: string) => {
      store.dispatch("deleteFolder", { uid: store.state.uid, fid: id });
      store.dispatch("getDataSet", { params: { uid: store.state.uid } });
    };

    return {
      FolderAdd,
      MoreFilled,
      Download,
      Folder,
      Document,
      Menu,
      data,
      newCategory,
      newCategoryName,
      isEditing,
      renameFlag,
      setRef,
      commitRename,
      commitCreate,
      showIcon,
      createCategory,
      option: [
        {
          value: 0,
          name: "重命名",
          onClick: handleRename,
        },
        {
          value: 1,
          name: "删除",
          onClick: handleDeleteFolder,
        },
      ],
    };
  },
});
</script>

<style scoped>
.el-tree {
  height: calc(100% - 35px);
}
.button-container {
  display: flex;
  flex-wrap: nowrap;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-around;
  align-items: center;
}
.el-button {
  color: gray;
}
.el-button:hover {
  color: #53a8ff;
}
.tree-node {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.tree-node .el-button {
  margin-right: 10px;
}
</style>