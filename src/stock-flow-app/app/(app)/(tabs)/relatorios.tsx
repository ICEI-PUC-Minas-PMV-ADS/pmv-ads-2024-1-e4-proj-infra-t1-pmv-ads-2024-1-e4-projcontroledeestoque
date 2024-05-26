import {StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useEffect, useState} from "react";
import {useSession} from "@/store/SessionProvider";
import LoadingOverlay from "@/components/LoadingOverlay";
import {router} from "expo-router";
import {RelatoriosQueryParams, RelatoriosResponse} from "@/services/relatorios";
import {MOCK_RELATORIOS} from "@/constants/MockData";
import ThemedViewRoot from "@/components/ThemedViewRoot";
import ListRelatorio from "@/components/relatorios/ListRelatorio";

export default function RelatoriosScreen() {
    const {session, isLoading} = useSession();
    const [appIsReady, setAppIsReady] = useState(false);
    const [relatorios, setRelatorios] = useState<RelatoriosResponse[]>([]);

    async function fetchRelatorios(queryParams: RelatoriosQueryParams) {
        //TODO: Remover MOCK e descomentar FetchRelatorios
        //const fetchData = await FetchRelatorios(queryParams);
        const fetchData: RelatoriosResponse[] = MOCK_RELATORIOS;
        setRelatorios(fetchData);
    }
    
    useEffect(() => {
        setAppIsReady(false);
        fetchRelatorios({}).then(() => setTimeout(() => setAppIsReady(true), 1000));
    }, []);

    if (isLoading || !appIsReady) {
        return <LoadingOverlay message="Buscando relatórios..."/>;
    }

    if (!session) {
        router.replace('(auth)');
    }
    
    return (
        <ThemedViewRoot>
            <ThemedView>
                <ThemedText type="title">Relatórios!</ThemedText>
            </ThemedView>
            <ListRelatorio relatorios={relatorios}/>
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
});
