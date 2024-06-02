const API_URL = "https://stock-flow.azurewebsites.net/api/v1";

export const Routes = {
    API_URL: API_URL,
    LOGIN: API_URL + "/autenticacao/login",
    REGISTER: API_URL + "/autenticacao/cadastro",
    RELATORIOS: API_URL + "/relatorios/movimentacoes",
    PRODUTOS: API_URL + "/produtos",
    FORNECEDORES:  API_URL + "/fornecedores",
}