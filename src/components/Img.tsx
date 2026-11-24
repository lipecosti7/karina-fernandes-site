import type { ComponentProps } from 'react'
import { fallbackSrc, images, srcSet, type ImageInfo, type ImageName } from '../lib/images'

// <picture> com AVIF → WebP → PNG. width/height intrínsecos reservam a proporção (sem CLS);
// o tamanho real continua vindo das classes. `pictureClassName` é "contents" por padrão: o <img> se
// comporta como se o <picture> não existisse (absolute, size-full etc. funcionam igual a um <img> solto).
type ImgProps = Omit<ComponentProps<'img'>, 'src' | 'srcSet' | 'width' | 'height'> & {
  name: ImageName
  sizes: string
  alt: string
  pictureClassName?: string
}

export function Img({ name, sizes, pictureClassName = 'contents', loading = 'lazy', decoding = 'async', ...img }: ImgProps) {
  const i: ImageInfo = images[name]
  return (
    <picture className={pictureClassName}>
      {i.avif !== false && <source type="image/avif" srcSet={srcSet(i, 'avif')} sizes={sizes} />}
      <source type="image/webp" srcSet={srcSet(i, 'webp')} sizes={sizes} />
      <img src={fallbackSrc(i)} width={i.width} height={i.height} loading={loading} decoding={decoding} {...img} />
    </picture>
  )
}

// Hero: o retrato da Karina. No celular fica embaixo do texto, em largura total; na paisagem/desktop é enquadrado dentro da forma em arco (Home.tsx).
// O preload no index.html precisa bater com este srcset e sizes.
export const HERO_SIZES = '(min-aspect-ratio: 11/10) and (min-width: 640px) 50vw, 100vw'

type HeroProps = Omit<ComponentProps<'img'>, 'src' | 'srcSet' | 'width' | 'height' | 'sizes'> & { alt: string; pictureClassName?: string }

export function HeroPicture({ pictureClassName = 'block size-full', loading = 'eager', fetchPriority = 'high', ...img }: HeroProps) {
  const m: ImageInfo = images['karina-retrato']
  return (
    <picture className={pictureClassName}>
      <source type="image/avif" srcSet={srcSet(m, 'avif')} sizes={HERO_SIZES} />
      <source type="image/webp" srcSet={srcSet(m, 'webp')} sizes={HERO_SIZES} />
      <img src={fallbackSrc(m)} width={m.width} height={m.height} sizes={HERO_SIZES} loading={loading} fetchPriority={fetchPriority} {...img} />
    </picture>
  )
}
