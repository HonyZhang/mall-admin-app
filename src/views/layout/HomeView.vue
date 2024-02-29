<template>
  <div class="home">
    <LeftMenu></LeftMenu>
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <SlideNav></SlideNav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/LeftMenu.vue';
import SlideNav from './components/SlideNav.vue';

export default {
  components: {
    LeftMenu,
    SlideNav,
  },
};
</script>

<style lang="less">
@import url("~@/assets/css/home-view.less");
</style>
