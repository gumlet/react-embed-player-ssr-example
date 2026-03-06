import { defineConfig } from 'vite'

export default defineConfig({
    server: {
    // this ensures that the browser opens upon server start
    open: false,
    // this sets a default port to 3000
    port: 3000
  }
})
