import { useState } from "react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import z, { ZodError } from "zod";
import { api } from "../services/api";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome"),
  email: z.email("Informe um email válido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 digitos"),
  confirmPassword: z.string("Confirme a senha")
}).refine(data => data.password === data.confirmPassword, { message: "As senhas não são iguais", path: ["confirmPassword"] },)

export function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    try {
      setLoading(true)

      const data = signUpSchema.parse({ name, email, password, confirmPassword })

      await api.post("users", data)

      if (confirm("Cadastrado com sucesso. Ir para tela de entrar ?")) {
        navigate("/")
      }

    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.issues[0].message)
      }
      if (error instanceof AxiosError) {
        return alert(error.response?.data.message || "Não foi possivel cadastrar!")
      }

      alert("Não foi possivel cadastrar!")
    } finally {
      setLoading(false)
    }
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