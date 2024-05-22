import {StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {ThemedViewRoot} from "@/components/ThemedViewRoot";

export default function FornecedoresScreen() {
    return (
        <ThemedViewRoot style={styles.container}>
            <ThemedView>
                <ThemedText type="title">Fornecedores!</ThemedText>
            </ThemedView>
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
