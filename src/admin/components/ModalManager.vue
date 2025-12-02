<template>
  <Teleport to="body">
    <component
      :is="item.component"
      v-for="item in modals"
      :key="item.id"
      v-bind="item.props"
      :ref="(el) => setModalRef(el)"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { markRaw, nextTick, ref } from 'vue';

let id = 0;

const modals = ref([]);

const setModalRef = (el) => {
  nextTick(() => el?.showModal?.());
};

const showModal = (component, props = {}) => {
  const modalId = ++id;

  modals.value.push({
    id: modalId,
    component: markRaw(component),
    props: {
      ...props,
      afterClose: () => {
        modals.value = modals.value.filter((item) => item.id !== modalId);
      },
    },
  });
};

defineExpose({ showModal });
</script>
