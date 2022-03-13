import React from 'react'
import { sanityClient } from '../../sanity'
import Header from '../../components/Header'
import Post from '../../components/Post'
import Comments from '../../components/Comments'
import { PostInterface } from '../../typings'

interface Props {
  post: PostInterface
}

interface Params {
  params: {
    slug: string
  }
}

export default function PostPage({ post }: Props) {
  return (
    <main>
      <Header />

      <Post post={post} />

      <Comments post={post} />
    </main>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == 'post'] {
        _id,
        slug {
            current
        }
    }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: PostInterface) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }: Params) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        _createdAt,
    
        author -> {
        name,
        image
        },

        'comments': *[
          _type == 'comment' &&
          post._ref == ^._id &&
          approved == true
        ],

        description,
        mainImage,
        slug,
        body
    }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },

    revalidate: 60,
  }
}
