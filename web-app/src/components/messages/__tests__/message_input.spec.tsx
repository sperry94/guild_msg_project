import React from "react"
import renderer from "react-test-renderer"
import MessageInput, { MessageInputProps } from "../message_input"

describe("MessageInput", () => {
  const cases: MessageInputProps[] = [
    {
      conversationId: undefined,
      disabled: false,
    },
    {
      conversationId: "convo-id",
      disabled: false,
    },
    {
      conversationId: undefined,
      disabled: true,
    },
    {
      conversationId: "convo-id",
      disabled: true,
    },
  ]

  cases.forEach((c, index) => {
    it(`renders for case #${index + 1}`, () => {
      const tree = renderer.create(<MessageInput {...c} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
