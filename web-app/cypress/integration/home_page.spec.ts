import { testid } from "../utilities/utils"

describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("When signed out, should show sign in btn", () => {
    cy.get(testid("signin-btn"))
  })

  it("When signed in, should show sign in btn", () => {
    cy.get(testid("signin-btn")).click()
  })
})
