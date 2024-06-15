const API_URL = "https://stock-flow.azurewebsites.net/api/v1";

export const URLS = {
    LOGIN_PATH: "/autenticacao/login",
    CADASTRO_PATH: "/autenticacao/cadastro",
    PRODUTOS_PATH: "/produtos",
    MOVIMENTACOES_PATH: "/movimentacoes",
    RELATORIOS_PATH: "/relatorios/movimentacoes",
    FORNECEDORES_PATH: "/fornecedores",
}

export const ROUTES = {
    API_URL: API_URL,
    LOGIN: API_URL + URLS.LOGIN_PATH,
    REGISTER: API_URL + URLS.CADASTRO_PATH,
    MOVIMENTACOES: API_URL + URLS.MOVIMENTACOES_PATH,
    RELATORIOS: API_URL + URLS.RELATORIOS_PATH,
    PRODUTOS: API_URL + URLS.PRODUTOS_PATH,
    FORNECEDORES: API_URL + URLS.FORNECEDORES_PATH,
}