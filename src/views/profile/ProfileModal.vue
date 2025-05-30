<template>
  <a-modal
    v-model:open="state.show"
    title="修改密码"
    :maskClosable="false"
    :confirmLoading="state.confirmLoading"
    @ok="handleChangePassword"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="{
        oldPassword: [{ required: true, message: '' }],
        newPassword: [{ required: true, message: '' }],
        confirmPassword: [{ required: true, message: '' }],
      }"
      :label-col="{ style: { width: '80px' } }"
      style="margin-top: 24px"
    >
      <a-form-item label="旧密码" name="oldPassword">
        <a-input v-model:value="form.oldPassword" type="password" />
      </a-form-item>
      <a-form-item label="新密码" name="newPassword">
        <a-input v-model:value="form.newPassword" type="password" />
      </a-form-item>
      <a-form-item label="确认密码" name="confirmPassword">
        <a-input v-model:value="form.confirmPassword" type="password" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, ref } from 'vue';

import { showSuccessMessage, sleep } from '@/utils';

const state = reactive({
  show: false,
  confirmLoading: false,
});
const formRef = ref(null);
const form = reactive({
  oldPassword: 'password',
  newPassword: 'password',
  confirmPassword: 'password',
});

const open = () => {
  state.show = true;
};

const handleChangePassword = () => {
  formRef.value.validate().then(async () => {
    state.confirmLoading = true;
    await sleep(3000);

    state.confirmLoading = false;
    state.show = false;
    showSuccessMessage();
  });
};

defineExpose({ open });
</script>
