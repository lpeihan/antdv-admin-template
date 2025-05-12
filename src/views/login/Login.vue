<template>
  <a-config-provider
    :theme="{
      algorithm: theme.defaultAlgorithm,
      token: { controlHeight: 40 },
    }"
  >
    <div class="login-page">
      <div class="login-form">
        <img src="@/assets/images/logo.png" alt="logo" width="48" />

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
              {{ $t('login') }}
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
    padding: 40px 0;
    text-align: center;
    background: rgb(255 255 255 / 20%);
    border-radius: 2px;
    backdrop-filter: blur(5px);

    .ant-form {
      width: 300px;
      margin: 40px auto 0;

      .ant-checkbox-wrapper {
        color: var(--primary-color);
      }

      .anticon {
        color: rgb(0 0 0 / 65%);
      }
    }
  }
}
</style>
