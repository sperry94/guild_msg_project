export const firebaseApp = jest.fn()

export const firebaseCurrentAuth = jest.fn()

export const firebaseAuthMock = {
  onAuthStatusChanged: jest.fn().mockImplementation((successCb, failureCb) => {
    let returnVal
    try {
      returnVal = firebaseCurrentAuth()
    } catch (err) {
      failureCb(err)
    }

    if (returnVal) {
      successCb(returnVal)
    }
  }),
  signInWithRedirect: jest.fn(),
  signOut: jest.fn(),
}

export const firebaseAuth = () => firebaseAuthMock
