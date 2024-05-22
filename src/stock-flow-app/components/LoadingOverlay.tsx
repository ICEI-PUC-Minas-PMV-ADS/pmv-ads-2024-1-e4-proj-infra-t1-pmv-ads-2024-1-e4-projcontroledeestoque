import {ActivityIndicator, StyleSheet} from "react-native";
import {ThemedViewRoot} from "@/components/ThemedViewRoot";
import {ThemedText} from "@/components/ThemedText";
import {useThemeColor} from "@/hooks/useThemeColor";

interface Props {
    message: string;
}

function LoadingOverlay({message}: Props) {
    const color = useThemeColor({}, 'icon');
    
    return (
        <ThemedViewRoot style={styles.container}>
            <ThemedText type="subtitle">{message}</ThemedText>
            <ActivityIndicator size="large" color={color}/>
        </ThemedViewRoot>
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