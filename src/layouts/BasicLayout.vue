<template>
  <div class="basic-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" :width="240" :theme="themeStore.theme">
        <div class="flex h-[64px] items-center justify-center">
          <img src="@/assets/images/logo.png" alt="logo" class="w-[36px]" />
        </div>

        <SideMenu :collapsed="collapsed" />
      </a-layout-sider>

      <a-layout>
        <Header :handleCollapse="handleCollapse" :collapsed="collapsed" />

        <a-layout-content class="p-[12px]">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core';

import Header from './Header.vue';
import SideMenu from './SideMenu.vue';

import { useThemeStore } from '@/store/theme';

const themeStore = useThemeStore();
const collapsed = useStorage('collapsed', false);

const handleCollapse = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style lang="less" scoped>
.basic-layout {
  .ant-layout-sider-light {
    border-right: 1px solid var(--colorBorderSecondary);
  }

  .ant-layout-sider-dark {
    background: var(--colorBgContainer);
  }
}
</style>
