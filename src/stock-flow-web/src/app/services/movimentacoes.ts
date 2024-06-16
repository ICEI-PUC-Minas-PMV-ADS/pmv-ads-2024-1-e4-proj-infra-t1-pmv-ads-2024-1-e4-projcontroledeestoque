import axios from 'axios'
import {ROUTES} from "@/app/utils/constantes";

export type Movimentacao = {
    id: string
    produtoNome: string
    fornecedoresNomes: string[]
    tipo: 'Compra' | 'Venda'
    quantidade: number
    valor: number
    usuario: string
    data: Date
}

export type CreateMovimentacao = {
    produto: string
    produtoNome?: string
    tipo: 'Compra' | 'Venda'
    quantidade: number
    valor: number
    usuario: string
    data: Date

}

const relatoriosInstance = axios.create({
    baseURL: ROUTES.RELATORIOS,
    timeout: 60000,
})

const movimentacoesInstance = axios.create({
    baseURL: ROUTES.MOVIMENTACOES,
    timeout: 60000,
})

export async function getMovimentacoes(query?: any): Promise<Movimentacao[]> {
    try {
        const allFieldsUndefined = Object.values(query || {}).every(value => value === undefined || value === '');

        if (!allFieldsUndefined) {
            const response = await relatoriosInstance.get('', { params: query });
            return response.data;
        } else {
            const queryString = query?.name ? `?nome=${query.name}` : ''
            const response = await relatoriosInstance.get(queryString)
            return response.data;
        }
    } catch (error) {
        console.error('Erro ao obter movimentacao:', error);
        throw error;
    }
}

export async function createMovimentacao(
    movimentacao: CreateMovimentacao
): Promise<Movimentacao> {
    try {
        const response = await movimentacoesInstance.post('', movimentacao)
        return response.data
    } catch (error) {
        console.error('Erro ao criar movimentacao:', error)
        throw error
    }
}

export async function updateMovimentacoes(filters: any): Promise<Movimentacao[]> {
    try {
        const data = await getMovimentacoes(filters);
        return data;
    } catch (error) {
        console.error('Erro ao obter movimentacao:', error);
        throw error;
    }
}