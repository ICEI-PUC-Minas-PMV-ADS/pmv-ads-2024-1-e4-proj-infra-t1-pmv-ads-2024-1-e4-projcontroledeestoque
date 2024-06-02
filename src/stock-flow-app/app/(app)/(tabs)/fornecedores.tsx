import {Pressable, StyleSheet, TextInput} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useEffect, useState} from "react";
import {useSession} from "@/store/SessionProvider";
import LoadingOverlay from "@/components/LoadingOverlay";
import {router} from "expo-router";
import ThemedViewRoot from "@/components/ThemedViewRoot";
import ListFornecedor from "@/components/fornecedores/ListFornecedor";
import {FornecedoresQueryParams, FornecedoresResponse} from '@/services/fornecedores';
import {MOCK_FORNECEDORES} from "@/constants/MockData";
import Ionicons from "@expo/vector-icons/Ionicons";
import {useThemeColorName} from "@/hooks/useThemeColor";

export default function FornecedoresScreen() {
    const {session, isLoading} = useSession();
    const [fornecedores, setFornecedores] = useState<FornecedoresResponse[]>([]);
    const [appIsReady, setAppIsReady] = useState(false);
    const [search, setSearch] = useState('');
    const textInputColor = useThemeColorName("textInput");
    const iconColor = useThemeColorName("icon");

    const handleSearch = () => {
        if (!search) return;

        setAppIsReady(false);
        fetchFornecedores({nome: search})
            .then(() => setTimeout(() => {
                setAppIsReady(true);
                setSearch('');
            }, 1000));
    }

    async function fetchFornecedores(queryParams: FornecedoresQueryParams) {
        //TODO: Remover MOCK e descomentar FetchRelatorios
        //const fetchData = await FetchProdutos(queryParams);
        const fetchData: FornecedoresResponse[] = MOCK_FORNECEDORES;
        setFornecedores(fetchData);
    }

    useEffect(() => {
        setAppIsReady(false);
        fetchFornecedores({}).then(() => setTimeout(() => setAppIsReady(true), 1000));
    }, []);

    if (isLoading || !appIsReady) {
        return <LoadingOverlay message="Buscando fornecedores..."/>;
    }

    if (!session) {
        router.replace('(auth)');
    }

    return (
        <ThemedViewRoot>
            <ThemedView>
                <ThemedText type="title">Fornecedores</ThemedText>
            </ThemedView>

            <ThemedView style={styles.searchContainer}>
                <TextInput style={[{borderColor: iconColor, backgroundColor: textInputColor}, styles.textInput]}
                           onChangeText={text => setSearch(text)}
                           value={search}
                           placeholder="Pesquisar..."
                />

                <Pressable style={styles.button} onPress={handleSearch}>
                    <Ionicons name="search" size={24} color={iconColor}/>
                </Pressable>
            </ThemedView>

            <ListFornecedor fornecedores={fornecedores}/>
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    textInput: {
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 2,
        marginRight: 15,
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});