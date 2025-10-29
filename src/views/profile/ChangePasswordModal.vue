<template>
  <a-modal
    v-model:open="open"
    title="修改密码"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="600"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      :key="open"
      :model="formData"
      :label-col="{ style: { width: '100px' } }"
      class="!pt-[20px]"
      labelAlign="left"
    >
      <a-form-item label="旧密码" name="oldPassword" :rules="[{ required: true, message: '' }]">
        <a-input-password v-model:value="formData.oldPassword" />
      </a-form-item>
      <a-form-item label="新密码" name="newPassword" :rules="[{ required: true, message: '' }]">
        <a-input-password v-model:value="formData.newPassword" />
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="confirmPassword"
        :rules="[{ required: true, message: '' }]"
      >
        <a-input-password v-model:value="formData.confirmPassword" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import { reactive, ref, useTemplateRef } from 'vue';

import { showSuccessMessage } from '@/utils';

const INITIAL_FORM_DATA = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const formRef = useTemplateRef<FormInstance>('formRef');
const formData = reactive({ ...INITIAL_FORM_DATA });
const open = ref(false);
const confirmLoading = ref(false);

const showModal = () => {
  open.value = true;
};

const handleOk = async () => {
  await formRef.value.validate();

  try {
    confirmLoading.value = true;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    open.value = false;
    showSuccessMessage();
  } finally {
    confirmLoading.value = false;
  }
};

defineExpose({ showModal });
</script>
