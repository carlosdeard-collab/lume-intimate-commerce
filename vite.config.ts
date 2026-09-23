import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/').pop() || 'lume-intimate-commerce'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? `/${repositoryName}/` : '/',
  plugins: [
    react(),
    {
      name: 'github-pages-spa-fallback',
      closeBundle() {
        if (command === 'build') {
          const outputDirectory = resolve(__dirname, 'dist')
          copyFileSync(resolve(outputDirectory, 'index.html'), resolve(outputDirectory, '404.html'))
        }
      },
    },
  ],
}))
