import {StyleSheet, View} from "react-native";
import {ProdutosResponse} from "@/services/produtos";
import {ThemedText} from "@/components/ThemedText";

interface CardProdutoProps {
    produto: ProdutosResponse;
}

export default function CardProduto({produto}: CardProdutoProps){
    return(
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <ThemedText>{produto.nome}</ThemedText>
                <ThemedText>{produto.precoVenda}</ThemedText>
            </View>
            <View style={styles.secondRow}>
                <ThemedText>{produto.quantidade}</ThemedText>
                <ThemedText>R${produto.precoCusto}</ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 20,
        padding: 10,
        borderBottomWidth: 1,
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