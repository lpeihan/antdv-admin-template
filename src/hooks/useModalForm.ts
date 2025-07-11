import { computed, reactive, ref, watch } from 'vue';

export const useModalForm = (initialFormValues, formRef) => {
  const form = reactive({ ...initialFormValues });
  const open = ref(false);
  const loading = ref(false);

  const rules = computed(() => {
    return Object.keys(initialFormValues).reduce((acc, key) => {
      acc[key] = { required: true, message: '' };
      return acc;
    }, {});
  });

  watch(open, (value) => {
    if (!value) {
      resetForm();
    }
  });

  const resetForm = () => {
    Object.assign(form, initialFormValues);
    formRef.value?.clearValidate();
  };

  const openModal = (record) => {
    if (record) {
      Object.assign(form, record);
    }

    open.value = true;
  };

  return { form, resetForm, rules, open, loading, openModal };
};
