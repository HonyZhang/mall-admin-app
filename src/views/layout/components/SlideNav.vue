<template>
  <div class="main-header">
    <div class="header-left">
      <a-button
        class="fold-btn"
        type="primary"
        style="margin-bottom: 16px"
        @click="toggleCollapsed"
        @keyup.enter="toggleCollapsed"
      >
        <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <div class="breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item><a href="">统计</a></a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>
    <div class="header-right">
      <a-dropdown>
        <a
          class="ant-dropdown-link user-info"
          @click="(e) => e.preventDefault()"
          @keyup.enter="(e) => e.preventDefault()"
        >
          您好，张翔 <a-icon type="down" />
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <a href="javascript:;">退出</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
  },
};
</script>
