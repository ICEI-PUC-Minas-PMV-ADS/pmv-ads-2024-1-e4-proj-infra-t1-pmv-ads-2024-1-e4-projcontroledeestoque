import {Pressable, StyleSheet, TextInput} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useEffect, useState} from "react";
import {useSession} from "@/store/SessionProvider";
import LoadingOverlay from "@/components/LoadingOverlay";
import {router} from "expo-router";
import ThemedViewRoot from "@/components/ThemedViewRoot";
import ListFornecedor from "@/components/fornecedores/ListFornecedor";
import {FornecedoresQueryParams, FornecedoresResponse, FetchFornecedores } from '@/services/fornecedores';
import {MOCK_FORNECEDORES} from "@/constants/MockData";

export default function FornecedoresScreen() {
    const {signOut} = useSession();
    const {session, isLoading} = useSession();
    const [fornecedores, setFornecedores] = useState<FornecedoresResponse[]>([]);
    const [appIsReady, setAppIsReady] = useState(false);
    const [search, setSearch] = useState('');
    
    //Filtro de fornecedores com base no nome
    const fornecedoresFiltered = fornecedores.filter(item =>
        item.nome.toLowerCase().includes(search.toLowerCase())
      );


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


    function handleLogout() {
        signOut();
        router.replace('(auth)');
    }
    


    return (
        <ThemedViewRoot>
            <ThemedView>
                <ThemedText type="title">Fornecedores!</ThemedText>
            </ThemedView>
            
            <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={text => setSearch(text)}
            value={search}
            placeholder="Search..."
            />

            <ListFornecedor fornecedores={fornecedoresFiltered}/>

            <Pressable style={styles.button} onPress={handleLogout}>
                <ThemedText style={styles.buttonText}>Logout</ThemedText>
            </Pressable>
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
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

    inputText: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: 'gray',
    },
    container: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});