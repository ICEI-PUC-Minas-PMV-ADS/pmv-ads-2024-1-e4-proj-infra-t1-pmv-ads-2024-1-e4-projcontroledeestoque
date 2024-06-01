import {StyleSheet, View} from "react-native";
import {ProdutosResponse} from "@/services/produtos";
import {ThemedText} from "@/components/ThemedText";
import { ThemedView } from "../ThemedView";

interface CardProdutoProps {
    produto: ProdutosResponse;
}

export default function CardProduto({produto}: CardProdutoProps){
    return(
        <ThemedView colorName={"backgroundCard"} style={styles.container}>
            <View style={styles.firstRow}>
                <ThemedText>{produto.nome}</ThemedText>
                <ThemedText>R${produto.precoVenda}</ThemedText>
            </View>
            <View style={styles.secondRow}>
                <ThemedText>{produto.quantidade}</ThemedText>
                <ThemedText>R${produto.precoCusto}</ThemedText>
            </View>
        </ThemedView>
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
});