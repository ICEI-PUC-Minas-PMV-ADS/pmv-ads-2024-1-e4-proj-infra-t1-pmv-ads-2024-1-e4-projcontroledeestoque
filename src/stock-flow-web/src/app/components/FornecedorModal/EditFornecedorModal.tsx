import React, { useState } from "react";
import { Fornecedor, updateFornecedor } from "../../services/fornecedores";

type Props = {
  fornecedor: Fornecedor;
  handleCloseEditModal: () => void;
  handleToast: (message: string) => void;
};

export default function EditFornecedorModal(props: Props) {
  const [fornecedor, setFornecedor] = useState<Fornecedor>(props.fornecedor);
  const handleEditFornecedor = async () => {
    try {
        await updateFornecedor(fornecedor);
        props.handleCloseEditModal();
        props.handleToast(`Fornecedor ${fornecedor.nome} editado com sucesso!`);
    } catch (error) {
        console.error("Erro ao excluir fornecedor:", error);
    }   
  };
  
  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-gray-700 px-8 py-10 rounded-md text-center flex flex-col gap-2 ">
        <h1 className="text-xl mb-4 font-bold text-slate-500">
          Editar Fornecedor
        </h1>
        <div className="flex justify-between items-center">
          <label className="w-2/4"> Fornecedor: </label>
          <input
              onChange={(e) => {
                setFornecedor({...fornecedor, nome: e.target.value});
              }}
              type="text"
              value={fornecedor.nome}
              size={70}
              className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-full p-2.5"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="w-2/4"> Contato: </label>
          <input
              onChange={(e) => {
                setFornecedor({...fornecedor, contato: e.target.value});
              }}
              type="email" name="email" id="email"
              value={fornecedor.contato}
              className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-full p-2.5"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="w-2/4"> Endereço: </label>
          <input
              onChange={(e) => {
                setFornecedor({...fornecedor, endereco: e.target.value});
              }}
              type="text"
              value={fornecedor.endereco}
              className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-full p-2.5"
          />
        </div>

        <div className="pt-4">
          <button
              className="bg-red-700 px-4 py-2 rounded-md text-md text-white"
              onClick={props.handleCloseEditModal}
          >
            Cancelar
          </button>
          <button
              onClick={handleEditFornecedor}
              className="bg-indigo-700 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
