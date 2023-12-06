'use client'

import React, { useState } from 'react'
import { ArticleItem } from '@/types/server'
import { fetchWrapper } from '@/utils/fetch'
import { useRouter } from 'next/navigation'

interface EditorForm {
  slug?: string
  title: string
  description: string
  body: string
  tagList: string[]
}

interface EditorFormProps {
  article?: ArticleItem
}

const EditorForm = (props: EditorFormProps) => {
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [article, setArticle] = useState<EditorForm>({
    slug: props.article?.slug || '',
    title: props.article?.title || '',
    description: props.article?.description || '',
    body: props.article?.body || '',
    tagList: props.article?.tagList || [],
  })
  const [tag, setTag] = useState('')

  const onChange = (newArticle: Partial<typeof article>) => {
    setArticle((prev) => ({ ...prev, ...newArticle }))
  }

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setArticle({ ...article, tagList: [...article.tagList, tag] })
      setTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setArticle({
      ...article,
      tagList: [...article.tagList.filter((tag) => tag !== tagToRemove)],
    })
  }

  const router = useRouter()
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const data = await fetchWrapper('/articles', 'POST', {
        article,
      })
      router.push(`/article/${data.article.slug}`)
    } catch (e: any) {
      setErrors(e.errors)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="col-md-10 offset-md-1 col-xs-12">
      <ul className="error-messages">
        {errors.map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </ul>
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Article Title"
              value={article.title}
              disabled={loading}
              onInput={(e) => onChange({ title: e.currentTarget.value })}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="What's this article about?"
              value={article.description}
              disabled={loading}
              onInput={(e) => onChange({ description: e.currentTarget.value })}
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control"
              rows={8}
              placeholder="Write your article (in markdown)"
              value={article.body}
              disabled={loading}
              onInput={(e) => onChange({ body: e.currentTarget.value })}
            ></textarea>
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter tags"
              value={tag}
              disabled={loading}
              onInput={(e) => setTag(e.currentTarget.value)}
              onKeyDown={addTag}
            />
            <div className="tag-list">
              {article.tagList.map((tag) => (
                <span
                  className="tag-default tag-pill"
                  key={tag}
                  onClick={() => removeTag(tag)}
                >
                  <i className="ion-close-round"></i>
                  {tag}
                </span>
              ))}
            </div>
          </fieldset>
          <button
            className="btn btn-lg pull-xs-right btn-primary"
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
          >
            Publish Article
          </button>
        </fieldset>
      </form>
    </div>
  )
}

export default EditorForm
