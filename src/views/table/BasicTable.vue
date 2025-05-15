<template>
  <div class="basic-table-page">
    <a-card>
      <a-form layout="inline" :model="searchParams" class="basic-table-form" @finish="handleSearch">
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="searchParams.email" placeholder="请输入邮箱" />
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
          <template v-if="column.dataIndex === 'avatar'">
            <a-avatar :src="text" />
          </template>

          <template v-if="column.dataIndex === 'status'">
            <a-tag :color="text === 'active' ? 'green' : 'red'">
              {{ text }}
            </a-tag>
          </template>

          <template v-if="column.dataIndex === 'email'">
            <a @click="copy(text)">
              {{ text }}
            </a>
          </template>

          <template v-if="column.dataIndex === 'action'">
            <a-button size="small" type="link">编辑</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { fetchUserListApi } from '@/api';
import { useClipboard } from '@/hooks/useClipboard';
import { useTable } from '@/hooks/useTable';
import { formatTime } from '@/utils/formatter';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    sorter: true,
    fixed: 'left',
    width: 100,
  },
  {
    title: '用户名',
    dataIndex: 'name',
    align: 'center',
    width: 150,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    align: 'center',
    width: 150,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    align: 'center',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: 150,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    align: 'center',
    width: 200,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
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

const { copy } = useClipboard();
const DEFAULT_SEARCH_PARAMS = { email: '' };

const { tableProps, searchParams, handleSearch, handleReset } = useTable({
  columns,
  request: fetchUserListApi,
  defaultSearchParams: DEFAULT_SEARCH_PARAMS,
  selectable: true,
  formatter: (item) => ({
    ...item,
    created_at: formatTime(item.created_at),
    updated_at: formatTime(item.updated_at),
  }),
});
</script>
