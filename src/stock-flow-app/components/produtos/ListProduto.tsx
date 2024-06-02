import {StyleSheet} from "react-native";
import {ProdutosResponse} from "@/services/produtos";
import CardProdutos from "@/components/produtos/CardProduto";
import {ThemedView} from "@/components/ThemedView";

interface ListProdutoProps {
    produtos: ProdutosResponse[];
}

export default function ListProduto({produtos}: ListProdutoProps){
    return(
        <ThemedView>
            {produtos.map((item) => (
                <CardProdutos key={item.id} produto={item}/>
            ))}
        </ThemedView>
    );
}