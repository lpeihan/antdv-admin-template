import { ref } from 'vue';

export function useModal() {
  const visible = ref(false);
  const loading = ref(false);

  const open = () => {
    visible.value = true;
  };

  const close = () => {
    visible.value = false;
    closeLoading();
  };

  const showLoading = () => {
    loading.value = true;
  };

  const closeLoading = () => {
    loading.value = false;
  };

  return {
    visible,
    open,
    close,
    loading,
    showLoading,
    closeLoading,
  };
}
