<template>
  <a-layout-header
    :style="{
      background: store.isDarkTheme ? token.colorBgContainer : 'var(--white)',
    }"
  >
    <div class="layout-header-wrapper">
      <icon
        :icon="props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
        @click="props.handleCollapse"
      />

      <icon :icon="ReloadOutlined" @click="handleReload" />

      <a-breadcrumb class="breadcrumb">
        <a-breadcrumb-item
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          :style="{ cursor: breadcrumb.clickable ? 'pointer' : null }"
          @click="breadcrumb.clickable && navigateTo(breadcrumb)"
        >
          <component :is="breadcrumb.icon" v-if="breadcrumb.icon" />
          <span>{{ breadcrumb.name }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <div class="layout-header-wrapper">
      <icon
        :icon="store.isDarkTheme ? 'brightness' : 'moon-stars'"
        @click="store.setTheme(store.isDarkTheme ? Theme.Light : Theme.Dark)"
      />

      <icon
        :icon="isFullscreen ? FullscreenExitOutlined : FullscreenOutlined"
        @click="toggle"
      />

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

      <a-dropdown>
        <template #overlay>
          <a-menu>
            <!-- <a-menu-item @click="$router.push('/accountSettings')">
              <SettingOutlined />
              {{ t('accountSettings') }}
            </a-menu-item> -->
            <a-menu-item @click="store.logout">
              <LogoutOutlined />
              {{ t('common.logout') }}
            </a-menu-item>
          </a-menu>
        </template>
        <a-avatar :src="userInfo.avatar" class="user-avatar" />
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup>
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  GlobalOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReloadOutlined,
  // SettingOutlined,
} from '@ant-design/icons-vue';
import { useFullscreen } from '@vueuse/core';
import { theme } from 'ant-design-vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { setLocale, SUPPORTED_LOCALES } from '@/locales';
import { useStore } from '@/store';
import { Theme } from '@/utils/constants';

const props = defineProps({
  handleCollapse: {
    type: Function,
    required: true,
  },
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const { useToken } = theme;

const route = useRoute();
const router = useRouter();
const store = useStore();
const { t } = useI18n();
const { isFullscreen, toggle } = useFullscreen();
const { token } = useToken();

const userInfo = computed(() => store.userInfo || {});
const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter((p) => p);
  return pathArray.map((path, index) => {
    const fullPath = '/' + pathArray.slice(0, index + 1).join('/');
    const matchedRoute = router.getRoutes().find((r) => r.path === fullPath);

    const isLastItem = index === pathArray.length - 1;
    const isLayout = matchedRoute?.meta?.layout || false;
    const name = matchedRoute?.meta?.title;

    return {
      name: name && t(name),
      path: fullPath,
      icon: matchedRoute?.meta?.icon || null,
      clickable: !isLastItem && !isLayout,
      children: matchedRoute?.children || [],
    };
  });
});

const handleReload = () => {
  window.location.reload();
};

const navigateTo = (breadcrumb) => {
  const { children, path } = breadcrumb;

  if (children.length > 0) {
    router.push(children[0].path);
  } else {
    router.push(path);
  }
};
</script>

<style lang="less" scoped>
.ant-layout-header {
  display: flex;
  padding: 0 16px;
  line-height: normal;
  background: var(--white);
  justify-content: space-between;
  align-items: center;

  .layout-header-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;

    .breadcrumb {
      margin-left: 10px;
    }

    .user-avatar {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
