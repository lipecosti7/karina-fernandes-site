// Gera servico-<nome>-<largura>.avif|webp ao lado de cada public/assets/servico-*.jpeg (480, 768, 1080 e 1440 px de largura, sem ampliar).
// Uso: node scripts/optimize-servicos.mjs [nome ...]   (sem nomes: processa todas as fotos)
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const dir = join(import.meta.dirname, '..', 'public', 'assets')
const only = process.argv.slice(2)
const files = readdirSync(dir).filter((f) => /^servico-[a-z-]+\.jpeg$/.test(f) && (!only.length || only.includes(f.replace(/^servico-|\.jpeg$/g, ''))))
for (const f of files) {
  const base = f.replace(/\.jpeg$/, '')
  const { width } = await sharp(join(dir, f)).metadata()
  for (const w of [480, 768, 1080, 1440].filter((w) => w <= width)) {
    const img = () => sharp(join(dir, f)).rotate().resize({ width: w, withoutEnlargement: true })
    await img().webp({ quality: 86, effort: 5 }).toFile(join(dir, `${base}-${w}.webp`))
    await img().avif({ quality: 66, effort: 5 }).toFile(join(dir, `${base}-${w}.avif`))
  }
  console.log(base, width + 'px')
}
