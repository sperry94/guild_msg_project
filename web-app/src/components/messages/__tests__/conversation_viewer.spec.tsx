import React from "react"
import { useAuthContext } from "../../../services/auth"
import renderer from "react-test-renderer"
import ConversationViewer, {
  ConversationViewerProps,
} from "../conversation_viewer"

jest.mock("../../../services/auth")
jest.mock("../../../services/firebase")
jest.mock("../../../services/conversations")
jest.mock("../../../services/messages")

const mocked_useAuthContext = useAuthContext as jest.Mock<any>

describe("ConversationViewer", () => {
  const cases: ConversationViewerProps[] = [
    {
      className: "my-class",
      conversationId: undefined,
    },
    {
      className: "my-class",
      conversationId: "convo-id",
    },
    {
      className: undefined,
      conversationId: undefined,
    },
    {
      className: undefined,
      conversationId: "convo-id",
    },
  ]

  cases.forEach((c, index) => {
    it(`renders for case #${index + 1} with auth`, () => {
      mocked_useAuthContext.mockReturnValueOnce({})
      const tree = renderer.create(<ConversationViewer {...c} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it(`renders for case #${index + 1} without auth`, () => {
      mocked_useAuthContext.mockReturnValueOnce(null)
      const tree = renderer.create(<ConversationViewer {...c} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
