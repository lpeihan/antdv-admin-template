<template>
  <a-modal
    v-model:open="open"
    title="修改密码"
    :maskClosable="false"
    :confirmLoading="loading"
    @ok="handleChangePassword"
  >
    <a-form ref="formRef" :model="form" :rules="rules" class="!pt-[20px]">
      <a-form-item label="旧密码" name="oldPassword">
        <a-input-password v-model:value="form.oldPassword" />
      </a-form-item>
      <a-form-item label="新密码" name="newPassword">
        <a-input-password v-model:value="form.newPassword" />
      </a-form-item>
      <a-form-item label="确认密码" name="confirmPassword">
        <a-input-password v-model:value="form.confirmPassword" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, ref } from 'vue';

import { showSuccessMessage, sleep } from '@/utils';

const formRef = ref(null);
const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});
const rules = {
  oldPassword: [{ required: true, message: '' }],
  newPassword: [{ required: true, message: '' }],
  confirmPassword: [{ required: true, message: '' }],
};
const open = ref(false);
const loading = ref(false);

const handleChangePassword = async () => {
  await formRef.value.validate();

  loading.value = true;

  await sleep(3000);

  loading.value = false;
  open.value = false;
  showSuccessMessage();
};

defineExpose({ openModal: () => (open.value = true) });
</script>
