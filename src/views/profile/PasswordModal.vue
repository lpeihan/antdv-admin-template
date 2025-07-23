<template>
  <a-modal
    v-model:open="open"
    title="修改密码"
    :maskClosable="false"
    :confirmLoading="loading"
    :width="600"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      :label-col="{ style: { width: '100px' } }"
      class="!pt-[20px]"
      labelAlign="left"
    >
      <a-form-item label="旧密码" name="oldPassword">
        <a-input-password v-model:value="formData.oldPassword" />
      </a-form-item>
      <a-form-item label="新密码" name="newPassword">
        <a-input-password v-model:value="formData.newPassword" />
      </a-form-item>
      <a-form-item label="确认密码" name="confirmPassword">
        <a-input-password v-model:value="formData.confirmPassword" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import { reactive, ref, useTemplateRef, watch } from 'vue';

import { showSuccessMessage, sleep } from '@/utils';

const INITIAL_FORM_DATA = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const formData = reactive({ ...INITIAL_FORM_DATA });
const formRef = useTemplateRef<FormInstance>('formRef');
const formRules = {
  oldPassword: [{ required: true, message: '' }],
  newPassword: [{ required: true, message: '' }],
  confirmPassword: [{ required: true, message: '' }],
};
const open = ref(false);
const loading = ref(false);

watch(open, (value) => {
  if (!value) {
    Object.assign(formData, INITIAL_FORM_DATA);
    formRef.value.clearValidate();
  }
});

const openModal = () => {
  open.value = true;
};

const handleOk = async () => {
  await formRef.value.validate();

  loading.value = true;

  await sleep(3000);

  loading.value = false;
  open.value = false;
  showSuccessMessage();
};

defineExpose({ openModal });
</script>
