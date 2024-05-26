import axios from "axios";
import {Routes} from "@/constants/Routes";

export type RelatoriosQueryParams = {
    dataInicio?: string;
    dataFim?: string;
    produto?: string;
    usuario?: string;
    tipoMovimentacao?: string;
    quantidade?: string;
    quantidadeMinima?: string;
    quantidadeMaxima?: string;
    valor?: string;
    valorMinimo?: string;
    valorMaximo?: string;
}

export type RelatoriosResponse = {
    id?: string;
    produtoId?: string;
    produtoNome?: string;
    fornecedoresNomes?: string[];
    tipo?: string;
    quantidade: number;
    valor: number;
    usuario?: string;
    data: string;
};

export const FetchRelatorios = async (queryParams: RelatoriosQueryParams): Promise<Array<RelatoriosResponse>> => {
    try {
        const {data} = await axios.get(`${Routes.RELATORIOS}`, {params: queryParams});
        return data;
    } catch (err) {
        console.log("err:", err);
        return [];
    }
};