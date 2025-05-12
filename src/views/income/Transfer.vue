<template>
  <div class="basic-table-page">
    <a-card>
      <a-form layout="inline" :model="searchParams" class="basic-table-form" @finish="handleSearch">
        <a-form-item label="钱包地址">
          <a-input v-model:value="searchParams.fromAddr" placeholder="请输入钱包地址" />
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
          <template v-if="column.dataIndex === 'fromAddr'">
            <a @click="copy(text)">
              {{ formatWalletAddress(text) }}
            </a>
          </template>

          <template v-if="column.dataIndex === 'toAddr'">
            <a @click="copy(text)">
              {{ formatWalletAddress(text) }}
            </a>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { transferListApi } from '@/api';
import { useClipboard } from '@/hooks/useClipboard';
import { useTable } from '@/hooks/useTable';
import { formatDate, formatWalletAddress } from '@/utils';

const columns = [
  {
    title: '转出地址',
    dataIndex: 'fromAddr',
    align: 'center',
    fixed: 'left',
    width: 200,
  },
  {
    title: '转入地址',
    dataIndex: 'toAddr',
    align: 'center',
    width: 200,
  },
  {
    title: '转账数量(USDT)',
    dataIndex: 'amount',
    align: 'center',
    width: 150,
  },
  {
    title: '转账时间',
    dataIndex: 'createdTime',
    align: 'center',
    width: 150,
  },
];

const { copy } = useClipboard();

const DEFAULT_SEARCH_PARAMS = {
  fromAddr: undefined,
};

const { tableProps, searchParams, handleSearch, handleReset } = useTable({
  columns,
  request: transferListApi,
  defaultSearchParams: DEFAULT_SEARCH_PARAMS,
  formatter: (item) => ({
    ...item,
    createdTime: formatDate(item.createdTime),
  }),
});
</script>
