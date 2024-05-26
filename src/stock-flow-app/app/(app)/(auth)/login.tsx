import {useState} from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import {Alert, Pressable, StyleSheet} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {router} from "expo-router";
import {useSession} from "@/store/SessionProvider";
import {ThemedTextInput} from "@/components/ThemedTextInput";
import {IAuthResponse, LoginUser} from "@/services/autenticacao";
import ThemedViewRoot from "@/components/ThemedViewRoot";
import {MOCK_TOKEN} from "@/constants/MockData";

export default function Login() {
    const {signIn, session, isLoading} = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {
        setIsSubmitting(true);
        
        try {
            const response: IAuthResponse = await LoginUser({email: email, senha: password});
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            if (response.sucesso && response?.accessToken) {
                console.log('Logged in, token: ', response.accessToken);
                signIn(response.accessToken);
                router.replace("(tabs)");
            } else {
                Alert.alert('Erro ao logar', response.mensagem || 'Tente novamente mais tarde');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Falha no login', 'Tente novamente mais tarde');
        } finally {
            setTimeout(() => setIsSubmitting(false), 1000);
        }
    }
    
    async function handleLoginMock() {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        signIn(MOCK_TOKEN);
        router.replace("(tabs)");
        setTimeout(() => setIsSubmitting(false), 1000);
    }

    if (isLoading || isSubmitting) {
        return <LoadingOverlay message={isSubmitting ? "Verificando informações..." : ""}/>;
    }

    return (
        <ThemedViewRoot>
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

                {/*TODO: remover mock*/}
                <Pressable style={styles.button} onPress={handleLoginMock}>
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