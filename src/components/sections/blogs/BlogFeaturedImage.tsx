import Image from 'next/image'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface BlogFeaturedImageProps {
  src: string
  alt: string
}

export function BlogFeaturedImage({ src, alt }: BlogFeaturedImageProps) {
  return (
    <section className="container mx-auto max-w-7xl px-6">
      <div
        className="
        overflow-hidden
        rounded-[40px]
        border
        bg-muted/30
        shadow-sm
      "
      >
        <AspectRatio ratio={16 / 8}>
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="
              object-cover
              transition-transform
              duration-700
              hover:scale-[1.02]
            "
            sizes="
              (max-width:768px)100vw,
              (max-width:1280px)90vw,
              1440px
            "
          />
        </AspectRatio>
      </div>
    </section>
  )
}
