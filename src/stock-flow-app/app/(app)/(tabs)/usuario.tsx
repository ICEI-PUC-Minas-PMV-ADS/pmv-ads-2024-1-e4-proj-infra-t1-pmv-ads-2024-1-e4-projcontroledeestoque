import {Pressable, StyleSheet} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {router} from "expo-router";
import {useSession} from "@/store/SessionProvider";
import ThemedViewRoot from "@/components/ThemedViewRoot";
import {ThemedButton} from "@/components/ThemedButton";

function decodeJwtPayload(session: string) {
    try {
        const [headerEnc, payloadEnc, signatureEnc] = session.split('.');

        const payloadEncBase64 = payloadEnc.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (3 * payloadEnc.length) % 4);
        const payloadDec = atob(payloadEncBase64);
        return JSON.parse(payloadDec);
    } catch (error) {
        console.error('Failed to decode JWT payload:', error);
        return null;
    }
}

export default function Usuario() {
    const {signOut, session} = useSession();

    if (!session) {
        router.replace("/login");
        return null;
    }

    const payload = decodeJwtPayload(session);

    const name = payload?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ?? '';
    const email = payload?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ?? '';
    const role = payload?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? '';

    function handleLogout() {
        signOut();
        router.replace("/login");
    }

    return (
        <ThemedViewRoot>
            <ThemedView>
                <ThemedText type={"title"}>Usuário</ThemedText>
            </ThemedView>

            <ThemedView>
                <ThemedText style={styles.stepContainer} type={"subtitle"}>Nome: {name}</ThemedText>
                <ThemedText style={styles.stepContainer} type={"subtitle"}>E-mail: {email}</ThemedText>
                <ThemedText style={styles.stepContainer} type={"subtitle"}>Permissões: {role}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.buttonContainer}>
                <ThemedButton onPress={handleLogout}>
                    Finalizar sessão
                </ThemedButton>
            </ThemedView>
        </ThemedViewRoot>
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginBottom: 12,
    },
    buttonContainer: {
        marginVertical: 24,
    }
});