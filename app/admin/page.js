'use client'

import { useState, useEffect, useRef } from 'react'
import { Trash2, RotateCcw, AlertTriangle, CheckCircle, XCircle, Loader, X, ChevronDown, ChevronUp, Pencil, ExternalLink, ArrowBigDown, ArrowBigUp  } from 'lucide-react'

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
  { label: 'Chinese', value: 'chinese' },
  { label: 'Japanese', value: 'japanese' },
  { label: 'Korean', value: 'korean' },
  { label: 'Thai', value: 'thai' },
  { label: 'Vietnamese', value: 'vietnamese' },
  { label: 'Indian', value: 'indian' },
  { label: 'Pakistani', value: 'pakistani' },
  { label: 'Lebanese', value: 'lebanese' },
  { label: 'Moroccan', value: 'moroccan' },
  { label: 'Turkish', value: 'turkish' },
  { label: 'Greek', value: 'greek' },
  { label: 'Spanish', value: 'spanish' },
  { label: 'British', value: 'british' },
  { label: 'German', value: 'german' },
  { label: 'Eastern European', value: 'eastern-european' },
  { label: 'Brazilian', value: 'brazilian' },
  { label: 'Peruvian', value: 'peruvian' },
  { label: 'Caribbean', value: 'caribbean' },
  { label: 'West African', value: 'west-african' },
  { label: 'Ethiopian', value: 'ethiopian' },
  { label: 'Filipino', value: 'filipino' },
  { label: 'Indonesian', value: 'indonesian' },
  { label: 'Malaysian', value: 'malaysian' },
  { label: 'Fusion', value: 'fusion' },
  { label: 'Irish', value: 'irish' },
  { label: 'Other', value: 'other' },
]
const DIFFICULTIES = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
]
const ALL_TAGS = [
  // Diet & Lifestyle
  'gluten-free', 'dairy-free', 'vegan', 'vegetarian', 'pescatarian', 'paleo', 'keto',
  'low-carb', 'low-fat', 'low-sodium', 'low-calorie', 'low-sugar', 'sugar-free',
  'whole30', 'nut-free', 'egg-free', 'soy-free', 'grain-free', 'refined-sugar-free',
  'high-protein', 'high-fiber', 'anti-inflammatory', 'mediterranean-diet', 'raw',
  'macrobiotic', 'fodmap-friendly', 'diabetic-friendly', 'heart-healthy', 'gut-friendly',
  // Meal Prep & Planning
  'meal-prep', 'make-ahead', 'freezer-friendly', 'batch-cooking', 'meal-plan',
  'leftover-friendly', 'fridge-staples', 'pantry-staples', 'zero-waste', 'prep-ahead',
  // Time
  'under-15-min', 'under-30-min', 'under-1-hour', 'quick', '5-minute', '10-minute',
  'overnight', 'slow-cook', 'all-day', '2-hour',
  // Effort & Skill
  'beginner', 'easy', 'intermediate', 'advanced', 'no-cook', 'no-bake', 'minimal-dishes',
  'one-pot', 'one-pan', 'sheet-pan', 'one-bowl', 'dump-and-go', 'set-and-forget',
  '5-ingredients', 'few-ingredients', 'simple', 'foolproof',
  // Occasion
  'date-night', 'holiday', 'christmas', 'thanksgiving', 'easter', 'halloween',
  'new-year', 'valentines-day', 'mothers-day', 'fathers-day', 'birthday', 'brunch-party',
  'dinner-party', 'potluck', 'game-day', 'tailgate', 'picnic', 'bbq', 'baby-shower',
  'wedding', 'graduation', 'sunday-dinner', 'weeknight', 'special-occasion',
  // Season
  'summer', 'winter', 'spring', 'fall', 'seasonal', 'warm-weather', 'cold-weather',
  // Audience
  'kid-friendly', 'toddler-friendly', 'family-friendly', 'crowd-pleaser',
  'college-student', 'solo-meal', 'couples', 'picky-eater', 'office-lunch',
  // Method
  'baked', 'grilled', 'fried', 'air-fryer', 'instant-pot', 'slow-cooker', 'stovetop',
  'microwave', 'steamed', 'roasted', 'broiled', 'poached', 'smoked', 'pressure-cooker',
  'sous-vide', 'deep-fried', 'pan-fried', 'stir-fried', 'braised', 'sauteed',
  'blended', 'no-heat', 'cast-iron', 'wok', 'dutch-oven',
  // Texture & Style
  'crispy', 'creamy', 'crunchy', 'tender', 'fluffy', 'chewy', 'sticky', 'juicy',
  'rich', 'light', 'hearty', 'comforting', 'indulgent', 'refreshing', 'spicy',
  'smoky', 'tangy', 'sweet', 'savory', 'umami', 'bold', 'mild',
  // Budget
  'budget-friendly', 'cheap-eats', 'expensive-ingredients', 'luxury', 'affordable',
  'value-meal', 'dollar-store', 'costco-friendly',
  // Health Goals
  'weight-loss', 'muscle-gain', 'energy-boost', 'detox', 'immunity-boost',
  'post-workout', 'pre-workout', 'gut-health', 'skin-health', 'hormone-balance',
  'bone-health', 'brain-food', 'fertility-friendly',
  // Protein Source
  'chicken', 'beef', 'pork', 'lamb', 'turkey', 'seafood', 'fish', 'shrimp',
  'salmon', 'tuna', 'tofu', 'tempeh', 'legumes', 'beans', 'lentils', 'eggs',
  'cheese', 'plant-based-protein', 'venison', 'duck',
  // Carb/Base
  'pasta', 'rice', 'quinoa', 'bread', 'noodles', 'potatoes', 'couscous',
  'polenta', 'oats', 'tortilla', 'flatbread', 'cauliflower-base',
  // Cuisine (extra)
  'fusion', 'comfort-food', 'street-food', 'fine-dining', 'bistro', 'cafe-style',
  'diner', 'food-truck', 'farm-to-table', 'traditional', 'modern', 'classic',
  // Format
  'soup', 'salad', 'sandwich', 'wrap', 'bowl', 'stew', 'casserole', 'curry',
  'stir-fry', 'taco', 'burger', 'pizza', 'pie', 'tart', 'galette', 'frittata',
  'smoothie', 'juice', 'cocktail', 'mocktail', 'dip', 'spread', 'sauce',
  'marinade', 'dressing', 'gravy', 'jam', 'preserve', 'granola', 'energy-ball',
  // Trending
  'viral', 'tiktok-recipe', 'instagram-worthy', 'trending', 'popular', 'classic-remake',
  'elevated-basics', 'restaurant-copycat', 'takeout-at-home',
  // Misc
  'no-mixer', 'no-oven', 'no-blender', 'portable', 'lunchbox', 'school-lunch',
  'office-friendly', 'dorm-room', 'camping', 'backpacking', 'hiking-snack',
  'gift-idea', 'edible-gift', 'entertaining', 'finger-food', 'appetizer',
  'side-dish', 'main-course', 'dessert', 'breakfast', 'brunch', 'snack',
  // Vegetables
  'tomato', 'onion', 'garlic', 'ginger', 'carrot', 'celery', 'bell-pepper',
  'spinach', 'kale', 'broccoli', 'cauliflower', 'zucchini', 'eggplant',
  'cucumber', 'lettuce', 'cabbage', 'brussels-sprouts', 'asparagus', 'corn',
  'peas', 'green-beans', 'mushrooms', 'sweet-potato', 'butternut-squash',
  'pumpkin', 'beet', 'radish', 'turnip', 'parsnip', 'leek', 'shallot',
  'artichoke', 'fennel', 'bok-choy', 'swiss-chard', 'arugula', 'watercress',
  'endive', 'radicchio', 'kohlrabi', 'okra', 'chili-pepper', 'jalapeno',
  'serrano', 'habanero', 'poblano', 'anaheim-pepper', 'banana-pepper',
  'snap-peas', 'edamame', 'bamboo-shoots', 'water-chestnuts', 'daikon',
  'jicama', 'cassava', 'taro', 'plantain', 'yam', 'lotus-root',
  // Fruits
  'apple', 'banana', 'orange', 'lemon', 'lime', 'grapefruit', 'strawberry',
  'blueberry', 'raspberry', 'blackberry', 'cherry', 'grape', 'watermelon',
  'cantaloupe', 'honeydew', 'pineapple', 'mango', 'papaya', 'guava', 'kiwi',
  'peach', 'nectarine', 'plum', 'apricot', 'pear', 'fig', 'date', 'pomegranate',
  'passion-fruit', 'dragon-fruit', 'lychee', 'rambutan', 'jackfruit', 'durian',
  'starfruit', 'persimmon', 'quince', 'mulberry', 'gooseberry', 'cranberry',
  'boysenberry', 'elderberry', 'coconut', 'avocado', 'olive', 'tomato-fruit',
  'tamarind', 'kumquat', 'clementine', 'mandarin', 'blood-orange', 'yuzu',
  // Meats
  'chicken-breast', 'chicken-thigh', 'chicken-wings', 'chicken-drumsticks',
  'whole-chicken', 'ground-chicken', 'beef-steak', 'ground-beef', 'beef-ribs',
  'beef-brisket', 'beef-roast', 'beef-short-ribs', 'oxtail', 'beef-tenderloin',
  'ribeye', 'sirloin', 'flank-steak', 'skirt-steak', 'chuck', 'pork-chops',
  'pork-belly', 'pork-ribs', 'ground-pork', 'pork-tenderloin', 'pork-shoulder',
  'bacon', 'ham', 'prosciutto', 'pancetta', 'sausage', 'chorizo', 'salami',
  'pepperoni', 'hot-dog', 'lamb-chops', 'lamb-leg', 'ground-lamb', 'rack-of-lamb',
  'lamb-shoulder', 'turkey-breast', 'ground-turkey', 'whole-turkey', 'duck-breast',
  'duck-legs', 'veal', 'rabbit', 'venison-steak', 'bison', 'quail', 'goat',
  'liver', 'kidney', 'heart', 'tripe', 'bone-marrow',
  // Seafood & Fish
  'salmon-fillet', 'tuna-steak', 'cod', 'halibut', 'tilapia', 'sea-bass',
  'snapper', 'mahi-mahi', 'swordfish', 'trout', 'sardines', 'anchovies',
  'mackerel', 'herring', 'catfish', 'flounder', 'sole', 'grouper', 'monkfish',
  'shrimp-prawns', 'lobster', 'crab', 'scallops', 'mussels', 'clams', 'oysters',
  'squid', 'octopus', 'cuttlefish',
]

