function CollectionsTab() {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useState([])
  const [form, setForm] = useState({ title: '', slug: '', description: '', recipeIds: [] })
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    fetchCollections()
    fetchRecipes()
  }, [])

  const fetchCollections = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/list-collections')
    const data = await res.json()
    setCollections(data.collections || [])
    setLoading(false)
  }

  const fetchRecipes = async () => {
    const res = await fetch('/api/admin/list-recipes')
    const data = await res.json()
    setRecipes(data.recipes || [])
  }

  const handleSlugify = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (val) => {
    setForm(f => ({ ...f, title: val, slug: handleSlugify(val) }))
  }

  const toggleRecipe = (id) => {
    setForm(f => ({
      ...f,
      recipeIds: f.recipeIds.includes(id)
        ? f.recipeIds.filter(r => r !== id)
        : [...f.recipeIds, id]
    }))
  }

  const handleEdit = (col) => {
    setEditingId(col._id)
    setForm({
      title: col.title,
      slug: col.slug,
      description: col.description || '',
      recipeIds: col.recipeIds || [],
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setForm({ title: '', slug: '', description: '', recipeIds: [] })
  }

  const handleSave = async () => {
    if (!form.title.trim() || !form.slug.trim()) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/save-collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _id: editingId }),
      })
      if (res.ok) {
        setStatus(editingId ? 'Collection updated.' : 'Collection created.')
        setTimeout(() => setStatus(null), 3000)
        handleCancel()
        fetchCollections()
      }
    } finally { setSaving(false) }
  }

  const handleDelete = async (col) => {
    if (!confirm(`Delete "${col.title}"?`)) return
    setDeletingId(col._id)
    await fetch('/api/admin/delete-collection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: col._id }),
    })
    setCollections(c => c.filter(x => x._id !== col._id))
    setDeletingId(null)
  }

  const pillStyle = (active) => ({
    fontFamily: '"Lato", sans-serif',
    fontSize: '0.8rem',
    fontWeight: '700',
    padding: '0.4rem 1rem',
    borderRadius: '50px',
    border: '1px solid var(--gray)',
    background: active ? 'var(--orange)' : 'var(--cream-light)',
    color: active ? 'white' : 'var(--text-light)',
    cursor: 'pointer',
  })

  const inputStyle = {
    width: '100%',
    padding: '0.65rem 1rem',
    borderRadius: '10px',
    border: '1px solid var(--gray)',
    background: 'var(--cream)',
    fontFamily: '"Lato", sans-serif',
    fontSize: '0.9rem',
    color: 'var(--brown)',
    boxSizing: 'border-box',
  }

  return (
    <div>
      {/* Form */}
      <div style={{
        background: 'var(--cream-light)',
        border: '1px solid var(--gray)',
        borderRadius: '16px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
      }}>
        <h3 style={{ fontFamily: '"Playfair Display", serif', color: 'var(--brown)', marginBottom: '1rem', fontSize: '1.1rem' }}>
          {editingId ? 'Edit Collection' : 'New Collection'}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input
            style={inputStyle}
            placeholder="Title"
            value={form.title}
            onChange={e => handleTitleChange(e.target.value)}
          />
          <input
            style={inputStyle}
            placeholder="Slug"
            value={form.slug}
            onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
          />
          <textarea
            style={{ ...inputStyle, resize: 'vertical', minHeight: '70px' }}
            placeholder="Description (optional)"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />

          {/* Recipe picker */}
          <div>
            <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: '0.5rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Select Recipes
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', maxHeight: '160px', overflowY: 'auto' }}>
              {recipes.map(r => (
                <div
                  key={r._id}
                  role="button"
                  onClick={() => toggleRecipe(r._id)}
                  style={pillStyle(form.recipeIds.includes(r._id))}
                >
                  {r.title}
                </div>
              ))}
            </div>
            {form.recipeIds.length > 0 && (
              <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.75rem', color: 'var(--orange)', marginTop: '0.4rem' }}>
                {form.recipeIds.length} recipe{form.recipeIds.length !== 1 ? 's' : ''} selected
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div role="button" onClick={handleSave}
              style={{ ...pillStyle(true), opacity: saving ? 0.6 : 1 }}>
              {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
            </div>
            {editingId && (
              <div role="button" onClick={handleCancel} style={pillStyle(false)}>
                Cancel
              </div>
            )}
          </div>
        </div>
      </div>

      {status && (
        <div style={{
          padding: '0.6rem 1rem', marginBottom: '0.75rem',
          background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)',
          borderRadius: '10px', color: '#16a34a',
          fontFamily: '"Lato", sans-serif', fontSize: '0.85rem',
        }}>
          {status}
        </div>
      )}

      {/* Collections list */}
      {loading ? (
        <p style={{ fontFamily: '"Lato", sans-serif', color: 'var(--text-light)', fontSize: '0.9rem' }}>Loading...</p>
      ) : collections.length === 0 ? (
        <p style={{ fontFamily: '"Lato", sans-serif', color: 'var(--text-light)', fontSize: '0.9rem' }}>No collections yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {collections.map(col => (
            <div key={col._id} style={{
              background: 'var(--cream-light)',
              border: '1px solid var(--gray)',
              borderRadius: '14px',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}>
              <div>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: 'var(--brown)', margin: 0 }}>{col.title}</p>
                <p style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.78rem', color: 'var(--text-light)', margin: '0.2rem 0 0' }}>
                  /{col.slug} · {col.recipeCount} recipe{col.recipeCount !== 1 ? 's' : ''}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div role="button" onClick={() => handleEdit(col)}
                  style={{ cursor: 'pointer', color: 'var(--text-light)', padding: '0.25rem' }}>
                  <Pencil size={15} strokeWidth={1.8} />
                </div>
                <div role="button" onClick={() => handleDelete(col)}
                  style={{ cursor: 'pointer', color: deletingId === col._id ? '#999' : '#ff6b7a', padding: '0.25rem' }}>
                  <X size={15} strokeWidth={2} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}