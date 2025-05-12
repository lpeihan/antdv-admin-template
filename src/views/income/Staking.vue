<template>
  <div class="basic-table-page">
    <a-card>
      <a-form
        layout="inline"
        :model="searchParams"
        class="basic-table-form"
        @finish="handleSearch"
      >
        <a-form-item label="钱包地址" name="approvalAddr">
          <a-input
            v-model:value="searchParams.approvalAddr"
            placeholder="请输入钱包地址"
          />
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

          <template v-if="column.dataIndex === 'amount'">
            {{ text || '-' }}
          </template>

          <template v-if="column.dataIndex === 'currentRate'">
            {{ text ? text * 100 + '%' : '-' }}
          </template>

          <template v-if="column.dataIndex === 'income'">
            {{ text || '-' }}
          </template>

          <template v-if="column.dataIndex === 'activityStatus'">
            <a-tag :color="text === 0 ? 'green' : 'red'">
              {{ text === 0 ? '质押中' : '已结束' }}
            </a-tag>
          </template>

          <template v-if="column.dataIndex === 'endTime'">
            {{ text || '-' }}
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
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
    title: '质押数量',
    dataIndex: 'amount',
    align: 'center',
    width: 150,
  },
  {
    title: '质押状态',
    dataIndex: 'activityStatus',
    align: 'center',
    width: 150,
  },
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
    title: '开始时间',
    dataIndex: 'startTime',
    align: 'center',
    width: 200,
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    align: 'center',
    width: 200,
  },
];

const { copy } = useClipboard();
const DEFAULT_SEARCH_PARAMS = { activityType: 1, approvalAddr: undefined };

const { tableProps, searchParams, handleSearch, handleReset } = useTable({
  columns,
  request: userActivityListApi,
  defaultSearchParams: DEFAULT_SEARCH_PARAMS,
  formatter: (item) => ({
    ...item,
    startTime: formatDate(item.startTime),
    endTime: formatDate(item.endTime),
  }),
});
</script>
