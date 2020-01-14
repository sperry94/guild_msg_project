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
  currentUser: null,
}

export const currentUserGetterMock = jest.fn().mockReturnValue(null)

Object.defineProperty(firebaseAuthMock, "currentUser", {
  get: currentUserGetterMock,
})

export const firebaseAuth = () => firebaseAuthMock

export const firestoreMock = {
  collection: jest.fn(),
  doc: jest.fn(),
  add: jest.fn(),
}

firestoreMock.collection.mockReturnValue(firestoreMock)
firestoreMock.doc.mockReturnValue(firestoreMock)

export const firestore = () => firestoreMock

export const httpsCallMock = jest.fn()

export const firebaseFunctionsMock = {
  httpsCallable: jest.fn().mockReturnValue(httpsCallMock),
}

export const firebaseFunctions = () => firebaseFunctionsMock
