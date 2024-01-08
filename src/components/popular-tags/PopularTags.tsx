import { prisma } from '@/libs/prisma'
import QueryLink from '@/components/common/QueryLink'
import { getTranslations } from 'next-intl/server'

const PopularTags = async () => {
  const tags = await prisma.tag.findMany({
    where: {
      articles: {
        some: {
          NOT: [],
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  })

  const t = await getTranslations('Home')
  return (
    <div className="sidebar">
      <p>{t('popular-tags')}</p>
      <div className="tag-list">
        {tags.map((tag) => (
          <QueryLink
            query={{ tag: `${tag.name}` }}
            key={tag.id}
            className="tag-pill tag-default"
          >
            {tag.name}
          </QueryLink>
        ))}
      </div>
    </div>
  )
}

export default PopularTags
