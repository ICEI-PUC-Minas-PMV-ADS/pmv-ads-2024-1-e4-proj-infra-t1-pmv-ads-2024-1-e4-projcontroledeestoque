import {useState} from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import {Alert, Pressable, StyleSheet} from "react-native";
import {ThemedViewRoot} from "@/components/ThemedViewRoot";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {router} from "expo-router";
import {useSession} from "@/store/SessionProvider";
import {ThemedTextInput} from "@/components/ThemedTextInput";

export default function Login() {
    const {signIn, session, isLoading} = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        setIsSubmitting(true);
        try {
            // Simulate a network request
            await new Promise(resolve => setTimeout(resolve, 5000));
            signIn('fake-token');
            console.log('Logged in, token: ', session);
            router.replace("(tabs)");
        } catch (error) {
            console.error(error);
            Alert.alert('Falha no login', 'Tente novamente mais tarde');
        } finally {
            setTimeout(() => setIsSubmitting(false), 1000);
        }
    }

    if (isLoading || isSubmitting) {
        return <LoadingOverlay message={isSubmitting ? "Verificando informações..." : ""}/>;
    }

    return (
        <ThemedViewRoot style={styles.container}>
            <ThemedView>
                <ThemedText type={"title"}>Login</ThemedText>
            </ThemedView>

            <ThemedView>
                <ThemedText type={"subtitle"}>Email</ThemedText>
                <ThemedTextInput
                    placeholder="Digite seu e-mail"
                    style={styles.input}
                    keyboardType={'email-address'}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize={'none'}
                />

                <ThemedText type={"subtitle"}>Senha</ThemedText>
                <ThemedTextInput
                    placeholder="Digite sua senha"
                    secureTextEntry={true}
                    style={styles.input}
                    keyboardType={'default'}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize={'none'}
                />

                <Pressable style={styles.button} onPress={handleLogin}>
                    <ThemedText>Entrar</ThemedText>
                </Pressable>

                <Pressable style={styles.button} onPress={() => router.replace("/cadastro")}>
                    <ThemedText>Cadastrar-se</ThemedText>
                </Pressable>

            </ThemedView>
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        width: '80%',
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        width: '80%',
        height: 50,
        margin: 12,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
});