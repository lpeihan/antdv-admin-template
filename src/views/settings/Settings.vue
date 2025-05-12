<template>
  <a-card>
    <a-table
      :columns="columns"
      :data-source="state.dataSource"
      :loading="state.loading"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="['parmaValue'].includes(column.dataIndex)">
          <a-input
            v-model:value="record[column.dataIndex]"
            style="width: 400px"
          />
        </template>
        <template v-else-if="column.dataIndex === 'actions'">
          <a-button type="primary" size="small" @click="handleUpdate(record)">
            更新
          </a-button>
        </template>
      </template>
    </a-table>
  </a-card>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { onMounted, reactive } from 'vue';

import { fetchSystemConfigApi, updateSystemConfigApi } from '@/api';

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    align: 'center',
    width: '200',
  },
  {
    title: '参数名称',
    dataIndex: 'paramName',
    align: 'center',
    width: '200',
  },
  {
    title: '参数值',
    dataIndex: 'parmaValue',
    align: 'center',
    width: '400',
  },
  {
    title: '操作',
    dataIndex: 'actions',
    align: 'center',
    width: '150',
  },
];

const state = reactive({
  dataSource: [],
  editableData: {},
  loading: false,
});

onMounted(() => {
  fetchSystemConfig();
});

const fetchSystemConfig = async () => {
  state.loading = true;
  const res = await fetchSystemConfigApi();
  state.loading = false;
  state.dataSource = res.data
    .filter((item) =>
      [
        '质押钱包',
        '质押每日收益率（%）',
        '余额活动收益率（%）',
        'telegfam链接',
      ].includes(item.paramName),
    )
    .map((item, index) => ({
      ...item,
      index: index + 1,
    }));
};

const handleUpdate = async (record) => {
  await updateSystemConfigApi({
    ...record,
    parmValue: record.parmaValue.trim(),
  });
  fetchSystemConfig();
  message.success('保存成功');
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
