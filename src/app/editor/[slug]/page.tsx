import { Metadata } from 'next'
import { getArticle } from '@/app/actions/getArticle'
import EditorForm from '@/components/editor/EditorForm'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { ArticleItem } from '@/types/server'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Editor',
}

interface EditorProps {
  params: { slug: string }
}

const EditArticle = async ({ params }: EditorProps) => {
  let article: ArticleItem | undefined = undefined
  try {
    const currentUser = await getCurrentUser()
    article = await getArticle({ slug: params.slug })
    if (article?.author.id !== currentUser?.id) {
      throw new Error('You are not the author of this article')
    }
  } catch (e) {
    redirect('/')
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <EditorForm article={article} />
        </div>
      </div>
    </div>
  )
}

export default EditArticle
