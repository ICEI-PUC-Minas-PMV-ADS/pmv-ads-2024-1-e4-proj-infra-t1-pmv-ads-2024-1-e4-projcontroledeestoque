import {useEffect, useState} from 'react'
import {CreateMovimentacao, createMovimentacao,} from '../services/movimentacoes'
import {Product} from '../services/produtos'

type Props = {
    produto?: Product | null
    usuario: string | null
    handleCloseMovementModal: () => void
}
export default function MovimentacaoModal(props: Props) {
    const [movimentacao, setMovimentacao] = useState<CreateMovimentacao>({
        produto: props.produto?.id || '',
        produtoNome: props.produto?.nome || '',
        tipo: 'Compra',
        data: new Date(),
        usuario: props.usuario || '',
        valor: 0,
        quantidade: 1,
    })

    const handleValueChange = (value: string) => {
        if (value === 'Compra') {
            setMovimentacao({
                ...movimentacao,
                tipo: 'Compra',
                valor:
                    Number(props.produto?.precoCusto) * Number(movimentacao.quantidade),
            })
        } else if (value === 'Venda') {
            setMovimentacao({
                ...movimentacao,
                tipo: 'Venda',
                valor:
                    Number(props.produto?.precoVenda) * Number(movimentacao.quantidade),
            })
        } else {
            setMovimentacao({
                ...movimentacao,
                quantidade: Number(value),
                valor:
                    Number(props.produto?.precoCusto) * Number(movimentacao.quantidade),
            })
        }
    }

    useEffect(() => {
        setMovimentacao({
            ...movimentacao,
            valor:
                Number(props.produto?.precoCusto) * Number(movimentacao.quantidade),
        })
    }, [movimentacao.quantidade])

    const handleCreatemovimentacao = async () => {
        try {
            delete movimentacao.produtoNome
            await createMovimentacao(movimentacao)
            props.handleCloseMovementModal()
        } catch (error) {
            console.error('Erro ao excluir fornecedor:', error)
        }
    }

    return (
        <div
            className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
            <div className="bg-gray-700 px-8 py-10 rounded-md text-center flex flex-col gap-2 ">
                <h1 className="text-xl mb-4 font-bold text-slate-500">
                    Relatório de Movimentação
                </h1>
                <div className="flex flex-col justify-between items-center">
                    <label className=""> Nome do Produto</label>
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={movimentacao.produtoNome}
                            className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-full p-2.5"
                            disabled
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center">
                    <label className=""> Tipo de transação</label>
                    <select
                        onChange={(e) => {
                            handleValueChange(e.target.value)
                        }}
                        className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-full p-2.5"
                    >
                        <option value="Compra">Compra</option>
                        <option value="Venda">Venda</option>
                    </select>
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor=""> Quantidade </label>
                    <input
                        onChange={(e) => {
                            handleValueChange(e.target.value)
                        }}
                        value={movimentacao.quantidade}
                        type="number"
                        className="text-center bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-2/4 p-2.5"
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label htmlFor=""> Valor total </label>
                    <p className="border bg-gray-400 text-indigo-950 border-gray-300 rounded-md w-2/4 p-2.5">
                        R${movimentacao.valor}
                    </p>
                </div>

                <div className="pt-4">
                    <button
                        className="bg-red-700 px-4 py-2 rounded-md text-md text-white"
                        onClick={props.handleCloseMovementModal}
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
    )
}
