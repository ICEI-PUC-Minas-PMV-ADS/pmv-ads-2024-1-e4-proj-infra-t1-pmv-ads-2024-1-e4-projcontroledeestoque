// components/CadastroFornecedor.tsx

import { useState, ChangeEvent, FormEvent } from 'react';

interface Fornecedor {
  nome: string;
  contato: string;
  endereco: string;
}

function CadastroFornecedor() {
  const [fornecedor, setFornecedor] = useState<Fornecedor>({
    nome: '',
    contato: '',
    endereco: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFornecedor({ ...fornecedor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://stock-flow.azurewebsites.net/api/v1/fornecedores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fornecedor),
      });
      if (!response.ok) throw new Error('Erro ao cadastrar fornecedor');
      const data = await response.json(); // Supondo que a API retorne algum dado em JSON
      alert('Fornecedor cadastrado com sucesso!');
      console.log(data); // Exibe os dados retornados pela API, se necessário
      // Resetar o formulário ou redirecionar o usuário
    } catch (error: unknown) {
        if (error instanceof Error) {
          // Agora é seguro acessar error.message, pois garantimos que error é uma instância de Error
          alert(error.message);
        } else {
          // Se o erro não for uma instância de Error, você pode tratar de outra forma ou lançar um erro genérico
          alert('Ocorreu um erro desconhecido');
        }
      }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded-lg">
  <div className="mb-4">
    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do Fornecedor</label>
    <input
      type="text"
      name="nome"
      id="nome"
      value={fornecedor.nome}
      onChange={handleChange}
      placeholder="Nome do Fornecedor"
      required
      className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="contato" className="block text-sm font-medium text-gray-700">Contato</label>
    <input
      type="text"
      name="contato"
      id="contato"
      value={fornecedor.contato}
      onChange={handleChange}
      placeholder="contato"
      required
      className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
    <input
      type="text"
      name="endereco"
      id="endereco"
      value={fornecedor.endereco}
      onChange={handleChange}
      placeholder="Endereço"
      required
      className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
    />
  </div>
  <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Cadastrar</button>
</form>
  );
}

export default CadastroFornecedor;
