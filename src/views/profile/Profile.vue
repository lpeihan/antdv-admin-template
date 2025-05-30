<template>
  <a-card>
    <a-form
      :label-col="{ style: { width: '120px' } }"
      :wrapper-col="{ span: 12 }"
      labelAlign="left"
    >
      <a-form-item label="用户名">
        <span class="user-name">{{ userInfo.name }}</span>
      </a-form-item>
      <a-form-item label="头像">
        <a-avatar :src="userInfo.avatar" />
      </a-form-item>
      <a-form-item label="说明">
        <a-textarea v-model:value="userInfo.description" />
      </a-form-item>
      <a-form-item label="密码">
        <a-button type="primary" size="small" @click="showModal(ProfileModal)">修改密码</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup>
import ProfileModal from './ProfileModal.vue';

import { useUserStore } from '@/store/user';
import { showModal } from '@/utils/showModal';

const { userInfo } = useUserStore();
</script>

<style lang="less" scoped>
.user-name {
  font-weight: bold;
  color: var(--primary-color);
}
</style>
