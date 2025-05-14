<template>
  <div class="user-layout">
    <router-view />
  </div>
</template>

<style lang="less" scoped>
.user-layout {
  height: 100vh;
  background: var(--login-bg-color) url('@/assets/images/background.svg') no-repeat center center;
  background-size: 100%;
}
</style>
