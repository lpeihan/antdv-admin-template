<template>
  <a-config-provider
    :theme="{
      algorithm: store.isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: { controlHeight: 42 },
    }"
  >
    <div class="login-page">
      <div class="settings-wrapper">
        <HeaderSettings />
      </div>

      <div class="login-form">
        <div class="logo-wrapper">
          <img src="@/assets/images/logo.png" alt="logo" width="48" />
          <span class="logo-text">Antdv Admin</span>
        </div>

        <a-form :model="form" name="basic" autocomplete="off" @finish="onFinish">
          <a-form-item name="username" :rules="{ required: true, message: '' }">
            <a-input v-model:value="form.username" :placeholder="$t('username')">
              <template #prefix>
                <UserOutlined />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item name="password" :rules="{ required: true, message: '' }">
            <a-input-password v-model:value="form.password" :placeholder="$t('password')">
              <template #prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="remember-me">
            <a-checkbox v-model:checked="form.remember">
              {{ $t('remember') }}
            </a-checkbox>

            <a>
              {{ $t('common.forgotPassword') }}
            </a>
          </div>

          <a-button type="primary" html-type="submit" block>
            {{ $t('common.login') }}
          </a-button>
        </a-form>
      </div>
    </div>
  </a-config-provider>
</template>
<script setup>
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
import { theme } from 'ant-design-vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import HeaderSettings from '@/layouts/HeaderSettings.vue';
import { useStore } from '@/store';

const store = useStore();
const router = useRouter();

const form = reactive({
  username: 'User',
  password: '123456',
  remember: true,
});

const onFinish = async () => {
  await store.login(form);

  router.push('/');
};
</script>

<style lang="less" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .settings-wrapper {
    position: fixed;
    top: 16px;
    right: 16px;
    display: flex;
    gap: 2px;
    align-items: center;
  }

  .login-form {
    .logo-wrapper {
      display: flex;
      gap: 12px;
      align-items: center;
      justify-content: center;

      .logo-text {
        font-size: 20px;
        font-weight: 600;
      }
    }

    .ant-form {
      width: 400px;
      margin: 40px auto 0;

      .ant-btn {
        font-size: 15px;
      }
    }

    .remember-me {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 32px 0;

      a {
        color: var(--primary-color);
      }
    }
  }
}
</style>