const EMPTY_FORM = {
  title: '', description: '', slug: '', videoUrl: '',
  categories: [], cuisine: '', tags: [], featured: false,
  publishedAt: new Date().toISOString().slice(0, 10),
  difficulty: '', prepTime: '', cookTime: '', servings: '', calories: '',
  mainImageUrl: null, secondaryImageUrl: null,
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
    categories: data.categories?.length ? data.categories : [],
    cuisine: data.cuisine || '',
    difficulty: data.difficulty || '',
    mainImageUrl: data.mainImageUrl || null,
    secondaryImageUrl: data.secondaryImageUrl || null,
  }
}

function ResetRatingsPill() {
  const [loading, setLoading] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [status, setStatus] = useState(null)

  const handleReset = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/reset-ratings', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setConfirm(false)
      setStatus('done')
      setTimeout(() => setStatus(null), 3000)
    } catch (e) { setConfirm(false) }
    finally { setLoading(false) }
  }

  if (confirm) return (
    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
      <div role="button" tabIndex={0} onClick={handleReset}
        style={{ padding: '0.55rem 1rem', borderRadius: '50px', fontFamily: '"Lato", sans-serif', fontWeight: '700', fontSize: '0.82rem', cursor: loading ? 'not-allowed' : 'pointer', background: 'rgba(220,53,69,0.2)', color: '#ff6b7a', border: '1px solid rgba(220,53,69,0.4)', opacity: loading ? 0.6 : 1 }}>
        {loading ? 'Resetting...' : 'Confirm reset'}
      </div>
      <div role="button" tabIndex={0} onClick={() => setConfirm(false)}
        style={{ padding: '0.55rem 1rem', borderRadius: '50px', fontFamily: '"Lato", sans-serif', fontWeight: '700', fontSize: '0.82rem', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', color: 'rgba(253,246,238,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
        Cancel
      </div>
    </div>
  )

  return (
    <div role="button" tabIndex={0} onClick={() => setConfirm(true)}
      style={{ padding: '0.55rem 1.25rem', borderRadius: '50px', fontFamily: '"Lato", sans-serif', fontWeight: '700', fontSize: '0.88rem', cursor: 'pointer', userSelect: 'none', background: status === 'done' ? 'rgba(40,167,69,0.15)' : 'rgba(255,255,255,0.06)', color: status === 'done' ? '#6bcb77' : 'rgba(253,246,238,0.6)', border: status === 'done' ? '1px solid rgba(40,167,69,0.3)' : '1px solid rgba(255,255,255,0.1)', transition: 'all 0.15s' }}>
      {status === 'done' ? '✓ Ratings reset' : '↺ Reset Ratings'}
    </div>
  )
}

function RecipesListCard({ setActiveTab }) {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState('date')
  const [sortDir, setSortDir] = useState('desc')
  const [featuredFirst, setFeaturedFirst] = useState(false)
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState(null)
  const [togglingId, setTogglingId] = useState(null)

  const fetchRecipes = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/list-recipes')
      const data = await res.json()
      setRecipes(data.recipes || [])
    } catch (e) {}
    finally { setLoading(false) }
  }

  useEffect(() => { fetchRecipes() }, [])

  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = [...filtered].sort((a, b) => {
  // Featured always on top if toggled
  if (featuredFirst) {
    const featDiff = (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    if (featDiff !== 0) return featDiff
  }

  let diff = 0
  if (sortField === 'date') diff = new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0)
  if (sortField === 'name') diff = a.title.localeCompare(b.title)
  if (sortField === 'rating') {
  const aAvg = a.ratingCount > 0 ? a.ratingTotal / a.ratingCount : 0
  const bAvg = b.ratingCount > 0 ? b.ratingTotal / b.ratingCount : 0
  diff = bAvg - aAvg
}

  return sortDir === 'desc' ? diff : -diff
  })

  const handleDelete = async (recipe) => {
    if (!confirm(`Delete "${recipe.title}"?`)) return
    setDeletingId(recipe._id)
    try {
      const res = await fetch('/api/admin/delete-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: recipe.title, dryRun: false }),
      })
      if (res.ok) setRecipes(r => r.filter(x => x._id !== recipe._id))
    } catch (e) {}
    finally { setDeletingId(null) }
  }

  const handleToggleFeatured = async (recipe) => {
    setTogglingId(recipe._id)
    try {
      const res = await fetch('/api/admin/update-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: recipe._id, featured: !recipe.featured }),
      })
      if (res.ok) setRecipes(r => r.map(x => x._id === recipe._id ? { ...x, featured: !x.featured } : x))
    } catch (e) {}
    finally { setTogglingId(null) }
  }

  const handleEdit = (recipe) => {
  setActiveTab('edit')
  // small delay to let EditRecipeTab mount first
  setTimeout(() => {
    window._adminEditTitle = recipe.title
    window.dispatchEvent(new CustomEvent('admin-edit-recipe', { detail: { title: recipe.title } }))
  }, 50)
}

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
  {['date', 'name', 'rating'].map(field => {
    const isActive = sortField === field
    const isDesc = sortDir === 'desc'
    return (
      <div key={field} role="button" tabIndex={0}
        onClick={() => {
          if (sortField === field) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
          else { setSortField(field); setSortDir('desc') }
        }}
        style={{ padding: '0.3rem 0.85rem', borderRadius: '50px', cursor: 'pointer', fontFamily: '"Lato", sans-serif', fontSize: '0.78rem', fontWeight: '700', userSelect: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem',
          background: isActive ? 'rgba(232,98,42,0.2)' : 'rgba(255,255,255,0.04)',
          color: isActive ? '#F4946A' : 'rgba(253,246,238,0.5)',
          border: isActive ? '1px solid rgba(232,98,42,0.5)' : '1px solid rgba(255,255,255,0.08)',
        }}>
        {field.charAt(0).toUpperCase() + field.slice(1)}
        {isActive && <span style={{ fontSize: '0.7rem' }}>{isDesc ? <ArrowBigDown size={13} fill='#FFFFFF'/> : <ArrowBigUp size={13} fill='#FFFFFF'/>}</span>}
      </div>
    )
  })}
  <div role="button" tabIndex={0}
    onClick={() => setFeaturedFirst(f => !f)}
    style={{ padding: '0.3rem 0.85rem', borderRadius: '50px', cursor: 'pointer', fontFamily: '"Lato", sans-serif', fontSize: '0.78rem', fontWeight: '700', userSelect: 'none',
      background: featuredFirst ? 'rgba(232,98,42,0.2)' : 'rgba(255,255,255,0.04)',
      color: featuredFirst ? '#F4946A' : 'rgba(253,246,238,0.5)',
      border: featuredFirst ? '1px solid rgba(232,98,42,0.5)' : '1px solid rgba(255,255,255,0.08)',
    }}>
    ★ Featured first
  </div>
