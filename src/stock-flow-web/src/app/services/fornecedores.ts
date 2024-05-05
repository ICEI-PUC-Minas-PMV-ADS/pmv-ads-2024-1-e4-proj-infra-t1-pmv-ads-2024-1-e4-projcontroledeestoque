import axios from "axios";

export type Fornecedor = {
  id: string;
  nome: string;
  contato: string;
  endereco: string;
};

const axiosInstance = axios.create({
  baseURL: "https://stock-flow.azurewebsites.net/api/v1/fornecedores",
  timeout: 30000,
});

export async function getFornecedores(query?: any): Promise<Fornecedor[]> {
  const queryString = query?.name ? `?nome=${query.name}` : "";
  try {
    const response = await axiosInstance.get(queryString);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter fornecedores:", error);
    throw error;
  }
}

export async function createFornecedor(fornecedor: Fornecedor): Promise<Fornecedor> {
  try {
    const response = await axiosInstance.post("", fornecedor);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar fornecedor:", error);
    throw error;
  }
}

export async function deleteFornecedor(id: string): Promise<Fornecedor> {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir fornecedor:", error);
    throw error;
  }
}

export async function updateFornecedor(fornecedor: Fornecedor): Promise<Fornecedor> {
  try {
    const response = await axiosInstance.put(`/${fornecedor.id}`, fornecedor);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar fornecedor:", error);
    throw error;
  }
}
