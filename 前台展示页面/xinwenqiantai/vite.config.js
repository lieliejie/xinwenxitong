import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/qiantai/',
  plugins: [vue()],
})
// 跨域问题一般都是后端提前在服务里配置好解决，
// 这是最规范的做法；要是后端暂时没配置或者漏了接口，前端就在Vite的配置文件里写代理代码，把对应接口转发到后端地址来解决。