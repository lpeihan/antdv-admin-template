<template>
  <div>
    <TopBar title="My" :back="false" />

    <BottomBar />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useWeb3Store } from '@/app/stores/web3';

const web3Store = useWeb3Store();

onMounted(async () => {
  await web3Store.connectWallet();
});
</script>
