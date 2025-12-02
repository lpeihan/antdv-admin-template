import { defineStore } from 'pinia';

import { connectWallet } from '@/web3';

export const useWeb3Store = defineStore('web3', {
  state: () => {
    return {
      walletAddress: '',
    };
  },
  actions: {
    async connectWallet() {
      const walletAddress = await connectWallet();

      this.walletAddress = walletAddress;
    },
  },
});
