<template>
  <a-modal
    v-model:open="state.open"
    :title="isEdit ? '编辑用户' : '新增用户'"
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
      <a-form-item label="用户名" name="name" :rules="[{ required: true, message: '' }]">
        <a-input v-model:value="state.form.name" />
      </a-form-item>
      <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '' }]">
        <a-input v-model:value="state.form.email" />
      </a-form-item>
      <a-form-item label="状态" name="status" :rules="[{ required: true, message: '' }]">
        <a-select
          v-model:value="state.form.status"
          placeholder="请选择状态"
          :options="USER_STATUS_OPTIONS"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import { reactive, useTemplateRef } from 'vue';

import { USER_STATUS_OPTIONS, UserStatus } from '@/enums';
import { showSuccessMessage } from '@/utils';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  id: '',
  status: UserStatus.Enabled,
};

const props = defineProps({
  record: { type: Object },
});

const emit = defineEmits(['success']);

const formRef = useTemplateRef<FormInstance>('formRef');

const state = reactive({
  form: props.record ? { ...props.record } : INITIAL_FORM_DATA,
  open: false,
  confirmLoading: false,
});

const isEdit = !!state.form.id;

const handleOk = async () => {
  await formRef.value.validate();

  try {
    state.confirmLoading = true;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    state.open = false;
    showSuccessMessage();
    emit('success');
  } finally {
    state.confirmLoading = false;
  }
};

defineExpose({ showModal: () => (state.open = true) });
</script>
