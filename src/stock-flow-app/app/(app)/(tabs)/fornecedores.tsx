import {StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import ThemedViewRoot from "@/components/ThemedViewRoot";

export default function FornecedoresScreen() {
    return (
        <ThemedViewRoot>
            <ThemedView>
                <ThemedText type="title">Fornecedores!</ThemedText>
            </ThemedView>
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
});
