'use client'

import { useState } from 'react'
import { Trash2, RotateCcw, AlertTriangle, CheckCircle, XCircle, Loader } from 'lucide-react'
import Link from 'next/link'




export default function AdminPanel() {
  return (
    <div style={{
  minHeight: '100vh',
  padding: '3rem 1.5rem',
  paddingBottom: '6rem',
  fontFamily: '"Lato", sans-serif',
  display: 'flex',
  flexDirection: 'column',
}}>
  <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%', flex: 1 }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{
            fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase',
            color: '#E8622A', marginBottom: '0.5rem', fontWeight: '700',
          }}>
            localhost only
          </p>
          <h1 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '2.2rem', color: '#FDF6EE', margin: 0,
          }}>
            Admin Panel
          </h1>
          <p style={{ color: 'rgba(253,246,238,0.45)', fontSize: '0.88rem', marginTop: '0.5rem' }}>
            On The Stove — database management
          </p>
        </div>

        {/* Cards */}
         <div style={{
          background: '#3D2010',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px',
          padding: '1.5rem',
          display: 'flex', flexDirection: 'column', gap: '1rem',
         }}>

             <DeleteByNameCard />
             <DeleteAllCard />
             <ResetRatingsCard />

        </div>
      </div>
    </div>
  )
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function Card({ children }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '1.5rem',
    }}>
      {children}
    </div>
  )
}

function CardTitle({ icon: Icon, color = '#E8622A', children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px',
        background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} color={color} strokeWidth={2} />
      </div>
      <h2 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '1.1rem', color: '#FDF6EE', margin: 0,
      }}>
        {children}
      </h2>
    </div>
  )
}

function StatusMessage({ status }) {
  if (!status) return null
  const isError = status.type === 'error'
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
      marginTop: '1rem', padding: '0.75rem 1rem',
      background: isError ? 'rgba(220,53,69,0.12)' : 'rgba(40,167,69,0.12)',
      border: `1px solid ${isError ? 'rgba(220,53,69,0.3)' : 'rgba(40,167,69,0.3)'}`,
      borderRadius: '10px',
      color: isError ? '#ff6b7a' : '#6bcb77',
      fontSize: '0.88rem', lineHeight: 1.5,
    }}>
      {isError
        ? <XCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
        : <CheckCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />}
      <span>{status.message}</span>
    </div>
  )
}

function ActionButton({ onClick, disabled, loading, danger, children }) {
  return (
    <div
  role="button"
  tabIndex={disabled || loading ? -1 : 0}
  onClick={disabled || loading ? undefined : onClick}
  onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !disabled && !loading) onClick?.() }}
  style={{
    background: danger ? 'rgba(220,53,69,0.15)' : '#E8622A',
    color: danger ? '#ff6b7a' : 'white',
    border: danger ? '1px solid rgba(220,53,69,0.4)' : 'none',
    borderRadius: '50px',
    padding: '0.6rem 1.4rem',
    fontFamily: '"Lato", sans-serif',
    fontWeight: '700', fontSize: '0.88rem',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    transition: 'opacity 0.15s',
    userSelect: 'none',
  }}
>
  {loading && <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} />}
  {children}
</div>
  )
}

// ─── Delete by Name ───────────────────────────────────────────────────────────

