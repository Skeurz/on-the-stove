import { notFound } from 'next/navigation'

export default function AdminLayout({ children }) {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }
  return children
}