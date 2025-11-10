<template>
  <a-modal
    v-model:open="state.open"
    title="修改密码"
    :maskClosable="false"
    :confirmLoading="state.confirmLoading"
    :width="600"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      :model="state.form"
      :label-col="{ style: { width: '100px' } }"
      class="!pt-[20px]"
      labelAlign="left"
    >
      <a-form-item label="旧密码" name="oldPassword" :rules="[{ required: true, message: '' }]">
        <a-input-password v-model:value="state.form.oldPassword" />
      </a-form-item>
      <a-form-item label="新密码" name="newPassword" :rules="[{ required: true, message: '' }]">
        <a-input-password v-model:value="state.form.newPassword" />
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="confirmPassword"
        :rules="[{ required: true, message: '' }]"
      >
        <a-input-password v-model:value="state.form.confirmPassword" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import { reactive, useTemplateRef } from 'vue';

import { showSuccessMessage } from '@/utils';

const INITIAL_FORM_DATA = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const formRef = useTemplateRef<FormInstance>('formRef');
const state = reactive({
  form: INITIAL_FORM_DATA,
  open: false,
  confirmLoading: false,
});

const handleOk = async () => {
  await formRef.value.validate();

  try {
    state.confirmLoading = true;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    state.open = false;
    showSuccessMessage();
  } finally {
    state.confirmLoading = false;
  }
};

defineExpose({ showModal: () => (state.open = true) });
</script>
