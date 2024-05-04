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
  const name = query?.name ? `?nome=${query.name}` : "";
  const response = await axios.get(`${url}${name}`);
  console.log(response);
  return response.data;
}

export async function createProduct(product: Product): Promise<Product> {
  const url = `https://stock-flow.azurewebsites.net/api/v1/produtos`;
  const response = await axios.post(url, product);
  return response.data;
}

export async function deleteProduct(id: string): Promise<Product> {
  const url = `https://stock-flow.azurewebsites.net/api/v1/produtos/${id}`;
  const response = await axios.delete(url);
  return response.data;
}

export async function updateProduct(product: Product): Promise<Product> {
  const url = `https://stock-flow.azurewebsites.net/api/v1/produtos/${product.id}`;
  const response = await axios.put(url, product);
  return response.data;
}
