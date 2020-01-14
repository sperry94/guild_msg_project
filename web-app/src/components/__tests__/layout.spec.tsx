import React from "react"
import renderer from "react-test-renderer"
import Layout from "../layout"

describe("Layout", () => {
  it("renders with classes", () => {
    const tree = renderer
      .create(
        <Layout
          classes={{
            main: "my-class",
          }}
        >
          <div>Hello</div>
        </Layout>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders without classes", () => {
    const tree = renderer
      .create(
        <Layout>
          <div>Hello there</div>
        </Layout>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
