<template>
  <a-card>
    <div class="flex flex-wrap gap-6">
      <a-button
        v-for="svgName in SVG_ICONS_LIST"
        :key="svgName"
        type="text"
        shape="circle"
        :title="svgName"
        @click="handleCopy(svgName)"
      >
        <template #icon>
          <svg-icon :name="svgName" />
        </template>
      </a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import svgIcons from '@/admin/assets/svgIcons';
import { copyToClipboard } from '@/admin/utils';

const SVG_ICONS_LIST = Object.keys(svgIcons);

const handleCopy = (item) => {
  copyToClipboard(`<svg-icon name="${item}" />`);
};
</script>
