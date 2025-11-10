<template>
  <a-card>
    <div class="flex flex-wrap gap-6">
      <a-button
        v-for="svgName in SVG_ICONS_LIST"
        :key="svgName"
        type="text"
        shape="circle"
        size="large"
        :title="svgName"
        @click="handleCopy(svgName)"
      >
        <template #icon>
          <svg-icon :name="svgName" class="!size-[20px]" />
        </template>
      </a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import svgIcons from '@/assets/svgIcons';
import { copyToClipboard } from '@/utils';

const SVG_ICONS_LIST = Object.keys(svgIcons);

const handleCopy = (item) => {
  copyToClipboard(`<svg-icon name="${item}" />`);
};
</script>
