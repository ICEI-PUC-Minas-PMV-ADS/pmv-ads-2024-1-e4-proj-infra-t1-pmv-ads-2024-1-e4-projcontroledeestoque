import axios from "axios";
export type Fornecedor = {
  id: string;
  nome: string;
  contato: string;
  endereco: string;
};
export async function getFornecedores(query?: any): Promise<Fornecedor[]> {
  const url = `https://stock-flow.azurewebsites.net/api/v1/fornecedores`;
  const queryString = query?.name ? `?nome=${query.name}` : "";
  const response = await axios.get(`${url}${queryString}`);
  console.log(response);
  return response.data;
}
export async function createFornecedor(fornecedor: Fornecedor): Promise<Fornecedor> {
  const url = `https://stock-flow.azurewebsites.net/api/v1/fornecedores`;
  const response = await axios.post(url, fornecedor);
  return response.data;
}

export async function deleteFornecedor(id: string): Promise<Fornecedor> {
  const url = `https://stock-flow.azurewebsites.net/api/v1/fornecedores/${id}`;
  const response = await axios.delete(url);
  return response.data;
}

export async function updateFornecedor(fornecedor: Fornecedor): Promise<Fornecedor> {
  const url = `https://stock-flow.azurewebsites.net/api/v1/fornecedores/${fornecedor.id}`;
  const response = await axios.put(url, fornecedor);
  return response.data;
}
