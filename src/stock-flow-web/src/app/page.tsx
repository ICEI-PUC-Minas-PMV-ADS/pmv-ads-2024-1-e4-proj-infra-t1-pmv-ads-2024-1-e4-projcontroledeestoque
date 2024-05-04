'use client'
import { useEffect, useState } from 'react';
import Navigation from "./components/Navigation";
import Login from "./autenticacao/login/page";
import {Loading} from "@/app/components/Loading";
import {useRouter} from "next/navigation";

export default function Home() {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setAccessToken(token);
        setLoading(false);
    }, []);

    if (loading) {
        return <Loading/>;
    }

    return accessToken ? (
        <div>
            <h1 className="text-indigo-600">
                Stock Flow <span className="text-gray-500">Home</span>
            </h1>

            <Navigation/>
        </div>
    ) : router.push("autenticacao/login")
}
