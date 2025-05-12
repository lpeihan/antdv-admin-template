<template>
  <a-config-provider :locale="state.antdLocale" :theme="themeConfig">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import { theme } from 'ant-design-vue';
import { computed, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { getAntdLocale } from '@/locales';
import { useStore } from '@/store';

const { locale } = useI18n();
const store = useStore();

const themeConfig = computed(() => ({
  algorithm: store.isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: store.themeColor,
    controlHeight: 34,
  },
}));

const state = reactive({
  antdLocale: getAntdLocale(),
});

watch(locale, () => {
  state.antdLocale = getAntdLocale();
});
</script>
