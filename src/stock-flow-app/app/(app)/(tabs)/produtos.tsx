import {Pressable, StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {ThemedViewRoot} from "@/components/ThemedViewRoot";
import {useSession} from "@/store/SessionProvider";
import {router} from "expo-router";

export default function ProdutosScreen() {
    const {signOut} = useSession();
    
    function handleLogout() {
        signOut();
        router.replace('(auth)');
    }
    
    return (
        <ThemedViewRoot style={styles.container}>
            <ThemedView>
                <ThemedText type="title">Produtos!</ThemedText>
            </ThemedView>
            
            <Pressable style={styles.button} onPress={handleLogout}>
                <ThemedText style={styles.buttonText}>Logout</ThemedText>
            </Pressable>
            
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        width: '80%',
        height: 50,
        margin: 12,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
});
