'use client'

import { useState } from 'react'
import { Trash2, RotateCcw, AlertTriangle, CheckCircle, XCircle, Loader, X, ChevronDown, ChevronUp, Pencil } from 'lucide-react'

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
  { label: 'Desserts', value: 'desserts' },
  { label: 'Breakfast & Brunch', value: 'breakfastnbrunch' },
  { label: 'Drinks & Shakes', value: 'drinks-shakes' },
  { label: 'Snacks & Sides', value: 'snacksnsides' },
]
const CUISINES = [
  { label: 'American', value: 'american' },
  { label: 'Italian', value: 'italian' },
  { label: 'French', value: 'french' },
  { label: 'Mexican', value: 'mexican' },
  { label: 'Asian', value: 'asian' },
  { label: 'Mediterranean', value: 'mediterranean' },
  { label: 'Middle Eastern', value: 'middle-eastern' },
  { label: 'Other', value: 'other' },
]
const DIFFICULTIES = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
]
const ALL_TAGS = [
  'gluten-free', 'dairy-free', 'vegan', 'vegetarian', 'meal-prep', 'make-ahead',
  'freezer-friendly', 'under-30-min', 'under-1-hour', 'quick', 'one-pot', 'sheet-pan',
  'no-bake', 'kid-friendly', 'date-night', 'holiday', 'summer', 'winter', 'spring',
  'fall', 'budget-friendly', '5-ingredients',
]

const EMPTY_FORM = {
  title: '', description: '', slug: '', videoUrl: '',
  category: '', cuisine: '', tags: [], featured: false,
  publishedAt: new Date().toISOString().slice(0, 10),
  difficulty: '', prepTime: '', cookTime: '', servings: '', calories: '',
  mainImageUrl: '', secondaryImageUrl: '',
  ingredients: [''],
  steps: [{ title: '', description: '' }],
  helpfulTips: [{ title: '', description: '' }],
  variations: [{ title: '', description: '' }],
  veganAdaptation: [''],
  storageTips: [{ method: '', duration: '', notes: '' }],
  faqs: [{ question: '', answer: '' }],
  preparationImages: [{ stepNumber: '', caption: '' }],
  seoTitle: '', seoDescription: '',
}

function normalizeForm(data) {
  return {
    ...EMPTY_FORM,
    ...data,
    slug: data.slug || '',
    tags: data.tags || [],
    ingredients: data.ingredients?.length ? data.ingredients : [''],
    steps: data.steps?.length ? data.steps.map(s => ({ title: s.title || '', description: s.description || '', _key: s._key })) : [{ title: '', description: '' }],
    helpfulTips: data.helpfulTips?.length ? data.helpfulTips.map(t => ({ title: t.title || '', description: t.description || '', _key: t._key })) : [{ title: '', description: '' }],
    variations: data.variations?.length ? data.variations.map(v => ({ title: v.title || '', description: v.description || '', _key: v._key })) : [{ title: '', description: '' }],
    veganAdaptation: data.veganAdaptation?.length ? data.veganAdaptation : [''],
    storageTips: data.storageTips?.length ? data.storageTips.map(s => ({ method: s.method || '', duration: s.duration || '', notes: s.notes || '', _key: s._key })) : [{ method: '', duration: '', notes: '' }],
    faqs: data.faqs?.length ? data.faqs.map(f => ({ question: f.question || '', answer: f.answer || '', _key: f._key })) : [{ question: '', answer: '' }],
    preparationImages: data.preparationImages?.length ? data.preparationImages.map(p => ({ stepNumber: p.stepNumber || '', caption: p.caption || '', _key: p._key, imageUrl: p.imageUrl || '' })) : [{ stepNumber: '', caption: '', imageUrl: '' }],
    publishedAt: data.publishedAt ? data.publishedAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
    prepTime: data.prepTime ?? '',
    cookTime: data.cookTime ?? '',
    servings: data.servings ?? '',
    calories: data.calories ?? '',
    seoTitle: data.seoTitle || '',
    seoDescription: data.seoDescription || '',
    description: data.description || '',
    mainImageUrl: data.mainImageUrl || '',
    secondaryImageUrl: data.secondaryImageUrl || '',
  }
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('db')

  return (
    <div style={{ padding: '3rem 1.5rem', paddingBottom: '6rem', fontFamily: '"Lato", sans-serif' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#E8622A', marginBottom: '0.5rem', fontWeight: '700' }}>localhost only</p>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', color: '#FDF6EE', margin: 0 }}>Admin Panel</h1>
          <p style={{ color: 'rgba(253,246,238,0.45)', fontSize: '0.88rem', marginTop: '0.5rem' }}>On The Stove — database management</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'db', label: 'DB Management' },
            { id: 'new', label: '+ New Recipe' },
            { id: 'edit', label: '✏ Edit Recipe' },
          ].map(tab => (
            <div key={tab.id} role="button" tabIndex={0}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setActiveTab(tab.id)}
              style={{ padding: '0.55rem 1.25rem', borderRadius: '50px', fontFamily: '"Lato", sans-serif', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer', userSelect: 'none', background: activeTab === tab.id ? '#E8622A' : 'rgba(255,255,255,0.06)', color: activeTab === tab.id ? 'white' : 'rgba(253,246,238,0.6)', border: activeTab === tab.id ? 'none' : '1px solid rgba(255,255,255,0.1)', transition: 'all 0.15s' }}
            >{tab.label}</div>
          ))}
        </div>

        {activeTab === 'db' && <DbTab />}
        {activeTab === 'new' && <NewRecipeTab />}
        {activeTab === 'edit' && <EditRecipeTab />}
      </div>
    </div>
  )
}

