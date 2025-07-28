<template>
  <div class="home-page">
    <van-button @click="handleCollect">{{ $t('connectWallet') }}</van-button>
    <div class="pt-[20px] text-[16px] font-bold text-red-500">Tailwind CSS</div>
  </div>
  <BottomBar />
</template>

<script setup lang="ts">
import { connectWallet, fetchStakingInstance } from '@/app/web3';

const handleCollect = async () => {
  await connectWallet();
  fetchStakingInstance();
};
</script>
