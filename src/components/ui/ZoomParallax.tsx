import { useScroll, useTransform, motion } from 'motion/react'
import { useRef } from 'react'

interface ZoomParallaxProps {
  images: { src: string; alt: string }[]
  onImageClick?: (index: number) => void
}

export function ZoomParallax({ images, onImageClick }: ZoomParallaxProps) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9]

  const positionClasses: Record<number, string> = {
    1: '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]',
    2: '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]',
    3: '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]',
    4: '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]',
    5: '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]',
    6: '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]',
  }

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0a0a0a]">
        {images.slice(0, 7).map(({ src, alt }, index) => {
          const scale = scales[index % scales.length]

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${positionClasses[index] ?? ''}`}
            >
              <div
                className={`relative cursor-zoom-in ${
                  index === 0
                    ? 'w-[40vw] h-[30vh] md:w-[35vw] md:h-[45vh] z-0'
                    : 'h-[25vh] w-[25vw] z-10'
                }`}
                onClick={() => onImageClick?.(index)}
              >
                <img
                  src={src}
                  alt={alt}
                  className={`h-full w-full object-cover shadow-2xl ${index === 0 ? '' : 'rounded-2xl'}`}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
