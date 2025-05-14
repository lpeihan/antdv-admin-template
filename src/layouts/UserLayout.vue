<template>
  <a-config-provider
    :theme="{
      algorithm: themeStore.isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: { controlHeight: 42 },
    }"
  >
    <div class="user-layout">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script setup>
import { theme } from 'ant-design-vue';

import { useThemeStore } from '@/store/theme';

const themeStore = useThemeStore();
</script>

<style lang="less" scoped>
.user-layout {
  height: 100vh;
  background: var(--login-bg-color) url('@/assets/images/background.svg') no-repeat center center;
  background-size: 100%;
}
</style>
