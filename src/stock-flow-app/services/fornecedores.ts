import axios from "axios";
import {Routes} from "@/constants/Routes";

export type FornecedoresQueryParams = {
    nome?: string;
    contato?: string;
    endereco?: string;
}

export type FornecedoresResponse = {
    id?: string;
    nome: string;
    contato?: string;
    endereco?: string;
};

export const FetchFornecedores = async (queryParams: FornecedoresQueryParams): Promise<Array<FornecedoresResponse>> => {
    try {
        const {data} = await axios.get(`${Routes.FORNECEDORES}`, {params: queryParams});
        return data;
    } catch (err) {
        console.log("err:", err);
        return [];
    }
};