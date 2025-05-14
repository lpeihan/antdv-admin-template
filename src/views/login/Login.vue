<template>
  <a-config-provider
    :theme="{
      algorithm: theme.defaultAlgorithm,
      token: { controlHeight: 42 },
    }"
  >
    <div class="login-page">
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

          <a-form-item name="remember">
            <a-checkbox v-model:checked="form.remember">
              {{ $t('remember') }}
            </a-checkbox>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit" block>
              {{ $t('common.login') }}
            </a-button>
          </a-form-item>
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

import { useStore } from '@/store';
import storage from '@/utils/storage';

const store = useStore();
const router = useRouter();

const form = reactive({
  username: storage.getItem('username') || '',
  password: storage.getItem('password') || '',
  remember: !!storage.getItem('username'),
  verifyCode: 0,
});

const onFinish = async () => {
  await store.login(form);

  if (form.remember) {
    storage.setItem('username', form.username);
    storage.setItem('password', form.password);
  } else {
    storage.removeItem('username');
    storage.removeItem('password');
  }

  router.push('/');
};
</script>

<style lang="less" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .login-form {
    width: 400px;

    .logo-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;

      .logo-text {
        margin-left: 20px;
        font-size: 24px;
        font-weight: bold;
      }
    }

    .ant-form {
      width: 400px;
      margin: 40px auto 0;

      .ant-checkbox-wrapper {
        color: var(--primary-color);
      }

      .anticon {
        color: rgb(0 0 0 / 65%);
      }

      .ant-btn {
        font-size: 15px;
      }
    }
  }
}
</style>
