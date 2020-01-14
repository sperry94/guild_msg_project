import React from "react"
import { useStaticQuery } from "gatsby"
import renderer from "react-test-renderer"
import { SEOGraphqlQuery } from "../../components/seo"
import { useAuthContext } from "../../services/auth"
import Messages from "../messages"

jest.mock("../../services/auth")
jest.mock("../../services/firebase")
jest.mock("../../services/conversations")
jest.mock("../../services/messages")

const mocked_useAuthContext = useAuthContext as jest.Mock<any>
const mocked_useStaticQuery = useStaticQuery as jest.Mock<SEOGraphqlQuery>

describe("MessagesViewer", () => {
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

  it(`renders with auth`, () => {
    mocked_useAuthContext.mockReturnValueOnce({})
    const tree = renderer.create(<Messages />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders without auth`, () => {
    mocked_useAuthContext.mockReturnValueOnce(null)
    const tree = renderer.create(<Messages />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
