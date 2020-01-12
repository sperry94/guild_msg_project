import React from "react"
import { AuthContext, useAuthUpdate } from "../../services/auth"

export type AuthProviderProps = {
  children: React.ReactNode | React.ReactNodeArray
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = useAuthUpdate()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthProvider
