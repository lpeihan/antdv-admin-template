<template>
  <icon
    :icon="themeStore.isDarkTheme ? 'brightness' : 'moon-stars'"
    @click="themeStore.setTheme(themeStore.isDarkTheme ? 'light' : 'dark')"
  />

  <icon :icon="isFullscreen ? FullscreenExitOutlined : FullscreenOutlined" @click="toggle" />

  <a-dropdown>
    <template #overlay>
      <a-menu :selectedKeys="[locale]" @click="({ key }) => setLocale(key)">
        <a-menu-item v-for="item in SUPPORTED_LOCALES" :key="item.value">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </template>

    <icon :icon="GlobalOutlined" />
  </a-dropdown>
</template>

<script setup>
import { FullscreenExitOutlined, FullscreenOutlined, GlobalOutlined } from '@ant-design/icons-vue';
import { useFullscreen } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

import { setLocale, SUPPORTED_LOCALES } from '@/locales';
import { useThemeStore } from '@/store/theme';

const themeStore = useThemeStore();
const { locale } = useI18n();
const { isFullscreen, toggle } = useFullscreen();
</script>
