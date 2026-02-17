import { useState } from "react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    console.log(name, email, password, confirmPassword,)
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <Input type="name" legend="Name" placeholder="Seu nome" onChange={(e) => { setName(e.target.value) }} />

      <Input type="email" legend="E-mail" placeholder="seu@email.com" onChange={(e) => { setEmail(e.target.value) }} />

      <Input type="password" legend="Senha" placeholder="123456" onChange={(e) => { setPassword(e.target.value) }} />
      <Input type="password" legend="CONFIRMAÇÃO DA SENHA" placeholder="123456" onChange={(e) => { setConfirmPassword(e.target.value) }} />

      <Button type="submit" isLoading={loading} >Cadastrar</Button>

      <a
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800"
        href="/">Já tenho uma conta</a>
    </form>
  )
}