import { PreviewSuspense } from '@sanity/preview-kit'
import IndexPage from 'components/IndexPage'
import { getAllPosts, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { lazy } from 'react'
import Link from 'next/link'

export function IndexPage2 ({ posts, settings, loading }) {
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{settings.siteTitle}</h1>
      <div className="blog-previews">
        {posts.map((post) => (
          <article key={post._id}>
            <Link href={`/post/${post.slug.current}`}>
              <a>
                <img src={post.mainImage.url} alt={post.title} />
                <h2>{post.title}</h2>
              </a>
            </Link>
            <p>{post.excerpt}</p>
            <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
          </article>
        ))}
      </div>
    </div>
  );
}

const PreviewIndexPage = lazy(() => import('components/PreviewIndexPage'))

interface PageProps {
  posts: Post[]
  settings: Settings
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function Page(props: PageProps) {
  const { posts, settings, preview, token } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <IndexPage loading preview posts={posts} settings={settings} />
        }
      >
        <PreviewIndexPage token={token} />
      </PreviewSuspense>
    )
  }

  return <IndexPage posts={posts} settings={settings} />
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx

  const [settings, posts = []] = await Promise.all([
    getSettings(),
    getAllPosts(),
  ])

  return {
    props: {
      posts,
      settings,
      preview,
      token: previewData.token ?? null,
    },
  }
}
