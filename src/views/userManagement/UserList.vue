<template>
  <div class="basic-table-page">
    <a-card>
      <a-form layout="inline" class="basic-table-form" @finish="handleSearch">
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="searchParams.email" allow-clear placeholder="请输入邮箱" />
        </a-form-item>

        <a-form-item label="状态" name="status">
          <a-select
            v-model:value="searchParams.status"
            allow-clear
            placeholder="请选择状态"
            :options="USER_STATUS_OPTIONS"
            @change="handleSearch"
          />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" ghost @click="handleAdd">
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
        <template #bodyCell="{ column: { dataIndex }, text, record }">
          <template v-if="dataIndex === 'avatar'">
            <a-avatar :src="text" size="large" />
          </template>

          <template v-if="dataIndex === 'actions'">
            <a-button type="link" @click="handleEdit(record)">编辑</a-button>
          </template>
        </template>
      </a-table>
    </a-card>

    <UserInfoModal ref="userInfoModalRef" />
  </div>
</template>

<script setup>
import { PlusOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { useTemplateRef } from 'vue';

import { fetchUserListApi as api } from '@/api';
import { USER_STATUS_OPTIONS } from '@/constants';
import { useTable } from '@/hooks';

import UserInfoModal from './UserInfoModal.vue';

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

const userInfoModalRef = useTemplateRef('userInfoModalRef');
const { tableProps, searchParams, handleSearch } = useTable({
  columns,
  api,
  defaultSearchParams: {},
});

const handleAdd = () => {
  userInfoModalRef.value.openModal();
};

const handleEdit = (record) => {
  userInfoModalRef.value.openModal(record);
};
</script>
