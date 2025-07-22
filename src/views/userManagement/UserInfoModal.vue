<template>
  <a-modal
    v-model:open="open"
    :title="form.id ? '编辑用户' : '新增用户'"
    :maskClosable="false"
    :confirmLoading="loading"
    @ok="handleOk"
  >
    <a-form ref="formRef" :model="form" :rules="rules" class="!pt-[20px]">
      <a-form-item label="用户名" name="name">
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="form.email" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="form.password" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, ref, useTemplateRef, watch } from 'vue';

import { showSuccessMessage, sleep } from '@/utils';

const INITIAL_FORM = {
  name: '',
  email: '',
  password: '',
  id: '',
};
const form = reactive({ ...INITIAL_FORM });
const formRef = useTemplateRef('formRef');
const rules = {
  name: [{ required: true, message: '' }],
  email: [{ required: true, message: '' }],
  password: [{ required: true, message: '' }],
};
const open = ref(false);
const loading = ref(false);

watch(open, (value) => {
  if (!value) {
    Object.assign(form, INITIAL_FORM);
    formRef.value.clearValidate();
  }
});

const openModal = (record) => {
  if (record) {
    Object.assign(form, record);
  }

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
