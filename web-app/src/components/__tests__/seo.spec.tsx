import React from "react"
import { useStaticQuery } from "gatsby"
import renderer from "react-test-renderer"
import SEO, { SEOGraphqlQuery } from "../seo"

const mocked_useStaticQuery = useStaticQuery as jest.Mock<SEOGraphqlQuery>

describe("SEO", () => {
  beforeEach(() => {
    mocked_useStaticQuery.mockReturnValueOnce({
      site: {
        siteMetadata: {
          title: "My title",
          description: "My description",
          author: "Seth Perry",
        },
      },
    })
  })

  it("renders", () => {
    const tree = renderer.create(<SEO />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
