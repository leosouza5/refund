import { AuthContext, AuthProvider } from "./context/AuthContext"

import { Routes } from "./routes";

export function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}