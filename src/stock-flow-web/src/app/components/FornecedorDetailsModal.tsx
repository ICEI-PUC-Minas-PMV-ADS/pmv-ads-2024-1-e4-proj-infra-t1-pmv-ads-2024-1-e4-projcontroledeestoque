import React from "react";
import { Fornecedor } from "../services/fornecedores";

type Props = {
  fornecedor: Fornecedor;
  handleCloseDetailsModal: () => void;
};

const FornecedorDetailsModal = ({ fornecedor, handleCloseDetailsModal }: Props) => {
  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-gray-700 px-8 py-10 rounded-md text-center flex flex-col gap-2 ">
        <h1 className="text-xl mb-4 font-bold text-slate-500">
          Detalhes do Fornecedor
        </h1>
        <div className="flex justify-between items-center">
          <label htmlFor="">Nome do Fornecedor</label>
          <input
            value={fornecedor.nome}
            readOnly
            className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-full p-2.5"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="">Contato</label>
          <input
            value={fornecedor.contato}
            readOnly
            className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-1/4 p-2.5"
          />
          <label htmlFor="">Endereço</label>
          <input
            value={fornecedor.endereco}
            readOnly
            className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-1/4 p-2.5"
          />
        </div>
        <div>
          <button
            className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
            onClick={handleCloseDetailsModal}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FornecedorDetailsModal;
