import { TableColumnProps } from 'ant-design-vue';
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';

import { useClipboard } from '@/hooks';

type ColumnProps = TableColumnProps & {
  dataIndex: string;
  isLink: boolean;
};

function formatColumns(columns: ColumnProps[]) {
  const { copy } = useClipboard();

  const getCustomProps = ({ dataIndex, isLink }: ColumnProps) => {
    if (['created_at', 'updated_at'].includes(dataIndex)) {
      return {
        customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
      };
    }

    if (isLink) {
      return {
        customRender: ({ text }) => <a onClick={() => copy(text)}>{text}</a>,
      };
    }

    return null;
  };

  return columns.map((item) => ({
    align: 'center',
    ...getCustomProps(item),
    ...item,
  }));
}

export const useTable = (options) => {
  const {
    defaultSearchParams = {},
    columns,
    api,
    formatter = (item) => item,
    selectable = false,
  } = options;

  const dataSource = ref([]);
  const loading = ref(false);
  const pagination = ref({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total) => `共 ${total} 条`,
    showSizeChanger: true,
  });
  const rowSelection = ref({
    onChange: (keys) => {
      selectedRowKeys.value = keys;
    },
  });
  const selectedRowKeys = ref([]);
  const formattedColumns = formatColumns(columns);

  const searchParams = ref({ ...defaultSearchParams });

  const scroll = {
    x: formattedColumns.reduce((acc, item) => acc + Number(item.width), 0),
  };

  const fetchList = async () => {
    loading.value = true;

    try {
      const res = await api({
        ...searchParams.value,
        pageNum: pagination.value.current,
        pageSize: pagination.value.pageSize,
      });
      const list = res.data.list;
      dataSource.value = list.map(formatter);
      pagination.value.total = res.data.total || 0;
    } finally {
      loading.value = false;
    }
  };

  const handleChangeTable = (page, filters, sorter) => {
    pagination.value.current = page.current;
    pagination.value.pageSize = page.pageSize;

    if (sorter.field) {
      searchParams.value.sort = sorter.field;
      searchParams.value.order = sorter.order;
    } else {
      delete searchParams.value.sort;
      delete searchParams.value.order;
    }

    fetchList();
  };

  const handleSearch = () => {
    pagination.value.current = 1;
    fetchList();
  };

  const handleReset = () => {
    Object.assign(searchParams.value, defaultSearchParams);
    handleSearch();
  };

  onMounted(fetchList);

  const tableProps = computed(() => ({
    dataSource: dataSource.value,
    columns: formattedColumns,
    scroll,
    loading: loading.value,
    pagination: pagination.value,
    onChange: handleChangeTable,
    rowKey: 'id',
    rowSelection: selectable ? rowSelection.value : undefined,
    selectedRowKeys: selectedRowKeys.value,
  }));

  return {
    tableProps,
    searchParams,
    handleSearch,
    handleReset,
    fetchList,
  };
};
