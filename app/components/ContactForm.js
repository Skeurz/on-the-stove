'use client'

export default function ContactForm() {
  const labelStyle = {
    display: 'grid',
    gap: '0.45rem',
    fontFamily: '"Lato", sans-serif',
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--brown)',
  }
  const inputStyle = {
    border: '1px solid var(--gray)',
    borderRadius: '10px',
    padding: '0.85rem 1rem',
    font: 'inherit',
    color: 'var(--brown)',
    background: 'var(--cream)',
    outlineColor: 'var(--orange)',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const name = data.get('name')
    const subject = data.get('subject')
    const message = data.get('message')
    const body = `Name: ${name}\n\n${message}`
    window.location.href = `mailto:contact@onthestove.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem',
      }}>
        <label style={labelStyle}>
          Name
          <input name="name" type="text" required style={inputStyle} />
        </label>
      </div>
      <label style={{ ...labelStyle, marginBottom: '1rem' }}>
        Subject
        <input name="subject" type="text" required style={inputStyle} />
      </label>
      <label style={{ ...labelStyle, marginBottom: '1.25rem' }}>
        Message
        <textarea name="message" rows="8" required style={{ ...inputStyle, resize: 'vertical', minHeight: '180px' }} />
      </label>
      <button type="submit" className="full-width-mobile button" style={{
        background: 'var(--orange)',
        color: 'var(--cream)',
        border: 'none',
        fontFamily: '"Lato", sans-serif',
        fontWeight: '700',
        fontSize: '0.95rem',
        padding: '0.9rem 2rem',
        borderRadius: '50px',
        cursor: 'pointer',
        letterSpacing: '0.4px',
        boxShadow: '0 4px 20px rgba(232,98,42,0.28)',
      }}>
        Send Message
      </button>
    </form>
  )
}