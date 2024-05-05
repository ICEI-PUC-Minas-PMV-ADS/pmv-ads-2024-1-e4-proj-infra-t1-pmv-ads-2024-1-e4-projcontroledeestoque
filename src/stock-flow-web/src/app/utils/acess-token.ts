export const getAccessToken = () : string | null => {
    let accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        const [, payload] = accessToken.split(".");
        const data = JSON.parse(atob(payload));
        const exp = data.exp * 1000;
        const now = new Date().getTime();
        if (exp < now) {
            localStorage.removeItem("accessToken");
            accessToken = null;
        }
    }

    return accessToken;
}