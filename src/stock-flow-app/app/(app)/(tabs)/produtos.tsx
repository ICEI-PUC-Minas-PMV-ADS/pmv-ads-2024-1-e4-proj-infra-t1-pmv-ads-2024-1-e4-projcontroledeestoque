import {Pressable, StyleSheet, TextInput} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useEffect, useState} from "react";
import {useSession} from "@/store/SessionProvider";
import LoadingOverlay from "@/components/LoadingOverlay";
import {router} from "expo-router";
import ThemedViewRoot from "@/components/ThemedViewRoot";
import ListProduto from "@/components/produtos/ListProduto";
import {ProdutosQueryParams, ProdutosResponse, FetchProdutos } from '@/services/produtos';
import {MOCK_PRODUTOS} from "@/constants/MockData";

export default function ProdutosScreen() {
    const {signOut} = useSession();
    const {session, isLoading} = useSession();
    const [produtos, setProdutos] = useState<ProdutosResponse[]>([]);
    const [appIsReady, setAppIsReady] = useState(false);
    const [search, setSearch] = useState('');
    
    //Filtro de produtos com base no nome
    const produtosFiltered = produtos.filter(item =>
        item.nome.toLowerCase().includes(search.toLowerCase())
      );


    async function fetchProdutos(queryParams: ProdutosQueryParams) {
        //TODO: Remover MOCK e descomentar FetchRelatorios
        //const fetchData = await FetchProdutos(queryParams);
        const fetchData: ProdutosResponse[] = MOCK_PRODUTOS;
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


   


    function handleLogout() {
        signOut();
        router.replace('(auth)');
    }
    


    return (
        <ThemedViewRoot>
            <ThemedView>
                <ThemedText type="title">Produtos!</ThemedText>
            </ThemedView>
            
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={text => setSearch(text)}
            value={search}
            placeholder="Search..."
            />

            <ListProduto produtos={produtosFiltered}/>

            <Pressable style={styles.button} onPress={handleLogout}>
                <ThemedText style={styles.buttonText}>Logout</ThemedText>
            </Pressable>
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '80%',
        height: 50,
        margin: 12,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
});
