import { useState, useEffect } from "react"
import { firestore, firebaseFunctions } from "./firebase"
import { useAuthContext } from "./auth"

export type User = {
  displayName: string
  email: string
  photoUrl: string
  uid: string
}

type ServerConversation = {
  id: string
  users: string[]
}

export type Conversation = {
  id: string
  users: User[]
}

const cachedUserData: { [k: string]: User } = {}

export const useConversationList = (
  errCb: (msg: string) => void = () => undefined
) => {
  const [conversations, setConversations] = useState<Conversation[] | null>(
    null
  )

  const auth = useAuthContext()

  useEffect(() => {
    if (!auth) {
      setConversations([])
      return
    }

    return firestore()
      .collection("conversations")
      .where("users", "array-contains", auth.uid)
      .onSnapshot(
        async snap => {
          const conversations = snap.docs.map(
            doc =>
              ({
                id: doc.id,
                ...doc.data(),
              } as ServerConversation)
          )

          const allUsers = new Set(
            conversations.flatMap(c => c.users as string[])
          )

          allUsers.delete(auth.uid)

          const userData = await Promise.all(
            Array.from(allUsers)
              .filter(u => cachedUserData[u] === undefined)
              .map(u =>
                firestore()
                  .collection("users")
                  .doc(u)
                  .get()
              )
          )

          for (const u of userData) {
            const uData = u.data() as User
            cachedUserData[uData.uid] = uData
          }

          const convertedConversations: Conversation[] = conversations.map(
            c => ({
              ...c,
              users: c.users
                .filter(u => u !== auth.uid)
                .map(u => cachedUserData[u]),
            })
          )

          setConversations(convertedConversations)
        },
        err => {
          console.error(
            "An error occurred reading the conversations for the current user",
            err
          )
          errCb(
            err?.message ||
              "An error occurred reading the conversations for the current user"
          )
          setConversations([])
        }
      )
  }, [auth, errCb])

  return conversations
}

export const addConversation = async (email: string): Promise<string> => {
  if (!email) {
    throw new Error("An email must be provided to add a new conversation!")
  }

  const res = await firebaseFunctions().httpsCallable("addConversation")({
    email,
  })

  return res.data.docId as string
}
