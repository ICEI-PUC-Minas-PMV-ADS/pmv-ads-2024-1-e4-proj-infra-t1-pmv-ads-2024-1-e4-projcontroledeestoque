import {ActivityIndicator, StyleSheet} from "react-native";
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";
import {ThemedText} from "@/components/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";

interface Props {
    message: string;
}

function LoadingOverlay({message}: Props) {
    const color = useThemeColor({}, 'icon');
    
    return (
        <ThemedSafeAreaView style={styles.container}>
            <ThemedText type="subtitle">{message}</ThemedText>
            <ActivityIndicator size="large" color={color}/>
        </ThemedSafeAreaView>
    );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});