<template>
  <a-card>
    <a-form
      :label-col="{ style: { width: '120px' } }"
      :wrapper-col="{ span: 12 }"
      labelAlign="left"
    >
      <a-form-item label="用户名">
        <span class="text-primary font-bold">{{ userInfo.name }}</span>
      </a-form-item>
      <a-form-item label="头像">
        <a-avatar :src="userInfo.avatar" />
      </a-form-item>
      <a-form-item label="说明">
        <a-textarea v-model:value="userInfo.description" />
      </a-form-item>
      <a-form-item label="密码">
        <a-button type="primary" size="small" @click="handleUpdatePassword">修改密码</a-button>
      </a-form-item>
    </a-form>

    <ChangePasswordModal ref="changePasswordModalRef" />
  </a-card>
</template>
<script setup lang="ts">
import { toRefs, useTemplateRef } from 'vue';

import { useUserStore } from '@/stores';

import ChangePasswordModal from './ChangePasswordModal.vue';

const userStore = useUserStore();
const changePasswordModalRef = useTemplateRef('changePasswordModalRef');

const { userInfo } = toRefs(userStore);

const handleUpdatePassword = () => {
  changePasswordModalRef.value.showModal();
};
</script>
