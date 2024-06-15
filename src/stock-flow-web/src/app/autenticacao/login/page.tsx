'use client'
import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {IAuthResponse, LoginUser} from "../../services/autenticacao";
import Image from "next/image";
import {LoadingSpinner} from "@/app/components/LoadingSpinner";
import {useRouter} from "next/navigation";

export default function Login() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const makeLogin = async () => {
        const res: IAuthResponse = await LoginUser({email: email, senha: password});
        console.log("res:", res);
        if (res.sucesso && res?.accessToken && res?.userId) {
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("userId", res.userId);
            toast.success(`Seja bem vindo!`);
            setLoggedIn(true);
        } else {
            toast.error(res?.mensagem || "Ops! Algo deu errado. Tente novamente mais tarde.");
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        await makeLogin();
        setIsLoading(false);
    };

    if (isLoggedIn) {
        router.push("/#");
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            >
            </ToastContainer>

            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-indigo-900 dark:text-indigo-600">
                        <Image className="w-8 h-8 mr-2" src="/box.ico" alt="logo" width={80} height={80}/>
                        Stock Flow
                    </div>
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Entre na sua conta
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                <div>
                                    <label htmlFor="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        E-mail
                                    </label>
                                    <input type="email" name="email" id="email"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="email@exemplo.com"
                                           value={email}
                                           onChange={(element) => setEmail(element.target.value)}
                                           required={true}
                                           disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Senha
                                    </label>
                                    <input type="password" name="password" id="password" placeholder="••••••••"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           value={password}
                                           onChange={(element) => setPassword(element.target.value)}
                                           required={true}
                                           disabled={isLoading}
                                    />
                                </div>
                                <button type="submit"
                                        className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                                        disabled={isLoading}>
                                    {isLoading ? <LoadingSpinner/> : "Entrar"}
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Não possui uma conta ainda? <a href="/autenticacao/cadastro"
                                                                   className="font-medium text-indigo-600 hover:underline dark:text-indigo-500">
                                    Criar uma conta</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
