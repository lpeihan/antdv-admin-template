<template>
  <div class="basic-table-page">
    <a-card>
      <a-form layout="inline" :model="searchParams" class="basic-table-form" @finish="handleSearch">
        <a-form-item label="钱包地址" name="approvalAddr">
          <a-input v-model:value="searchParams.approvalAddr" placeholder="请输入钱包地址" />
        </a-form-item>

        <!-- <a-form-item label="授权状态" name="authStatus">
          <a-select
            v-model:value="searchParams.authStatus"
            placeholder="请选择授权状态"
            style="width: 178px"
          >
            <a-select-option :value="1">已授权</a-select-option>
            <a-select-option :value="0">未授权</a-select-option>
          </a-select>
        </a-form-item> -->

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

          <template v-if="column.dataIndex === 'amount'">
            {{ text || '-' }}
          </template>

          <template v-if="column.dataIndex === 'income'">
            {{ text || '-' }}
          </template>

          <template v-if="column.dataIndex === 'incomeUsdt'">
            {{ text || '-' }}
          </template>

          <template v-if="column.dataIndex === 'currentRate'">
            {{ text ? text * 100 + '%' : '-' }}
          </template>

          <template v-if="column.dataIndex === 'authStatus'">
            <a-tag :color="text === 1 ? 'green' : 'red'">
              {{ text === 1 ? '已授权' : '未授权' }}
            </a-tag>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { watch } from 'vue';

import { userActivityListApi } from '@/api';
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
    title: '参与数量',
    dataIndex: 'amount',
    align: 'center',
    width: 150,
  },
  // {
  //   title: '授权状态',
  //   dataIndex: 'authStatus',
  //   align: 'center',
  //   width: 150,
  // },
  {
    title: '收益(ETH)',
    dataIndex: 'income',
    align: 'center',
    width: 150,
  },
  {
    title: '收益(USDT)',
    dataIndex: 'incomeUsdt',
    align: 'center',
    width: 150,
  },
  {
    title: '收益率',
    dataIndex: 'currentRate',
    align: 'center',
    width: 150,
  },
  {
    title: '时间',
    dataIndex: 'startTime',
    align: 'center',
    width: 200,
  },
];

const { copy } = useClipboard();

const DEFAULT_SEARCH_PARAMS = {
  activityType: 0,
  approvalAddr: undefined,
  authStatus: undefined,
};

const { tableProps, searchParams, handleSearch, handleReset, fetchList } = useTable({
  columns,
  request: userActivityListApi,
  defaultSearchParams: DEFAULT_SEARCH_PARAMS,
  formatter: (item) => ({
    ...item,
    startTime: formatDate(item.startTime),
  }),
});

watch(
  () => searchParams.value.authStatus,
  () => {
    fetchList();
  },
);
</script>
