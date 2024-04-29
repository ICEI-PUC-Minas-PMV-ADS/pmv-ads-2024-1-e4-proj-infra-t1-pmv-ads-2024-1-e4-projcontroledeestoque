import axios from "axios";
export type Product = {
  id: string;
  nome: string;
  descricao: string;
  categorias: string[];
  precoCusto: number;
  precoVenda: number;
  quantidade: number;
  imagem: string;
  fornecedoresId: string[] | null;
};
export async function getProducts(): Promise<Product[]> {
  const products = [
    {
      id: "660825f7bc799f5e656b388d",
      nome: "Samsung UltraBook 3",
      descricao: "Notebook Samsung UltraBook 3 17-1300 32GB",
      categorias: ["Informática", "Notebook", "Samsung"],
      precoCusto: 8500.99,
      precoVenda: 12000.99,
      quantidade: 0,
      imagem: "",
      fornecedoresId: null,
    },
    {
      id: "66129f58573dce1105bb418a",
      nome: "PC",
      descricao: "é um produto",
      categorias: [],
      precoCusto: 5,
      precoVenda: 10,
      quantidade: 0,
      imagem: "",
      fornecedoresId: ["6611794bd27fbb9f378cabe7"],
    },
    {
      id: "66129f79573dce1105bb418b",
      nome: "PC",
      descricao: "é um produto",
      categorias: [],
      precoCusto: 5,
      precoVenda: 10,
      quantidade: 0,
      imagem: "",
      fornecedoresId: ["6611794bd27fbb9f378cabe7", "66129f46573dce1105bb4189"],
    },
    {
      id: "661dc2853b000bc9657538e0",
      nome: "Samsung UltraBook 3",
      descricao: "Notebook Samsung UltraBook 3 17-1300 32GB",
      categorias: ["Informática", "Notebook", "Samsung"],
      precoCusto: 8500.99,
      precoVenda: 12000.99,
      quantidade: 0,
      imagem: "",
      fornecedoresId: null,
    },
  ];
  return products;
//   const response = await axios.get("https://stock-flow.azurewebsites.net/api/v1/produtos");
//   console.log(response);
//   return response.data;
}
