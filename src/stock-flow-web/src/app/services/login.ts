interface ILoginUser {
    email: string;
    senha: string;
  }
  interface ILoginResponse {
    name?: string;
    status: number;
    userId?: string;
    token?: string;
    message?: string;
  }
  export const LoginService = async (
    props: ILoginUser
  ): Promise<ILoginResponse | undefined> => {
    try {
      const res = await fetch("https://stock-flow.azurewebsites.net/api/v1/autenticacao/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      });
      console.log("res:", res);
      const loginResponse: ILoginResponse = await res.json();
      loginResponse.status = res.status;
      return loginResponse;
    } catch (error) {
      return { status: 500, message: `${error.message}` };
    }
  };