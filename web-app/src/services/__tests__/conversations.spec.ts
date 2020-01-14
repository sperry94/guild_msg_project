import * as innerFirebase from "../firebase"
import * as firebaseMock from "../__mocks__/firebase"
import { addConversation } from "../conversations"

jest.mock("../firebase")

const firebase = (innerFirebase as any) as typeof firebaseMock

describe("Conversation Service", () => {
  describe("addConversation", () => {
    it("Throws an error if no email is provided", async () => {
      await expect(addConversation("")).rejects.toThrow(
        "An email must be provided to add a new conversation!"
      )
    })

    it("Throws an error if the http call fails", async () => {
      firebase.httpsCallMock.mockRejectedValue(new Error("fake error"))

      await expect(addConversation("myemail@fake.com")).rejects.toThrow(
        "fake error"
      )
    })

    it("Returns the doc ID from the call response", async () => {
      firebase.httpsCallMock.mockResolvedValue({
        data: {
          docId: "myDocId",
        },
      })

      await expect(addConversation("myemail@fake.com")).resolves.toEqual(
        "myDocId"
      )
    })
  })
})
