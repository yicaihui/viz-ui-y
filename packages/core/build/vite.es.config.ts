import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
//类型提示的插件
import dts from 'vite-plugin-dts'
import { readdirSync, readdir } from 'fs'
import { defer, delay, filter, map } from 'lodash-es'
import shell from 'shelljs'
import { hooksPlugin as hooks } from '@viz-ui-y/vite-plugins'
import terser from '@rollup/plugin-terser'
import { visualizer } from 'rollup-plugin-visualizer'

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true })

  return map(
    filter(entries, entry => entry.isDirectory()),
    entry => entry.name
  )
}
//移动theme下的样式
const TRY_MOVE_STYLES_DELAY = 750 as const
function moveStyles() {
  readdir('./dist/es/theme', err => {
    if (err) return delay(moveStyles, TRY_MOVE_STYLES_DELAY)
    defer(() => shell.mv('./dist/es/theme', './dist'))
  })
}
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: 'dist/stats.es.html'
    }),
    dts({
      //限制生成类型的文件
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types'
    }),
    terser({
      compress: {
        sequences: isProd,
        arguments: isProd,
        drop_console: isProd && ['log'],
        drop_debugger: isProd,
        passes: isProd ? 4 : 1,
        global_defs: {
          '@DEV': JSON.stringify(isDev),
          '@PROD': JSON.stringify(isProd),
          '@TEST': JSON.stringify(isTest)
        }
      },
      format: {
        semicolons: false,
        shorthand: isProd,
        braces: !isProd,
        beautify: !isProd,
        comments: !isProd
      },
      mangle: {
        toplevel: isProd,
        eval: isProd,
        keep_classnames: isDev,
        keep_fnames: isDev
      }
    }),
    hooks({
      rmFiles: [
        './dist/es',
        './dist/theme',
        './dist/types',
        './dist/stats.es.html'
      ],
      afterBuild: moveStyles
    })
  ],
  build: {
    outDir: 'dist/es',
    cssCodeSplit: true,
    minify: false,
    lib: {
      entry: resolve(__dirname, '../index.ts'),
      name: 'VizUI',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@popperjs/core',
        'async-validator'
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        },
        assetFileNames: chunkInfo => {
          if (chunkInfo.names && chunkInfo.names[0] === 'style.css') {
            return 'index.css'
          }
          if (
            chunkInfo.type === 'asset' &&
            chunkInfo.names &&
            /\.(css)$/i.test(chunkInfo.names[0] as string)
          ) {
            return 'theme/[name].[ext]'
          }
          return chunkInfo.names ? (chunkInfo.names[0] as string) : ''
        },
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
          if (id.includes('/packages/hooks')) return 'hooks'
          if (
            id.includes('/packages/utils') ||
            id.includes('plugin-vue:export-helper')
          )
            return 'utils'
          for (const item of getDirectoriesSync('../components')) {
            if (id.includes(`/packages/components/${item}`)) return item
          }
        }
      }
    }
  }
})
