"use client";
import { useEffect, useState } from "react";
import { Product, getProducts } from "../services/produtos";
import Price from "../components/Price";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);
  return (
    <div>
      <h1 className="text-red-400">Produtos</h1>
      
      {products.map((product,index) => (
        <div
          className={`px-2 m-2  shadow-md flex flex-row ${index % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900"}`}
          key={product.id}
        >
          <div className="py-1 px-4 max-w-prose min-w-4">{product.quantidade}</div>
          <div className="py-1 px-4 max-w-prose min-w-64">{product.nome}</div>
          <div className="py-1 px-4 w-full ">{product.descricao}</div>
          <div className="py-1 px-4 max-w-prose min-w-32">
            <Price value={product.precoVenda}></Price>
          </div>
          {/* linha */}
          <div className="py-1 px-4 max-w-prose min-w-32">
            <Price value={product.precoCusto}></Price>
          </div>
        </div>
      ))}
    </div>
  );
}
