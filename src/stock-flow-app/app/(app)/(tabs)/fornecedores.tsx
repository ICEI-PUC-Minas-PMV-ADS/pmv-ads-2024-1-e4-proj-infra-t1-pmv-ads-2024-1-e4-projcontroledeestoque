import {Pressable, StyleSheet, TextInput} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useEffect, useState} from "react";
import {useSession} from "@/store/SessionProvider";
import LoadingOverlay from "@/components/LoadingOverlay";
import {router} from "expo-router";
import ThemedViewRoot from "@/components/ThemedViewRoot";
import ListFornecedor from "@/components/fornecedores/ListFornecedor";
import {FetchFornecedores, FornecedoresQueryParams, FornecedoresResponse} from '@/services/fornecedores';
import Ionicons from "@expo/vector-icons/Ionicons";
import {useThemeColorName} from "@/hooks/useThemeColor";

export default function FornecedoresScreen() {
    const {isValidSession, isLoading} = useSession();
    const [fornecedores, setFornecedores] = useState<FornecedoresResponse[]>([]);
    const [appIsReady, setAppIsReady] = useState(false);
    const [search, setSearch] = useState('');
    const textInputColor = useThemeColorName("textInput");
    const iconColor = useThemeColorName("icon");

    useEffect(() => {
        setAppIsReady(false);

        if (!isValidSession()) {
            router.replace('(auth)');
        }

        fetchFornecedores({}).then(() => setTimeout(() => setAppIsReady(true), 1000));
    }, []);

    const handleSearch = () => {
        setAppIsReady(false);
        fetchFornecedores({nome: search})
            .then(() => setTimeout(() => {
                setAppIsReady(true);
                setSearch('');
            }, 1000));
    }

    async function fetchFornecedores(queryParams: FornecedoresQueryParams) {
        const fetchData = await FetchFornecedores(queryParams);
        setFornecedores(fetchData);
    }

    if (isLoading || !appIsReady) {
        return <LoadingOverlay message="Buscando fornecedores..."/>;
    }

    return (
        <ThemedViewRoot>
            <ThemedView>
                <ThemedText type="title">Fornecedores</ThemedText>
            </ThemedView>

            <ThemedView style={[{borderColor: iconColor, backgroundColor: textInputColor}, styles.searchContainer]}>
                <TextInput style={styles.textInput}
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
        borderRadius: 10,
        borderWidth: 2,
    },

    textInput: {
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
    },
});