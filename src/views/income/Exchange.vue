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
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'approvalAddr'">
            <a @click="copy(text)">
              {{ formatWalletAddress(text) }}
            </a>
          </template>

          <template v-if="column.dataIndex === 'operationStatus'">
            <a-tag :color="text === 2 ? 'green' : 'red'">
              {{ text === 2 ? '成功' : '失败' }}
            </a-tag>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { userAssetHistoryListApi } from '@/api';
import { useClipboard } from '@/hooks/useClipboard';
import { useTable } from '@/hooks/useTable';
import { formatDate, formatWalletAddress } from '@/utils';

const columns = [
  {
    title: '钱包地址',
    dataIndex: 'approvalAddr',
    align: 'center',
    fixed: 'left',
    width: 200,
  },
  {
    title: '兑换数量(ETH)',
    dataIndex: 'operationAmount',
    align: 'center',
    width: 150,
  },
  // {
  //   title: '兑换数量(USDT)',
  //   dataIndex: 'operationAmountUsdt',
  //   align: 'center',
  //   width: 150,
  // },
  {
    title: '状态',
    dataIndex: 'operationStatus',
    align: 'center',
    width: 150,
  },
  {
    title: '兑换时间',
    dataIndex: 'createdTime',
    align: 'center',
    width: 200,
  },
];

const { copy } = useClipboard();
const DEFAULT_SEARCH_PARAMS = { operationType: 3, approvalAddr: undefined };

const { tableProps, searchParams, handleSearch, handleReset } = useTable({
  columns,
  request: userAssetHistoryListApi,
  defaultSearchParams: DEFAULT_SEARCH_PARAMS,
  formatter: (item) => ({
    ...item,
    createdTime: formatDate(item.createdTime),
    chainType: 'eth',
  }),
});
</script>
