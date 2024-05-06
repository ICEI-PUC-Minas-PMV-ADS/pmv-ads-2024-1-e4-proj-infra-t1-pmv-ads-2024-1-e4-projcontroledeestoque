import { useState } from "react";
import { Product, createProduct, updateProduct } from "../services/produtos";

type Props = {
  product: Product;
  handleCloseEditModal: () => void;
};
export default function EditProductModal(props: Props) {
  const [product, setProduct] = useState<Product>(props.product);
  const handleEditProduct = async () => {
    try {
        await updateProduct(product);
        props.handleCloseEditModal();
    } catch (error) {
        console.error("Erro ao excluir fornecedor:", error);
    }   
  };
  
  return (
    <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className="bg-gray-700 px-8 py-10 rounded-md text-center flex flex-col gap-2 ">
        <div className="flex justify-between items-center">
          <label className=""> Nome do Produto</label>
          <input
            onChange={(e) => {
              setProduct({ ...product, nome: e.target.value });
            }}
            type="text"
            value={product.nome}
            className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-full p-2.5"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor=""> Preço de custo </label>
          <input
            onChange={(e) => {
              setProduct({ ...product, precoCusto: Number(e.target.value) });
            }}
            value={product.precoCusto}
            type="number"
            className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-1/4 p-2.5"
          />
          <label htmlFor=""> Preço de venda </label>
          <input
            onChange={(e) => {
              setProduct({ ...product, precoVenda: Number(e.target.value) });
            }}
            value={product.precoVenda}
            type="number"
            className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-1/4 p-2.5"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor=""> Quantidade </label>
          <input
            onChange={(e) => {
              setProduct({ ...product, quantidade: Number(e.target.value) });
            }}
            type="number"
            value={product.quantidade}
            className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-1/4 p-2.5"
          />
          <label htmlFor=""> Categoria </label>
          <input
            onChange={(e) => {
              setProduct({ ...product, categorias: [e.target.value] });
            }}
            type="text"
            value={product.categorias[0]}
            className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-1/4 p-2.5"
          />
        </div>
        <div className="flex-col">
          <label htmlFor=""> Descrição </label>

          <textarea
            onChange={(e) => {
              setProduct({ ...product, descricao: e.target.value });
            }}
            value={product.descricao}
            className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-full p-2.5"
          />
        </div>
        <div className="flex-col ">
          <label htmlFor=""> Imagem </label>
          <input
            onChange={(e) => {
              setProduct({ ...product, imagem: e.target.value });
            }}
            type="file"
            className=" bg-gray-400 border text-indigo-950 border-gray-300 rounded-md w-full p-2.5"
          />
        </div>

        <div>
          <button
            className="bg-red-700 px-4 py-2 rounded-md text-md text-white"
            onClick={props.handleCloseEditModal}
          >
            Cancelar
          </button>
          <button
            onClick={handleEditProduct}
            className="bg-indigo-700 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
