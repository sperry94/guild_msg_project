import React from "react"
import { useAuthContext } from "../../services/auth"
import renderer from "react-test-renderer"
import Toolbar from "../toolbar"

jest.mock("../../services/auth")

const mocked_useAuthContext = useAuthContext as jest.Mock<any>

describe("Toolbar", () => {
  it("renders with auth", () => {
    mocked_useAuthContext.mockReturnValueOnce({
      name: "Hello",
    })
    const tree = renderer.create(<Toolbar />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders without auth", () => {
    mocked_useAuthContext.mockReturnValueOnce(null)
    const tree = renderer.create(<Toolbar />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
