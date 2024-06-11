import axios from 'axios'

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

export type CreateMovimentacao ={
  produto: string
  produtoNome?: string
  tipo: 'Compra' | 'Venda' 
  quantidade: number
  valor: number
  usuario: string
  data: Date

}

const axiosInstance = axios.create({
  baseURL: 'https://stock-flow.azurewebsites.net/api/v1/relatorios/movimentacoes',
  timeout: 30000,
})
const createInstance = axios.create({
  baseURL: 'https://stock-flow.azurewebsites.net/api/v1/movimentacoes',
  timeout: 30000,
})
export async function getMovimentacoes(query?: any): Promise<Movimentacao[]> {
  const queryString = query?.name ? `?nome=${query.name}` : ''
  try {
    const response = await axiosInstance.get(queryString)
    return response.data
  } catch (error) {
    console.error('Erro ao obter movimentacao:', error)
    throw error
  }
}

export async function createMovimentacao(
  movimentacao: CreateMovimentacao
): Promise<Movimentacao> {
  try {
    movimentacao.usuario = localStorage.getItem('userId') || ''
    const response = await createInstance.post('', movimentacao)
    return response.data
  } catch (error) {
    console.error('Erro ao criar movimentacao:', error)
    throw error
  }
}

export async function deleteFornecedor(id: string): Promise<Movimentacao> {
  try {
    const response = await axiosInstance.delete(`/${id}`)
    return response.data
  } catch (error) {
    console.error('Erro ao excluir movimentacao:', error)
    throw error
  }
}

export async function updateFornecedor(
  movimentacao: Movimentacao
): Promise<Movimentacao> {
  try {
    const response = await axiosInstance.put(`/${movimentacao.id}`, movimentacao)
    return response.data
  } catch (error) {
    console.error('Erro ao atualizar movimentacao:', error)
    throw error
  }
}
