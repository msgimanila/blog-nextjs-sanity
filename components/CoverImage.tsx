import cn from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

interface CoverImageProps {
  title: string
  slug?: string
  image: any
  priority?: boolean
}

export default function CoverImage(props: CoverImageProps) {
  const { title, slug, image: source, priority } = props

  // Generate the image URL using the provided `urlForImage` function
  const imageUrl = source?.asset?._ref ? urlForImage(source).url() : null

  // Render the image or fallback
  const image = imageUrl ? (
    <Image
      src={imageUrl}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'transition-shadow duration-200 hover:shadow-medium': slug,
      })}
      layout="responsive"
      width={1700} // Replace with the actual width of your image
      height={1400} // Replace with the actual height of your image
      priority={priority}
    />
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
