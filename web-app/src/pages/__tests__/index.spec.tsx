import React from "react"
import { useStaticQuery } from "gatsby"
import renderer from "react-test-renderer"
import { SEOGraphqlQuery } from "../../components/seo"
import { useAuthContext } from "../../services/auth"
import IndexPage from "../index"

jest.mock("../../services/auth")

const mocked_useAuthContext = useAuthContext as jest.Mock<any>
const mocked_useStaticQuery = useStaticQuery as jest.Mock<SEOGraphqlQuery>

describe("Home Page", () => {
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

  it("renders when authenticated", () => {
    mocked_useAuthContext.mockReturnValueOnce({
      name: "Hello",
    })
    const tree = renderer.create(<IndexPage />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders when not authenticated", () => {
    mocked_useAuthContext.mockReturnValueOnce(null)
    const tree = renderer.create(<IndexPage />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
