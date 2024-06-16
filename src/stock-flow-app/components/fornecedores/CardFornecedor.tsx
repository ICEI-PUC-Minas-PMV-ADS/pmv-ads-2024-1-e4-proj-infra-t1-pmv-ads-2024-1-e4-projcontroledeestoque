import {StyleSheet, View} from "react-native";
import {FornecedoresResponse} from "@/services/fornecedores";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {useThemeColorName} from "@/hooks/useThemeColor";

interface CardFornecedorProps {
    fornecedor: FornecedoresResponse;
}

export default function CardFornecedor({fornecedor}: CardFornecedorProps){
    const borderColor = useThemeColorName("icon");
    
    return (
        <ThemedView colorName={"backgroundCard"} style={[{borderBottomColor: borderColor}, styles.container]}>
            <View style={styles.row}>
                <ThemedText type={"cardTitle"}>{fornecedor.nome}</ThemedText>
            </View>
            <View style={styles.row}>
                <ThemedText>E-mail: {fornecedor.contato}</ThemedText>
            </View>
            <View style={styles.row}>
                <ThemedText>Endereço: {fornecedor.endereco}</ThemedText>
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