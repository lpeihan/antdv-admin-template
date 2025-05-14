<template>
  <div class="analysis-page">
    <div class="overview-list">
      <a-card v-for="overview in overviews" :key="overview.title" hoverable class="overview-item">
        <div class="title">
          {{ overview.title }}
        </div>

        <div class="icon-wrapper">
          <div class="value">{{ overview.value.toLocaleString() }}</div>
          <svg-icon :name="overview.icon" />
        </div>

        <div class="total-wrapper">
          <div class="total-title">{{ overview.totalTitle }}</div>
          <div class="total-value">
            {{ overview.totalValue.toLocaleString() }}
          </div>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const overviews = computed(() => [
  {
    icon: 'card',
    title: t('user'),
    totalTitle: t('totalUser'),
    totalValue: 120_000,
    value: 2000,
  },
  {
    icon: 'cake',
    title: t('visit'),
    totalTitle: t('totalVisit'),
    totalValue: 500_000,
    value: 20_000,
  },
  {
    icon: 'download',
    title: t('download'),
    totalTitle: t('totalDownload'),
    totalValue: 120_000,
    value: 8000,
  },
  {
    icon: 'bell',
    title: t('use'),
    totalTitle: t('totalUse'),
    totalValue: 50_000,
    value: 5000,
  },
]);
</script>

<style lang="less" scoped>
.analysis-page {
  .overview-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    .overview-item {
      flex: 1;

      .title {
        font-size: 16px;
        font-weight: bold;
      }

      .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;

        .value {
          font-size: 18px;
        }

        .svg-icon {
          width: 40px;
          height: 40px;
        }
      }

      .total-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
