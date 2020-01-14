import React from "react"
import renderer from "react-test-renderer"
import ConversationItem, { ConversationItemProps } from "../conversation_item"

describe("ConversationItem", () => {
  const cases: ConversationItemProps[] = [
    {
      conversationId: undefined,
      conversation: {
        id: "test",
        users: [
          {
            displayName: "bob",
            email: "bob@bob.com",
            photoUrl: "photoUrl",
            uid: "uid1",
          },
        ],
      },
    },
    {
      conversationId: "convo-id",
      conversation: {
        id: "test",
        users: [
          {
            displayName: "bill",
            email: "bill@bill.com",
            photoUrl: "photoUrl2",
            uid: "uid2",
          },
        ],
      },
    },
    {
      conversationId: "test",
      conversation: {
        id: "test",
        users: [
          {
            displayName: "bill",
            email: "bill@bill.com",
            photoUrl: "photoUrl2",
            uid: "uid2",
          },
        ],
      },
    },
  ]

  cases.forEach((c, index) => {
    it(`renders for case #${index + 1}`, () => {
      const tree = renderer.create(<ConversationItem {...c} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