</div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search recipes..."
        style={{ width: '100%', marginBottom: '1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50px', padding: '0.55rem 1.1rem', color: '#FDF6EE', fontFamily: '"Lato", sans-serif', fontSize: '0.88rem', outlineColor: '#E8622A', boxSizing: 'border-box' }}
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(253,246,238,0.4)', fontFamily: '"Lato", sans-serif', fontSize: '0.88rem' }}>Loading recipes...</div>
      ) : sorted.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(253,246,238,0.4)', fontFamily: '"Lato", sans-serif', fontSize: '0.88rem' }}>No recipes found.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {sorted.map(recipe => {
            const avg = recipe.ratingCount > 0 ? (recipe.ratingTotal / recipe.ratingCount).toFixed(1) : null
            return (
              <div key={recipe._id} style={{
                display: 'grid',
                gridTemplateColumns: '44px 1fr auto auto auto',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
              }}>
                {/* Image */}
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', background: '#3D2010', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F4946A', fontSize: '0.65rem', fontWeight: '700' }}>
                  {recipe.imageUrl
                    ? <img src={recipe.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : 'OTS'}
                </div>

                {/* Name + date + rating */}
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: '"Lato", sans-serif', fontWeight: '700', fontSize: '0.88rem', color: '#FDF6EE', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {recipe.title}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                    {recipe.publishedAt && (
                      <span style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.72rem', color: 'rgba(253,246,238,0.35)' }}>
                        {new Date(recipe.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    )}
                    {avg ? (
                      <span style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.72rem', color: '#F4946A', fontWeight: '700' }}>
                        ★ {avg} ({recipe.ratingCount})
                      </span>
                    ) : (
                      <span style={{ fontFamily: '"Lato", sans-serif', fontSize: '0.72rem', color: 'rgba(253,246,238,0.25)' }}>
                        No ratings
                      </span>
                    )}
                  </div>
                </div>

                {/* Featured toggle */}
                <div
                  role="checkbox" aria-checked={recipe.featured} tabIndex={0}
                  onClick={() => !togglingId && handleToggleFeatured(recipe)}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && !togglingId && handleToggleFeatured(recipe)}
                  style={{ width: '36px', height: '20px', borderRadius: '50px', background: recipe.featured ? '#E8622A' : 'rgba(255,255,255,0.12)', position: 'relative', cursor: togglingId === recipe._id ? 'wait' : 'pointer', transition: 'background 0.2s', flexShrink: 0, opacity: togglingId === recipe._id ? 0.5 : 1 }}
                >
                  <div style={{ position: 'absolute', top: '2px', left: recipe.featured ? '18px' : '2px', width: '16px', height: '16px', borderRadius: '50%', background: 'white', transition: 'left 0.2s' }} />
                </div>

                {/* Edit */}
                    <div
                role="button" tabIndex={0}
                onClick={() => handleEdit(recipe)}
               onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleEdit(recipe)}
               style={{ color: 'rgba(253,246,238,0.4)', cursor: 'pointer', padding: '0.25rem', flexShrink: 0 }}
                   >
               <Pencil size={15} />
                    </div>

                {/* Delete */}
                <div
                  role="button" tabIndex={0}
                  onClick={() => deletingId !== recipe._id && handleDelete(recipe)}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && deletingId !== recipe._id && handleDelete(recipe)}
                  style={{ color: deletingId === recipe._id ? 'rgba(220,53,69,0.3)' : 'rgba(220,53,69,0.7)', cursor: deletingId === recipe._id ? 'wait' : 'pointer', padding: '0.25rem', flexShrink: 0 }}
                >
                  <X size={16} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin-edit-slug')) {
      return 'edit'
    }
    return 'db'
  })

  return (
    <div style={{ padding: '3rem 1.5rem', paddingBottom: '6rem', fontFamily: '"Lato", sans-serif' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#E8622A', marginBottom: '0.5rem', fontWeight: '700' }}>localhost only</p>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.2rem', color: '#FDF6EE', margin: 0 }}>Admin Panel</h1>
          <p style={{ color: 'rgba(253,246,238,0.45)', fontSize: '0.88rem', marginTop: '0.5rem' }}>On The Stove — database management</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
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
             <ResetRatingsPill />
          </div>

        {activeTab === 'db' && <DbTab setActiveTab={setActiveTab} />}
        {activeTab === 'new' && <NewRecipeTab />}
        {activeTab === 'edit' && <EditRecipeTab />}
      </div>
    </div>
  )
}

// ─── DB Tab ───────────────────────────────────────────────────────────────────

function DbTab({ setActiveTab }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <RecipesListCard setActiveTab={setActiveTab} />
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

  useEffect(() => {
  // Handle navigation from recipe page (EditRecipeButton)
  const slug = sessionStorage.getItem('admin-edit-slug')
  if (slug) {
    sessionStorage.removeItem('admin-edit-slug')
    setSearchQuery(slug)
    loadRecipe(slug)
    return
  }

  // Handle click from DB tab (custom event)
  const handler = (e) => {
    const title = e.detail?.title
    if (!title) return
    setSearchQuery(title)
    loadRecipe(title)
  }
  window.addEventListener('admin-edit-recipe', handler)
  return () => window.removeEventListener('admin-edit-recipe', handler)
  }, [])

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


  const loadRecipe = async (query) => {
  setSuggestionsOpen(false); setLoadingRecipe(true); setRecipe(null); setForm(null); setSearchStatus(null)
  try {
    const res = await fetch('/api/admin/get-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: query, slug: query })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Failed')
    if (!data.found) setSearchStatus({ type: 'error', message: `No recipe found for "${query}"` })
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
  const [preview, setPreview] = useState(null)

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
  console.log('faqs:', payload.faqs)
  console.log('storageTips:', payload.storageTips)
  setLoading(true)  
  try {
      const res = await fetch('/api/admin/create-recipe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed')
      setStatus({ type: 'success', message: `Recipe created! ID: ${data.id} — /${data.slug}`, slug: data.slug })
      setForm(EMPTY_FORM); setJsonText('')
      setPreview(null)
    } catch (e) { setStatus({ type: 'error', message: e.message }) }
    finally { setLoading(false) }
  }

  const handlePreview = () => {
  const payload = getPayload()
  if (!payload) return
  if (!payload.title || !payload.slug) {
    setStatus({ type: 'error', message: 'Title and slug are required.' })
    return
  }
  setStatus(null)
  setPreview(payload)
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

    {preview && (
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p style={{ color: '#F4946A', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Preview</p>
        <p style={{ color: '#FDF6EE', fontSize: '1.1rem', fontFamily: '"Playfair Display", serif', margin: 0 }}>{preview.title}</p>
        <p style={{ color: 'rgba(253,246,238,0.45)', fontSize: '0.82rem', margin: 0 }}>/{preview.slug}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
          {preview.categories?.map(c => <Pill key={c}>{c}</Pill>)}
          {preview.cuisine && <Pill>{preview.cuisine}</Pill>}
          {preview.difficulty && <Pill>{preview.difficulty}</Pill>}
          {preview.ingredients?.length > 0 && <Pill>{preview.ingredients.length} ingredient{preview.ingredients.length !== 1 ? 's' : ''}</Pill>}
          {preview.steps?.length > 0 && <Pill>{preview.steps.length} step{preview.steps.length !== 1 ? 's' : ''}</Pill>}
        </div>
      </div>
    )}

    <div  style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
  
<ActionButton onClick={handleSubmit} loading={loading}>
  {loading ? 'Publishing...' : 'Publish to Sanity'}
</ActionButton>
   </div>
  </>
)}
  </div>
  )

  
}

function Pill({ children }) {
  return (
    <span style={{ padding: '0.2rem 0.7rem', borderRadius: '50px', background: 'rgba(232,98,42,0.15)', border: '1px solid rgba(232,98,42,0.3)', color: '#F4946A', fontSize: '0.75rem', fontWeight: '700', fontFamily: '"Lato", sans-serif' }}>
      {children}
    </span>
  )
}





function ImageUploadField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)
  const urlValue = typeof value === 'string' ? value : value?.url || ''
 
  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true); setError(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload-image', { method: 'POST', body: fd })
      const data = await res.json()
      console.log('upload response:', data)
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      onChange({ url: data.url, assetId: data.assetId })
    } catch (e) { setError(e.message) }
    finally { setUploading(false); e.target.value = '' }
  }
 
  return (
    <Field label={label}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Input value={urlValue} onChange={e => onChange(e.target.value)} placeholder="https://..." />
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        <div role="button" tabIndex={0}
          onClick={() => !uploading && inputRef.current?.click()}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && !uploading && inputRef.current?.click()}
          style={{ flexShrink: 0, padding: '0.55rem 1rem', borderRadius: '8px', background: 'rgba(232,98,42,0.15)', border: '1px solid rgba(232,98,42,0.4)', color: '#F4946A', fontSize: '0.82rem', fontWeight: '700', cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.6 : 1, whiteSpace: 'nowrap', fontFamily: '"Lato", sans-serif' }}
        >{uploading ? 'Uploading...' : '↑ Upload'}</div>
      </div>
      {urlValue && !uploading && (
        <img src={urlValue} alt="" style={{ marginTop: '0.5rem', height: '200px', borderRadius: '8px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} />
      )}
      {error && <p style={{ color: '#ff6b7a', fontSize: '0.78rem', marginTop: '0.3rem' }}>{error}</p>}
    </Field>
  )
}


