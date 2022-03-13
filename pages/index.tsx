import Head from 'next/head'
import { sanityClient, urlFor } from '../sanity'
import { PostInterface } from '../typings'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Posts from '../components/Posts'

export interface Props {
  posts: [PostInterface]
}

export default function Home({ posts }: Props) {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium Nex App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Hero />
      <Posts posts={posts} />
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == 'post'] {
    _id,
    title,
      
    author -> {
      name,
      image
    },

    description,
    mainImage,
    slug,
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
