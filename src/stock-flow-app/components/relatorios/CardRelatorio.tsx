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
    
    return (
        <ThemedView colorName={"backgroundCard"} style={[{borderBottomColor: borderColor}, styles.container]}>
            <View style={styles.row}>
                <ThemedText>{formatDate(relatorio.data)}</ThemedText>
                <ThemedText>{relatorio.tipo}</ThemedText>
            </View>
            <View style={styles.row}>
                <ThemedText>{relatorio.quantidade}</ThemedText>
                <ThemedText>{relatorio.produtoNome}</ThemedText>
                <ThemedText>R${formatNumber(relatorio.valor)}</ThemedText>
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
    
