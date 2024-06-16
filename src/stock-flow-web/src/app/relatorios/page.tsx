'use client'
import {useEffect, useRef, useState} from 'react'
import Price from '../components/Price'
import {useRouter} from 'next/navigation'
import {getTokenData} from '@/app/utils/token-data'
import {Loading} from '@/app/components/Loading'
import {URLS} from '@/app/utils/constantes'
import {getMovimentacoes, Movimentacao} from '../services/movimentacoes'
import Navigation from "@/app/components/Navigation";

export default function Relatorios() {
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<Movimentacao[]>([])
    const [filters, setFilters] = useState({
        DataInicio: '',
        DataFim: '',
        TipoMovimentacao: ''
    })
    const [tempFilters, setTempFilters] = useState({
        DataInicio: '',
        DataFim: '',
        TipoMovimentacao: ''
    })
    const router = useRouter()
    const formRef = useRef(null)

    const updateMovimentacoes = async (filters: any) => {
        try {
            const data = await getMovimentacoes(filters);
            setProducts(data);
        } catch (error) {
            console.error('Erro ao buscar movimentações:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFilters(tempFilters);
        try {
            await updateMovimentacoes(tempFilters);
        } catch (error) {
            console.error('Erro ao buscar movimentações:', error);
        }
    };

    const formatDate = (date: string) => {
        if (!date) return "";
        try {
            return new Date(date).toLocaleDateString('pt-BR');
        } catch (error) {
            console.error('Erro ao formatar data:', error);
            return date;
        }
    };

    useEffect(() => {
        const tokenData = getTokenData()
        setAccessToken(tokenData?.accessToken || null)
        setLoading(false)
    }, [])

    useEffect(() => {
        updateMovimentacoes(filters)
    }, [filters])

    if (loading) {
        return <Loading/>
    }

    if (!accessToken) {
        router.push(URLS.LOGIN_PATH)
        return
    }

    return (
        <div>
            <div>
                <div className='flex w-full justify-between'>
                    <Navigation/>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center h-full'>
                <div
                    className='inline-flex flex-col items-center bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-1 rounded-lg mt-8 mb-6 px-2'>
                    <form ref={formRef} onSubmit={handleSubmit}
                          className="flex flex-wrap items-center justify-center gap-4">
                        <div className='flex items-center gap-4'>
                            <label className='text-sm font-medium text-gray-900 dark:text-gray-300'>De:</label>
                            <input
                                type='date'
                                value={tempFilters.DataInicio}
                                onChange={(e) => setTempFilters({...tempFilters, DataInicio: e.target.value})}
                                className='block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500'
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <label className='text-sm font-medium text-gray-900 dark:text-gray-300'>Até:</label>
                            <input
                                type='date'
                                value={tempFilters.DataFim}
                                onChange={(e) => setTempFilters({...tempFilters, DataFim: e.target.value})}
                                className='block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500'
                            />
                        </div>
                        <div className='flex items-center gap-4'>
                            <label className='text-sm font-medium text-gray-900 dark:text-gray-300'>Tipo:</label>
                            <select
                                value={tempFilters.TipoMovimentacao}
                                onChange={(e) => setTempFilters({...tempFilters, TipoMovimentacao: e.target.value})}
                                className='block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500'
                            >
                                <option value=''>Selecione...</option>
                                <option value='Compra'>Compra</option>
                                <option value='Venda'>Venda</option>
                            </select>
                        </div>
                        <button
                            type='submit'
                            className='text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800'
                        >
                            Pesquisar
                        </button>
                    </form>
                </div>
            </div>


            <table className='w-full'>
                <thead className='bg-gray-900'>
                <tr>
                    <th className='py-1 px-4 max-w-prose'>Data</th>
                    <th className='py-1 px-4 max-w-prose'>Tipo</th>
                    <th className='py-1 px-4 max-w-prose'>Qtd</th>
                    <th className='py-1 px-4 max-w-prose'>Produto</th>
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
                        <td
                            className={`text-amber-600 text-center py-1 px-4 max-w-prose border-gray-${
                                index % 2 === 0 ? '900' : '950'
                            }`}
                        >
                            {formatDate(product.data.toString())}
                        </td>
                        <td
                            className={`text-center py-1 px-4 max-w-prose border-gray-${
                                index % 2 === 0 ? '900' : '950'
                            } ${product.tipo === 'Compra' ? 'text-green-400' : 'text-red-400'} `}
                        >
                            {product.tipo}
                        </td>
                        <td className='text-center py-1 px-4 max-w-prose '>{product.quantidade}</td>
                        <td
                            className={`py-1 px-4 max-w-prose border-gray-${
                                index % 2 === 0 ? '900' : '950'
                            }`}
                        >
                            {product.produtoNome}
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
        </div>
    )
}
