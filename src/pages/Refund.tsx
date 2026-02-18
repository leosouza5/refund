import { useState } from "react";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { CATEGORIES_KEYS } from "../utils/categories";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
import { useNavigate, useParams } from "react-router";
import fileSvg from "../assets/file.svg"


export function Refund() {
  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState<File | null>(null)

  const navigate = useNavigate()
  const params = useParams()


  function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (params.id) {
      return navigate(-1)
    }

    navigate("/confirm", { state: { fromSubmit: true } })
    console.log(name, amount, category, fileName)
  }

  return (
    <form onSubmit={onSubmit} className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg">
      <header>
        <h1 className="text-xl font-bold text-gray-100">Solicitação de reembolso</h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">Dados da despesa para solicitar reembolso.</p>
      </header>

      <Input
        required
        legend="Nome da Solicitação"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={!!params.id}
      />
      <div className="flex gap-4">

        <Select
          required
          legend="Categoria"
          value={category}
          onChange={e => setCategory(e.target.value)}
          disabled={!!params.id}

        >
          {CATEGORIES_KEYS.map(
            key => <option key={key} value={key}>{key}</option>
          )}

        </Select>

        <Input
          required
          legend="Valor"
          value={amount}
          disabled={!!params.id}
          onChange={e => setAmount(e.target.value)}
        />
      </div>

      {
        params.id ?
          <a href="google.com" target="_blank" className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear">
            <img src={fileSvg} alt="Ícone de arquivo" />
            Abrir comprovante
          </a>
          : <Upload
            onChange={e => e.target.files && setFileName(e.target.files[0])}
            filename={fileName && fileName.name}
          />
      }



      <Button type="submit" isLoading={isLoading}>{params.id ? "Voltar" : "Enviar"}</Button>
    </form>
  )
}