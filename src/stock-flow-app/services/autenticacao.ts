import axios, {AxiosError} from 'axios';

interface ILoginUser {
    email: string;
    senha: string;
}

interface IRegisterUser {
    nome: string;
    email: string;
    senha: string;
    senhaConfirmada: string;
}

export interface IAuthResponse {
    mensagem?: string;
    sucesso?: boolean;
    email?: string;
    userId?: string;
    accessToken?: string;
}

const API_URL = "https://stock-flow.azurewebsites.net/api/v1/autenticacao";

export const LoginUser = async (login : ILoginUser): Promise<IAuthResponse> => {
    try {
        const {data} = await axios.post(`${API_URL}/login`, login);
        return {...data};
    } catch (err) {
        console.log("err:", err);
        if (err instanceof AxiosError) {
            const errParsed = JSON.parse(err.request.responseText);
            return {...errParsed, sucesso: false};
        } else {
            return {mensagem: "Ops! Algo deu errado. Tente novamente mais tarde.", sucesso: false};
        }
    }
}

export const RegisterUser = async (register : IRegisterUser): Promise<IAuthResponse> => {
    try {
        const {data} = await axios.post(`${API_URL}/cadastro`, register);
        return {...data};
    } catch (err) {
        if (err instanceof AxiosError) {
            const errParsed = JSON.parse(err.request.responseText);
            return {...errParsed, sucesso: false};
        } else {
            return {mensagem: "Ops! Algo deu errado. Tente novamente mais tarde.", sucesso: false};
        }
    }
}