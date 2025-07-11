<template>
  <a-modal
    v-model:open="open"
    :title="form.id ? '编辑用户' : '新增用户'"
    :maskClosable="false"
    :confirmLoading="loading"
    @ok="handleAddOrEdit"
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
import { useTemplateRef } from 'vue';

import { useModalForm } from '@/hooks';
import { showSuccessMessage, sleep } from '@/utils';

const INITIAL_FORM = {
  name: '',
  email: '',
  password: '',
  id: '',
};

const formRef = useTemplateRef('formRef');
const { form, rules, open, loading, openModal } = useModalForm(INITIAL_FORM, formRef);

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
