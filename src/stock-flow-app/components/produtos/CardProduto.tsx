import {StyleSheet, View,} from "react-native";
import {ProdutosResponse} from "@/services/produtos";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "../ThemedView";
import {formatNumber} from "@/util/number";
import {useThemeColorName} from "@/hooks/useThemeColor";

interface CardProdutoProps {
    produto: ProdutosResponse;
}

export default function CardProduto({produto}: CardProdutoProps) {
    const borderColor = useThemeColorName("icon");
    return (
        <ThemedView colorName={"backgroundCard"} style={[{borderBottomColor: borderColor}, styles.container]}>
            <View style={styles.row}>
                <ThemedText type={"cardTitle"} numberOfLines={1} ellipsizeMode='tail' >{produto.nome}</ThemedText>
                <ThemedText type={"cardTitle"}>{produto.quantidade}</ThemedText>
            </View>
            <View style={styles.row}>
                <ThemedText type={"cardSubtitle"}>{produto.categorias?.join(', ')}</ThemedText>
            </View>
            <View style={styles.row}>
                <ThemedText type={"cardDescription"}>Preço custo: R${formatNumber(produto.precoCusto)}</ThemedText>
            </View>
            <View style={styles.row}>
                <ThemedText type={"cardDescription"}>Preço venda: R${formatNumber(produto.precoVenda)}</ThemedText>
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
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});