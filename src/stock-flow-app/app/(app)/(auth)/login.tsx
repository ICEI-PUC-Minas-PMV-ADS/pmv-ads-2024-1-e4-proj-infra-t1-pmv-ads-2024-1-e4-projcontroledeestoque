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
import {ThemedButton} from "@/components/ThemedButton";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
        email: yup.string().required('Informe seu email'),
        senha: yup.string().required('Informe sua senha'),
    }
)

export default function Login() {
    const {signIn, session, isLoading} = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    async function handleLogin() {
        setIsSubmitting(true);

        try {
            const response: IAuthResponse = await LoginUser({email: email, senha: password});
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (response.sucesso && response?.accessToken) {
                signIn(response.accessToken);
                router.replace("(tabs)");
            } else {
                Alert.alert('Falha no login', response.mensagem || 'Tente novamente mais tarde');
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
                <ThemedText type={"title"}>Entre na sua conta</ThemedText>
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
                <ThemedText type={"subtitle"}>E-mail</ThemedText>
                {errors.email &&
                    <ThemedText type={"defaultSemiBold"} colorName={"textError"}>{errors.email?.message}</ThemedText>}

                <Controller
                    control={control}
                    name={"email"}
                    render={({field: {onChange, onBlur, value}}) => (
                        <ThemedTextInput
                            placeholder="Digite seu e-mail"
                            style={styles.input}
                            keyboardType={'email-address'}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={(text) => {
                                onChange(text);
                                setEmail(text);
                            }}
                            autoCapitalize={'none'}
                        />
                    )}
                />

                <ThemedText type={"subtitle"}>Senha</ThemedText>
                {errors.senha &&
                    <ThemedText type={"defaultSemiBold"} colorName={"textError"}>{errors.senha?.message}</ThemedText>}

                <Controller
                    control={control}
                    name={"senha"}
                    render={({field: {onChange, onBlur, value}}) => (
                        <ThemedTextInput
                            placeholder="Digite sua senha"
                            secureTextEntry={true}
                            style={styles.input}
                            keyboardType={'default'}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={(text) => {
                                onChange(text);
                                setPassword(text);
                            }}
                            autoCapitalize={'none'}
                        />
                    )}
                />

            </ThemedView>

            <ThemedButton onPress={handleSubmit(handleLogin)}>
                Entrar
            </ThemedButton>

            <ThemedText type={"default"}>Não possui uma conta ainda?
                <ThemedText
                    type={"defaultSemiBold"}
                    colorName={"link"}
                    onPress={() => router.replace("/cadastro")}> Cadastrar</ThemedText>
            </ThemedText>
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        marginVertical: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    inputContainer: {
        marginBottom: 16
    }
});