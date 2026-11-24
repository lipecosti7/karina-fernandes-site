import sharp from 'sharp'
const src = 'public/karina-retrato.jpeg'
for (const w of [480, 720, 1080, 1200]) {
  const img = () => sharp(src).resize({ width: w, withoutEnlargement: true })
  await img().avif({ quality: 80, effort: 6, chromaSubsampling: '4:4:4' }).toFile(`public/karina-retrato-${w}.avif`)
  await img().webp({ quality: 92, effort: 6 }).toFile(`public/karina-retrato-${w}.webp`)
}
