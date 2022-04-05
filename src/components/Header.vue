<template>
	<div class="header-bar">{{'234242'}}</div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'TopHeader',
  setup() {},
});
</script>

<style scoped>
.header-bar {
	height: 50px;
	width: 100%;
	background-color: royalblue;
}
</style>