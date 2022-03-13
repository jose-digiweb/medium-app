export interface PostInterface {
  _id: staring
  _createdAt: string
  title: string
  author: {
    name: string
    image: string
  }
  description: string
  mainImage: {
    assets: {
      url: string
    }
  }
  slug: {
    current: string
  }
  body: []
  comments: [CommentInterface]
}

export interface CommentInterface {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}

export interface PostsInterface {
  [PostInterface]
}
