describe("Initial page", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Should load", () => {
    cy.get("h1").contains("Hi people")
  })
})
