import React from "react"
import { useAuthUpdate } from "../../../services/auth"
import renderer from "react-test-renderer"
import AuthProvider from "../auth_provider"

jest.mock("../../../services/auth")

const mocked_useAuthUpdate = useAuthUpdate as jest.Mock<any>

describe("AuthProvider", () => {
  beforeEach(() => {
    mocked_useAuthUpdate.mockReturnValueOnce({
      name: "Hello",
    })
  })

  it("renders", () => {
    const tree = renderer
      .create(
        <AuthProvider>
          <div>Hello</div>
        </AuthProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
