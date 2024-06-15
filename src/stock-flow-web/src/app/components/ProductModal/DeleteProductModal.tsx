import {deleteProduct, Product} from "../../services/produtos";

type Props = {
    product: Product;
    setDeleteModal: (value: boolean) => void;
    handleDelete: () => void;
    handleToast: (value: string) => void;
}
export default function DeleteProductModal(props: Props) {
    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(props.product.id);
            props.handleDelete();
            props.handleToast(`Produto ${props.product.nome} excluído com sucesso!`);
        } catch (error) {
            console.error("Erro ao excluir fornecedor:", error);
        }
    }

    return (
        <>
            <div
                className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
                <div className="bg-white px-16 py-14 rounded-md text-center">
                    <h1 className="text-xl mb-4 font-bold text-slate-500">
                        Deseja excluir {props.product.nome}?
                    </h1>
                    <button className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
                            onClick={props.handleDelete}
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
