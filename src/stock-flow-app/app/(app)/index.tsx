import {useSession} from "@/store/SessionProvider";
import LoadingOverlay from "@/components/LoadingOverlay";
import {Redirect} from "expo-router";
import {useEffect, useState} from "react";

export default function AppScreen() {
    const {session, isLoading} = useSession();
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        new Promise(resolve => setTimeout(resolve, 1000)).then(() => setAppIsReady(true));
    }, []);

    if (isLoading || !appIsReady) {
        return <LoadingOverlay message="Carregando informações..."/>;
    }

    if (!session) {
        return <Redirect href={'(auth)'} />;
    }
    
    return <Redirect href={'(tabs)'} />;
}