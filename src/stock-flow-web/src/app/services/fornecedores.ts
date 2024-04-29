import axios from "axios";
export type Fornecedor = {
  id: string;
  nome: string;
  contato: "string";
  endereco: "string";
};
export async function getFornecedores(query?: any): Promise<Fornecedor[]> {
  const url = `https://stock-flow.azurewebsites.net/api/v1/fornecedores`;
  const name = query?.name ? `/?nome=${query.name}` : "";
  const response = await axios.get(`${url}${name}`);
  console.log(response);
  return response.data;
}
