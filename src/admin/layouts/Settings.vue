<template>
  <div class="flex items-center gap-2">
    <a-popover>
      <template #content>
        <div class="flex gap-2">
          <div
            v-for="color in themeStore.colorPrimaryList"
            :key="color"
            class="h-[28px] w-[28px] cursor-pointer rounded-sm"
            :style="{ background: color }"
            @click="themeStore.setColorPrimary(color)"
          />
        </div>
      </template>
      <a-button type="text" shape="circle">
        <template #icon>
          <svg-icon name="palette" />
        </template>
      </a-button>
    </a-popover>

    <a-button type="text" shape="circle" @click="themeStore.toggleTheme">
      <template #icon>
        <svg-icon :name="themeStore.isDarkTheme ? 'brightness' : 'moon'" />
      </template>
    </a-button>

    <a-dropdown>
      <template #overlay>
        <a-menu :selectedKeys="[locale]" @click="({ key }) => setLocale(key)">
          <a-menu-item v-for="item in SUPPORTED_LOCALES" :key="item.value">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </template>

      <a-button type="text" shape="circle">
        <template #icon><GlobalOutlined /></template>
      </a-button>
    </a-dropdown>

    <a-button v-if="isPC" type="text" shape="circle" @click="toggle">
      <template #icon>
        <component :is="isFullscreen ? FullscreenExitOutlined : FullscreenOutlined" />
      </template>
    </a-button>

    <template v-if="userStore.userInfo">
      <a-dropdown>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="$router.push('/profile')">
              <SettingOutlined />
              <span class="ml-[8px]">{{ $t('profile') }}</span>
            </a-menu-item>
            <a-menu-item @click="userStore.logout">
              <LogoutOutlined />
              <span class="ml-[8px]">{{ $t('logout') }}</span>
            </a-menu-item>
          </a-menu>
        </template>
        <a-avatar :src="userStore.userInfo.avatar" class="cursor-pointer" />
      </a-dropdown>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  GlobalOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import { useFullscreen } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

import { useDevice } from '@/admin/hooks';
import { setLocale, SUPPORTED_LOCALES } from '@/admin/locales';
import { useThemeStore, useUserStore } from '@/admin/stores';

const themeStore = useThemeStore();
const userStore = useUserStore();
const { locale } = useI18n();
const { isFullscreen, toggle } = useFullscreen();
const { isPC } = useDevice();
</script>
