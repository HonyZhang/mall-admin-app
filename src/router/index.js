import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenuRoutes from '@/utils/permission';
import HomeView from '../views/layout/HomeView.vue';
import LoginView from '../views/layout/LoginView.vue';

Vue.use(VueRouter);

const asyncRouterMap = [{
  path: '/product',
  name: 'product',
  component: HomeView,
  meta: {
    title: '商品',
    icon: 'inbox',
    hidden: false,
  },
  children: [
    {
      path: 'list',
      name: 'productList',
      component: () => import('@/views/page/ProductList.vue'),
      meta: {
        title: '商品列表',
        icon: 'unordered-list',
        hidden: false,
      },
    },
    {
      path: 'add',
      name: 'productAdd',
      component: () => import('@/views/page/ProductAdd.vue'),
      meta: {
        title: '添加商品',
        icon: 'file-add',
        hidden: false,
      },
    },
    {
      path: 'category',
      name: 'productCategory',
      component: () => import('@/views/page/ProductCategory.vue'),
      meta: {
        title: '商品种类',
        icon: 'database',
        hidden: false,
      },
    },
  ],
}];

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: '首页',
      icon: 'home',
      hidden: false,
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/page/IndexView.vue'),
        meta: {
          title: '统计',
          icon: 'number',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: '登录',
      hidden: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
  const menuRoutes = getMenuRoutes(store.state.user.role, asyncRouterMap);
  router.addRoutes(menuRoutes);
  store.dispatch('changeMenuRoutes', routes.concat(menuRoutes));
}

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
