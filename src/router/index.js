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
  },
  children: [
    {
      path: 'list',
      name: 'productList',
      component: () => import('@/views/page/ProductList.vue'),
      meta: {
        title: '商品列表',
      },
    },
    {
      path: 'add',
      name: 'productAdd',
      component: () => import('@/views/page/ProductAdd.vue'),
      meta: {
        title: '添加商品',
      },
    },
    {
      path: 'category',
      name: 'productCategory',
      component: () => import('@/views/page/ProductCategory.vue'),
      meta: {
        title: '商品种类',
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
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/page/IndexView.vue'),
        meta: {
          title: '统计',
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
    },
  },
];

const router = new VueRouter({
  routes,
});

let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, asyncRouterMap);
        router.addRoutes(menuRoutes);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes));
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
