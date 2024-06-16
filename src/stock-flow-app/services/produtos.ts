import axios from "axios";
import {Routes} from "@/constants/Routes";

export type ProdutosQueryParams = {
    nome?: string;
    categoria?: string;
    quantidade?: string;
    precoCusto?: string;
    precoVenda?: string;
    fornecedor?: string;
}

export type ProdutosResponse = {
    id?: string;
    nome: string;
    descricao?: string;
    categorias?: string[];
    precoCusto: number;
    precoVenda: number;
    quantidade: number;
};

export const FetchProdutos = async (queryParams: ProdutosQueryParams): Promise<Array<ProdutosResponse>> => {
    try {
        const {data} = await axios.get(`${Routes.PRODUTOS}`, {params: queryParams});
        return data;
    } catch (err) {
        console.log("err:", err);
        return [];
    }
};