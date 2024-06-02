export const MOCK_RELATORIOS = [
    {
        "id": "6612da833c4b9a4d020e8912",
        "produtoId": "661dc2853b000bc9657538e0",
        "produtoNome": "Samsung UltraBook 4",
        "fornecedoresNomes": [
            "loja3332",
            "Loja do Zé"
        ],
        "tipo": "Venda",
        "quantidade": 1,
        "valor": 12000.99,
        "usuario": "88d9400b-eeb6-4b36-8735-483e40d28a6a",
        "data": "2024-04-07T17:40:18.8347327Z"
    },
    {
        "id": "664823b0d00d9dfad39ae0b2",
        "produtoId": "661dc2853b000bc9657538e0",
        "produtoNome": "Samsung UltraBook 3",
        "fornecedoresNomes": [
            "loja3332",
            "Loja do Zé"
        ],
        "tipo": "Compra",
        "quantidade": 10,
        "valor": 85009.9,
        "usuario": "88d9400b-eeb6-4b36-8735-483e40d28a6a",
        "data": "2024-05-18T03:42:40.3632677Z"
    },
    {
        "id": "66484657064cdf4178987ceb",
        "produtoId": "6633fbab9841de6a004e4be5",
        "produtoNome": "Notebook Dell",
        "fornecedoresNomes": [],
        "tipo": "Compra",
        "quantidade": 20,
        "valor": 90000,
        "usuario": "b1f5b926-6f81-443e-aeb2-7c1be7a04eb8",
        "data": "2024-05-18T06:10:31.1526754Z"
    }
];

export const MOCK_PRODUTOS = [
    {
        "id": "6638253b6e3d9cafad89b396",
        "nome": "HeadSet",
        "descricao": "HeadSet MultLaser GX-3102 P/2 + USB",
        "categorias": [
            "Informatica"
        ],
        "precoCusto": 59.99,
        "precoVenda": 99.99,
        "quantidade": 15,
        "fornecedores": []
    },
    {
        "id": "6633fbab9841de6a004e4be5",
        "nome": "Notebook Dell",
        "descricao": "Notebook core i3 8gb ram RX-580 GDDR5 8gb SSD 1TB",
        "categorias": [
            "Informatica"
        ],
        "precoCusto": 4500,
        "precoVenda": 5800,
        "quantidade": 22,
        "fornecedores": []
    },
    {
        "id": "6639709f7350050e3426133e",
        "nome": "Notebook Lenovo",
        "descricao": "Notebook Lenovo Ideapad 3i",
        "categorias": [
            "Informática"
        ],
        "precoCusto": 1500,
        "precoVenda": 2000,
        "quantidade": 3,
        "fornecedores": []
    },
    {
        "id": "66129f79573dce1105bb418b",
        "nome": "PC",
        "descricao": "Computador para trabalho Itau Tech",
        "categorias": [
            "Informatica"
        ],
        "precoCusto": 1900,
        "precoVenda": 2341,
        "quantidade": 10,
        "fornecedores": []
    },
    {
        "id": "660825f7bc799f5e656b388d",
        "nome": "Samsung UltraBook 3",
        "descricao": "Notebook Samsung UltraBook 3 17-1300 32GB",
        "categorias": [
            "Informática",
            "Notebook",
            "Samsung"
        ],
        "precoCusto": 8500.99,
        "precoVenda": 12000.99,
        "quantidade": 0,
        "fornecedores": [
            "66129f46573dce1105bb4189",
            "66352480a314c8e87d8cf39d"
        ]
    },
    {
        "id": "661dc2853b000bc9657538e0",
        "nome": "Samsung UltraBook 3",
        "descricao": "Notebook Samsung UltraBook 3 17-1300 32GB",
        "categorias": [
            "Informática",
            "Notebook",
            "Samsung"
        ],
        "precoCusto": 8500.99,
        "precoVenda": 12000.99,
        "quantidade": 9,
        "fornecedores": [
            "66129f46573dce1105bb4189",
            "66352480a314c8e87d8cf39d"
        ]
    }
];

export const MOCK_FORNECEDORES = [
    {
        "id": "6637e3cb240bfa355bc5d610",
        "nome": "Fornecedor Esportes",
        "contato": "Artigosesportivos@gmail.com",
        "endereco": "Rua rio comprido n.345 Contagem/MG"
    },
    {
        "id": "66361b6776088f4ca3d727dd",
        "nome": "Fornecedor Informática",
        "contato": "fornecedorinf@teste.com",
        "endereco": "Rua Monsenhor N. 203 Belo Horizonte/MG"
    },
    {
        "id": "663824ba6e3d9cafad89b395",
        "nome": "Info New",
        "contato": "infonew@infonew.com.br",
        "endereco": "Avenida Belo Horizonte N500 BH-MG"
    },
    {
        "id": "66352480a314c8e87d8cf39d",
        "nome": "Loja do Zé",
        "contato": "lojaze@gmail.com",
        "endereco": "Rua 1234, bairro 567"
    },
];

export const MOCK_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4OGQ5NDAwYi1lZWI2LTRiMzYtODczNS00ODNlNDBkMjhhNmEiLCJqdGkiOiI1NDNmNTA0NS1iYzM2LTRkM2MtOTIwNC01ODEyNDY1ZjQ2YjgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiSm9obiBXaWNrIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidGVzdDZAZXhhbXBsZS5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg4ZDk0MDBiLWVlYjYtNGIzNi04NzM1LTQ4M2U0MGQyOGE2YSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVTRVIiLCJleHAiOjE3MTY2ODgzNTYsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo1MDAxIn0.iMNrp9-KPSvK_1qiKoetMbnXyWO57qrxjG7wTkIm3DE";