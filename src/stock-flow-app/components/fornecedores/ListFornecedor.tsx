import {StyleSheet} from "react-native";
import {FornecedoresResponse} from "@/services/fornecedores";
import CardFornecedor from "@/components/fornecedores/CardFornecedor";
import {ThemedView} from "@/components/ThemedView";

interface ListFornecedorProps {
    fornecedores: FornecedoresResponse[];
}

export default function ListFornecedor({fornecedores}: ListFornecedorProps) {
    return (
        <ThemedView>
            {fornecedores.map((item) => (
                <CardFornecedor key={item.id} fornecedor={item}/>
            ))}
        </ThemedView>
    );
    
}

const styles = StyleSheet.create({
    
});
    
