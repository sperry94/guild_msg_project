import React from "react"
import { useAuthContext } from "../../../services/auth"
import { useMessages, Message } from "../../../services/messages"
import renderer from "react-test-renderer"
import MessageList from "../message_list"

jest.mock("../../../services/auth")
jest.mock("../../../services/messages")

const mocked_useAuthContext = useAuthContext as jest.Mock<any>
const mocked_useMessages = useMessages as jest.Mock<Message[] | null>

describe("Message List", () => {
  it(`renders null when no auth`, () => {
    mocked_useAuthContext.mockReturnValueOnce(null)
    mocked_useMessages.mockReturnValueOnce([
      {
        senderId: "sender-id",
        time: new Date(2019, 1, 3, 3, 45, 12),
        message: "hello",
      },
    ])
    const tree = renderer.create(<MessageList />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders message when no conversation id`, () => {
    mocked_useAuthContext.mockReturnValueOnce({})
    mocked_useMessages.mockReturnValueOnce([
      {
        senderId: "sender-id",
        time: new Date(2019, 1, 3, 3, 45, 12),
        message: "hello",
      },
    ])
    const tree = renderer.create(<MessageList />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders spinner when lookup up messages`, () => {
    mocked_useAuthContext.mockReturnValueOnce({})
    mocked_useMessages.mockReturnValueOnce(null)
    const tree = renderer
      .create(<MessageList conversationId="convo-id" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders message when no messages`, () => {
    mocked_useAuthContext.mockReturnValueOnce({})
    mocked_useMessages.mockReturnValueOnce([])
    const tree = renderer
      .create(<MessageList conversationId="convo-id" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders messages`, () => {
    mocked_useAuthContext.mockReturnValueOnce({ uid: "me" })
    mocked_useMessages.mockReturnValueOnce([
      {
        senderId: "me",
        time: new Date(2019, 4, 3, 3, 45, 12),
        message: "hello",
      },
      {
        senderId: "my-friend",
        time: new Date(2019, 1, 3, 3, 45, 12),
        message: "hello",
      },
    ])
    const tree = renderer
      .create(<MessageList conversationId="convo-id" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
