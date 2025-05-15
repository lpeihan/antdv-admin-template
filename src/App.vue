<template>
  <a-config-provider :locale="state.antdLocale" :theme="themeStore.antdThemeConfig">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import { reactive } from 'vue';

import { getAntdLocale } from '@/locales';
import { useThemeStore } from '@/store/theme';
import { setLocaleEventBus } from '@/utils/eventBus';

const themeStore = useThemeStore();

const state = reactive({
  antdLocale: getAntdLocale(),
});

setLocaleEventBus.on(() => {
  state.antdLocale = getAntdLocale();
});
</script>
