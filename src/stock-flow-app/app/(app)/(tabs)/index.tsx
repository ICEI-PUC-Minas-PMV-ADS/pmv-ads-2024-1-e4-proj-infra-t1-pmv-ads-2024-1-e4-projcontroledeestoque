import {Pressable, StyleSheet} from 'react-native';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useSession} from "@/store/SessionProvider";
import {router} from "expo-router";
import ThemedViewRoot from "@/components/ThemedViewRoot";

export default function ProdutosScreen() {
    const {signOut} = useSession();

    function handleLogout() {
        signOut();
        router.replace('(auth)');
    }

    return (
        <ThemedViewRoot>
            <ThemedView>
                <ThemedText type="title">Produtos!</ThemedText>
            </ThemedView>
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
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
