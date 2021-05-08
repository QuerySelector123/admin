import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import("../views/Home.vue"),
    redirect: {
      name: 'users'
    },
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('../views/Users.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('../views/Roles.vue')
      },
      {
        path: 'rights',
        name: 'rights',
        component: () => import('../views/Rights.vue')
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('../views/Goods.vue')
      },
      {
        path: 'params',
        name: 'params',
        component: () => import('../views/Params.vue')
      },
      {
        path: 'categories',
        name: 'categories',
        component: () => import('../views/Categories.vue')
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/Orders.vue')
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('../views/Reports.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(to);
  if (to.name !== 'login') {

    if (!store.state.token) {
      next({
        replace: true,
        name: 'login'
      })

    } else {
      next()

    }

  } else {
    next()
  }
})
export default router
