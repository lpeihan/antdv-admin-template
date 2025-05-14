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
        <a-button type="primary" size="small" @click="state.isOpenChangePasswordModal = true">
          修改密码
        </a-button>
      </a-form-item>

      <a-form-item label="主题颜色">
        <div class="theme-color-list">
          <a-tooltip v-for="item in THEME_COLOR_LIST" :key="item.name" :title="item.name">
            <div
              class="theme-color-item"
              :style="{ background: item.color }"
              @click="store.setColorPrimary(item.color)"
            >
              <svg-icon v-if="item.color === store.colorPrimary" name="check" />
            </div>
          </a-tooltip>
        </div>
      </a-form-item>
    </a-form>

    <a-modal
      v-model:open="state.isOpenChangePasswordModal"
      title="修改密码"
      :maskClosable="false"
      :confirmLoading="state.confirmLoading"
      @ok="handleChangePassword"
    >
      <a-form
        ref="changePasswordFormRef"
        :model="changePasswordForm"
        :rules="changePasswordRules"
        class="change-password-form"
        :label-col="{ style: { width: '80px' } }"
      >
        <a-form-item label="旧密码" name="oldPassword">
          <a-input v-model:value="changePasswordForm.oldPassword" type="password" />
        </a-form-item>
        <a-form-item label="新密码" name="newPassword">
          <a-input v-model:value="changePasswordForm.newPassword" type="password" />
        </a-form-item>
        <a-form-item label="确认密码" name="confirmPassword">
          <a-input v-model:value="changePasswordForm.confirmPassword" type="password" />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>
<script setup>
import { message } from 'ant-design-vue';
import { computed, reactive, ref } from 'vue';

import { useStore } from '@/store';
import { sleep } from '@/utils';
import { THEME_COLOR_LIST } from '@/utils/constants';

const store = useStore();

const changePasswordForm = reactive({
  oldPassword: 'password',
  newPassword: 'password',
  confirmPassword: 'password',
});
const changePasswordFormRef = ref(null);
const changePasswordRules = {
  oldPassword: [{ required: true, message: '请输入旧密码' }],
  newPassword: [{ required: true, message: '请输入新密码' }],
  confirmPassword: [{ required: true, message: '请输入确认密码' }],
};

const state = reactive({
  isOpenChangePasswordModal: false,
  confirmLoading: false,
});

const userInfo = computed(() => store.userInfo);

const handleChangePassword = () => {
  changePasswordFormRef.value.validate().then(async () => {
    state.confirmLoading = true;
    await sleep(3000);

    state.confirmLoading = false;
    state.isOpenChangePasswordModal = false;
    message.success('密码修改成功');
  });
};
</script>

<style lang="less" scoped>
.user-name {
  font-weight: bold;
  color: var(--primary-color);
}

.theme-color-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  .theme-color-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    color: var(--white);
    cursor: pointer;
    border-radius: 2px;
  }
}

.change-password-form {
  padding: 30px 0 0 10px;
}
</style>
