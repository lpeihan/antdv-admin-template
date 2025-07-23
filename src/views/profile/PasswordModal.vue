<template>
  <a-modal
    v-model:open="isOpen"
    title="修改密码"
    :maskClosable="false"
    :confirmLoading="isConfirmLoading"
    :width="600"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      :key="isOpen"
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

import { showSuccessMessage, sleep } from '@/utils';

const INITIAL_FORM_DATA = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const formData = reactive({ ...INITIAL_FORM_DATA });
const formRef = useTemplateRef<FormInstance>('formRef');

const isOpen = ref(false);
const isConfirmLoading = ref(false);

const openModal = () => {
  Object.assign(formData, INITIAL_FORM_DATA);

  isOpen.value = true;
};

const handleOk = async () => {
  await formRef.value.validate();
  isConfirmLoading.value = true;

  try {
    await sleep(3000);

    isOpen.value = false;
    showSuccessMessage();
  } finally {
    isConfirmLoading.value = false;
  }
};

defineExpose({ openModal });
</script>
