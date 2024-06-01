import {StyleSheet, View} from "react-native";
import {FornecedoresResponse} from "@/services/fornecedores";
import {ThemedText} from "@/components/ThemedText";

interface CardFornecedorProps {
    fornecedor: FornecedoresResponse;
}

export default function CardFornecedor({fornecedor}: CardFornecedorProps){
    return(
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <ThemedText>{fornecedor.nome}</ThemedText>
            </View>
            <View style={styles.secondRow}>
                <ThemedText>{fornecedor.id}</ThemedText>
                <ThemedText>{fornecedor.contato}</ThemedText>
                <ThemedText>{fornecedor.endereco}</ThemedText>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
    },
    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    secondRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});