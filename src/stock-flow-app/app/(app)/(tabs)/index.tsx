import {Pressable, StyleSheet, TextInput} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useEffect, useState} from "react";
import {useSession} from "@/store/SessionProvider";
import LoadingOverlay from "@/components/LoadingOverlay";
import {router} from "expo-router";
import ThemedViewRoot from "@/components/ThemedViewRoot";
import ListProduto from "@/components/produtos/ListProduto";
import {FetchProdutos, ProdutosQueryParams, ProdutosResponse} from '@/services/produtos';
import {useThemeColorName} from "@/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProdutosScreen() {
    const {session, isLoading} = useSession();
    const [produtos, setProdutos] = useState<ProdutosResponse[]>([]);
    const [appIsReady, setAppIsReady] = useState(false);
    const [search, setSearch] = useState('');
    const textInputColor = useThemeColorName("textInput");
    const iconColor = useThemeColorName("icon");

    const handleSearch = () => {
        setAppIsReady(false);
        fetchProdutos({nome: search})
            .then(() => setTimeout(() => {
                setAppIsReady(true);
                setSearch('');
            }, 1000));
    }

    async function fetchProdutos(queryParams: ProdutosQueryParams) {
        const fetchData = await FetchProdutos(queryParams);
        setProdutos(fetchData);
    }

    useEffect(() => {
        setAppIsReady(false);
        fetchProdutos({}).then(() => setTimeout(() => setAppIsReady(true), 1000));

    }, []);

    if (isLoading || !appIsReady) {
        return <LoadingOverlay message="Buscando Produtos..."/>;
    }

    if (!session) {
        router.replace('(auth)');
    }

    return (
        <ThemedViewRoot>
            <ThemedView>
                <ThemedText type="title">Produtos</ThemedText>
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

            <ListProduto produtos={produtos}/>
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
