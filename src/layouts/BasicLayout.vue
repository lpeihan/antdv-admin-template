<template>
  <div class="basic-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="state.collapsed" width="240px" :theme="themeStore.theme">
        <div class="logo-wrapper" @click="$router.push('/')">
          <img src="@/assets/images/logo.png" alt="logo" />
        </div>

        <SideMenu :collapsed="state.collapsed" />
      </a-layout-sider>
      <a-layout>
        <Header
          :handle-collapse="state.collapsed = !state.collapsed"
          :collapsed="state.collapsed"
        />

        <a-layout-content style="padding: 12px">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

import Header from './Header.vue';
import SideMenu from './SideMenu.vue';

import { useThemeStore } from '@/store/theme';

const themeStore = useThemeStore();

const state = reactive({ collapsed: false });
</script>

<style lang="less" scoped>
.basic-layout {
  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    cursor: pointer;

    img {
      width: 36px;
    }
  }

  .ant-layout-sider-light {
    border-right: 1px solid var(--colorBorderSecondary);
  }

  .ant-layout-sider-dark {
    background: var(--colorBgContainer);
  }
}
</style>
