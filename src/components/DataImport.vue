<template>
  <div class="data-import-container">
    <div class="page-header-container">
      <el-page-header
        class="page-header"
        :icon="ArrowLeft"
        title="返回"
        content="导入数据"
        @back="handleBack"
      />
    </div>
    <div class="data-import-content">
      <el-form
        :model="form"
        label-width="200px"
        :rules="rules"
        ref="ruleFormRef"
      >
        <el-form-item label="请选择数据分类:" prop="folder">
          <el-select v-model="form.folder" placeholder="数据分类">
            <el-option
              v-for="folder in folderList"
              :key="folder.id"
              :label="folder.label"
              :value="folder"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据名称:" prop="fileName">
          <el-input
            v-model="form.fileName"
            placeholder="请输入数据名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="请选择导入的文件:">
          <el-upload
            ref="upload"
            :http-request="httpRequest"
            :on-preview="handlePreview"
            :on-success="uploadSuccess"
            :on-change="handleChangeFile"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <!-- <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
          > -->
            <el-button type="primary">select file</el-button>
            <!-- <template #trigger>
              <el-button type="primary">select file</el-button>
            </template> -->
            <!-- <el-button type="success" @click="submitUpload">
              upload to server
            </el-button> -->
            <template #tip>
              <div class="el-upload__tip text-red">
                limit 1 file, new file will cover the old file
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleBack">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, reactive, ref } from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { genFileId, UploadFile, UploadFiles } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { FormInstance } from "element-plus";
import { nanoid } from "nanoid";

export default defineComponent({
  name: "DataImport",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const ruleFormRef = ref<FormInstance>();
    const upload = ref<UploadInstance>();
    const folderList = computed(() => {
      return store.state.dataset.dataTree;
    });
    const form = reactive({
      folder: {
        id: "",
        label: "",
      },
      fileName: "",
    });
    const fileList = reactive([] as any[]);
    const rules = reactive({
      folder: [{ required: true, message: "类别不能为空", trigger: "blur" }],
      fileName: [
        { required: true, message: "文件名不能为空", trigger: "blur" },
      ],
      file: [{ required: true, message: "文件不能为空", trigger: "blur" }],
    });
    const handleBack = () => {
      router.back();
    };
    const submitForm = async (formEl: FormInstance | undefined) => {
      // submitUpload();
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          const param = {
            uid: store.state.uid,
            newFid: nanoid(),
            folder: form.folder,
            fileName: form.fileName,
            fileList: fileList,
          };
          console.log("file", fileList);

          store.dispatch("uploadFile", param);
          store.dispatch("getDataSet", { params: { uid: param.uid } });
          resetForm(ruleFormRef.value);
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    const handleExceed: UploadProps["onExceed"] = (files) => {
      upload.value!.clearFiles();
      const file = files[0] as UploadRawFile;
      file.uid = genFileId();
      upload.value!.handleStart(file);
    };

    const httpRequest = (option: never) => {
      // fileList.push(option);
      // console.log("option", option);
    };

    const handleChangeFile = (
      uploadFile: UploadFile,
      uploadFiles: UploadFiles
    ) => {
      console.log("changeFile", uploadFile);
      fileList.push(uploadFile);
      let reader = new FileReader();
      reader.readAsText(uploadFile.raw as any);
      reader.onload = (e) => {
        console.log("reader", reader.result);
        fileList.push({ fileInfo: uploadFile, content: reader.result });
      };
    };

    const uploadSuccess = (
      response: any,
      uploadFile: UploadFile,
      uploadFiles: UploadFiles
    ) => {
      console.log("uploadFile", uploadFile);
    };

    // const submitUpload = () => {
    //   upload.value!.submit();
    // };
    const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
      console.log(uploadFile);
    };

    return {
      ArrowLeft,
      form,
      rules,
      ruleFormRef,
      folderList,
      handlePreview,
      submitForm,
      handleBack,
      handleExceed,
      uploadSuccess,
      handleChangeFile,
      fileList,
      httpRequest,
      // submitUpload,
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
.el-form {
  width: 50%;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.el-input {
  width: 200px;
}
.el-upload__tip {
  color: red;
}
</style>