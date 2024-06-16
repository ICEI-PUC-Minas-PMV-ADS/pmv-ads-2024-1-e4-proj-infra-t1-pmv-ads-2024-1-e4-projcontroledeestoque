import {useState} from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import {Alert, Pressable, StyleSheet} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {router} from "expo-router";
import {useSession} from "@/store/SessionProvider";
import * as yup from 'yup';
import {ThemedTextInput} from "@/components/ThemedTextInput";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {IAuthResponse, RegisterUser} from "@/services/autenticacao";
import ThemedViewRoot from "@/components/ThemedViewRoot";
import {MOCK_TOKEN} from "@/constants/MockData";
import {ThemedButton} from "@/components/ThemedButton";

const schema = yup.object({
        nome: yup.string().required('Informe seu nome completo'),
        email: yup.string().email('Email inválido').required('Informe seu email'),
        senha: yup.string().required('Informe uma senha').min(8, 'Senha deve ter no mínimo 8 caracteres'),
        senhaConfirmacao: yup.string().oneOf([yup.ref('senha')], 'As senhas não coincidem')
            .required('Confirme sua senha')
    }
)
export default function Cadastro() {
    const {signIn, session, isLoading} = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');

    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    async function handleCadastro() {
        setIsSubmitting(true);

        try {
            const response: IAuthResponse = await RegisterUser({
                nome: nome,
                email: email,
                senha: senha,
                senhaConfirmada: senhaConfirmacao
            });
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (response.sucesso && response?.accessToken) {
                console.log('Logged in, token: ', response.accessToken);
                signIn(response.accessToken);
                router.replace("(tabs)");
            } else {
                Alert.alert('Falha no cadastro', response.mensagem || 'Tente novamente mais tarde');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Falha no cadastro', 'Tente novamente mais tarde');
        } finally {
            setTimeout(() => setIsSubmitting(false), 1000);
        }
    }

    async function handleCadastroMock() {
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
                <ThemedText type={"title"}>Crie a sua conta</ThemedText>
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
                <ThemedText type={"subtitle"}>Nome</ThemedText>
                {errors.nome &&
                    <ThemedText type={"defaultSemiBold"} colorName={"textError"}>{errors.nome?.message}</ThemedText>}

                <Controller
                    control={control}
                    name={"nome"}
                    render={({field: {onChange, onBlur, value}}) => (
                        <ThemedTextInput
                            placeholder="Nome completo"
                            style={styles.input}
                            keyboardType={'default'}
                            onBlur={onBlur}
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);
                                setNome(text);
                            }}
                            autoCapitalize={'words'}
                        />
                    )}
                />

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
                            onBlur={onBlur}
                            value={value}
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
                            onBlur={onBlur}
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);
                                setSenha(text);
                            }}
                            autoCapitalize={'none'}
                        />
                    )}
                />

                <ThemedText type={"subtitle"}>Senha</ThemedText>
                {errors.senhaConfirmacao &&
                    <ThemedText type={"defaultSemiBold"}
                                colorName={"textError"}>{errors.senhaConfirmacao?.message}</ThemedText>}

                <Controller
                    control={control}
                    name={"senhaConfirmacao"}
                    render={({field: {onChange, onBlur, value}}) => (
                        <ThemedTextInput
                            placeholder="Confirme a senha"
                            secureTextEntry={true}
                            style={styles.input}
                            keyboardType={'default'}
                            onBlur={onBlur}
                            value={value}
                            onChangeText={(text) => {
                                onChange(text);
                                setSenhaConfirmacao(text);
                            }}
                            autoCapitalize={'none'}
                        />
                    )}
                />
            </ThemedView>

            <ThemedButton onPress={handleSubmit(handleCadastro)}>
                Criar conta
            </ThemedButton>

            <ThemedText type={"default"}>Já possui uma conta?
                <ThemedText 
                    type={"defaultSemiBold"} 
                    colorName={"link"} 
                    onPress={() => router.replace("/login")}> Entrar</ThemedText>
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