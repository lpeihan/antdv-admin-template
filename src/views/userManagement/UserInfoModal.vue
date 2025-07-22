<template>
  <a-modal
    v-model:open="open"
    :title="isEdit ? '编辑用户' : '新增用户'"
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
      <a-form-item label="用户名" name="name">
        <a-input v-model:value="formData.name" />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="formData.email" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password v-model:value="formData.password" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { computed, reactive, ref, useTemplateRef, watch } from 'vue';

import { showSuccessMessage, sleep } from '@/utils';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  password: '',
  id: '',
};

const formData = reactive({ ...INITIAL_FORM_DATA });
const formRef = useTemplateRef('formRef');
const formRules = {
  name: [{ required: true, message: '' }],
  email: [{ required: true, message: '' }],
  password: [{ required: true, message: '' }],
};
const open = ref(false);
const loading = ref(false);

const isEdit = computed(() => formData.id);

watch(open, (value) => {
  if (!value) {
    Object.assign(formData, INITIAL_FORM_DATA);
    formRef.value.clearValidate();
  }
});

const openModal = (record) => {
  if (record) {
    Object.assign(formData, record);
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
