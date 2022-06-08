import { defineConfig } from "vite";

export default defineConfig({
  server:{
    define:{
      secret: process.env.secret || 'secret-demo'
    },
    proxy:{
      '/heroku':{
        target: 'https://polar-wave-72056.herokuapp.com/',
        rewrite: path => path.replace(/^\/heroku/, ''),
        changeOrigin: true,
      }
    }
  }
})