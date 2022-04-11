<template>
  <div class="data-import-container">
    <div class="page-header-container">
      <el-page-header
        class="page-header"
        :icon="ArrowLeft"
        title="返回"
        :content="fileTitle"
        @back="handleBack"
      />
    </div>
    <div class="data-import-content">
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "FileDetail",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
		const fileTitle = ref('');
    const file = computed(() => {
			fileTitle.value = store.state.dataset.file.fileInfo.name || fileTitle;
			console.log("file", store.state.dataset.file.fileInfo.name);
      return store.state.dataset.file;
    });
		// const fileContent = computed(() => file? JSON.stringify(file) : '');
    const fid = computed(() => {
			store.dispatch("getFile", { params: { fid: route.params.fid } });
      return route.params.fid;
    });

    const handleBack = () => {
      router.back();
    };

    return {
      fid,
      file,
			fileTitle,
			// fileContent,
      handleBack,
    };
  },
});
</script>


<style scoped>
.data-import-container {
  background-color: #f0f0f0;
  height: 100%;
}
.data-import-content {
  background-color: #ffffff;
  margin-top: 10px;
  border-radius: 5px;
  height: calc(100% - 55px);
}
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
  margin-left: 15px;
}
.el-page-header:hover {
  color: #409eff;
}
</style>