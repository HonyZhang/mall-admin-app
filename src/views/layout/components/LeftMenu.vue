<template>
  <div :class="{ 'menu-list': true, 'menu-fold': $store.state.collapsed }">
    <a-menu :default-selected-keys="[$route.name]"
    :default-open-keys="[$route.matched[0].name]" mode="inline"
      theme="dark" :inline-collapsed="$store.state.collapsed">
      <template v-for="route in $store.state.menuRoutes">
        <a-sub-menu v-if="!route.meta.hidden" :key="route.name">
          <span slot="title">
            <a-icon :type="route.meta.icon" />
            <span>{{ route.meta.title }}</span>
          </span>
          <a-menu-item v-for="childRoute in route.children" :key="childRoute.name">
            <router-link :to="{ name: childRoute.name }">
              <a-icon :type="childRoute.meta.icon" />
              {{ childRoute.meta.title }}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>
