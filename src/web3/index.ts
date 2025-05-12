import { message } from 'ant-design-vue';
import Web3 from 'web3';

import config from './config';
import { movePointRight } from './utils';

import numberUtils from '@/utils/numberUtils';

const USDT_DECIMALS = 18;

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
    const errorMessage = 'Ethereum wallet is not installed. Please install MetaMask!';

    message.error(errorMessage);
    throw new Error(errorMessage);
  }
}

export const transferFromUsdt = async (from, to, amount) => {
  try {
    const contract = new web3.eth.Contract(config.UsdtAbi, config.UsdtAddress);

    amount = numberUtils.movePointRight(amount, USDT_DECIMALS);
    const result = await contract.methods
      .transferFrom(from, to, amount)
      .send({ from: walletAddress });

    console.log('🚀 ~ transferFromUsdt ~ result:', result);
    return result;
  } catch (err) {
    console.error('🚀 ~ transferFromUsdt ~ error:', err);

    return Promise.reject(err);
  }
};

export const transferUsdt = async (toAddress, amount) => {
  try {
    const contract = new web3.eth.Contract(config.UsdtAbi, config.UsdtAddress);

    amount = movePointRight(amount.toString(), USDT_DECIMALS);
    const result = await contract.methods.transfer(toAddress, amount).send({ from: walletAddress });

    console.log('🚀 ~ transferUsdt ~ result:', result);
    return result;
  } catch (err) {
    console.error('🚀 ~ transferUsdt ~ error:', err);
    message.error(err.message);
    return Promise.reject(err);
  }
};
