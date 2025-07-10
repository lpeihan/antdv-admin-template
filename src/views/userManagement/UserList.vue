<template>
  <div class="basic-table-page">
    <a-card>
      <a-form layout="inline" :model="searchParams" class="basic-table-form" @finish="handleSearch">
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="searchParams.email" allow-clear placeholder="请输入邮箱" />
        </a-form-item>

        <a-form-item label="状态" name="status">
          <a-select
            v-model:value="searchParams.status"
            allow-clear
            placeholder="请选择状态"
            :options="STATUS_OPTIONS"
            @change="handleSearch"
          />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <PlusOutlined />
            </template>
            新增
          </a-button>
          <a-button type="primary" html-type="submit">
            <template #icon>
              <SearchOutlined />
            </template>
            搜索
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>

    <a-card>
      <a-table v-bind="tableProps">
        <template #bodyCell="{ column: { dataIndex }, text }">
          <template v-if="dataIndex === 'avatar'">
            <a-avatar :src="text" />
          </template>

          <template v-if="dataIndex === 'actions'">
            <a-button type="link">编辑</a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { PlusOutlined, SearchOutlined } from '@ant-design/icons-vue';

import { fetchUserListApi as api } from '@/api';
import { useTable } from '@/hooks';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    width: 100,
  },
  {
    title: '用户名',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 150,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    isLink: true,
    width: 200,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    width: 200,
  },
  {
    title: '更新时间',
    dataIndex: 'updated_at',
    width: 200,
  },
  {
    title: '操作',
    dataIndex: 'actions',
    fixed: 'right',
    width: 100,
  },
];

const STATUS_OPTIONS = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 },
];

const { tableProps, searchParams, handleSearch } = useTable({
  columns,
  api,
  defaultSearchParams: {
    email: null,
    status: null,
  },
});
</script>
