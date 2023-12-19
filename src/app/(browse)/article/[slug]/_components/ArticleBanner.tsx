import React from 'react'

interface ArticleBannerProps {
  title: string
  children?: React.ReactNode
}

const ArticleBanner = ({ title, children }: ArticleBannerProps) => {
  return (
    <div className="banner">
      <div className="container">
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  )
}

export default ArticleBanner
