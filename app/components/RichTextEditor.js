'use client'
import { useEffect, useState } from 'react'

export default function RichTextEditor({ value, onChange, placeholder }) {
  const [mounted, setMounted] = useState(false)
  const [QuillComponent, setQuillComponent] = useState(null)

  useEffect(() => {
    import('react-quill-new').then(mod => {
      setQuillComponent(() => mod.default)
      setMounted(true)
    })
    import('react-quill-new/dist/quill.snow.css')
  }, [])

  if (!mounted || !QuillComponent) {
    return (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', minHeight: '150px', padding: '0.65rem 1rem',
          borderRadius: '10px', border: '1px solid var(--gray)',
          background: 'var(--cream)', fontFamily: '"Lato", sans-serif',
          fontSize: '0.9rem', color: 'var(--brown)', boxSizing: 'border-box', resize: 'vertical',
        }}
      />
    )
  }

  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--gray)' }}>
      <QuillComponent
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ color: [] }],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
          ],
        }}
        style={{
          fontFamily: '"Lato", sans-serif',
          fontSize: '0.9rem',
          background: 'var(--cream)',
          color: 'var(--brown)',
        }}
      />
      <style>{`.ql-editor { min-height: 150px; }`}</style>
    </div>
  )
}