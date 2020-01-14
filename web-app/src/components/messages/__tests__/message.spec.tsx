import React from "react"
import renderer from "react-test-renderer"
import Message, { MessageProps } from "../message"

describe("Message", () => {
  const cases: MessageProps[] = [
    {
      fromCurrentUser: true,
      time: new Date(2001, 1, 28, 12, 2, 5),
      message: "My message",
    },
    {
      fromCurrentUser: false,
      time: new Date(2019, 8, 13, 3, 5, 12),
      message: "My message #2",
    },
  ]

  cases.forEach((c, index) => {
    it(`renders for case #${index + 1}`, () => {
      const tree = renderer.create(<Message {...c} />).toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
