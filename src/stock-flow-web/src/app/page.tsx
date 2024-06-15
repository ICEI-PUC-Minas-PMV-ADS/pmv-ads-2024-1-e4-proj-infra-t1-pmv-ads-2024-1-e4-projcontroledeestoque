'use client'
import {useEffect, useState} from 'react';
import Navigation from "./components/Navigation";
import {Loading} from "@/app/components/Loading";
import {useRouter} from "next/navigation";
import {URLS} from "@/app/utils/constantes";
import {getTokenData} from "@/app/utils/token-data";

export default function Home() {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const tokenData = getTokenData();
        setAccessToken(tokenData?.accessToken || null);
        setLoading(false);
    }, []);

    if (loading) {
        return <Loading/>;
    }

    return accessToken ? (
        <div>
            <Navigation/>
        </div>
    ) : router.push(URLS.LOGIN_PATH)
}
