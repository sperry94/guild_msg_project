import React from "react"
import {
  useConversationList,
  Conversation,
} from "../../../services/conversations"
import renderer from "react-test-renderer"
import ConversationList, { ConversationListProps } from "../conversation_list"

jest.mock("../../../services/auth")
jest.mock("../../../services/firebase")
jest.mock("../../../services/conversations")
jest.mock("../../../services/messages")

const mocked_useConversationList = useConversationList as jest.Mock<
  Conversation[] | null
>

describe("ConversationList", () => {
  const cases: ConversationListProps[] = [
    {
      conversationId: undefined,
    },
    {
      conversationId: "convo-id",
    },
  ]

  cases.forEach((c, index) => {
    it(`renders for case #${index + 1} with conversations`, () => {
      mocked_useConversationList.mockReturnValueOnce([
        {
          id: "convo-id",
          users: [
            {
              displayName: "Bob",
              email: "bob@bob.com",
              uid: "uid1",
              photoUrl: "",
            },
          ],
        },
        {
          id: "convo-id2",
          users: [
            {
              displayName: "Bill",
              email: "bill@bob.com",
              uid: "uid2",
              photoUrl: "",
            },
          ],
        },
      ])
      const tree = renderer.create(<ConversationList {...c} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it(`renders for case #${index + 1} without conversations`, () => {
      mocked_useConversationList.mockReturnValueOnce([])
      const tree = renderer.create(<ConversationList {...c} />).toJSON()
      expect(tree).toMatchSnapshot()
    })

    it(`renders for case #${index + 1} while loading`, () => {
      mocked_useConversationList.mockReturnValueOnce(null)
      const tree = renderer.create(<ConversationList {...c} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
