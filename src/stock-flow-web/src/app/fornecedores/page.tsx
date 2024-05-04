"use client";
import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Fornecedor, getFornecedores } from "../services/fornecedores";
import { TrashSimple, NotePencil } from "@phosphor-icons/react";
import DeleteModal from "../components/DeleteModalFornecedor";
import FornecedorModal from "../components/FornecedorModal";
import { toast } from "react-toastify";
import EditFornecedorModal from "../components/EditFornecedorModal";
import FornecedorDetailsModal from "../components/FornecedorDetailsModal";

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [filter, setFilter] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState<Fornecedor | null>(null);

  const handleDelete = (fornecedor: Fornecedor) => {
    setFornecedor(fornecedor);
    setDeleteModal(!deleteModal);
    toast.success(`Fornecedor removido com sucesso!`);
    updateFornecedores();
  };

  const updateFornecedores = () => {
    getFornecedores().then((data) => {
      setFornecedores(data);
    });
  };

  const handleCloseCreateModal = () => {
    setCreateModal(!createModal);
    updateFornecedores();
    toast.success(`Fornecedor criado com sucesso!`);
    window.location.reload();
  };

  const handleOpenCreateModal = () => {
    setCreateModal(!createModal);
  };

  const handleCloseEditModal = () => {
    setEditModal(!editModal);
    updateFornecedores();
    toast.success(`Fornecedor editado com sucesso!`);
    window.location.reload();
  };

  const handleOpenEditModal = (fornecedor: Fornecedor) => {
    setFornecedor(fornecedor);
    setEditModal(!editModal);
  };

  const handleOpenDetailsModal = (fornecedor: Fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedFornecedor(null);
  };

  useEffect(() => {
    updateFornecedores();
  }, [filter]);

  return editModal ? (
    <EditFornecedorModal fornecedor={fornecedor || { id: "", nome: "", contato: "", endereco: "" }} handleCloseEditModal={handleCloseEditModal} />
  ) : createModal ? (
    <FornecedorModal handleCloseCreateModal={handleCloseCreateModal} />
  ) : deleteModal ? (
    fornecedor ? (
      <DeleteModal handleDelete={() => handleDelete(fornecedor!)} fornecedor={fornecedor} setDeleteModal={setDeleteModal} />
  ) : null
  ) : (
    <div>
      <div>
        <h1 className="text-indigo-600">
          Stock Flow <span className="text-gray-500">Fornecedores</span>
        </h1>
        <div className="flex w-full justify-between">
          <Navigation />
          <button
            onClick={handleOpenCreateModal}
            className="middle none text-zinc-950 center mr-4 rounded-lg bg-amber-600 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
          >
            Novo Fornecedor
          </button>
        </div>
      </div>

      <div className="mt-8 max-w-2xl mx-auto mb-6">
        <form>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
              placeholder="fornecedor"
              required
            ></input>
            <button
              type="button"
              className="text-white absolute right-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              onClick={(e) =>
                getFornecedores({ name: filter }).then((data) => {
                  setFornecedores(data);
                })
              }
            >
              Pesquisar
            </button>
          </div>
        </form>
      </div>

      <div className="h-full flex flex-col ">
        <div className="bg-gray-800 text-white py-2">
          <div className="container mx-auto grid grid-cols-5 gap-2 ">
            <div className="w-1/5">Nome</div>
            <div className="w-1/5">Contato</div>
            <div className="w-1/5">Endereço</div>
            <div className="w-1/5">Editar</div>
            <div className="w-1/5 mx-6">Excluir</div>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          {fornecedores.map((fornecedor, index) => (
            <div
              className={`bg-gray-${index % 2 === 0 ? "950" : "900"} py-2 flex items-center justify-between px-4`}
              key={fornecedor.id}
            >
              <div onClick={() => handleOpenDetailsModal(fornecedor)} className="w-1/5 text-amber-600">{fornecedor.nome}</div>
              <div className="w-1/5">{fornecedor.contato}</div>
              <div className="w-1/5">{fornecedor.endereco}</div>
              <div className="w-1/5">
                <button onClick={() => handleOpenEditModal(fornecedor)}>
                  <NotePencil size={20} />
                </button>
              </div>
              <div className="w-1/5">
                <button onClick={() => handleDelete(fornecedor)}>
                  <TrashSimple size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      {detailsModalOpen && selectedFornecedor && (
        <FornecedorDetailsModal fornecedor={selectedFornecedor} handleCloseDetailsModal={handleCloseDetailsModal} />
      )}
    </div>
    </div>
  );
}

