"use client";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Fornecedor, getFornecedores } from "../services/fornecedores";
import CadastroFornecedor from '../components/CadastroFornecedor';


export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controle do modal

  useEffect(() => {
    // if (filter.length === 0) {
      getFornecedores().then((data) => {
        setFornecedores(data);
      });
    // } else {
      // getFornecedores({ name: filter }).then((data) => {
      //   setFornecedores(data);
      // });
    // }
  }, [filter]);


  const handleOpenModal = () => setIsModalOpen(true); // Função para abrir o modal
  const handleCloseModal = () => setIsModalOpen(false); // Função para fechar o modal

  const deleteFornecedor = async (id: string) => {
    try {
      const response = await fetch(`https://stock-flow.azurewebsites.net/api/v1/fornecedores/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar fornecedor');
  
      // Atualiza a lista de fornecedores removendo o fornecedor deletado
      setFornecedores(fornecedores.filter(fornecedor => fornecedor.id !== id));
      alert('Fornecedor deletado com sucesso!');
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
    <div>
      <h1 className="text-indigo-600">
        Stock Flow <span className="text-gray-500">Fornecedores</span>
      </h1>

      <Navigation />

      {/* Botão para abrir o modal */}
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-150 ease-in-out m-2"
        onClick={handleOpenModal}
      >
        Cadastrar Novo Fornecedor
      </button>

      {/* Modal para cadastro de fornecedores */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg max-w-lg w-full">
            <button onClick={handleCloseModal}>Fechar</button> {/* Botão para fechar o modal */}
            <CadastroFornecedor />
          </div>
        </div>
      )}



      <div>
        <input
          type="text"
          className="px-2 m-2 shadow-md bg-gray-900"
          placeholder="Pesquisar"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        {fornecedores.map((fornecedor, index) => (
          <div
            className={`px-2 m-2  shadow-md flex flex-row ${
              index % 2 === 0 ? "bg-gray-950" : "bg-gray-900"
            }`}
            key={fornecedor.id}
          >
            {/* <div className="py-1 px-4 max-w-prose min-w-64">{fornecedor.id}</div> */}
            <div className="py-1 px-4 max-w-prose min-w-64">{fornecedor.nome}</div>
            <div className="py-1 px-4 w-full ">{fornecedor.contato}</div>
            <div className="py-1 px-4 w-full ">{fornecedor.endereco}</div>

            {/* Botão de delete */} 
            <button onClick={() => deleteFornecedor(fornecedor.id)} className="ml-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-150 ease-in-out" > Delete </button>
            
          </div>
        ))}
      </div>
    </div>
  );
}
