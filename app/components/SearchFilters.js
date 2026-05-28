'use client'

import { useRouter } from 'next/navigation'

const categories = [
  { label: 'All Categories', value: '' },
  { label: '🍱 Lunch', value: 'lunch' },
  { label: '🍝 Dinner', value: 'dinner' },
  { label: '🥞 Breakfast & Brunch', value: 'breakfastnbrunch' },
  { label: '🥨 Snacks & Sides', value: 'snacksnsides' },
  { label: '🍰 Desserts', value: 'desserts' },
  { label: '🥤 Drinks & Shakes', value: 'drinks-shakes' },
]

const difficulties = [
  { label: 'Any Difficulty', value: '' },
  { label: '🟢 Easy', value: 'easy' },
  { label: '🟡 Medium', value: 'medium' },
  { label: '🔴 Hard', value: 'hard' },
]

const cuisines = [
  { label: 'Any Cuisine', value: '' },
  { label: 'American', value: 'american' },
  { label: 'Italian', value: 'italian' },
  { label: 'Mexican', value: 'mexican' },
  { label: 'Asian', value: 'asian' },
  { label: 'Mediterranean', value: 'mediterranean' },
  { label: 'French', value: 'french' },
  { label: 'Middle Eastern', value: 'middle-eastern' },
]

const selectStyle = (active) => ({
  border: active ? '1px solid var(--orange)' : '1px solid var(--gray)',
  borderRadius: '50px',
  background: active ? 'rgba(232,98,42,0.08)' : 'var(--cream)',
  color: active ? 'var(--orange)' : 'var(--text)',
  fontFamily: '"Lato", sans-serif',
  fontSize: '0.85rem',
  fontWeight: active ? '700' : '400',
  padding: '0.45rem 1rem',
  cursor: 'pointer',
  outline: 'none',
})

export default function SearchFilters({ query, category, difficulty, cuisine }) {
  const router = useRouter()

  const updateFilter = (key, value) => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (key !== 'category' && category) params.set('category', category)
    if (key !== 'difficulty' && difficulty) params.set('difficulty', difficulty)
    if (key !== 'cuisine' && cuisine) params.set('cuisine', cuisine)
    if (value) params.set(key, value)
    router.push(`/search?${params.toString()}`)
  }

  const activeFiltersCount = [category, difficulty, cuisine].filter(Boolean).length

  return (
    <section style={{
      background: 'var(--cream-light)',
      borderBottom: '1px solid var(--gray)',
      padding: '1.25rem 2rem',
    }}>
      <div className="search-filters-row" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        <span style={{
          fontFamily: '"Lato", sans-serif',
          fontSize: '0.8rem',
          fontWeight: '700',
          color: 'var(--text-light)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          flexShrink: 0,
        }}>
          Filter:
        </span>

        <select
          value={category}
          onChange={e => updateFilter('category', e.target.value)}
          style={selectStyle(!!category)}
        >
          {categories.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <select
          value={difficulty}
          onChange={e => updateFilter('difficulty', e.target.value)}
          style={selectStyle(!!difficulty)}
        >
          {difficulties.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>

        <select
          value={cuisine}
          onChange={e => updateFilter('cuisine', e.target.value)}
          style={selectStyle(!!cuisine)}
        >
          {cuisines.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        {activeFiltersCount > 0 && (
          <button
            onClick={() => {
              const params = new URLSearchParams()
              if (query) params.set('q', query)
              router.push(`/search?${params.toString()}`)
            }}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: '"Lato", sans-serif',
              fontSize: '0.8rem',
              color: 'var(--orange)',
              fontWeight: '700',
              cursor: 'pointer',
              marginLeft: 'auto',
            }}
          >
            Clear filters ({activeFiltersCount}) ✕
          </button>
        )}
      </div>
    </section>
  )
}
