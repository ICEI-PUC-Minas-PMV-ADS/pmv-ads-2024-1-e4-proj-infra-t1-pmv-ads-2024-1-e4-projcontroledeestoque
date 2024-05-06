'use client'
import {useEffect, useState} from 'react';
import Navigation from "./components/Navigation";
import {Loading} from "@/app/components/Loading";
import {useRouter} from "next/navigation";
import {URLS} from "@/app/utils/constantes";
import {getAccessToken} from "@/app/utils/acess-token";

export default function Home() {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const accessToken = getAccessToken();
        setAccessToken(accessToken);
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
    ) : router.push(URLS.AUTENTICACAO_PATH + URLS.LOGIN_PATH)
}
