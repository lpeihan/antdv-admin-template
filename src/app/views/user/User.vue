<template>
  <div>
    <TopBar title="My" :back="false" />

    <van-button type="primary" @click="showExamplePopup">Primary</van-button>

    <BottomBar />
  </div>
</template>

<script setup lang="ts">
import { showExamplePopup } from '@/app/popup';
</script>
