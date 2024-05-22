import Link from "next/link";

export default function Navigation() {
  return (
    <div className="flex gap-2">
      <Link
        className=" p-2  bg-gray-900 hover:bg-indigo-700 text-white"
        href="/produtos"
      >
        Produtos
      </Link>
      <Link
        className=" p-2  bg-gray-900 hover:bg-indigo-700 text-white"
        href="/fornecedores"
      >
        Fornecedores
      </Link>{" "}
      <Link
        className=" p-2  bg-gray-900 hover:bg-indigo-700 text-white"
        href="/relatorios"
      >
        Relatorios
      </Link>{" "}
    </div>
  );
}