// ─── Shared Recipe Form ───────────────────────────────────────────────────────

function RecipeForm({ form, setForm, mode, recipeId, onTitleChange, onDone, onSubmit, loading: externalLoading, status: externalStatus }) {
  const [internalLoading, setInternalLoading] = useState(false)
  const [internalStatus, setInternalStatus] = useState(null)
  const [showFloating, setShowFloating] = useState(false)
  const [toast, setToast] = useState(null)
  const bottomBtnRef = useRef(null)

useEffect(() => {
  const handleScroll = () => {
    if (bottomBtnRef.current) {
      const rect = bottomBtnRef.current.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0
      setShowFloating(window.scrollY > 300 && !isVisible)
    } else {
      setShowFloating(window.scrollY > 300)
    }
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

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
      setInternalStatus({ type: 'success', message: `Saved! /${data.slug}`, slug: data.slug })
      setToast({ slug: data.slug })
      setTimeout(() => setToast(null), 4000)
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
          <Field label="Categories">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {CATEGORIES.map(c => (
          <div key={c.value} role="checkbox" aria-checked={form.categories?.includes(c.value)} tabIndex={0}
        onClick={() => {
           const current = form.categories || []
          set('categories', current.includes(c.value) ? current.filter(x => x !== c.value) : [...current, c.value])
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            const current = form.categories || []
            set('categories', current.includes(c.value) ? current.filter(x => x !== c.value) : [...current, c.value])
          }
        }}
        style={{ padding: '0.3rem 0.85rem', borderRadius: '50px', cursor: 'pointer', fontFamily: '"Lato", sans-serif', fontSize: '0.78rem', fontWeight: '700', userSelect: 'none', transition: 'all 0.12s',
          background: form.categories?.includes(c.value) ? 'rgba(232,98,42,0.2)' : 'rgba(255,255,255,0.04)',
          color: form.categories?.includes(c.value) ? '#F4946A' : 'rgba(253,246,238,0.5)',
          border: form.categories?.includes(c.value) ? '1px solid rgba(232,98,42,0.5)' : '1px solid rgba(255,255,255,0.08)'
        }}
      >{c.label}</div>
                ))}
            </div>
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
  <ImageUploadField label="Hero Image" value={form.mainImageUrl} onChange={v => set('mainImageUrl', v)} />
  <ImageUploadField label="Secondary Image" value={form.secondaryImageUrl} onChange={v => set('secondaryImageUrl', v)} />
</Row>
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
            <ImageUploadField label="Image" value={p.imageUrl} onChange={v => updateItem('preparationImages', i, { ...p, imageUrl: v })} />
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

      <div ref={bottomBtnRef}  style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
        {mode === 'edit' && <ActionButton onClick={onDone} danger>Discard</ActionButton>}
        <ActionButton onClick={handleSubmitBtn} loading={loading}>
          {loading ? (mode === 'edit' ? 'Saving...' : 'Publishing...') : (mode === 'edit' ? 'Save to Sanity' : 'Publish to Sanity')}
        </ActionButton>
      </div>
      {mode === 'edit' && showFloating && (
        <div style={{
          position: 'fixed', bottom: '2rem', right: '25rem', zIndex: 100,
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: '#E8622A', color: 'white', borderRadius: '50px',
          padding: '0.75rem 1.5rem', fontFamily: '"Lato", sans-serif',
          fontWeight: '700', fontSize: '0.88rem',
          cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
          boxShadow: '0 8px 24px rgba(232,98,42,0.4)', transition: 'opacity 0.15s', userSelect: 'none',
        }}
          role="button" tabIndex={0}
          onClick={loading ? undefined : handleSubmitBtn}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && !loading && handleSubmitBtn()}
        >
          {loading ? 'Saving...' : 'Save to Sanity'}
          {loading && <span style={{ display: 'inline-flex', animation: 'spin 1s linear infinite' }}><Loader size={14} color="white" /></span>}
        </div>
      )}
      {toast && (
  <div style={{
    position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)',
    zIndex: 200, display: 'flex', alignItems: 'center', gap: '0.6rem',
    background: 'rgba(40,167,69,0.95)', color: '#fff',
    borderRadius: '50px', padding: '0.65rem 1.25rem',
    fontFamily: '"Lato", sans-serif', fontWeight: '700', fontSize: '0.88rem',
    boxShadow: '0 8px 24px rgba(0,0,0,0.3)', whiteSpace: 'nowrap',
  }}>
    <CheckCircle size={15} />
    Saved!
    <a href={`/${toast.slug}`} target="_blank" rel="noopener noreferrer"
      style={{ color: 'white', textDecoration: 'underline', fontSize: '0.82rem' }}>
      Preview ↗
    </a>
  </div>
)}
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

function Input({ style, value, ...props }) {
  return <input {...props} value={value ?? ''} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '0.55rem 0.85rem', color: '#FDF6EE', fontFamily: '"Lato", sans-serif', fontSize: '0.88rem', width: '100%', outlineColor: '#E8622A', boxSizing: 'border-box', ...style }} />
}

