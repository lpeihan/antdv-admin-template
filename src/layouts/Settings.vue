<template>
  <a-popover v-model:open="state.isOpenTheme" title="">
    <template #content>
      <div class="theme-color-list">
        <div
          v-for="item in themeStore.themeColorList"
          :key="item"
          class="theme-color-item"
          :style="{ background: item }"
          @click="handleChangeTheme(item)"
        >
          <svg-icon v-if="item === themeStore.colorPrimary" name="check" />
        </div>
      </div>
    </template>
    <icon icon="palette" />
  </a-popover>

  <icon :icon="themeStore.isDarkTheme ? 'brightness' : 'moon'" @click="themeStore.toggleTheme" />

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

  <icon :icon="isFullscreen ? FullscreenExitOutlined : FullscreenOutlined" @click="toggle" />
</template>

<script setup>
import { FullscreenExitOutlined, FullscreenOutlined, GlobalOutlined } from '@ant-design/icons-vue';
import { useFullscreen } from '@vueuse/core';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import { setLocale, SUPPORTED_LOCALES } from '@/locales';
import { useThemeStore } from '@/store/theme';

const themeStore = useThemeStore();
const { locale } = useI18n();
const { isFullscreen, toggle } = useFullscreen();

const state = reactive({
  isOpenTheme: false,
});

const handleChangeTheme = (color) => {
  themeStore.setColorPrimary(color);
  state.isOpenTheme = false;
};
</script>

<style lang="less" scoped>
.theme-color-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .theme-color-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    cursor: pointer;
    border-radius: 2px;
  }
}
</style>
