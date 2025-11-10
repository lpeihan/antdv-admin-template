<template>
  <a-modal
    v-model:open="open"
    :title="isEdit ? '编辑用户' : '新增用户'"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="600"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      :model="formData"
      :label-col="{ style: { width: '100px' } }"
      class="!pt-[20px]"
      labelAlign="left"
    >
      <a-form-item label="用户名" name="name" :rules="[{ required: true, message: '' }]">
        <a-input v-model:value="formData.name" />
      </a-form-item>
      <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '' }]">
        <a-input v-model:value="formData.email" />
      </a-form-item>
      <a-form-item label="状态" name="status" :rules="[{ required: true, message: '' }]">
        <a-select
          v-model:value="formData.status"
          placeholder="请选择状态"
          :options="USER_STATUS_OPTIONS"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import { computed, reactive, ref, useTemplateRef } from 'vue';

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
const formData = reactive(props.record ? { ...props.record } : INITIAL_FORM_DATA);
const open = ref(false);
const confirmLoading = ref(false);

const isEdit = computed(() => !!formData.id);

const handleOk = async () => {
  await formRef.value.validate();

  try {
    confirmLoading.value = true;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    open.value = false;
    showSuccessMessage();
    emit('success');
  } finally {
    confirmLoading.value = false;
  }
};

defineExpose({ showModal: () => (open.value = true) });
</script>
