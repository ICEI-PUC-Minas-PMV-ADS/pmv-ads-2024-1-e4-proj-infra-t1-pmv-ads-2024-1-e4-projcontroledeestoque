import Link from "next/link";

export default function Navigation() {
  return (
    <>
    <Link className=" p-2 m-2 bg-gray-900 hover:bg-indigo-700 text-white" href="/">
        Home
      </Link>
      <Link className=" p-2 m-2 bg-gray-900 hover:bg-indigo-700 text-white" href="/produtos">
        Produtos
      </Link>
      <Link className=" p-2 m-2 bg-gray-900 hover:bg-indigo-700 text-white" href="/fornecedores">
        Fornecedores
      </Link>{" "}
    </>
  );
}
