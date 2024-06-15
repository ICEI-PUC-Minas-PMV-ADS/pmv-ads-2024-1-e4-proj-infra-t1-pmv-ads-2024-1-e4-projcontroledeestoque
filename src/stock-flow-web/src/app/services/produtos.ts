import axios from "axios";
import {ROUTES} from "@/app/utils/constantes";

export type Product = {
  id: string;
  nome: string;
  descricao: string;
  categorias: string[];
  precoCusto: number;
  precoVenda: number;
  quantidade: number;
  fornecedoresId: string[] | null;
};

const axiosInstance = axios.create({
  baseURL: ROUTES.PRODUTOS,
  timeout: 60000,
});

export async function getProducts(query?: any): Promise<Product[]> {
  const name = query?.name ? `?nome=${query.name}` : "";
  try {
    const response = await axiosInstance.get(name);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    throw error;
  }
}

export async function createProduct(product: Product): Promise<Product> {
  try {
    const response = await axiosInstance.post("", product);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<Product> {
  try {
    const response = await axiosInstance.delete(`/${id}`)
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    throw error;
  }
}

export async function updateProduct(product: Product): Promise<Product> {
  try {
    const response = await axiosInstance.put(`/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    throw error;
  }
}
