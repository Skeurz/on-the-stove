'use client'

import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DeleteRecipeButton({ slug }) {
  const [isLocalhost, setIsLocalhost] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const host = window.location.hostname
    setIsLocalhost(host === 'localhost' || host === '127.0.0.1')
  }, [])

  if (!isLocalhost) return null

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/delete-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: slug, dryRun: false }),
      })
      if (res.ok) router.push('/')
    } catch {}
    finally { setLoading(false) }
  }

  if (confirm) return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
      <span style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.82rem', color: '#ff6b7a' }}>Delete this recipe?</span>
      <div role="button" onClick={handleDelete}
        style={{ background: 'rgba(220,53,69,0.15)', color: '#ff6b7a', border: '1px solid rgba(220,53,69,0.4)', borderRadius: '50px', padding: '0.35rem 0.9rem', fontFamily: '"Lato", sans-serif', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer' }}>
        {loading ? 'Deleting...' : 'Yes, delete'}
      </div>
      <div role="button" onClick={() => setConfirm(false)}
        style={{ color: 'var(--text-light)', fontFamily: '"Lato", sans-serif', fontSize: '0.78rem', cursor: 'pointer' }}>
        Cancel
      </div>
    </div>
  )

  return (
    <div role="button" onClick={() => setConfirm(true)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(220,53,69,0.85)', border: '1px solid rgba(220,53,69,0.9)', borderRadius: '50px', padding: '0.45rem 1rem', fontFamily: '"Lato", sans-serif', fontWeight: '700', fontSize: '0.82rem', color: 'white', cursor: 'pointer', boxShadow: '0 4px 12px rgba(220,53,69,0.35)' }}>
      <Trash2 size={13} strokeWidth={2} />
      Delete recipe
    </div>
  )
}