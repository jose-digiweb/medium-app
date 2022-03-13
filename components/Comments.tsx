import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { PostInterface } from '../typings'

interface InputForm {
  _id: string
  name: string
  email: string
  comment: string
}

interface Props {
  post: PostInterface
}

export default function Comments({ post }: Props) {
  const [submited, setSubmited] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputForm>()

  const onSubmit: SubmitHandler<InputForm> = async (data) => {
    data._id = post._id

    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((data) => {
        console.log(data)
        setSubmited(true)
      })
      .catch((error) => {
        console.log(error)
        setSubmited(false)
      })
  }

  return (
    <>
      {submited ? (
        <div className="my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 py-10 px-5 text-white">
          <h3 className="text-xl font-bold">
            Thanks for submitting your comment!
          </h3>
          <p>Once it has been approved, it will appear bellow!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-10 mx-auto flex max-w-2xl flex-col p-5"
        >
          <h3 className="text-md text-yellow-500">Enjoyed this article?</h3>
          <h4 className="text-2xl font-bold">Leave a comment bellow!</h4>
          <hr className="mt-2 py-3" />

          <label className="mb-5 block">
            <div className="flex justify-between">
              <span className="text-gary-700">Name</span>

              {errors.name && (
                <span className="text-red-500">This field is required!</span>
              )}
            </div>

            <input
              {...register('name', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring-1"
              placeholder="John Doe"
              type="text"
            />
          </label>

          <label className="mb-5 block">
            <div className="flex justify-between">
              <span className="text-gary-700">Email</span>

              {errors.email && (
                <span className="text-red-500">This field is required!</span>
              )}
            </div>

            <input
              {...register('email', { required: true })}
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring-1"
              placeholder="john.doe@gmail.com"
              type="email"
            />
          </label>

          <label className="mb-5 block">
            <div className="flex justify-between">
              <span className="text-gary-700">Comment</span>

              {errors.comment && (
                <span className="text-red-500">This field is required!</span>
              )}
            </div>

            <textarea
              {...register('comment', { required: true })}
              className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring-1"
              placeholder="Type you comment..."
              rows={8}
            />
          </label>

          <input
            className="focus:shadow-outline none cursor-pointer rounded bg-yellow-500 py-2 px-4 font-bold text-white shadow outline-none hover:bg-yellow-400"
            type="submit"
          />
        </form>
      )}

      <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-yellow-500">
        <h3 className="pb-2 text-4xl">Comments</h3>

        <hr className="pb-4" />

        {post.comments.map((comment) => {
          return (
            <div key={comment._id}>
              <p>
                <span className="text-yellow-500">{comment.name}: </span>
                {comment.comment}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}
