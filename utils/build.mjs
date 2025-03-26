import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readdir, readFileSync, writeFileSync } from 'fs'
import { minify } from 'terser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const distDir = join(__dirname, '../dist')

readdir(distDir, { recursive: true }, async (err, files) => {
  if (err) {
    console.error('Error reading directory:', err)
    return
  }

  try {
    for (const file of files) {
      if (!file.endsWith('.js')) continue
      const filePath = join(distDir, file)

      const code = readFileSync(filePath, 'utf8')
      const result = await minify(code, {
        compress: true,
        mangle: true,
        format: {
          comments: false
        },
        sourceMap: {
          filename: file.split('/').pop(),
          url: file.split('/').pop() + '.map'
        }
      })

      writeFileSync(filePath, result.code)
      writeFileSync(filePath + '.map', result.map)
    }
    console.log('Build completed successfully')
  } catch (error) {
    console.error('Build failed:', error)
    // eslint-disable-next-line n/no-process-exit
    process.exit(1)
  }
})

