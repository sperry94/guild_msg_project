import * as innerFirebase from "../firebase"
import * as firebaseMock from "../__mocks__/firebase"
import { sendMessage } from "../messages"

jest.mock("../firebase")

const firebase = (innerFirebase as any) as typeof firebaseMock

describe("Message Service", () => {
  describe("sendMessage", () => {
    it("Throws an error if no conversationId is provided", async () => {
      await expect(sendMessage("", "my-message")).rejects.toThrow(
        "A conversation ID and a message must be passed in order to save."
      )
    })

    it("Throws an error if no message is provided", async () => {
      await expect(sendMessage("convo-id", "")).rejects.toThrow(
        "A conversation ID and a message must be passed in order to save."
      )
    })

    it("Throws an error if no user is logged in", async () => {
      await expect(sendMessage("convo-id", "my-message")).rejects.toThrow(
        "A user must be logged-in in order to save."
      )
    })

    it("Throws an error if firestore errors", async () => {
      firebase.currentUserGetterMock.mockReturnValueOnce({
        uid: "my-uid",
      })
      firebase.firestoreMock.add.mockRejectedValueOnce(new Error("fake error"))

      await expect(sendMessage("convo-id", "my-message")).rejects.toThrow(
        "fake error"
      )
    })

    it("Requests to add a new document", async () => {
      firebase.currentUserGetterMock.mockReturnValueOnce({
        uid: "my-uid",
      })
      firebase.firestoreMock.add.mockResolvedValueOnce(null)

      await expect(sendMessage("convo-id", "my-message")).resolves.toEqual(
        undefined
      )
    })
  })
})
