<template>
  <div class="basic-table-page">
    <a-card>
      <a-form layout="inline" :model="searchParams" class="basic-table-form" @finish="handleSearch">
        <a-form-item label="钱包地址" name="approvalAddr">
          <a-input v-model:value="searchParams.approvalAddr" placeholder="请输入钱包地址" />
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
          <template v-if="column.dataIndex === 'approvalAddr'">
            <a @click="copy(text)">
              {{ formatWalletAddress(text) }}
            </a>
          </template>

          <template v-if="column.dataIndex === 'operationStatus'">
            <a-tag :color="text === 2 ? 'green' : 'red'">
              {{ getStatus(text) }}
            </a-tag>
          </template>

          <template v-if="column.dataIndex === 'action'">
            <a-button
              size="small"
              danger
              style="margin-right: 12px"
              type="primary"
              :disabled="record.operationStatus !== 0"
              @click="handleApprove(record, 1)"
            >
              拒绝
            </a-button>
            <a-button
              size="small"
              type="primary"
              :disabled="record.operationStatus !== 0"
              @click="handleApprove(record, 2)"
            >
              通过
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue';

import { userAssetHistoryListApi, userAssetWithdrawalApproveApi } from '@/api';
import { useClipboard } from '@/hooks/useClipboard';
import { useTable } from '@/hooks/useTable';
import { useStore } from '@/store';
import { formatDate, formatWalletAddress } from '@/utils';
import { transferUsdt } from '@/web3';

const columns = [
  {
    title: '钱包地址',
    dataIndex: 'approvalAddr',
    align: 'center',
    fixed: 'left',
    width: 200,
  },
  {
    title: '提现数量(USDT)',
    dataIndex: 'operationAmount',
    align: 'center',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'operationStatus',
    align: 'center',
    width: 150,
  },
  {
    title: '提现时间',
    dataIndex: 'createdTime',
    align: 'center',
    width: 200,
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    fixed: 'right',
    width: 150,
  },
];

const { copy } = useClipboard();
const DEFAULT_SEARCH_PARAMS = { operationType: 4, approvalAddr: undefined };
const store = useStore();

const getStatus = (status) => {
  const map = {
    0: '提现中',
    2: '提现成功',
    1: '提现失败',
  };
  return map[status];
};

const { tableProps, searchParams, handleSearch, handleReset } = useTable({
  columns,
  request: userAssetHistoryListApi,
  defaultSearchParams: DEFAULT_SEARCH_PARAMS,
  formatter: (item) => ({
    ...item,
    createdTime: formatDate(item.createdTime),
  }),
});

const handleApprove = async (record, operationStatus) => {
  if (!store.walletAddress && operationStatus === 2) {
    await store.connectWallet();
  }

  if (operationStatus === 2) {
    await transferUsdt(record.approvalAddr, record.operationAmount);
  }

  await userAssetWithdrawalApproveApi({
    approvalAddr: record.approvalAddr,
    chainType: 2,
    id: record.id,
    operationStatus,
    operationType: 4,
  });
  message.success('操作成功');
  handleSearch();
};
</script>
