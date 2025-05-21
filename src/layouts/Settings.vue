<template>
  <a-flex gap="small">
    <a-popover>
      <template #content>
        <a-flex gap="small">
          <div
            v-for="color in themeStore.colorPrimaryList"
            :key="color"
            class="color-primary-item"
            :style="{ background: color }"
            @click="themeStore.setColorPrimary(color)"
          />
        </a-flex>
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

    <template v-if="store.userInfo">
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="$router.push('/accountSettings')">
              <SettingOutlined />
              {{ $t('accountSettings') }}
            </a-menu-item>
            <a-menu-item @click="store.logout">
              <LogoutOutlined />
              {{ $t('logout') }}
            </a-menu-item>
          </a-menu>
        </template>
        <a-avatar :src="store.userInfo.avatar" class="user-avatar" />
      </a-dropdown>
    </template>
  </a-flex>
</template>

<script setup>
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  GlobalOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import { useFullscreen } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

import { setLocale, SUPPORTED_LOCALES } from '@/locales';
import { useStore } from '@/store';
import { useThemeStore } from '@/store/theme';

const themeStore = useThemeStore();
const store = useStore();
const { locale } = useI18n();
const { isFullscreen, toggle } = useFullscreen();
</script>

<style lang="less" scoped>
.color-primary-item {
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: var(--border-radius);
}

.user-avatar {
  margin-left: 8px;
  cursor: pointer;
}
</style>
