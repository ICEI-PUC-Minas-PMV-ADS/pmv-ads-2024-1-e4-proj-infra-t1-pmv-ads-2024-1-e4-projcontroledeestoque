'use client'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useRef, useState } from 'react'
import Price from '../components/Price'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { getTokenData } from '@/app/utils/token-data'
import { Loading } from '@/app/components/Loading'
import { URLS } from '@/app/utils/constantes'
import { getMovimentacoes, Movimentacao } from '../services/movimentacoes'
import Navigation from "@/app/components/Navigation";

export default function Relatorios() {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<Movimentacao[]>([])
    const [filters, setFilters] = useState({
        DataInicio: '',
        DataFim: '',
        TipoMovimentacao: '',
        produto: '',
        usuario: '',
        quantidade: '',
        ValorMinimo: '',
        ValorMaximo: ''
    })
    const [detailsModalOpen, setDetailsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Movimentacao | null>(
        null
    )
    const router = useRouter()
    const formRef = useRef(null)

    const updateMovimentacoes = async () => {
        try {
            const data = await getMovimentacoes(filters);
            setProducts(data);
        } catch (error) {
            console.error('Erro ao buscar movimentações:', error);
            toast.error('Erro ao buscar movimentações.');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateMovimentacoes();
            toast.success('Filtros aplicados com sucesso.');
        } catch (error) {
            console.error('Erro ao buscar movimentações:', error);
            toast.error('Erro ao aplicar filtros.');
        }
    };

    useEffect(() => {
        const tokenData = getTokenData()
        setAccessToken(tokenData?.accessToken || null)
        setLoading(false)
    }, [])

    useEffect(() => {
        updateMovimentacoes()
    }, [filters])

    if (loading) {
        return <Loading/>
    }

    if (!accessToken) {
        router.push(URLS.LOGIN_PATH)
        return null
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
                    <Navigation/>
                </div>
            </div>

            <div className='mt-6 mb-6 bg-gray-500'>
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-wrap items-center justify-center gap-4">
                    <div className='flex items-center gap-4'>
                        <label>Data Início:</label>
                        <input
                            type='date'
                            value={filters.DataInicio}
                            onChange={(e) => setFilters({ ...filters, DataInicio: e.target.value })}
                            className='border rounded-md px-2 py-1 text-black'
                        />
                    </div>
                    <div className='flex items-center gap-4'>
                        <label>Data Fim:</label>
                        <input
                            type='date'
                            value={filters.DataFim}
                            onChange={(e) => setFilters({ ...filters, DataFim: e.target.value })}
                            className='border rounded-md px-2 py-1 text-black'
                        />
                    </div>
                    <div className='flex items-center gap-4'>
                        <label>Tipo:</label>
                        <select
                            value={filters.TipoMovimentacao}
                            onChange={(e) => setFilters({ ...filters, TipoMovimentacao: e.target.value })}
                            className='border rounded-md px-2 py-1 text-black'
                        >
                            <option value=''>Selecione...</option>
                            <option value='Compra'>Compra</option>
                            <option value='Venda'>Venda</option>
                        </select>
                    </div>
                    <div className='flex items-center gap-4'>
                        <label>Valor Mínimo:</label>
                        <input
                            type='number'
                            value={filters.valorMinimo}
                            onChange={(e) => setFilters({ ...filters, valorMinimo: e.target.value })}
                            className='border rounded-md px-2 py-1 text-black w-28'
                        />
                    </div>
                    <div className='flex items-center gap-4'>
                        <label>Valor Máximo:</label>
                        <input
                            type='number'
                            value={filters.valorMaximo}
                            onChange={(e) => setFilters({ ...filters, valorMaximo: e.target.value })}
                            className='border rounded-md px-2 py-1 text-black w-28'
                        />
                    </div>
                    <button
                        type='submit'
                        className='text-white bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-lg'
                    >
                        Aplicar Filtro
                    </button>
                </form>
            </div>


            <table className='w-full'>
                <thead className='bg-gray-900'>
                    <tr>
                        <th className='py-1 px-4 max-w-prose'>Qtd</th>
                        <th className='py-1 px-4 max-w-prose'>Produto</th>
                        <th className='py-1 px-4 max-w-prose'>Tipo</th>
                        <th className='py-1 px-4 max-w-prose'>Fornecedores</th>
                        <th className='py-1 px-4 max-w-prose'>Valor total</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr
                            className={`bg-gray-${index % 2 === 0 ? '950' : '900'} py-2`}
                            key={product.id}
                        >
                            <td className='text-center py-1 px-4 max-w-prose '>{product.quantidade}</td>
                            <td
                                className={`py-1 px-4 max-w-prose border-gray-${
                                    index % 2 === 0 ? '900' : '950'
                                }`}
                            >
                                {product.produtoNome}
                            </td>
                            <td
                                className={`text-center py-1 px-4 max-w-prose border-gray-${
                                    index % 2 === 0 ? '900' : '950'
                                }`}
                            >
                                {product.tipo}
                            </td>
                            <td className={`py-1 px-4 max-w-prose border-gray-950`}>
                                {product.fornecedoresNomes
                                    .map((e) => (e.length > 0 ? e : ''))
                                    .join(`, `)}
                            </td>
                            <td
                                className={`text-center py-1 px-4 max-w-prose border-gray-${
                                    index % 2 === 0 ? '900' : '950'
                                }`}
                            >
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
