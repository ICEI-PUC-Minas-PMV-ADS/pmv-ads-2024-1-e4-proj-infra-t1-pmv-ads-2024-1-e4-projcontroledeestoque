import axios, {AxiosError} from 'axios';
import {Routes} from "@/constants/Routes";

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

export const LoginUser = async (login : ILoginUser): Promise<IAuthResponse> => {
    try {
        const {data} = await axios.post(`${Routes.LOGIN}`, login);
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
        const {data} = await axios.post(`${Routes.REGISTER}`, register);
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