import React from "react";
import {useStorageState} from "@/hooks/useStorageState";

const AuthContext = React.createContext<{
    signIn: (token: string) => void;
    signOut: () => void;
    isValidSession: () => boolean;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    isValidSession: () => false,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);

    if (!value) {
        throw new Error("useSession must be wrapped in a <SessionProvider />");
    }

    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");

    const signIn = (token: string) => {
        setSession(token);
    }

    const signOut = () => {
        setSession(null);
    }

    const isValidSession = () => {
        if (session) {
            const [, payload] = session.split(".");
            const {exp} = JSON.parse(atob(payload));
            const now = new Date().getTime();
            if (exp * 1000 < now) {
                signOut()
                return false;
            }
            return true;
        }
        return false;
    }

    const value = {
        signIn,
        signOut,
        isValidSession,
        session: session,
        isLoading: isLoading,
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}