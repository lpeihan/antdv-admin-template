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
        <Header :handle-collapse="handleCollapse" :collapsed="state.collapsed" />

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
import storage from '@/utils/storage';

const themeStore = useThemeStore();

const state = reactive({ collapsed: storage.getItem('collapsed') || false });

const handleCollapse = () => {
  state.collapsed = !state.collapsed;

  storage.setItem('collapsed', state.collapsed);
};
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
    border-right: 1px solid var(--border-color);
  }

  .ant-layout-sider-dark {
    background: var(--ant-bg-container);
  }
}
</style>
