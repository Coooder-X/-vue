<template>
  <div class="page-header-container">
    <el-page-header
      class="page-header"
      :icon="ArrowLeft"
      title="返回项目列表"
      :content="projectName"
      @back="handleBack"
    />
		<el-button class="add-member" type="primary" @click="dialogVisible = true">添加成员</el-button>
  </div>
  <div class="page-content">
    <el-table :data="roleList" style="width: 100%">
      <el-table-column prop="name" label="成员" width="180" />
      <el-table-column prop="role" label="角色" width="180" />
      <el-table-column prop="readable" label="查看" />
			<el-table-column prop="editable" label="编辑" />
			<el-table-column prop="deletable" label="删除" />
			<el-table-column prop="option" label="操作">
				<el-button type='text'>修改成员角色</el-button>
				<el-button type='text'>删除</el-button>
			</el-table-column>
    </el-table>
  </div>
	<el-dialog v-model="dialogVisible" title="邀请成员" width="30%">
    <!-- <span>{{`确认删除项目 ${projectName} ?`}}</span> -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddMember">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import authority from '@/authority';

export default defineComponent({
  name: "ProjectItem",
  components: {},
  props: {},
  setup() {
    const router = useRouter();
		const route = useRoute();

		const projectName = route.params.projectName;
		const dialogVisible = ref(false);

    const handleBack = () => {
      router.back();
    };

		const handleAddMember = () => {
			//
			dialogVisible.value = false;
		}

    return {
			roleList: [
				{
					name: 'lzx',
					role: 'admin',
					readable: authority.admin.readable,
					editable: authority.admin.editable,
					deletable: authority.admin.deletable,
				}
			],
      ArrowLeft,
			projectName,
			dialogVisible,
			handleAddMember,
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