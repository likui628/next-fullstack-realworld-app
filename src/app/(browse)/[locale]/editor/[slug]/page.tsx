import { Metadata } from 'next'
import { getArticle } from '@/actions/getArticle'
import EditorForm from '@/components/editor/EditorForm'
import getCurrentUser from '@/actions/getCurrentUser'
import { redirect } from '@/navigation'

export const metadata: Metadata = {
  title: 'Editor',
}

interface EditorProps {
  params: { slug: string }
}

const EditArticle = async ({ params }: EditorProps) => {
  const currentUser = await getCurrentUser()
  let article = await getArticle({ slug: params.slug })
  if (!(article && currentUser && article.author.id === currentUser.id)) {
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
