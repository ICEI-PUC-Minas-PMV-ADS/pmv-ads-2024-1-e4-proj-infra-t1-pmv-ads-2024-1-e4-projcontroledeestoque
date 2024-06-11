'use client'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState, useRef } from 'react'
import { Product, getProducts } from '../services/produtos'
import Price from '../components/Price'
import Navigation from '../components/Navigation'
import { ChartLineUp, NotePencil, TrashSimple } from '@phosphor-icons/react'
import DeleteModal from '../components/DeleteModal'
import ProductModal from '../components/ProductModal'
import { ToastContainer, toast } from 'react-toastify'
import EditProductModal from '../components/EditProductModal'
import ProductDetailsModal from '../components/ProductDetailsModal'
import { useRouter } from 'next/navigation'
import { getAccessToken } from '@/app/utils/acess-token'
import { Loading } from '@/app/components/Loading'
import { URLS } from '@/app/utils/constantes'
import MovimentacaoModal from '../components/MovimentacaoModal'

export default function Products() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [createModal, setCreateModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [movementModal, setMovementModal] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const router = useRouter()
  const formRef = useRef(null)

  const handleDelete = (produto: Product) => {
    setProduct(produto)
    setDeleteModal(!deleteModal)
    updateProducts(`Produto ${produto.nome} excluído com sucesso!`)
  }

  const updateProducts = (message?: string) => {
    getProducts().then((data) => {
      setProducts(data)
      message && toast.success(message)
    })
  }

  const handleCloseCreateModal = () => {
    setCreateModal(!createModal)
    updateProducts()
    setTimeout(() => toast.success(`Produto criado com sucesso!`), 1000)
  }

  const handleOpenCreateModal = () => {
    setCreateModal(!createModal)
  }

  const handleCloseEditModal = () => {
    setEditModal(!editModal)
    updateProducts()
    toast.success(`Produto editado com sucesso!`)
  }

  const handleOpenEditModal = (product: Product) => {
    setProduct(product)
    setEditModal(!editModal)
  }
  const handleOpenMovementModal = (product: Product) => {
    setProduct(product)
    setMovementModal(!movementModal)
  }
  const handleCloseMovementModal = () => {
    setMovementModal(false)
    setProduct(null)
  }

  const handleOpenDetailsModal = (product: Product) => {
    setSelectedProduct(product)
    setDetailsModalOpen(true)
  }

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false)
    setSelectedProduct(null)
  }

  const handleSearch = () => {
    getProducts({ name: filter }).then((data) => {
      setProducts(data)
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSearch()
  }

  useEffect(() => {
    const accessToken = getAccessToken()
    setAccessToken(accessToken)
    setLoading(false)
  }, [])

  useEffect(() => {
    updateProducts()
  }, [filter])

  if (loading) {
    return <Loading />
  }

  if (!accessToken) {
    router.push(URLS.AUTENTICACAO_PATH + URLS.LOGIN_PATH)
    return
  }

  return editModal ? (
    <EditProductModal
      product={
        product || {
          id: '',
          nome: '',
          quantidade: 0,
          descricao: '',
          precoCusto: 0,
          precoVenda: 0,
          categorias: [],
          imagem: '',
          fornecedoresId: [],
        }
      }
      handleCloseEditModal={handleCloseEditModal}
    />
  ) : createModal ? (
    <ProductModal handleCloseCreateModal={handleCloseCreateModal} />
  ) : movementModal ? (
    <MovimentacaoModal
    produto={product}
    handleCloseMovementModal={handleCloseMovementModal}
    />
  ) :
  deleteModal ? (
    product ? (
      <DeleteModal
        handleDelete={() => handleDelete(product!)}
        product={product}
        setDeleteModal={setDeleteModal}
      />
    ) : null
  ) : (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
        <div className="flex w-full justify-between">
          <Navigation />
          <div>
            <button
              onClick={handleOpenCreateModal}
              className="middle none text-zinc-950 center mr-4 rounded-lg bg-amber-600 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              Novo Produto
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 max-w-2xl mx-auto mb-6">
        <form ref={formRef} onSubmit={handleSubmit}>
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
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Pesquisar
            </button>
          </div>
        </form>
      </div>

      <table className="w-full">
        <thead className="">
          <tr>
            <th className="py-1 px-2 max-w-prose">Qtd</th>
            <th className="py-1 px-4 max-w-prose">Produto</th>
            <th className="py-1 px-4 max-w-prose">Descrição</th>
            <th className="py-1 px-4 max-w-prose">Categoria</th>
            <th className="py-1 px-4 max-w-prose">P.Venda</th>
            <th className="py-1 px-4 max-w-prose">P.Custo</th>
            <th className="py-1 px-2 max-w-prose"> </th>
          </tr>
        </thead>
        <tbody className="">
          {products.map((product, index) => (
            <tr
              className={`bg-gray-${index % 2 === 0 ? '950' : '900'} py-2`}
              key={product.id}
            >
              <td className="py-1 px-4 max-w-prose">{product.quantidade}</td>
              <td
                className="py-1 px-4 max-w-prose"
                onClick={() => handleOpenDetailsModal(product)}
              >
                <div className="text-amber-600">{product.nome}</div>
              </td>
              <td className="py-1 px-4 max-w-prose">{product.descricao}</td>
              <td className="py-1 px-4 max-w-prose">
                {product.categorias
                  .map((e) => (e.length > 0 ? e : ''))
                  .join(`, `)}
              </td>
              <td className="py-1 px-4 max-w-prose">
                <Price value={product.precoVenda}></Price>
              </td>
              <td className="py-1 px-4 max-w-prose">
                <Price value={product.precoCusto}></Price>
              </td>
              <td className="py-1 px-4 max-w-prose">
                <button
                  className="hover:bg-yellow-800 rounded-md"
                  onClick={() => handleOpenEditModal(product)}
                >
                  <NotePencil size={20} />
                </button>
                <button
                  className="hover:bg-red-800 rounded-md"
                  onClick={() => handleDelete(product)}
                >
                  <TrashSimple size={20} />
                </button>
                <button
                  className="hover:bg-indigo-800 rounded-md"
                  onClick={() => handleOpenMovementModal(product)}
                >
                <ChartLineUp size={20} />
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {detailsModalOpen && selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          handleCloseDetailsModal={handleCloseDetailsModal}
        />
      )}
    </div>
  )
}
