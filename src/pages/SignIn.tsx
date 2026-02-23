import { useActionState, useState } from "react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import z, { email, ZodError } from "zod";
import { AxiosError } from "axios";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

const signInScheme = z.object({
  email: z.email("Informe um email válido"),
  password: z.string().trim().min(1, "Informe a senha"),
})

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(signin, null)

  const auth = useAuth()

  async function signin(_: any, formData: FormData) {
    try {

      const data = signInScheme.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      })

      const res = await api.post("sessions", data)

      auth.save(res.data)



    } catch (error) {
      if (error instanceof ZodError) {
        return { message: error.issues[0].message }
      }

      if (error instanceof AxiosError) {
        return { message: error.response?.data.message }
      }
      return { message: "Não foi possivel entrar!" }
    }
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
      <Input
        name="email"
        type="email"
        legend="E-mail"
        placeholder="seu@email.com" />

      <Input
        name="password"
        legend="Senha"
        type="password"
      />

      <p className="ctext-sm text-red-600 text-center my-4 font-medium">
        {state?.message}
      </p>

      <Button type="submit" isLoading={isLoading} >Entrar</Button>

      <a
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800"
        href="/signup">Criar conta</a>
    </form>
  )
}