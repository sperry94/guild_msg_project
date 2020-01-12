import * as innerFirebase from "../firebase"
import * as firebaseMock from "../__mocks__/firebase"
import { signIn, signOut } from "../auth"

jest.mock("firebase/app")
jest.mock("../firebase")

const firebase = (innerFirebase as any) as typeof firebaseMock

describe("Auth Service", () => {
  describe("signIn", () => {
    it("calls signInWithRedirect", done => {
      firebase.firebaseAuthMock.signInWithRedirect.mockResolvedValueOnce(null)
      signIn().then(done)
    })

    it("catches its error", async done => {
      firebase.firebaseAuthMock.signInWithRedirect.mockRejectedValueOnce(
        "this is my error"
      )

      await signIn()

      expect(console.error).toHaveBeenCalledWith(
        "An error occurred logging in",
        "this is my error"
      )

      done()
    })
  })

  describe("signOut", () => {
    it("calls signOut", done => {
      firebase.firebaseAuthMock.signOut.mockResolvedValueOnce(null)
      signOut().then(done)
    })

    it("catches its error", async done => {
      firebase.firebaseAuthMock.signOut.mockRejectedValueOnce(
        "this is my error"
      )

      await signOut()

      expect(console.error).toHaveBeenCalledWith(
        "An error occurred logging out",
        "this is my error"
      )

      done()
    })
  })
})
