import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/assets/css/reset.css'

const app = createApp(App)

router.beforeEach((to, from, next) => {
  // 로그인 페이지로 이동할 때만 이전 경로를 저장합니다.
  if (to.name === 'login') {
    store.commit('savePrevPath', from.fullPath)
  }
  next()
})

app.use(router)
app.use(store)

app.mount('#app')
