'use client'
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { LoginService } from "../services/login";
import Link from "next/link";
import Home from "../page";

interface ILoginResponse {
  name: string;
  email: string;
  status?: number;
  userId?: string;
  accessToken?: string;
  message?: string;
  sucesso?: boolean;
}

export default function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const makeLogin = async () => {
    const res: ILoginResponse = await LoginService({ email, senha: password});
    console.log("res:", res);
    if (res.status !== 200) {
      toast.error(res?.message || "Erro ao fazer login");
    }
    if (res?.accessToken) {
      toast.success(`Seja bem vindo ${res.name}`);
      localStorage.setItem("accessToken", res.accessToken);
      setLoggedIn(true);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    await makeLogin();
  };

  if (isLoggedIn) {
    return <Home />;
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
      {/* <Header isLogged={isLoggedIn} /> */}
      <div>
        <form
          className="flex flex-col items-center justify-center w-full max-w-md p-4 m-auto bg-white rounded-lg shadow-lg dark:bg-gray-800"
           onSubmit={handleLogin}>
          <label>Email</label>
          <input
            className="w-full px-4 py-2 my-2 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-900"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(element) => setEmail(element.target.value)}
          />
          <label>Senha</label>
          <input
            className="w-full px-4 py-2 my-2 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-900"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(element) => setPassword(element.target.value)}
          />
          <Link href="/Register">
            {/* <StyledLink>Cadastrar-se</StyledLink> */}
          </Link>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
             type="submit">
            Login
          </button>
        </form>
        {error && <div>{error}</div>}
      </div>
    </>
  );
}