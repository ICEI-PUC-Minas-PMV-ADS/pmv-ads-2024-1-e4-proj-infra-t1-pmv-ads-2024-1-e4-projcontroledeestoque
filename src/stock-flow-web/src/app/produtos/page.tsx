'use client';
import {useEffect, useState} from "react";
import {getProducts, Product} from "../services/produtos";
import Price from "../components/Price";
import Navigation from "../components/Navigation";
import {NotePencil, TrashSimple} from "@phosphor-icons/react";
import DeleteModal from "../components/DeleteModal";
import ProductModal from "../components/ProductModal";
import {toast} from "react-toastify";
import EditProductModal from "../components/EditProductModal";
import ProductDetailsModal from "../components/ProductDetailsModal";
import {useRouter} from "next/navigation";
import {getAccessToken} from "@/app/utils/acess-token";
import {Loading} from "@/app/components/Loading";
import {URLS} from "@/app/utils/constantes";

export default function Products() {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const router = useRouter();

    const handleDelete = (produto: Product) => {
        setProduct(produto);
        setDeleteModal(!deleteModal);
        toast.success(`Produto removido com sucesso!`);
        updateProducts()
    }

    const updateProducts = () => {
        getProducts().then((data) => {
            setProducts(data);
        });
    }

    const handleCloseCreateModal = () => {
        setCreateModal(!createModal);
        updateProducts()
        toast.success(`Produto criado com sucesso!`);
    }

    const handleOpenCreateModal = () => {
        setCreateModal(!createModal);
    }

    const handleCloseEditModal = () => {
        setEditModal(!editModal);
        updateProducts()
        toast.success(`Produto editado com sucesso!`);
        window.location.reload();
    }

    const handleOpenEditModal = (product: Product) => {
        setProduct(product);
        setEditModal(!editModal);
    }

    const handleOpenDetailsModal = (product: Product) => {
        setSelectedProduct(product);
        setDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setDetailsModalOpen(false);
        setSelectedProduct(null);
    };

    useEffect(() => {
        const accessToken = getAccessToken();
        setAccessToken(accessToken);
        setLoading(false);
    }, []);

    useEffect(() => {
        updateProducts()
    }, [filter]);

    if (loading) {
        return <Loading/>;
    }
    
    if (!accessToken) {
        router.push(URLS.AUTENTICACAO_PATH + URLS.LOGIN_PATH);
        return;
    }

    return editModal ? (
        <EditProductModal product={product || {
            id: "",
            nome: "",
            quantidade: 0,
            descricao: "",
            precoCusto: 0,
            precoVenda: 0,
            categorias: [],
            imagem: "",
            fornecedoresId: []
        }} handleCloseEditModal={handleCloseEditModal}/>
    ) : createModal ? (
        <ProductModal handleCloseCreateModal={handleCloseCreateModal}/>
    ) : deleteModal ? (
        product ? (
            <DeleteModal handleDelete={() => handleDelete(product!)} product={product} setDeleteModal={setDeleteModal}/>
        ) : null
    ) : (
        <div>
            <div>
                <h1 className="text-indigo-600">
                    Stock Flow <span className="text-gray-500">Produtos</span>
                </h1>
                <div className="flex w-full justify-between">
                    <Navigation/>
                    <button
                        onClick={handleOpenCreateModal}
                        className="middle none text-zinc-950 center mr-4 rounded-lg bg-amber-600 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true">
                        Novo Produto
                    </button>
                </div>
            </div>

            <div className="mt-8 max-w-2xl mx-auto mb-6">
                <form>
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
                        Search
                    </label>
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
                            placeholder="Notebook, Fones, etc."
                            required
                        ></input>
                        <button
                            type="button"
                            className="text-white absolute right-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                            onClick={(e) =>
                                getProducts({name: filter}).then((data) => {
                                    setProducts(data);
                                })
                            }
                        >
                            Pesquisar
                        </button>
                    </div>
                </form>
            </div>

            <div>
                <div className={`bg-gray-900 py-2 flex items-center justify-start px-4`}>
                    <div className="py-1" style={{width: "3%"}}>Qtd</div>
                    <div className="py-1 px-2" style={{width: "7%"}}>Produto</div>
                    <div className="py-1 px-2" style={{width: "34%"}}>Descrição</div>
                    <div className="py-1 px-4" style={{width: "34%"}}>Categoria</div>
                    <div className="py-1 px-4" style={{width: "8%"}}>P.Venda</div>
                    <div className="py-1 px-4" style={{width: "8%"}}>P.Custo</div>
                    <div className="py-1 px-4" style={{width: "8%"}}>Editar</div>
                    <div className="py-1 px-4" style={{width: "8%"}}>Excluir</div>
                </div>


                <div className="flex-grow overflow-y-auto">
                    {products.map((product, index) => (
                        <div
                            className={`bg-gray-${index % 2 === 0 ? "950" : "900"} py-2 flex items-center justify-between px-4`}
                            key={product.id}
                        >
                            <div className="py-1 px-4 max-w-prose ">
                                {product.quantidade}
                            </div>
                            <div onClick={() => handleOpenDetailsModal(product)}
                                 className="w-1/5 text-amber-600">{product.nome}</div>
                            <div className="py-1 px-4 w-full ">{product.descricao}</div>
                            <div className="py-1 px-4 w-full ">
                                {product.categorias.map((e) => (e.length > 0 ? e : "")).join(`, `)}
                            </div>
                            <div className="py-1 px-4 max-w-prose min-w-32">
                                <Price value={product.precoVenda}></Price>
                            </div>
                            <div className="py-1 px-4 max-w-prose min-w-32">
                                <Price value={product.precoCusto}></Price>
                            </div>
                            <div className="py-1 px-4 max-w-prose min-w-32">
                                <button onClick={() => handleOpenEditModal(product)}>
                                    <NotePencil size={20}/>
                                </button>
                            </div>
                            <div className="py-1 px-4 max-w-prose min-w-32">
                                <button onClick={() => handleDelete(product)}>
                                    <TrashSimple size={20}/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {detailsModalOpen && selectedProduct && (
                    <ProductDetailsModal product={selectedProduct} handleCloseDetailsModal={handleCloseDetailsModal}/>
                )}
            </div>
        </div>
    );
}
