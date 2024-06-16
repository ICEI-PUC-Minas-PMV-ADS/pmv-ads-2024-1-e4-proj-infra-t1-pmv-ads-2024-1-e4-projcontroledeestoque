import {StyleSheet, View} from "react-native";
import {RelatoriosResponse} from "@/services/relatorios";
import {ThemedText} from "@/components/ThemedText";
import {formatDate} from "@/util/date";
import {formatNumber} from "@/util/number";
import {ThemedView} from "@/components/ThemedView";
import {useThemeColorName} from "@/hooks/useThemeColor";

interface CardRelatorioProps {
    relatorio: RelatoriosResponse;
}

export default function CardRelatorio({relatorio}: CardRelatorioProps) {
    const borderColor = useThemeColorName("icon");
    const buyColor = useThemeColorName("buy");
    const sellColor = useThemeColorName("sell");

    const color = relatorio.tipo === 'Compra' ? buyColor : sellColor;

    return (
        <ThemedView colorName={"backgroundCard"} style={[{borderBottomColor: borderColor}, styles.container]}>
            <View style={styles.row}>
                <ThemedText type={"cardTitle"}>{formatDate(relatorio.data)}</ThemedText>
                <ThemedText type={"cardTitle"} style={{color: color, borderBottomWidth: 0}}>{relatorio.tipo}</ThemedText>
            </View>
            <View style={styles.row}>
                <ThemedText type={"cardSubtitle"}>{relatorio.quantidade}   {relatorio.produtoNome}</ThemedText>
            </View>
            <View style={styles.row}>
                <ThemedText type={"cardDescription"}>Total: R${formatNumber(relatorio.valor)}</ThemedText>
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
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
    
