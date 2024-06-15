interface TokenData {
    accessToken: string;
    userId: string;
}

export const getTokenData = () : TokenData | null => {
    let accessToken = localStorage.getItem("accessToken");
    let userId = localStorage.getItem("userId");

    if (accessToken) {
        const [, payload] = accessToken.split(".");
        const data = JSON.parse(atob(payload));
        const exp = data.exp * 1000;
        const now = new Date().getTime();
        if (exp < now) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userId");
            accessToken = null;
            userId = null;
        }
    }

    return accessToken && userId ? {accessToken: accessToken, userId: userId} : null;
}