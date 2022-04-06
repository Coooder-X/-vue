<template>
  <div class="header-bar">
    <div style="margin-left: 20px; font-size: 25px; cursor: default">{{ "可视分析平台" }}</div>
    <div style="margin-right: 20px">
      <el-avatar :size="35"> user </el-avatar>
	  {{ uid }}
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent } from "vue";
import { useStore } from 'vuex';

export default defineComponent({
  name: "TopHeader",
  setup() {
	  const store = useStore();
	  const uid = computed(() => store.state.uid);
	  return {
		  uid,
	  }
  },
});
</script>

<style scoped>
.header-bar {
  height: 50px;
  width: 100%;
  line-height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: royalblue;
  color: white;
}
</style>