function Textarea({ value, ...props }) {
  return <textarea {...props} value={value ?? ''} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '0.55rem 0.85rem', color: '#FDF6EE', fontFamily: '"Lato", sans-serif', fontSize: '0.88rem', width: '100%', outlineColor: '#E8622A', resize: 'vertical', boxSizing: 'border-box' }} />
}

function Select({ children, value, ...props }) {
  return <select {...props} value={value ?? ''} style={{ background: '#2A1208', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '0.55rem 0.85rem', color: '#FDF6EE', fontFamily: '"Lato", sans-serif', fontSize: '0.88rem', width: '100%', outlineColor: '#E8622A', boxSizing: 'border-box' }}>{children}</select>
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
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.75rem 1rem', background: isError ? 'rgba(220,53,69,0.12)' : 'rgba(40,167,69,0.12)', border: `1px solid ${isError ? 'rgba(220,53,69,0.3)' : 'rgba(40,167,69,0.3)'}`, borderRadius: '10px', color: isError ? '#ff6b7a' : '#6bcb77', fontSize: '0.88rem', lineHeight: 1.5, flexWrap: 'wrap' }}>
      {isError ? <XCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} /> : <CheckCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />}
      <span style={{ flex: 1 }}>{status.message}</span>
      {!isError && status.slug && (
        <a href={`/${status.slug}`} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#6bcb77', color: '#0a2e0a', fontFamily: '"Lato", sans-serif', fontWeight: '700', fontSize: '0.82rem', padding: '0.3rem 0.85rem', borderRadius: '50px', textDecoration: 'none', flexShrink: 0 }}>
          Preview <ExternalLink/> 
        </a>
      )}
    </div>
  )
}

function ActionButton({ onClick, disabled, loading, danger, children }) {
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
  setLoading(true); setInputVal('')
  try {
    const res = await fetch('/api/admin/delete-all-recipes', { method: 'POST' })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Request failed')
    setStatus({ type: 'success', message: `Deleted ${data.deleted} recipe(s) and ${data.ratingsDeleted} rating doc(s).` })
    setStep('idle')
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