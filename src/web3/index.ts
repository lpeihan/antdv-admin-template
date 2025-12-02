import { showToast } from 'vant';
import Web3 from 'web3';

import { movePointRight } from './utils';

export const config = {
  UsdtAbi: require('./abi/usdt.json'),
  UsdtAddress: process.env.USDT_ADDRESS,
  UsdtDecimals: process.env.USDT_DECIMALS,
};

let walletAddress;
let web3;

export async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      walletAddress = accounts[0];
      console.log('🚀 ~ connectWallet ~ walletAddress:', walletAddress);

      web3 = new Web3(window.ethereum);

      return walletAddress;
    } catch (error) {
      console.error('🚀 ~ connectWallet ~ error:', error);
      throw new Error(error);
    }
  } else {
    const errorMessage = 'Ethereum wallet is not installed.';

    showToast(errorMessage);
    throw new Error(errorMessage);
  }
}

export const transferUsdt = async (toAddress, amount) => {
  try {
    const contract = new web3.eth.Contract(config.UsdtAbi, config.UsdtAddress);

    amount = movePointRight(amount, config.UsdtDecimals);
    const result = await contract.methods.transfer(toAddress, amount).send({ from: walletAddress });

    console.log('🚀 ~ transferUsdt ~ result:', result);
    return result;
  } catch (err) {
    console.error('🚀 ~ transferUsdt ~ error:', err);

    showToast(err.message);
    throw err;
  }
};
