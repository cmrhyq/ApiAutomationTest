import { defineConfig, loadEnv } from 'vite'
import path from 'node:path'
// import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'
import basicSsl from "@vitejs/plugin-basic-ssl";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());
  console.log("当前环境：" + mode);
  console.log("APP标题：" + env.VITE_APP_TITLE);
  console.log("Base URL" + env.VITE_APP_BASE_URL);
  return defineConfig({
    base: './',
    // mode: mode,
    publicDir: 'public',

    // 项目构建过程配置
    build: {
      // 打包输出目录
      outDir: 'dist',
      // 是否压缩代码
      minify: false,
      // 是否生成sourcemap
      sourcemap: true,
    },

    // 全局变量
    define: {
      'process.env': {
        VITE_APP_BASE_URL: env.VITE_APP_BASE_URL,
        VITE_APP_ENV: env.VITE_APP_ENV,
        VITE_APP_TITLE: env.VITE_APP_TITLE,
      },
    },

    plugins: [
      react(),
      basicSsl(),
      // electron({
      //   main: {
      //     // Shortcut of `build.lib.entry`.
      //     entry: 'electron/main.ts',
      //   },
      //   preload: {
      //     // Shortcut of `build.rollupOptions.input`.
      //     // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
      //     input: path.join(__dirname, 'electron/preload.ts'),
      //   },
      //   // Ployfill the Electron and Node.js API for Renderer process.
      //   // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      //   // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      //   renderer: process.env.NODE_ENV === 'test'
      //     // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
      //     ? undefined
      //     : {},
      // }),
    ],
    // 配置模块解析规则
    resolve: {
      // 配置路径别名
      alias: {
        '@': path.resolve('./src'),
      },
      // 配置省略文件后缀
      extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    },

    // 配置服务端
    server: {
      // 端口号
      port: 4000,
      // 是否自动打开浏览器
      open: true,
      // 是否开启https
      // https: true,
      // 监听所有地址
      host: true,
      // 跨域代理，为开发服务器配置CORS
      cors: true,
      // 代理配置
      proxy: {},
    },

    // 配置css
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    }
  })
}
