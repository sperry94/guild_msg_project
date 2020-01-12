import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export type SEOProps = {
  description?: string
  lang?: string
  meta?: React.DetailedHTMLProps<
    React.MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[]
  title?: string
}

export type SEOGraphqlQuery = {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
    }
  }
}

function SEO(props: SEOProps) {
  const { title, lang = `en`, meta = [], description = `` } = props

  const { site } = useStaticQuery<SEOGraphqlQuery>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={([
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ] as React.DetailedHTMLProps<
        React.MetaHTMLAttributes<HTMLMetaElement>,
        HTMLMetaElement
      >[]).concat(meta)}
    />
  )
}

export default SEO
