<template>
  <van-popup v-model:show="state.show" round :close-on-click-overlay="false" closeable>
    <div class="h-[300px] w-[300px]">Example</div>
  </van-popup>
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({ show: false, value: undefined });

const open = () => {
  state.show = true;
};

const close = () => {
  state.show = false;
};

defineExpose({
  open,
  close,
});
</script>
