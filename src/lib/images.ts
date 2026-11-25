// Fonte única das imagens otimizadas. Lida também por scripts/optimize-images.mjs (`npm run images`),
// que gera `<base>-<largura>.avif|webp` (e `.png` quando `png: true`) ao lado do original.
// Mexeu aqui (nova imagem/largura)? Rode `npm run images` de novo.

export type ImageInfo = {
  base: string // caminho público sem extensão
  width: number // tamanho intrínseco do original (para width/height e evitar CLS)
  height: number
  widths: number[]
  ext?: string // extensão do arquivo original (padrão: png)
  avif?: boolean // padrão true
  png?: boolean // gera também PNG redimensionado (fallback leve, ex.: logos)
}

// fotos reais dos serviços (recortadas do catálogo da Karina)
const foto = (slug: string, width: number, height: number): ImageInfo => ({ base: `/assets/servico-${slug}`, ext: 'jpeg', width, height, widths: [480, 768] })

export const images = {
  'karina-retrato': { base: '/karina-retrato', ext: 'jpeg', width: 1200, height: 1600, widths: [480, 720, 1080, 1200] },
  'karina-pincas': { base: '/karina-pincas', ext: 'jpeg', width: 900, height: 1600, widths: [480, 720, 900] },
  'servico-brasileiro': foto('brasileiro', 1362, 1600),
  'servico-egipcio': foto('egipcio', 660, 660),
  'servico-luxo': foto('luxo', 1302, 1444),
  'servico-fox-eyes': foto('fox-eyes', 960, 890),
  'servico-glamour': foto('glamour', 996, 914),
  'servico-sobrancelhas': foto('sobrancelhas', 960, 1280),
  'servico-henna': foto('henna', 960, 1280),
  // logo/assinatura com fundo transparente: dourado (sobre fundo claro) e claro (sobre fundo dourado/escuro)
  'logo-ouro': { base: '/logo-ouro', width: 625, height: 369, widths: [320, 625], avif: false, png: true },
  'logo-claro': { base: '/logo-claro', width: 625, height: 369, widths: [320, 625], avif: false, png: true },
  'logo-mono': { base: '/logo-mono', width: 335, height: 198, widths: [160, 335], avif: false, png: true },
  'logo-mono-claro': { base: '/logo-mono-claro', width: 335, height: 198, widths: [160, 335], avif: false, png: true },
} satisfies Record<string, ImageInfo>

export type ImageName = keyof typeof images

export const srcSet = (img: ImageInfo, ext: string) => img.widths.map((w) => `${img.base}-${w}.${ext} ${w}w`).join(', ')

// Fallback do <img>: PNG redimensionado quando existe, senão o arquivo original.
export const fallbackSrc = (img: ImageInfo) => (img.png ? `${img.base}-${img.widths.at(-1)}.png` : `${img.base}.${img.ext ?? 'png'}`)
