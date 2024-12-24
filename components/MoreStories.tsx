import PostPreview from 'components/PostPreview'
import type { Post } from 'lib/sanity.queries'

export default function MoreStories({ posts }: { posts: Post[] }) {
  return (
    <>
      <section>
        <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
          More Stories
        </h2>
        <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
          {posts.map((post) => (
            <PostPreview
              key={post._id}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      </section>
      <FooterSection />
    </>
  )
}

// Footer Section Component
function FooterSection() {
  return (
    <footer className="w-full bg-gray-900 text-white py-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm">
            We share engaging stories, tips, and insights to inspire and inform
            our readers. Follow us for the latest updates.
          </p>
        </div>
        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <p className="text-sm mb-4">
            Sign up for our newsletter to receive updates and exclusive content.
          </p>
          <form>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 text-gray-900 rounded"
            />
            <button
              type="submit"
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  )
}
