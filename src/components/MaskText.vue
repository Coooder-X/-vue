<template>
  <div class="mask-text">
    <el-button size="small" :icon="Delete" circle @click="onDelete" />
    <el-popover placement="bottom-start" trigger="hover">
      <div class="popover-select">
        <div
          class="popover-option"
          v-for="item in option"
          :key="item.value"
          @click="item.onClick"
        >
          {{ item.name }}
        </div>
      </div>
      <template #reference>
        <el-button size="small" :icon="MoreFilled" circle />
      </template>
    </el-popover>

    <div
      :style="{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '100%',
        transform: 'translate(-50%, -50%)',
      }"
    >
      {{ text }}
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { Delete, MoreFilled } from "@element-plus/icons-vue";

export default defineComponent({
  name: "MaskText",
  props: {
    text: String,
    isHover: Boolean,
    onDelete: Function,
    onViewDetail: Function,
    onEditRight: Function,
  },
  setup(props) {
    return {
      value: "asd",
      option: [
        {
          value: 0,
          name: "查看信息",
          onClick: props.onViewDetail,
        },
        {
          value: 1,
          name: "编辑权限",
          onClick: props.onEditRight,
        },
        {
          value: 2,
          name: "项目导出",
          onClick: function () {},
        },
      ],
      Delete,
      MoreFilled,
    };
  },
});
</script>

<style scoped>
.mask-text {
  /* float: none; */
  /* overflow: hidden; */
  position: absolute;
  height: 100%;
  width: 100%;
  line-height: 100%;
  text-align: center;
  font-size: 20px;
  color: rgb(255, 255, 255);
  background-color: rgba(80, 80, 80, 0.5);
}
.el-button.el-button {
  float: right;
  background-color: rgba(238, 238, 238, 0.966);
  position: relative;
  margin-top: 5px;
  margin-right: 5px;
}
.el-button.el-button:hover {
  color: rgb(160, 160, 160);
}
.popover-select {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.el-popover-content {
  background-color: aqua;
}
.popover-option {
  line-height: 30px;
  height: 30px;
  width: 100%;
  text-align: center;
  background-color: white;
  color: rgb(75, 165, 255);
  cursor: pointer;
  margin: 0%;
}
.popover-option:hover {
  background-color: rgb(230, 238, 255);
}
</style>