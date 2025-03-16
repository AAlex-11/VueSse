const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 4000, // Change this to your desired port
  },
  transpileDependencies: true
})