function DeleteByNameCard() {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)

  const handleTitleChange = (e) => {
    const val = e.target.value
    setTitle(val)
    setConfirm(null)
    setStatus(null)
    if (val.trim().length < 2) { setSuggestions([]); setSuggestionsOpen(false); return }
    clearTimeout(window._adminSearchTimeout)
    window._adminSearchTimeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search-suggestions?q=${encodeURIComponent(val.trim())}`)
        const data = await res.json()
        setSuggestions(data.suggestions || [])
        setSuggestionsOpen(true)
      } catch {}
    }, 180)
  }

  const handleSearch = async () => {
    if (!title.trim()) return
    setSuggestionsOpen(false)
    setLoading(true)
    setStatus(null)
    setConfirm(null)
    try {
      const res = await fetch('/api/admin/delete-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), dryRun: true }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      if (data.found.length === 0) {
        setStatus({ type: 'error', message: `No recipe found with title "${title.trim()}"` })
      } else {
        setConfirm(data.found)
      }
    } catch (e) {
      setStatus({ type: 'error', message: e.message })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    setConfirm(null)
    try {
      const res = await fetch('/api/admin/delete-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), dryRun: false }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setStatus({ type: 'success', message: `Deleted ${data.deleted} recipe(s) and ${data.ratingsDeleted} rating doc(s).` })
      setTitle('')
    } catch (e) {
      setStatus({ type: 'error', message: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardTitle icon={Trash2}>Delete Recipe by Name</CardTitle>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={e => { if (e.key === 'Enter') handleSearch(); if (e.key === 'Escape') setSuggestionsOpen(false) }}
            onFocus={() => suggestions.length > 0 && setSuggestionsOpen(true)}
            placeholder="Recipe title..."
            style={{
              flex: 1, minWidth: '200px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '50px', padding: '0.6rem 1.1rem',
              color: '#FDF6EE', fontFamily: '"Lato", sans-serif', fontSize: '0.9rem',
              outlineColor: '#E8622A',
            }}
          />
          <ActionButton  onClick={handleSearch} loading={loading} disabled={!title.trim()}>
             <Trash2 /> Delete
          </ActionButton>
        </div>

        {/* Suggestions dropdown */}
        {suggestionsOpen && suggestions.length > 0 && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 0.5rem)', left: 0, right: 0,
            background: '#2A1208', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px', padding: '0.5rem',
            boxShadow: '0 12px 36px rgba(0,0,0,0.4)', zIndex: 10,
          }}>
            {suggestions.map(item => (
              <button
                key={item._id}
                className="admin-btn"
                onClick={() => { setTitle(item.title); setSuggestionsOpen(false); setSuggestions([]) }}
                style={{
                  width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  display: 'grid', gridTemplateColumns: '44px minmax(0,1fr)', gap: '0.75rem',
                  alignItems: 'center', padding: '0.55rem 0.6rem', borderRadius: '10px',
                  color: 'rgba(253,246,238,0.82)', fontFamily: '"Lato", sans-serif',
                  fontSize: '0.88rem', lineHeight: 1.35, textAlign: 'left',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,98,42,0.12)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <span style={{
                  width: '44px', height: '44px', borderRadius: '10px', overflow: 'hidden',
                  background: '#3D2010', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#F4946A', fontSize: '0.75rem', fontWeight: '700', flexShrink: 0,
                }}>
                  {item.imageUrl
                    ? <img src={item.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    : 'OTS'}
                </span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.title}
                  </span>
                  <span style={{ display: 'block', color: 'rgba(244,148,106,0.85)', fontSize: '0.72rem', marginTop: '0.15rem', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                    {item.category}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Confirm block */}
      {confirm && (
        <div style={{
          marginTop: '1rem', padding: '1rem',
          background: 'rgba(220,53,69,0.08)',
          border: '1px solid rgba(220,53,69,0.25)', borderRadius: '12px',
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem' }}>
            <AlertTriangle size={15} color="#ff6b7a" />
            <span style={{ color: '#ff6b7a', fontSize: '0.85rem', fontWeight: '700' }}>
              Found {confirm.length} recipe(s) — confirm deletion
            </span>
          </div>
          {confirm.map(r => (
            <p key={r._id} style={{ color: 'rgba(253,246,238,0.6)', fontSize: '0.82rem', margin: '0.15rem 0 0 1.4rem' }}>
              • {r.title} <span style={{ opacity: 0.4 }}>({r._id})</span>
            </p>
          ))}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.9rem' }}>
            <ActionButton onClick={handleDelete} loading={loading} danger>Yes, delete</ActionButton>
            <ActionButton onClick={() => setConfirm(null)} disabled={loading}>Cancel</ActionButton>
          </div>
        </div>
      )}

      <StatusMessage status={status} />
    </Card>
  )
}

// ─── Delete All ───────────────────────────────────────────────────────────────

function DeleteAllCard() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [step, setStep] = useState('idle') // idle | confirm1 | confirm2
  const [inputVal, setInputVal] = useState('')

  const handleDeleteAll = async () => {
    setLoading(true)
    setStep('idle')
    setInputVal('')
    try {
      const res = await fetch('/api/admin/delete-all-recipes', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setStatus({ type: 'success', message: `Deleted ${data.deleted} recipe(s) and ${data.ratingsDeleted} rating doc(s).` })
    } catch (e) {
      setStatus({ type: 'error', message: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardTitle icon={Trash2} color="#dc3545">Delete All Recipes</CardTitle>
      <p style={{ color: 'rgba(253,246,238,0.5)', fontSize: '0.85rem', marginBottom: '1rem', marginTop: 0 }}>
        Permanently removes every recipe and all associated rating documents from Sanity.
      </p>

      {step === 'idle' && (
        <ActionButton onClick={() => { setStep('confirm1'); setStatus(null) }} danger>
          Delete all recipes
        </ActionButton>
      )}

      {step === 'confirm1' && (
        <div style={{
          padding: '1rem', background: 'rgba(220,53,69,0.08)',
          border: '1px solid rgba(220,53,69,0.25)', borderRadius: '12px',
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
            <AlertTriangle size={15} color="#ff6b7a" />
            <span style={{ color: '#ff6b7a', fontSize: '0.85rem', fontWeight: '700' }}>
              This cannot be undone. Are you sure?
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <ActionButton onClick={() => setStep('confirm2')} danger>Yes, continue</ActionButton>
            <ActionButton onClick={() => setStep('idle')}>Cancel</ActionButton>
          </div>
        </div>
      )}

      {step === 'confirm2' && (
        <div style={{
          padding: '1rem', background: 'rgba(220,53,69,0.08)',
          border: '1px solid rgba(220,53,69,0.25)', borderRadius: '12px',
        }}>
          <p style={{ color: '#ff6b7a', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.75rem' }}>
            Type <strong>DELETE ALL</strong> to confirm:
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="DELETE ALL"
              style={{
                flex: 1, minWidth: '150px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(220,53,69,0.4)',
                borderRadius: '50px', padding: '0.6rem 1.1rem',
                color: '#FDF6EE', fontFamily: '"Lato", sans-serif', fontSize: '0.9rem',
                outlineColor: '#dc3545',
              }}
            />
            <ActionButton
              onClick={handleDeleteAll}
              loading={loading}
              disabled={inputVal !== 'DELETE ALL'}
              danger
            >
              Confirm delete
            </ActionButton>
            <ActionButton onClick={() => { setStep('idle'); setInputVal('') }} disabled={loading}>
              Cancel
            </ActionButton>
          </div>
        </div>
      )}

      <StatusMessage status={status} />
    </Card>
  )
}

// ─── Reset Ratings ────────────────────────────────────────────────────────────

function ResetRatingsCard() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [confirm, setConfirm] = useState(false)

  const handleReset = async () => {
    setLoading(true)
    setConfirm(false)
    try {
      const res = await fetch('/api/admin/reset-ratings', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setStatus({ type: 'success', message: `Reset ${data.recipesReset} recipe(s) and deleted ${data.ratingsDeleted} rating doc(s).` })
    } catch (e) {
      setStatus({ type: 'error', message: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardTitle icon={RotateCcw} color="#F4946A">Reset All Ratings</CardTitle>
      <p style={{ color: 'rgba(253,246,238,0.5)', fontSize: '0.85rem', marginBottom: '1rem', marginTop: 0 }}>
        Deletes all rating documents and resets ratingTotal, ratingCount, and ratingBreakdown on every recipe.
      </p>

      {!confirm ? (
        <ActionButton onClick={() => { setConfirm(true); setStatus(null) }}>
          Reset ratings
        </ActionButton>
      ) : (
        <div style={{
          padding: '1rem', background: 'rgba(232,98,42,0.08)',
          border: '1px solid rgba(232,98,42,0.25)', borderRadius: '12px',
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
            <AlertTriangle size={15} color="#F4946A" />
            <span style={{ color: '#F4946A', fontSize: '0.85rem', fontWeight: '700' }}>
              All ratings will be wiped. Confirm?
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <ActionButton onClick={handleReset} loading={loading}>Yes, reset</ActionButton>
            <ActionButton onClick={() => setConfirm(false)} disabled={loading}>Cancel</ActionButton>
          </div>
        </div>
      )}

      <StatusMessage status={status} />
    </Card>
  )
}