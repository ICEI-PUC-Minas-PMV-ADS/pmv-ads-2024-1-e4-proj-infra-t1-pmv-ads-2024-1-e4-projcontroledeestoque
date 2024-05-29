import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CreateMovimentacao, Movimentacao, createMovimentacao } from "../services/movimentacoes";
import { Product, getProducts } from "../services/produtos";

type Props = {
  movimentacao: Movimentacao;
  setDeleteModal: (value: boolean) => void;
};
export default function MovimentacaoModal(props: any) {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);
  const [movimentacao, setMovimentacao] = useState<CreateMovimentacao>({
    produto: "",
    produtoNome: "",
    tipo: "Compra",
    data: new Date(),
    usuario: "",
    valor: 0,
    quantidade: 0,
  });
  useEffect(() => {
    getProducts().then((data) => {
      setProdutos(data);
    });
  }, []);
  const handleCreatemovimentacao = async () => {
    try {
      delete movimentacao.produtoNome;
      // console.log(movimentacao);
      await createMovimentacao(movimentacao);
      props.handleCloseCreateModal();
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
    }
  };

  const [showOptions, setShowOptions] = useState(false);
  const handleSelect = (produto:Product) => {
    setMovimentacao({ ...movimentacao, 
      produtoNome: produto.nome,
      produto: produto.id})
    setShowOptions(false);
  };
  const handleChange = (e: { target: { value: any; }; }) => {
    const { value } = e.target;
    setMovimentacao({ ...movimentacao, produtoNome: value });

    if (value) {
      const filtrados = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(value.toLowerCase())
      );
      setProdutosFiltrados(filtrados);
      setShowOptions(true);
    } else {
      setProdutosFiltrados(produtos);
      setShowOptions(false);
    }
  };
  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-gray-700 px-8 py-10 rounded-md text-center flex flex-col gap-2 ">
        <h1 className="text-xl mb-4 font-bold text-slate-500">
          Realizar movimentação
        </h1>
        <div className="flex flex-col justify-between items-center">
          <label className=""> Nome do Produto</label>
          <div className="relative w-full">
            <input
              onChange={handleChange}
              type="text"
              value={movimentacao.produtoNome}
              className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-full p-2.5"
              onFocus={() => setShowOptions(true)}
              onBlur={() => setTimeout(() => setShowOptions(false), 200)}
            />
            {showOptions && (
              <ul className="absolute text-zinc-900 border bg-white w-full max-h-40 overflow-y-auto z-10">
                {produtosFiltrados.map((produto, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelect(produto)}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    {produto.nome} <span
                    //tooltip
                    className="text-gray-500 text-xs ml-2"
                    >
                      {produto.id}
                      </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between items-center">
          <label className=""> Tipo de transação</label>
          <select
            name=""
            id=""
            onChange={(e) => {
              setMovimentacao({
                ...movimentacao,
                tipo: e.target.value as "Compra" | "Venda",
              });
            }}
            className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-full p-2.5"
          >
            <option value="Compra">Compra</option>
            <option value="Venda">Venda</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor=""> Preço de custo </label>
          <input
            onChange={(e) => {
              setMovimentacao({
                ...movimentacao,
                valor: Number(e.target.value),
              });
            }}
            type="number"
            className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-1/4 p-2.5"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor=""> Quantidade </label>
          <input
            onChange={(e) => {
              setMovimentacao({
                ...movimentacao,
                quantidade: Number(e.target.value),
              });
            }}
            type="number"
            className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-1/4 p-2.5"
          />
        </div>

        <div>
          <button
            className="bg-red-700 px-4 py-2 rounded-md text-md text-white"
            onClick={props.handleCloseCreateModal}
          >
            Cancelar
          </button>
          <button
            onClick={handleCreatemovimentacao}
            className="bg-indigo-700 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
