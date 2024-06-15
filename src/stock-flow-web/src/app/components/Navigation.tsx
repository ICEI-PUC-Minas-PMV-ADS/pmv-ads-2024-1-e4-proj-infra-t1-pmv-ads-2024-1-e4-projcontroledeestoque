"use client"
import Link from 'next/link'
import {usePathname} from 'next/navigation'

export default function Navigation() {
  const currentPage = usePathname()
  console.log(currentPage)
  const routes = [
    { name: 'Produtos', path: '/produtos' },
    { name: 'Fornecedores', path: '/fornecedores' },
    { name: 'Relatorios', path: '/relatorios' },
  ]

  return (
    <div className="flex gap-1">
      {routes.map((route) => (
        <Link
          key={route.path}
          className={`p-2  bg-gray-900 hover:bg-indigo-800 text-white ${
            currentPage === route.path ? 'bg-indigo-700' : ''
          }`}
          href={route.path}
        >
          {route.name}
        </Link>
      ))}
    </div>
  )
}
