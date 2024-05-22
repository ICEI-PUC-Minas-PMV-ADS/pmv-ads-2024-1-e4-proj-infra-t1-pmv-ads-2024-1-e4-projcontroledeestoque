import {useEffect, useState} from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import {Alert, Pressable, StyleSheet, TextInput} from "react-native";
import {ThemedViewRoot} from "@/components/ThemedViewRoot";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {router} from "expo-router";
import {useSession} from "@/store/SessionProvider";

export default function Login() {
    const {signIn, session, isLoading} = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setIsSubmitting(true);
        console.log('Login session:', session);
        if (session) {
            console.log('Login redirecting to authenticated tabs');
            router.replace("(tabs)");
        }
        setIsSubmitting(false);
    }, [session]);

    async function handleLogin() {
        setIsSubmitting(true);
        try {
            // Simulate a network request
            await new Promise(resolve => setTimeout(resolve, 5000));
            signIn('fake-token');
            console.log('Logged in, token: ', session);
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
                <ThemedText>Login</ThemedText>
            </ThemedView>

            <ThemedView>
                <ThemedText>Email</ThemedText>
                <TextInput
                    placeholder="Digite seu e-mail"
                    style={styles.input}
                    keyboardType={'email-address'}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize={'none'}
                />

                <ThemedText>Senha</ThemedText>
                <TextInput
                    placeholder="Digite sua senha"
                    secureTextEntry={true}
                    style={styles.input}
                    keyboardType={'default'}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize={'none'}
                />

                <Pressable style={styles.button} onPress={handleLogin}>
                    <ThemedText style={styles.buttonText}>Entrar</ThemedText>
                </Pressable>

                <Pressable style={styles.button} onPress={() => router.replace("/cadastro")}>
                    <ThemedText style={styles.buttonText}>Cadastrar-se</ThemedText>
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
    buttonText: {
        color: 'white',
    },
});