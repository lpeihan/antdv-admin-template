<template>
  <a-config-provider :locale="state.antdLocale" :theme="themeStore.antdThemeConfig">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { getAntdLocale } from '@/locales';
import { useThemeStore } from '@/store/theme';

const { locale } = useI18n();
const themeStore = useThemeStore();

const state = reactive({
  antdLocale: getAntdLocale(),
});

watch(locale, () => {
  state.antdLocale = getAntdLocale();
});
</script>
