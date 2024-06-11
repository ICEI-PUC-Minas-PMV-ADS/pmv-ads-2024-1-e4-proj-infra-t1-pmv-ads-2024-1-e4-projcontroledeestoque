'use client'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState, useRef } from 'react'
import Price from '../components/Price'
import Navigation from '../components/Navigation'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { getAccessToken } from '@/app/utils/acess-token'
import { Loading } from '@/app/components/Loading'
import { URLS } from '@/app/utils/constantes'
import { Movimentacao, getMovimentacoes } from '../services/movimentacoes'
import MovimentacaoModal from '../components/MovimentacaoModal'

export default function Relatorios() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Movimentacao[]>([])
  const [filter, setFilter] = useState('')
  const [createModal, setCreateModal] = useState(false)
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Movimentacao | null>(
    null
  )
  const router = useRouter()
  const formRef = useRef(null)

  const updateMovimentacoes = (message?: string) => {
    getMovimentacoes().then((data) => {
      setProducts(data)
      message && toast.success(message)
    })
  }

  const handleCloseCreateModal = () => {
    setCreateModal(!createModal)
    updateMovimentacoes()
    setTimeout(() => toast.success(`Movimentação criado com sucesso!`), 1000)
  }

  const handleOpenCreateModal = () => {
    setCreateModal(!createModal)
  }


  const handleSearch = () => {
    getMovimentacoes({ name: filter }).then((data) => {
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
    updateMovimentacoes()
  }, [filter])

  if (loading) {
    return <Loading />
  }

  if (!accessToken) {
    router.push(URLS.AUTENTICACAO_PATH + URLS.LOGIN_PATH)
    return
  }

  return (
    <div>
      <ToastContainer
        position='top-right'
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
        <div className='flex w-full justify-between'>
          <Navigation />
          <button
            onClick={handleOpenCreateModal}
            className='middle none text-zinc-950 center mr-4 rounded-lg bg-amber-600 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            data-ripple-light='true'>
            Nova Movimentação
          </button>
        </div>
      </div>

      <div className='mt-8 max-w-2xl mx-auto mb-6'>
        <form ref={formRef} onSubmit={handleSubmit}>
          <label className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300'>
            Search
          </label>
          <div className='relative'>
            <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-500 dark:text-gray-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
              </svg>
            </div>
            <input
              type='search'
              id='default-search'
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className='block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500'
              placeholder='Notebook, Fones, etc.'
              required></input>
            <button
              type='submit'
              className='text-white absolute right-2.5 bottom-2.5 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800'>
              Pesquisar
            </button>
          </div>
        </form>
      </div>

      <table className='w-full'>
        <thead className='bg-gray-900'>
          <tr>
            <th className='py-1 px-4 max-w-prose'>Qtd</th>
            <th className='py-1 px-4 max-w-prose'>Produto</th>
            <th className='py-1 px-4 max-w-prose'>Tipo</th>
            <th className='py-1 px-4 max-w-prose'>Forncedores</th>
            <th className='py-1 px-4 max-w-prose'>Valor total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              className={`bg-gray-${index % 2 === 0 ? '950' : '900'} py-2`}
              key={product.id}>
              <td className='py-1 px-4 max-w-prose '>{product.quantidade}</td>
              <td
                className={`py-1 px-4 max-w-prose border-s border-gray-${
                  index % 2 === 0 ? '900' : '950'
                }`}>
                {product.produtoNome}
              </td>
              <td
                className={`py-1 px-4 max-w-prose border-s border-gray-${
                  index % 2 === 0 ? '900' : '950'
                }`}>
                {product.tipo}
              </td>
              <td className={`py-1 px-4 max-w-prose border-s border-gray-950`}>
                {product.fornecedoresNomes
                  .map((e) => (e.length > 0 ? e : ''))
                  .join(`, `)}
              </td>

              <td
                className={`py-1 px-4 max-w-prose border-s border-gray-${
                  index % 2 === 0 ? '900' : '950'
                }`}>
                <Price value={product.valor}></Price>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {detailsModalOpen && selectedProduct && (
        // <ProductDetailsModal
        //   product={selectedProduct}
        //   handleCloseDetailsModal={handleCloseDetailsModal}
        // />
        <></>
      )}
    </div>
  )
}
