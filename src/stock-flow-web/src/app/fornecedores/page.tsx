"use client";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { Fornecedor, getFornecedores } from "../services/fornecedores";

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

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
  return (
    <div>
      <h1 className="text-indigo-600">
        Stock Flow <span className="text-gray-500">Fornecedores</span>
      </h1>

      <Navigation />

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
          </div>
        ))}
      </div>
    </div>
  );
}
