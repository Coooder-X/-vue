<template>
  <!-- header -->
  <div class="page-header-container">
    <el-page-header
      class="page-header"
      :icon="ArrowLeft"
      title="返回项目列表"
      :content="projectName"
      @back="handleBack"
    />
    <el-button
      class="add-member"
      type="primary"
      @click="addDialogVisible = true"
      >添加成员</el-button
    >
  </div>
  <!-- 表格部分 -->
  <div class="page-content">
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="成员" width="180" />
      <el-table-column prop="role" label="角色" width="180" />
      <el-table-column prop="readable" label="查看">
        <template #default="scope">
          <el-icon v-if="scope.row.readable" :size="18" color="#529b2e">
            <component :is="CircleCheckFilled"></component>
          </el-icon>
          <el-icon v-else :size="18" color="#f94646">
            <component :is="CircleCloseFilled"></component>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="editable" label="编辑">
        <template #default="scope">
          <el-icon v-if="scope.row.editable" :size="18" color="#529b2e">
            <component :is="CircleCheckFilled"></component>
          </el-icon>
          <el-icon v-else :size="18" color="#f94646">
            <component :is="CircleCloseFilled"></component>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="deletable" label="删除">
        <template #default="scope">
          <el-icon v-if="scope.row.deletable" :size="18" color="#529b2e">
            <component :is="CircleCheckFilled"></component>
          </el-icon>
          <el-icon v-else :size="18" color="#f94646">
            <component :is="CircleCloseFilled"></component>
          </el-icon>
        </template>
      </el-table-column>
			<!-- 每行的2个操作 -->
      <el-table-column prop="option" label="操作">
        <template #default="scope">
          <el-popover
            placement="left"
            :width="160"
						trigger="click"
						:auto-close="0"
          >
            <p>修改权限</p>
            <el-select v-model="memberInfo.role" placeholder="选择角色" @change="handleEdit(scope.row.uid)">
              <el-option label="管理员" value="admin" />
              <el-option label="协作者" value="teamworker" />
              <el-option label="游客" value="visitor" />
            </el-select>
            <template #reference>
              <el-button type="text">修改成员角色</el-button>
            </template>
          </el-popover>
          <el-popconfirm
            title="确认删除该成员?"
            @confirm="handleDeleteMember(scope.row.uid)"
          >
            <template #reference>
              <el-button type="text">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 邀请成员 dialog -->
  <el-dialog v-model="addDialogVisible" title="邀请成员" width="45%">
    <el-form :inline="true" :model="memberInfo">
      <el-form-item label="成员">
        <el-autocomplete
          v-model="memberInfo.name"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          clearable
          value-key="name"
          placeholder="搜索成员"
          @select="handleSelect"
          :suffix-icon="Search"
        />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="memberInfo.role" placeholder="选择角色">
          <el-option label="管理员" value="admin" />
          <el-option label="协作者" value="teamworker" />
          <el-option label="游客" value="visitor" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddMember"> 添加 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import authority from "@/authority";
import {
  CircleCheckFilled,
  CircleCloseFilled,
  Search,
} from "@element-plus/icons-vue";
import { Author, User } from "@/type";

export default defineComponent({
  name: "ProjectItem",
  components: {},
  props: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const { projectName, projectId } = route.params;
    const addDialogVisible = ref(false);
    const editVisible = ref(false);
    const loading = computed(() => store.state.project.loading);
    const allUser = computed(() => store.state.project.allUser);
    const tableData = computed(() => {
      return store.state.project.authorList.map((author: Author) => {
        return {
          uid: author.user.uid,
          name: author.user.name,
          ...authority[author.role],
          role:
            author.role === "admin"
              ? "管理员"
              : author.role === "teamworker"
              ? "协作者"
              : "游客",
        };
      });
    });

    const memberInfo = reactive({
      user: { uid: "", name: "" },
      role: "",
    });

    onMounted(() => {
      store.dispatch("getAuthorLst", { params: { id: projectId } });
      store.dispatch("getAllUser");
    });

    const handleBack = () => router.back();

    const handleAddMember = () => {
      const param = {
        projectId: projectId,
        author: {
          user: memberInfo.user,
          role: memberInfo.role,
        },
      };
      store.dispatch("addMember", param);
      store.dispatch("getAuthorLst", { params: { id: projectId } });
      addDialogVisible.value = false;
    };

    const handleDeleteMember = (uid: string) => {
      const param = {
        projectId,
        uid,
      };
      store.dispatch("deleteMember", param);
      store.dispatch("getAuthorLst", { params: { id: projectId } });
    };

    const handleSelect = (item: User) => {
      memberInfo.user = item;
    };

    const handleEdit = (uid: string) => {
			const param = {
        projectId,
        uid,
        role: memberInfo.role,
      };
			console.log(param);
			store.dispatch("editMember", param);
      store.dispatch("getAuthorLst", { params: { id: projectId } });
		};

    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? allUser.value.filter(createFilter(queryString))
        : allUser.value;
      console.log("res", results);
      cb(results);
    };
    const createFilter = (queryString: string) => {
      return (user: User) => {
        return user.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    };

    return {
      ArrowLeft,
      CircleCheckFilled,
      CircleCloseFilled,
      Search,
      editVisible,
      tableData,
      projectName,
      memberInfo,
      loading,
      allUser,
      addDialogVisible,
      handleSelect,
      createFilter,
      querySearch,
      handleEdit,
      handleAddMember,
      handleDeleteMember,
      handleBack,
    };
  },
});
</script>

<style scoped>
.page-header-container {
  width: 100%;
  height: 45px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header {
  margin-left: 10px;
}

.el-page-header:hover {
  color: #409eff;
}

.add-member {
  margin-right: 10px;
}

.page-content {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: white;
}
</style>