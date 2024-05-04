'use client'
import Navigation from "./components/Navigation";
import Login from "./autenticacao/login/page";

export default function Home() {
    const isBrowser = typeof window !== 'undefined';
    const accessToken = isBrowser ? localStorage.getItem("accessToken") : null;

    return accessToken ? (
        <div>
            <h1 className="text-indigo-600">
                Stock Flow <span className="text-gray-500">Home</span>
            </h1>

            <Navigation/>
        </div>
    ) : (
        <Login/>
    );
}
