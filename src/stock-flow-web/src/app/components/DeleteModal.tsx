import { Product, deleteProduct } from "../services/produtos";

type Props = {
    produto: Product;
    setDeleteModal: (value: boolean) => void;
}
export default function DeleteModal(props: any) {
    const handleDeleteProduct = async () => {
        deleteProduct(props.produto.id)
        props.handleDelete()
    }

    return (
    <>
      <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div className="bg-white px-16 py-14 rounded-md text-center">
          <h1 className="text-xl mb-4 font-bold text-slate-500">
            Deseja excluir {props.produto.nome}?
          </h1>
          <button className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
            onClick={() =>props.setDeleteModal(false)}
          >
            Cancelar
          </button>
          <button 
            onClick={handleDeleteProduct}
          className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">
            Sim, desejo excluir
          </button>
        </div>
      </div>
    </>
  );
}
