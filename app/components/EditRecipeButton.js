'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'

export default function EditRecipeButton({ slug, title }) {
  const [isLocalhost, setIsLocalhost] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const host = window.location.hostname
    setIsLocalhost(host === 'localhost' || host === '127.0.0.1')
  }, [])

  if (!isLocalhost) return null

  return (
    <div role="button"
      onClick={() => {
          console.log('setting slug:', slug)
        sessionStorage.setItem('admin-edit-slug', slug)
        router.push('/admin')
      }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(232,98,42,0.85)', border: '1px solid rgba(232,98,42,0.9)', borderRadius: '50px', padding: '0.45rem 1rem', fontFamily: '"Lato", sans-serif', fontWeight: '700', fontSize: '0.82rem', color: 'white', cursor: 'pointer', boxShadow: '0 4px 12px rgba(232,98,42,0.35)' }}>
      <Pencil size={13} strokeWidth={2} />
      Edit recipe
    </div>
  )
}