// ─── DB Tab ───────────────────────────────────────────────────────────────────

function DbTab() {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <DeleteByNameCard />
      <DeleteAllCard />
      <ResetRatingsCard />
    </div>
  )
}

// ─── Edit Recipe Tab ──────────────────────────────────────────────────────────

function EditRecipeTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [loadingRecipe, setLoadingRecipe] = useState(false)
  const [recipe, setRecipe] = useState(null)
  const [form, setForm] = useState(null)
  const [searchStatus, setSearchStatus] = useState(null)

  const handleSearchChange = (e) => {
    const val = e.target.value
    setSearchQuery(val); setSearchStatus(null)
    if (val.trim().length < 2) { setSuggestions([]); setSuggestionsOpen(false); return }
    clearTimeout(window._editSearchTimeout)
    window._editSearchTimeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search-suggestions?q=${encodeURIComponent(val.trim())}`)
        const data = await res.json()
        setSuggestions(data.suggestions || []); setSuggestionsOpen(true)
      } catch {}
    }, 180)
  }

  const loadRecipe = async (titleToLoad) => {
    setSuggestionsOpen(false); setLoadingRecipe(true); setRecipe(null); setForm(null); setSearchStatus(null)
    try {
      const res = await fetch('/api/admin/get-recipe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: titleToLoad }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      if (!data.found) setSearchStatus({ type: 'error', message: `No recipe found with title "${titleToLoad}"` })
      else { setRecipe(data.found); setForm(normalizeForm(data.found)) }
    } catch (e) { setSearchStatus({ type: 'error', message: e.message }) }
    finally { setLoadingRecipe(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(232,98,42,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Pencil size={18} color="#E8622A" strokeWidth={2} />
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#FDF6EE', margin: 0 }}>Edit Recipe</h2>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input type="text" value={searchQuery} onChange={handleSearchChange}
              onKeyDown={e => { if (e.key === 'Enter') loadRecipe(searchQuery.trim()); if (e.key === 'Escape') setSuggestionsOpen(false) }}
              onFocus={() => suggestions.length > 0 && setSuggestionsOpen(true)}
              placeholder="Search recipe to edit..."
              style={{ flex: 1, minWidth: '200px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50px', padding: '0.6rem 1.1rem', color: '#FDF6EE', fontFamily: '"Lato", sans-serif', fontSize: '0.9rem', outlineColor: '#E8622A' }}
            />
            <ActionButton onClick={() => loadRecipe(searchQuery.trim())} loading={loadingRecipe} disabled={!searchQuery.trim()}>Load Recipe</ActionButton>
          </div>
          {suggestionsOpen && suggestions.length > 0 && (
            <div style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', left: 0, right: 0, background: '#2A1208', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '0.5rem', boxShadow: '0 12px 36px rgba(0,0,0,0.4)', zIndex: 10 }}>
              {suggestions.map(item => (
                <div key={item._id} role="button" tabIndex={0}
                  onClick={() => { setSearchQuery(item.title); loadRecipe(item.title) }}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (setSearchQuery(item.title), loadRecipe(item.title))}
                  style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr)', gap: '0.75rem', alignItems: 'center', padding: '0.55rem 0.6rem', borderRadius: '10px', color: 'rgba(253,246,238,0.82)', fontFamily: '"Lato", sans-serif', fontSize: '0.88rem', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,98,42,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  <span style={{ width: '44px', height: '44px', borderRadius: '10px', overflow: 'hidden', background: '#3D2010', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F4946A', fontSize: '0.75rem', fontWeight: '700' }}>
                    {item.imageUrl ? <img src={item.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'OTS'}
                  </span>
                  <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        {searchStatus && <div style={{ marginTop: '0.75rem' }}><StatusMessage status={searchStatus} /></div>}
      </Card>

      {form && recipe && (
        <RecipeForm
          form={form} setForm={setForm}
          mode="edit" recipeId={recipe._id}
          onDone={() => { setRecipe(null); setForm(null); setSearchQuery('') }}
        />
      )}
    </div>
  )
}

// ─── New Recipe Tab ───────────────────────────────────────────────────────────

function NewRecipeTab() {
  const [inputMode, setInputMode] = useState('form')
  const [form, setForm] = useState(EMPTY_FORM)
  const [jsonText, setJsonText] = useState('')
  const [jsonError, setJsonError] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const handleTitleChange = (val) => {
    set('title', val)
    if (!form.slug || form.slug === autoSlug(form.title)) set('slug', autoSlug(val))
  }

  const getPayload = () => {
    if (inputMode === 'json') {
      try { const p = JSON.parse(jsonText); setJsonError(''); return p }
      catch { setJsonError('Invalid JSON'); return null }
    }
    return {
      ...form,
      ingredients: form.ingredients.filter(i => i.trim()),
      steps: form.steps.filter(s => s.title || s.description),
      helpfulTips: form.helpfulTips.filter(t => t.title || t.description),
      variations: form.variations.filter(v => v.title || v.description),
      veganAdaptation: form.veganAdaptation.filter(v => v.trim()),
      storageTips: form.storageTips.filter(s => s.method || s.duration),
      faqs: form.faqs.filter(f => f.question || f.answer),
      preparationImages: form.preparationImages.filter(p => p.stepNumber || p.caption),
    }
  }

  const handleSubmit = async () => {
    const payload = getPayload()
    if (!payload) return
    if (!payload.title || !payload.slug) { setStatus({ type: 'error', message: 'Title and slug are required.' }); return }
    setLoading(true); setStatus(null)
    try {
      const res = await fetch('/api/admin/create-recipe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setStatus({ type: 'success', message: `Recipe created! ID: ${data.id} — /${data.slug}` })
      setForm(EMPTY_FORM); setJsonText('')
    } catch (e) { setStatus({ type: 'error', message: e.message }) }
    finally { setLoading(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {['form', 'json'].map(mode => (
          <div key={mode} role="button" tabIndex={0} onClick={() => setInputMode(mode)}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setInputMode(mode)}
            style={{ padding: '0.4rem 1rem', borderRadius: '50px', cursor: 'pointer', fontFamily: '"Lato", sans-serif', fontWeight: '700', fontSize: '0.82rem', userSelect: 'none', background: inputMode === mode ? 'rgba(232,98,42,0.2)' : 'rgba(255,255,255,0.04)', color: inputMode === mode ? '#F4946A' : 'rgba(253,246,238,0.5)', border: inputMode === mode ? '1px solid rgba(232,98,42,0.4)' : '1px solid rgba(255,255,255,0.08)' }}
          >{mode === 'form' ? 'Form' : 'JSON'}</div>
        ))}
      </div>

      {inputMode === 'json' ? (
        <Card>
          <Label>Paste JSON payload</Label>
          <textarea value={jsonText} onChange={e => { setJsonText(e.target.value); setJsonError('') }}
            placeholder={'{\n  "title": "My Recipe",\n  "slug": "my-recipe",\n  ...\n}'} rows={20}
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: `1px solid ${jsonError ? 'rgba(220,53,69,0.5)' : 'rgba(255,255,255,0.12)'}`, borderRadius: '12px', padding: '1rem', color: '#FDF6EE', fontFamily: 'monospace', fontSize: '0.82rem', resize: 'vertical', outlineColor: '#E8622A', boxSizing: 'border-box' }}
          />
          {jsonError && <p style={{ color: '#ff6b7a', fontSize: '0.82rem', marginTop: '0.4rem' }}>{jsonError}</p>}
        </Card>
      ) : (
        <RecipeForm
          form={form} setForm={setForm}
          mode="new"
          onTitleChange={handleTitleChange}
          onDone={() => { setForm(EMPTY_FORM) }}
          onSubmit={handleSubmit}
          loading={loading}
          status={status}
        />
      )}

      {inputMode === 'json' && (
        <>
          <StatusMessage status={status} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <ActionButton onClick={handleSubmit} loading={loading}>{loading ? 'Publishing...' : 'Publish to Sanity'}</ActionButton>
          </div>
        </>
      )}
    </div>
  )
}

// ─── Shared Recipe Form ───────────────────────────────────────────────────────

function RecipeForm({ form, setForm, mode, recipeId, onTitleChange, onDone, onSubmit, loading: externalLoading, status: externalStatus }) {
  const [internalLoading, setInternalLoading] = useState(false)
  const [internalStatus, setInternalStatus] = useState(null)

  const loading = mode === 'edit' ? internalLoading : externalLoading
  const status = mode === 'edit' ? internalStatus : externalStatus

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const addItem = (key, empty) => set(key, [...form[key], empty])
  const removeItem = (key, i) => set(key, form[key].filter((_, idx) => idx !== i))
  const updateItem = (key, i, val) => set(key, form[key].map((item, idx) => idx === i ? val : item))
  const toggleTag = (tag) => set('tags', form.tags.includes(tag) ? form.tags.filter(t => t !== tag) : [...form.tags, tag])

  const handleSave = async () => {
    if (!form.title || !form.slug) { setInternalStatus({ type: 'error', message: 'Title and slug are required.' }); return }
    setInternalLoading(true); setInternalStatus(null)
    try {
      const payload = {
        _id: recipeId,
        ...form,
        ingredients: form.ingredients.filter(i => i.trim()),
        steps: form.steps.filter(s => s.title || s.description),
        helpfulTips: form.helpfulTips.filter(t => t.title || t.description),
        variations: form.variations.filter(v => v.title || v.description),
        veganAdaptation: form.veganAdaptation.filter(v => v.trim()),
        storageTips: form.storageTips.filter(s => s.method || s.duration),
        faqs: form.faqs.filter(f => f.question || f.answer),
        preparationImages: form.preparationImages.filter(p => p.stepNumber || p.caption),
      }
      const res = await fetch('/api/admin/update-recipe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setInternalStatus({ type: 'success', message: `Saved! /${data.slug}` })
    } catch (e) { setInternalStatus({ type: 'error', message: e.message }) }
    finally { setInternalLoading(false) }
  }

  const handleSubmitBtn = mode === 'edit' ? handleSave : onSubmit

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {mode === 'edit' && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ color: '#F4946A', fontSize: '0.82rem', fontWeight: '700', margin: 0 }}>Editing: {form.title}</p>
          <ActionButton onClick={onDone} danger>✕ Discard</ActionButton>
        </div>
      )}

      {/* Basic Info */}
      <Section title="Basic Info">
        <Row>
          <Field label="Recipe Title *">
            <Input value={form.title} onChange={e => onTitleChange ? onTitleChange(e.target.value) : set('title', e.target.value)} placeholder="Creamy Tomato Pasta" />
          </Field>
          <Field label="Slug *">
            <Input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="creamy-tomato-pasta" />
          </Field>
        </Row>
        <Field label="Short Hook / Description">
          <Textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="The creamiest weeknight pasta you'll ever make..." rows={2} />
        </Field>
        <Row>
          <Field label="Category">
            <Select value={form.category} onChange={e => set('category', e.target.value)}>
              <option value="">Select...</option>
              {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </Select>
          </Field>
          <Field label="Cuisine">
            <Select value={form.cuisine} onChange={e => set('cuisine', e.target.value)}>
              <option value="">Select...</option>
              {CUISINES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </Select>
          </Field>
          <Field label="Difficulty">
            <Select value={form.difficulty} onChange={e => set('difficulty', e.target.value)}>
              <option value="">Select...</option>
              {DIFFICULTIES.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </Select>
          </Field>
        </Row>
        <Row>
          <Field label="Published At">
            <Input type="date" value={form.publishedAt} onChange={e => set('publishedAt', e.target.value)} />
          </Field>
          <Field label="Featured Recipe">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.35rem' }}>
              <div role="checkbox" aria-checked={form.featured} tabIndex={0}
                onClick={() => set('featured', !form.featured)}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && set('featured', !form.featured)}
                style={{ width: '42px', height: '24px', borderRadius: '50px', background: form.featured ? '#E8622A' : 'rgba(255,255,255,0.12)', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}
              >
                <div style={{ position: 'absolute', top: '3px', left: form.featured ? '21px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
              </div>
              <span style={{ color: 'rgba(253,246,238,0.7)', fontSize: '0.88rem' }}>{form.featured ? 'Yes' : 'No'}</span>
            </div>
          </Field>
        </Row>
      </Section>

      {/* Times & Nutrition */}
      <Section title="Times & Nutrition">
        <Row>
          <Field label="Prep Time (min)"><Input type="number" value={form.prepTime} onChange={e => set('prepTime', e.target.value)} placeholder="15" /></Field>
          <Field label="Cook Time (min)"><Input type="number" value={form.cookTime} onChange={e => set('cookTime', e.target.value)} placeholder="30" /></Field>
          <Field label="Servings"><Input type="number" value={form.servings} onChange={e => set('servings', e.target.value)} placeholder="4" /></Field>
          <Field label="Calories / Serving"><Input type="number" value={form.calories} onChange={e => set('calories', e.target.value)} placeholder="420" /></Field>
        </Row>
      </Section>

      {/* Tags */}
      <Section title="Tags">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {ALL_TAGS.map(tag => (
            <div key={tag} role="checkbox" aria-checked={form.tags.includes(tag)} tabIndex={0}
              onClick={() => toggleTag(tag)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggleTag(tag)}
              style={{ padding: '0.3rem 0.85rem', borderRadius: '50px', cursor: 'pointer', fontFamily: '"Lato", sans-serif', fontSize: '0.78rem', fontWeight: '700', userSelect: 'none', transition: 'all 0.12s', background: form.tags.includes(tag) ? 'rgba(232,98,42,0.2)' : 'rgba(255,255,255,0.04)', color: form.tags.includes(tag) ? '#F4946A' : 'rgba(253,246,238,0.5)', border: form.tags.includes(tag) ? '1px solid rgba(232,98,42,0.5)' : '1px solid rgba(255,255,255,0.08)' }}
            >{tag}</div>
          ))}
        </div>
      </Section>

      {/* Media */}
      <Section title="Media">
        <Row>
          <Field label="Hero Image URL">
            <Input value={form.mainImageUrl} onChange={e => set('mainImageUrl', e.target.value)} placeholder="https://..." />
          </Field>
          <Field label="Secondary Image URL">
            <Input value={form.secondaryImageUrl} onChange={e => set('secondaryImageUrl', e.target.value)} placeholder="https://..." />
          </Field>
        </Row>
        <Note>Paste public image URLs — they'll be uploaded to Sanity as assets on submit. You can also upload directly in Sanity Studio.</Note>
        <Field label="Recipe Video URL">
          <Input value={form.videoUrl} onChange={e => set('videoUrl', e.target.value)} placeholder="https://youtube.com/watch?v=..." />
        </Field>
        <Label style={{ marginTop: '1rem' }}>Preparation Photos</Label>
        {form.preparationImages.map((p, i) => (
          <ListRow key={i} onRemove={() => removeItem('preparationImages', i)} column>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Input type="number" value={p.stepNumber} onChange={e => updateItem('preparationImages', i, { ...p, stepNumber: e.target.value })} placeholder="Step #" style={{ width: '80px', flexShrink: 0 }} />
              <Input value={p.caption} onChange={e => updateItem('preparationImages', i, { ...p, caption: e.target.value })} placeholder="Caption..." />
            </div>
            <Input value={p.imageUrl || ''} onChange={e => updateItem('preparationImages', i, { ...p, imageUrl: e.target.value })} placeholder="Image URL (https://...)" />
          </ListRow>
        ))}
        <AddButton onClick={() => addItem('preparationImages', { stepNumber: '', caption: '', imageUrl: '' })}>+ Add Photo</AddButton>
      </Section>

      {/* Ingredients */}
      <Section title="Ingredients">
        {form.ingredients.map((ing, i) => (
          <ListRow key={i} onRemove={() => removeItem('ingredients', i)}>
            <Input value={ing} onChange={e => updateItem('ingredients', i, e.target.value)} placeholder={`Ingredient ${i + 1}`} />
          </ListRow>
        ))}
        <AddButton onClick={() => addItem('ingredients', '')}>+ Add Ingredient</AddButton>
      </Section>

      {/* Steps */}
      <Section title="Steps">
        {form.steps.map((s, i) => (
          <ListRow key={i} onRemove={() => removeItem('steps', i)} column>
            <Input value={s.title} onChange={e => updateItem('steps', i, { ...s, title: e.target.value })} placeholder={`Step ${i + 1} title`} />
            <Textarea value={s.description} onChange={e => updateItem('steps', i, { ...s, description: e.target.value })} placeholder="Instructions..." rows={2} />
          </ListRow>
        ))}
        <AddButton onClick={() => addItem('steps', { title: '', description: '' })}>+ Add Step</AddButton>
      </Section>

      {/* Helpful Tips */}
      <Section title="Helpful Tips">
        {form.helpfulTips.map((t, i) => (
          <ListRow key={i} onRemove={() => removeItem('helpfulTips', i)} column>
            <Input value={t.title} onChange={e => updateItem('helpfulTips', i, { ...t, title: e.target.value })} placeholder="Tip title" />
            <Textarea value={t.description} onChange={e => updateItem('helpfulTips', i, { ...t, description: e.target.value })} placeholder="Tip content..." rows={2} />
          </ListRow>
        ))}
        <AddButton onClick={() => addItem('helpfulTips', { title: '', description: '' })}>+ Add Tip</AddButton>
      </Section>

      {/* Easy Variations */}
      <Section title="Easy Variations">
        {form.variations.map((v, i) => (
          <ListRow key={i} onRemove={() => removeItem('variations', i)} column>
            <Input value={v.title} onChange={e => updateItem('variations', i, { ...v, title: e.target.value })} placeholder="Variation title" />
            <Textarea value={v.description} onChange={e => updateItem('variations', i, { ...v, description: e.target.value })} placeholder="Variation description..." rows={2} />
          </ListRow>
        ))}
        <AddButton onClick={() => addItem('variations', { title: '', description: '' })}>+ Add Variation</AddButton>
      </Section>

      {/* How To Make Vegan */}
      <Section title="How To Make This Vegan">
        {form.veganAdaptation.map((v, i) => (
          <ListRow key={i} onRemove={() => removeItem('veganAdaptation', i)}>
            <Input value={v} onChange={e => updateItem('veganAdaptation', i, e.target.value)} placeholder="e.g. Replace butter with coconut oil" />
          </ListRow>
        ))}
        <AddButton onClick={() => addItem('veganAdaptation', '')}>+ Add Substitution</AddButton>
      </Section>

      {/* Storage Tips */}
      <Section title="Storage Tips">
        {form.storageTips.map((s, i) => (
          <ListRow key={i} onRemove={() => removeItem('storageTips', i)}>
            <Input value={s.method} onChange={e => updateItem('storageTips', i, { ...s, method: e.target.value })} placeholder="Method (e.g. Fridge)" />
            <Input value={s.duration} onChange={e => updateItem('storageTips', i, { ...s, duration: e.target.value })} placeholder="Duration" />
            <Input value={s.notes} onChange={e => updateItem('storageTips', i, { ...s, notes: e.target.value })} placeholder="Notes..." />
          </ListRow>
        ))}
        <AddButton onClick={() => addItem('storageTips', { method: '', duration: '', notes: '' })}>+ Add Storage Tip</AddButton>
      </Section>

      {/* FAQs */}
      <Section title="FAQs">
        {form.faqs.map((f, i) => (
          <ListRow key={i} onRemove={() => removeItem('faqs', i)} column>
            <Input value={f.question} onChange={e => updateItem('faqs', i, { ...f, question: e.target.value })} placeholder="Question" />
            <Textarea value={f.answer} onChange={e => updateItem('faqs', i, { ...f, answer: e.target.value })} placeholder="Answer..." rows={2} />
          </ListRow>
        ))}
        <AddButton onClick={() => addItem('faqs', { question: '', answer: '' })}>+ Add FAQ</AddButton>
      </Section>

      {/* SEO */}
      <Section title="SEO">
        <Field label={`SEO Title (${form.seoTitle.length}/60)`}>
          <Input value={form.seoTitle} onChange={e => set('seoTitle', e.target.value.slice(0, 60))} placeholder="Override title for search engines..." />
        </Field>
        <Field label={`SEO Description (${form.seoDescription.length}/160)`}>
          <Textarea value={form.seoDescription} onChange={e => set('seoDescription', e.target.value.slice(0, 160))} placeholder="Meta description for Google..." rows={2} />
        </Field>
      </Section>

      <StatusMessage status={status} />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
        {mode === 'edit' && <ActionButton onClick={onDone} danger>Discard</ActionButton>}
        <ActionButton onClick={handleSubmitBtn} loading={loading}>
          {loading ? (mode === 'edit' ? 'Saving...' : 'Publishing...') : (mode === 'edit' ? 'Save to Sanity' : 'Publish to Sanity')}
        </ActionButton>
      </div>
    </div>
  )
}

// ─── Form Primitives ──────────────────────────────────────────────────────────

function Section({ title, children }) {
  const [open, setOpen] = useState(true)
  return (
    <Card>
      <div role="button" tabIndex={0} onClick={() => setOpen(o => !o)} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setOpen(o => !o)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none', marginBottom: open ? '1rem' : 0 }}>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: '#FDF6EE', margin: 0 }}>{title}</h3>
        {open ? <ChevronUp size={16} color="rgba(253,246,238,0.4)" /> : <ChevronDown size={16} color="rgba(253,246,238,0.4)" />}
      </div>
      {open && <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{children}</div>}
    </Card>
  )
}

function Field({ label, children, style }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, ...style }}><Label>{label}</Label>{children}</div>
}

function Row({ children }) {
  return <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>{children}</div>
}

function ListRow({ children, onRemove, column }) {
  return (
    <div style={{ display: 'flex', flexDirection: column ? 'column' : 'row', gap: '0.5rem', alignItems: column ? 'stretch' : 'center', marginBottom: '0.5rem' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: column ? 'column' : 'row', gap: '0.5rem' }}>{children}</div>
      <div role="button" tabIndex={0} onClick={onRemove} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onRemove()} style={{ color: 'rgba(220,53,69,0.7)', cursor: 'pointer', flexShrink: 0, padding: '0.25rem', alignSelf: column ? 'flex-end' : 'center' }}><X size={14} /></div>
    </div>
  )
}

function Label({ children, style }) {
  return <p style={{ color: 'rgba(253,246,238,0.5)', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.8px', textTransform: 'uppercase', margin: 0, ...style }}>{children}</p>
}

function Note({ children }) {
  return <p style={{ color: 'rgba(253,246,238,0.35)', fontSize: '0.78rem', fontStyle: 'italic', margin: '0.25rem 0 0' }}>{children}</p>
}

function Input({ style, ...props }) {
  return <input {...props} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '0.55rem 0.85rem', color: '#FDF6EE', fontFamily: '"Lato", sans-serif', fontSize: '0.88rem', width: '100%', outlineColor: '#E8622A', boxSizing: 'border-box', ...style }} />
}

function Textarea({ ...props }) {
  return <textarea {...props} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '0.55rem 0.85rem', color: '#FDF6EE', fontFamily: '"Lato", sans-serif', fontSize: '0.88rem', width: '100%', outlineColor: '#E8622A', resize: 'vertical', boxSizing: 'border-box' }} />
}

function Select({ children, ...props }) {
  return <select {...props} style={{ background: '#2A1208', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '0.55rem 0.85rem', color: '#FDF6EE', fontFamily: '"Lato", sans-serif', fontSize: '0.88rem', width: '100%', outlineColor: '#E8622A', boxSizing: 'border-box' }}>{children}</select>
}

function AddButton({ onClick, children }) {
  return <div role="button" tabIndex={0} onClick={onClick} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#F4946A', fontSize: '0.82rem', fontWeight: '700', cursor: 'pointer', userSelect: 'none', marginTop: '0.25rem', fontFamily: '"Lato", sans-serif' }}>{children}</div>
}

function Card({ children }) {
  return <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem' }}>{children}</div>
}

function CardTitle({ icon: Icon, color = '#E8622A', children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={18} color={color} strokeWidth={2} /></div>
      <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#FDF6EE', margin: 0 }}>{children}</h2>
    </div>
  )
}

function StatusMessage({ status }) {
  if (!status) return null
  const isError = status.type === 'error'
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.75rem 1rem', background: isError ? 'rgba(220,53,69,0.12)' : 'rgba(40,167,69,0.12)', border: `1px solid ${isError ? 'rgba(220,53,69,0.3)' : 'rgba(40,167,69,0.3)'}`, borderRadius: '10px', color: isError ? '#ff6b7a' : '#6bcb77', fontSize: '0.88rem', lineHeight: 1.5 }}>
      {isError ? <XCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} /> : <CheckCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />}
      <span>{status.message}</span>
    </div>
  )
}

function ActionButton({ onClick, disabled, loading, danger, children }) {
  console.log('ActionButton loading:', loading)
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      <div role="button" tabIndex={disabled || loading ? -1 : 0} onClick={disabled || loading ? undefined : onClick} onKeyDown={e => { if ((e.key === 'Enter' || e.key === ' ') && !disabled && !loading) onClick?.() }}
        style={{ background: danger ? 'rgba(220,53,69,0.15)' : '#E8622A', color: danger ? '#ff6b7a' : 'white', border: danger ? '1px solid rgba(220,53,69,0.4)' : 'none', borderRadius: '50px', padding: '0.6rem 1.4rem', fontFamily: '"Lato", sans-serif', fontWeight: '700', fontSize: '0.88rem', cursor: disabled || loading ? 'not-allowed' : 'pointer', opacity: disabled || loading ? 0.6 : 1, display: 'inline-flex', alignItems: 'center', transition: 'opacity 0.15s', userSelect: 'none' }}
      >
        {children}
      </div>
      {loading && (
        <span style={{ display: 'inline-flex', animation: 'spin 1s linear infinite' }}>
          <Loader size={14} color="#E8622A" />
        </span>
      )}
    </div>
  )
}

// ─── DB Cards ─────────────────────────────────────────────────────────────────

function DeleteByNameCard() {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)

  const handleTitleChange = (e) => {
    const val = e.target.value; setTitle(val); setConfirm(null); setStatus(null)
    if (val.trim().length < 2) { setSuggestions([]); setSuggestionsOpen(false); return }
    clearTimeout(window._adminSearchTimeout)
    window._adminSearchTimeout = setTimeout(async () => {
      try { const res = await fetch(`/api/search-suggestions?q=${encodeURIComponent(val.trim())}`); const data = await res.json(); setSuggestions(data.suggestions || []); setSuggestionsOpen(true) } catch {}
    }, 180)
  }

  const handleSearch = async () => {
    if (!title.trim()) return
    setSuggestionsOpen(false); setLoading(true); setStatus(null); setConfirm(null)
    try {
      const res = await fetch('/api/admin/delete-recipe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: title.trim(), dryRun: true }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      if (data.found.length === 0) setStatus({ type: 'error', message: `No recipe found with title "${title.trim()}"` })
      else setConfirm(data.found)
    } catch (e) { setStatus({ type: 'error', message: e.message }) }
    finally { setLoading(false) }
  }

  const handleDelete = async () => {
    setLoading(true); setConfirm(null)
    try {
      const res = await fetch('/api/admin/delete-recipe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: title.trim(), dryRun: false }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setStatus({ type: 'success', message: `Deleted ${data.deleted} recipe(s) and ${data.ratingsDeleted} rating doc(s).` }); setTitle('')
    } catch (e) { setStatus({ type: 'error', message: e.message }) }
    finally { setLoading(false) }
  }

  return (
    <Card>
      <CardTitle icon={Trash2}>Delete Recipe by Name</CardTitle>
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input type="text" value={title} onChange={handleTitleChange} onKeyDown={e => { if (e.key === 'Enter') handleSearch(); if (e.key === 'Escape') setSuggestionsOpen(false) }} onFocus={() => suggestions.length > 0 && setSuggestionsOpen(true)} placeholder="Recipe title..." style={{ flex: 1, minWidth: '200px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50px', padding: '0.6rem 1.1rem', color: '#FDF6EE', fontFamily: '"Lato", sans-serif', fontSize: '0.9rem', outlineColor: '#E8622A' }} />
          <ActionButton onClick={handleSearch} loading={loading} disabled={!title.trim()}>Search</ActionButton>
        </div>
        {suggestionsOpen && suggestions.length > 0 && (
          <div style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', left: 0, right: 0, background: '#2A1208', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '0.5rem', boxShadow: '0 12px 36px rgba(0,0,0,0.4)', zIndex: 10 }}>
            {suggestions.map(item => (
              <div key={item._id} role="button" tabIndex={0} onClick={() => { setTitle(item.title); setSuggestionsOpen(false); setSuggestions([]) }} onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (setTitle(item.title), setSuggestionsOpen(false), setSuggestions([]))} style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr)', gap: '0.75rem', alignItems: 'center', padding: '0.55rem 0.6rem', borderRadius: '10px', color: 'rgba(253,246,238,0.82)', fontFamily: '"Lato", sans-serif', fontSize: '0.88rem', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,98,42,0.12)'} onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                <span style={{ width: '44px', height: '44px', borderRadius: '10px', overflow: 'hidden', background: '#3D2010', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F4946A', fontSize: '0.75rem', fontWeight: '700' }}>{item.imageUrl ? <img src={item.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'OTS'}</span>
                <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {confirm && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.25)', borderRadius: '12px' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.6rem' }}><AlertTriangle size={15} color="#ff6b7a" /><span style={{ color: '#ff6b7a', fontSize: '0.85rem', fontWeight: '700' }}>Found {confirm.length} recipe(s) — confirm deletion</span></div>
          {confirm.map(r => <p key={r._id} style={{ color: 'rgba(253,246,238,0.6)', fontSize: '0.82rem', margin: '0.15rem 0 0 1.4rem' }}>• {r.title}</p>)}
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

function DeleteAllCard() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [step, setStep] = useState('idle')
  const [inputVal, setInputVal] = useState('')

  const handleDeleteAll = async () => {
    setLoading(true); setStep('idle'); setInputVal('')
    try {
      const res = await fetch('/api/admin/delete-all-recipes', { method: 'POST' }); const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setStatus({ type: 'success', message: `Deleted ${data.deleted} recipe(s) and ${data.ratingsDeleted} rating doc(s).` })
    } catch (e) { setStatus({ type: 'error', message: e.message }) }
    finally { setLoading(false) }
  }

  return (
    <Card>
      <CardTitle icon={Trash2} color="#dc3545">Delete All Recipes</CardTitle>
      <p style={{ color: 'rgba(253,246,238,0.5)', fontSize: '0.85rem', marginBottom: '1rem', marginTop: 0 }}>Permanently removes every recipe and all associated rating documents from Sanity.</p>
      {step === 'idle' && <ActionButton onClick={() => { setStep('confirm1'); setStatus(null) }} danger>Delete all recipes</ActionButton>}
      {step === 'confirm1' && (
        <div style={{ padding: '1rem', background: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.25)', borderRadius: '12px' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}><AlertTriangle size={15} color="#ff6b7a" /><span style={{ color: '#ff6b7a', fontSize: '0.85rem', fontWeight: '700' }}>This cannot be undone. Are you sure?</span></div>
          <div style={{ display: 'flex', gap: '0.75rem' }}><ActionButton onClick={() => setStep('confirm2')} danger>Yes, continue</ActionButton><ActionButton onClick={() => setStep('idle')}>Cancel</ActionButton></div>
        </div>
      )}
      {step === 'confirm2' && (
        <div style={{ padding: '1rem', background: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.25)', borderRadius: '12px' }}>
          <p style={{ color: '#ff6b7a', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.75rem' }}>Type <strong>DELETE ALL</strong> to confirm:</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder="DELETE ALL" style={{ flex: 1, minWidth: '150px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(220,53,69,0.4)', borderRadius: '50px', padding: '0.6rem 1.1rem', color: '#FDF6EE', fontFamily: '"Lato", sans-serif', fontSize: '0.9rem', outlineColor: '#dc3545' }} />
            <ActionButton onClick={handleDeleteAll} loading={loading} disabled={inputVal !== 'DELETE ALL'} danger>Confirm delete</ActionButton>
            <ActionButton onClick={() => { setStep('idle'); setInputVal('') }} disabled={loading}>Cancel</ActionButton>
          </div>
        </div>
      )}
      <StatusMessage status={status} />
    </Card>
  )
}

function ResetRatingsCard() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [confirm, setConfirm] = useState(false)

  const handleReset = async () => {
  setLoading(true)
  try {
    const res = await fetch('/api/admin/reset-ratings', { method: 'POST' })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Request failed')
    setStatus({ type: 'success', message: `Reset ${data.recipesReset} recipe(s) and deleted ${data.ratingsDeleted} rating doc(s).` })
  } catch (e) { setStatus({ type: 'error', message: e.message }) }
  finally { setLoading(false); setConfirm(false) }
}

  return (
    <Card>
      <CardTitle icon={RotateCcw} color="#F4946A">Reset All Ratings</CardTitle>
      <p style={{ color: 'rgba(253,246,238,0.5)', fontSize: '0.85rem', marginBottom: '1rem', marginTop: 0 }}>Deletes all rating documents and resets ratingTotal, ratingCount, and ratingBreakdown on every recipe.</p>
      {!confirm ? <ActionButton onClick={() => { setConfirm(true); setStatus(null) }}>Reset ratings</ActionButton> : (
        <div style={{ padding: '1rem', background: 'rgba(232,98,42,0.08)', border: '1px solid rgba(232,98,42,0.25)', borderRadius: '12px' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}><AlertTriangle size={15} color="#F4946A" /><span style={{ color: '#F4946A', fontSize: '0.85rem', fontWeight: '700' }}>All ratings will be wiped. Confirm?</span></div>
          <div style={{ display: 'flex', gap: '0.75rem' }}><ActionButton onClick={handleReset} loading={loading}>Yes, reset</ActionButton><ActionButton onClick={() => setConfirm(false)} disabled={loading}>Cancel</ActionButton></div>
        </div>
      )}
      <StatusMessage status={status} />
    </Card>
  )
}