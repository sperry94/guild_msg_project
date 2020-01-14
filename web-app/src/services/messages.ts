import { useState, useEffect } from "react"
import { firestore as innerFirestore } from "firebase/app"
import { firestore, firebaseAuth } from "./firebase"

export type Message = {
  time: Date
  senderId: string
  message: string
}

export const useMessages = (
  conversationId?: string,
  errCb: (msg: string) => void = () => undefined
) => {
  const [messages, setMessages] = useState<Message[] | null>(null)

  useEffect(() => {
    if (!conversationId) {
      setMessages([])
      return
    }

    return firestore()
      .collection("conversations")
      .doc(conversationId)
      .collection("messages")
      .orderBy("time")
      .onSnapshot(
        snap => {
          setMessages(
            snap.docs.map(doc => {
              const docData = doc.data()
              docData.time = docData.time.toDate()
              return docData as Message
            })
          )
        },
        err => {
          console.error("An error occurred reading the conversation data", err)
          errCb("An error occurred reading the conversation data")
          setMessages([])
        }
      )
  }, [conversationId, errCb])

  return messages
}

export const sendMessage = async (conversationId: string, message: string) => {
  if (!conversationId || !message) {
    throw new Error(
      "A conversation ID and a message must be passed in order to save."
    )
  }

  const senderId = firebaseAuth().currentUser?.uid

  if (!senderId) {
    throw new Error("A user must be logged-in in order to save.")
  }

  await firestore()
    .collection("conversations")
    .doc(conversationId)
    .collection("messages")
    .add({
      time: innerFirestore.Timestamp.now(),
      message,
      senderId,
    })
}
