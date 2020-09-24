import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import store from '../store/index.js'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta: {
    //   guest : true
    // }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  // store
})
router.beforeEach((to,from,next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  console.log(store.state.tokens);
  if(requiresAuth == true && store.state.tokens){
    next()
  }else if (requiresAuth && store.state.tokens == false) {
    next('/')
  }else{
    next()
  }
  
}) 


export default router