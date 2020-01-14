import React from "react"
import renderer from "react-test-renderer"
import ConversationDrawer, {
  ConversationDrawerProps,
} from "../conversation_drawer"

jest.mock("../../../services/auth")
jest.mock("../../../services/firebase")
jest.mock("../../../services/conversations")
jest.mock("../../../services/messages")

describe("ConversationDrawer", () => {
  const cases: ConversationDrawerProps[] = [
    {
      conversationId: undefined,
    },
    {
      conversationId: "convo-id",
    },
  ]

  cases.forEach((c, index) => {
    it(`renders for case #${index + 1}`, () => {
      const tree = renderer.create(<ConversationDrawer {...c} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
