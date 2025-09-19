<template>
  <a-config-provider
    :key="state.key"
    :locale="state.antdLocale"
    :theme="themeStore.antdThemeConfig"
  >
    <router-view />
  </a-config-provider>
</template>

<script setup>
import { useEventBus } from '@vueuse/core';
import { theme } from 'ant-design-vue';
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { EVENT_BUS_KEY } from '@/constants';
import { getAntdLocale } from '@/locales';
import { useThemeStore } from '@/store';

const { useToken } = theme;

const { token } = useToken();
const themeStore = useThemeStore();
const { locale } = useI18n();
const reloadEventBus = useEventBus(EVENT_BUS_KEY.reload);

reloadEventBus.on(() => {
  state.key++;
});

const state = reactive({
  antdLocale: getAntdLocale(),
  key: 0,
});

watch(locale, () => {
  state.antdLocale = getAntdLocale();
});

watch(
  token,
  () => {
    themeStore.applyAntdCssVariablesViaStyle(token.value);
  },
  {
    immediate: true,
  },
);
</script>
