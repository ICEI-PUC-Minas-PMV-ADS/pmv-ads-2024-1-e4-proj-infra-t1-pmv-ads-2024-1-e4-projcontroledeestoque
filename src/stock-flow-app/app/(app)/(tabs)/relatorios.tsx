import {StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {ThemedViewRoot} from "@/components/ThemedViewRoot";

export default function RelatoriosScreen() {
    return (
        <ThemedViewRoot style={styles.container}>
            <ThemedView>
                <ThemedText type="title">Relatórios!</ThemedText>
            </ThemedView>
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
