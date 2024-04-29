import axios from "axios";
export type Product = {
  id: string;
  nome: string;
  descricao: string;
  categorias: string[];
  precoCusto: number;
  precoVenda: number;
  quantidade: number;
  imagem: string;
  fornecedoresId: string[] | null;
};
export async function getProducts(query?: any): Promise<Product[]> {
  const url = `https://stock-flow.azurewebsites.net/api/v1/produtos`;
  const name = query?.name ? `/?nome=${query.name}` : "";
  const response = await axios.get(`${url}${name}`);
  console.log(response);
  return response.data;
}
