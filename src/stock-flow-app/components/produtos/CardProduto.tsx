import {StyleSheet, View,} from "react-native";
import {ProdutosResponse} from "@/services/produtos";
import {ThemedText} from "@/components/ThemedText";
import { ThemedView } from "../ThemedView";;
import { useState} from "react";
import {formatNumber} from "@/util/number";


const [produtoCompleto, setProdutoCompleto] = useState<ProdutosResponse[]>([]);

interface CardProdutoProps {
    produto: ProdutosResponse;
}




export default function CardProduto({produto}: CardProdutoProps){
    return(
        <ThemedView colorName={"backgroundCard"} style={styles.container}>
            <View style={styles.firstRow}>
                <ThemedText>{produto.nome}</ThemedText>
                <ThemedText>Qnt. {produto.quantidade}</ThemedText>
            </View>
            <View style={styles.secondRow}>
                <ThemedText>Custo: R${formatNumber(produto.precoCusto)}</ThemedText>
                <ThemedText>Venda: R${formatNumber(produto.precoVenda)}</ThemedText>
            </View>
        </ThemedView>
    );
};



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