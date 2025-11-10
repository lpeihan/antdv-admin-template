<template>
  <a-config-provider
    :key="state.key"
    :locale="state.antdLocale"
    :theme="themeStore.antdThemeConfig"
  >
    <router-view />

    <modal-manager ref="modalManagerRef" />
  </a-config-provider>
</template>

<script setup lang="ts">
import { useEventBus } from '@vueuse/core';
import { theme } from 'ant-design-vue';
import { reactive, useTemplateRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { ModalManager } from '@/components';
import { EVENT_BUS_KEY } from '@/constants';
import { getAntdLocale } from '@/locales';
import { useThemeStore } from '@/stores';

const { useToken } = theme;

const { token } = useToken();
const { locale } = useI18n();
const themeStore = useThemeStore();
const modalManagerRef = useTemplateRef<typeof ModalManager>('modalManagerRef');

useEventBus(EVENT_BUS_KEY.showModal).on((component, props) => {
  modalManagerRef.value.showModal(component, props);
});

useEventBus(EVENT_BUS_KEY.refresh).on(() => {
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
