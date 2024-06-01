import axios from "axios";
import {Routes} from "@/constants/Routes";

export type ProdutosQueryParams = {
    nome?: string;
    categoria?: string[];
}

export type ProdutosResponse = {
    id?: string;
    nome: string;
    descricao?: string;
    categoria?: string[];
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