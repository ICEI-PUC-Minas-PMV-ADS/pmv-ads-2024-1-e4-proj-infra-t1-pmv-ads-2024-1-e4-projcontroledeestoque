import {useState} from "react";
import LoadingOverlay from "@/components/LoadingOverlay";
import {Alert, Pressable, StyleSheet} from "react-native";
import {ThemedViewRoot} from "@/components/ThemedViewRoot";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {router} from "expo-router";
import {useSession} from "@/store/SessionProvider";
import * as yup from 'yup';
import {ThemedTextInput} from "@/components/ThemedTextInput";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
        nome: yup.string().required('Informe seu nome completo'),
        email: yup.string().email('Email inválido').required('Informe seu email'),
        senha: yup.string().required('Informe uma senha').min(8, 'Senha deve ter no mínimo 6 caracteres'),
        senhaConfirmacao: yup.string().oneOf([yup.ref('senha')], 'As senhas não coincidem')
            .required('Confirme sua senha')
    }
)

export default function Cadastro() {
    const {signIn, session, isLoading} = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {control, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    async function handleCadastro() {
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
                <ThemedText type={"title"}>Cadastro</ThemedText>
            </ThemedView>

            <ThemedView>
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
                            onChangeText={onChange}
                            autoCapitalize={'words'}
                        />
                    )}
                />

                <ThemedText type={"subtitle"}>Email</ThemedText>
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
                            onChangeText={onChange}
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
                            onChangeText={onChange}
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
                            onChangeText={onChange}
                            autoCapitalize={'none'}
                        />
                    )}
                />

                <Pressable style={styles.button} onPress={handleSubmit(handleCadastro)}>
                    <ThemedText>Cadastrar</ThemedText>
                </Pressable>

                <Pressable style={styles.button} onPress={() => router.replace("/login")}>
                    <ThemedText>Fazer Login</ThemedText>
                </Pressable>

            </ThemedView>
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
    ,
    input: {
        width: '80%',
        height:
            50,
        margin:
            12,
        borderWidth:
            1,
        padding:
            10,
    }
    ,
    button: {
        width: '80%',
        height:
            50,
        margin:
            12,
        backgroundColor:
            'blue',
        justifyContent:
            'center',
        alignItems:
            'center',
    }
});