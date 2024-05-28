import {StyleSheet} from "react-native";
import {RelatoriosResponse} from "@/services/relatorios";
import CardRelatorio from "@/components/relatorios/CardRelatorio";
import {ThemedView} from "@/components/ThemedView";

interface ListRelatorioProps {
    relatorios: RelatoriosResponse[];
}

export default function ListRelatorio({relatorios}: ListRelatorioProps) {
    return (
        <ThemedView>
            {relatorios.map((item) => (
                <CardRelatorio key={item.id} relatorio={item}/>
            ))}
        </ThemedView>
    );
    
}

const styles = StyleSheet.create({
    
});
    
