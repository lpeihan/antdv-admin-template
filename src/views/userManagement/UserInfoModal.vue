<template>
  <a-modal
    v-model:open="open"
    :title="form.id ? '编辑用户' : '新增用户'"
    :maskClosable="false"
    :confirmLoading="loading"
    @ok="handleAddOrEdit"
  >
    <a-form ref="formRef" :model="form" class="!pt-[20px]">
      <a-form-item label="用户名" name="name" :rules="{ required: true, message: '' }">
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="邮箱" name="email" :rules="{ required: true, message: '' }">
        <a-input v-model:value="form.email" />
      </a-form-item>
      <a-form-item label="密码" name="password" :rules="{ required: true, message: '' }">
        <a-input-password v-model:value="form.password" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, ref, useTemplateRef, watchEffect } from 'vue';

import { showSuccessMessage, sleep } from '@/utils';

const INITIAL_FORM = {
  name: '',
  email: '',
  password: '',
  id: '',
};

const formRef = useTemplateRef('formRef');
const open = ref(false);
const loading = ref(false);
const form = reactive({ ...INITIAL_FORM });

watchEffect(() => {
  if (!open.value) {
    Object.assign(form, INITIAL_FORM);
  }
});

const openModal = (record) => {
  Object.assign(form, record);
  open.value = true;
};

const handleAddOrEdit = async () => {
  await formRef.value.validate();

  loading.value = true;

  await sleep(3000);

  loading.value = false;
  open.value = false;
  showSuccessMessage();
};

defineExpose({ openModal });
</script>
