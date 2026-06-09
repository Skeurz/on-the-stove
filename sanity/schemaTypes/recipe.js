export const recipe = {
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  groups: [
    { name: 'content', title: '📝 Content' },
    { name: 'details', title: '⏱ Details' },
    { name: 'seo', title: '🔍 SEO' },
    { name: 'ratings', title: '⭐ Ratings' },
  ],
  fields: [
    // ── CONTENT ──
    {
      name: 'title',
      title: 'Recipe Title',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Hook / Description',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Shown on recipe cards and at the top of the recipe page',
      validation: Rule => Rule.required().max(999)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      group: 'content',
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
      validation: Rule => Rule.required()
    },
    {
      name: 'secondaryImage',
      title: 'Secondary Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
      description: 'A second beauty shot — plating, close-up, or lifestyle photo',
    },
    {
      name: 'preparationImages',
      title: 'Preparation Photos',
      type: 'array',
      group: 'content',
      description: 'Step-by-step preparation photos',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'image',
            title: 'Photo',
            type: 'image',
            options: { hotspot: true },
          },
          {
            name: 'caption',
            title: 'Caption',
            type: 'string',
            description: 'e.g. "Mix the dry ingredients"',
          },
          {
            name: 'stepNumber',
            title: 'Step Number',
            type: 'number',
            description: 'Which step does this photo correspond to?',
          }
        ],
        preview: {
          select: {
            title: 'caption',
            subtitle: 'stepNumber',
            media: 'image',
          },
          prepare({ title, subtitle, media }) {
            return {
              title: title || 'Untitled photo',
              subtitle: subtitle ? `Step ${subtitle}` : '',
              media,
            }
          }
        }
      }]
    },
    {
      name: 'videoUrl',
      title: 'Recipe Video',
      type: 'url',
      group: 'content',
      description: 'YouTube or TikTok URL for the recipe video',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: {
      list: [
      { title: 'Lunch', value: 'lunch' },
      { title: 'Dinner', value: 'dinner' },
      { title: 'Breakfast & Brunch', value: 'breakfastnbrunch' },
      { title: 'Snacks & Sides', value: 'snacksnsides' },
      { title: 'Desserts', value: 'desserts' },
      { title: 'Drinks & Shakes', value: 'drinks-shakes' },
      { title: 'My Collection', value: 'my-collection' },
    ]
  },
  validation: Rule => Rule.required().min(1)
},
    {
      name: 'cuisine',
      title: 'Cuisine',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'American', value: 'american' },
          { title: 'Italian', value: 'italian' },
          { title: 'Mexican', value: 'mexican' },
          { title: 'Asian', value: 'asian' },
          { title: 'Mediterranean', value: 'mediterranean' },
          { title: 'French', value: 'french' },
          { title: 'Middle Eastern', value: 'middle-eastern' },
          { title: 'Other', value: 'other' },
        ]
      }
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. gluten-free, meal prep, under 30 min, one pot'
    },
    {
      name: 'featured',
      title: 'Featured Recipe',
      type: 'boolean',
      group: 'content',
      description: 'Show this recipe in featured spots on the homepage',
      initialValue: false,
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'content',
    },

    // ── DETAILS ──
  /*  {
  name: 'body',
  title: 'Full Post Content',
  type: 'array',
  group: 'details',
  of: [{ type: 'block' }],
  description: 'Additional content: FAQs, variations, storage tips, etc.'
    }, */
    {
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: '🟢 Easy', value: 'easy' },
          { title: '🟡 Medium', value: 'medium' },
          { title: '🔴 Hard', value: 'hard' },
        ],
        layout: 'radio'
      }
    },
    {
      name: 'prepTime',
      title: 'Prep Time (minutes)',
      type: 'number',
      group: 'details',
    },
    {
      name: 'cookTime',
      title: 'Cook Time (minutes)',
      type: 'number',
      group: 'details',
    },
    {
      name: 'servings',
      title: 'Servings',
      type: 'number',
      group: 'details',
    },
    {
      name: 'calories',
      title: 'Calories per serving',
      type: 'number',
      group: 'details',
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }]
    },
    
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      group: 'details',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'title',
            title: 'Step Title',
            type: 'string',
            description: 'e.g. "Preheat the oven" or "Mix dry ingredients"'
          },
          {
            name: 'description',
            title: 'Step Description',
            type: 'text',
            rows: 3,
          }
        ],
        preview: {
          select: { title: 'title', subtitle: 'description' }
        }
      }]
    },
    
    {
      name: 'helpfulTips',
      title: '💡 Helpful Tips',
      type: 'array',
      group: 'details',
      description: 'Pro tips, substitutions, and tricks',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Tip Title', type: 'string' },
          { name: 'description', title: 'Tip Description', type: 'text', rows: 2 }
        ],
        preview: { select: { title: 'title', subtitle: 'description' } }
      }]
    },
    {
      name: 'variations',
      title: '🔄 Easy Variations',
      type: 'array',
      group: 'details',
      description: 'Simple ways to change up the recipe',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Variation Title', type: 'string' },
          { name: 'description', title: 'Variation Description', type: 'text', rows: 2 }
        ],
        preview: { select: { title: 'title', subtitle: 'description' } }
      }]
    },
    {
      name: 'veganAdaptation',
      title: '🌱 How to Make This Vegan',
      type: 'array',
      group: 'details',
      description: 'Vegan substitutions for this recipe',
      of: [{ type: 'string' }]
    },
    {
      name: 'storageTips',
      title: '📦 Storage Tips',
      type: 'array',
      group: 'details',
      description: 'How to store, refrigerate, or freeze',
      of: [{
        type: 'object',
        fields: [
          { name: 'method', title: 'Storage Method', type: 'string', description: 'e.g. Room temperature, Refrigerator, Freezer' },
          { name: 'duration', title: 'Duration', type: 'string', description: 'e.g. Up to 3 days' },
          { name: 'notes', title: 'Notes', type: 'string' }
        ],
        preview: { select: { title: 'method', subtitle: 'duration' } }
      }]
    },
    {
      name: 'faqs',
      title: '❓ Frequently Asked Questions',
      type: 'array',
      group: 'details',
      description: 'Common questions and answers',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'answer', title: 'Answer', type: 'text', rows: 3 }
        ],
        preview: { select: { title: 'question', subtitle: 'answer' } }
      }]
    },

    // ── SEO ──
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Overrides recipe title for search engines (max 60 chars)',
      validation: Rule => Rule.max(60)
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'Meta description for Google (max 160 chars)',
      validation: Rule => Rule.max(160)
    },

    // ── RATINGS (hidden, managed by API) ──
    {
      name: 'ratingTotal',
      title: 'Rating Total',
      type: 'number',
      group: 'ratings',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'ratingCount',
      title: 'Rating Count',
      type: 'number',
      group: 'ratings',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'ratingBreakdown',
      title: 'Rating Breakdown',
      type: 'object',
      group: 'ratings',
      readOnly: true,
      hidden: true,
      fields: [
        { name: 'star1', type: 'number', title: '1 Star' },
        { name: 'star2', type: 'number', title: '2 Stars' },
        { name: 'star3', type: 'number', title: '3 Stars' },
        { name: 'star4', type: 'number', title: '4 Stars' },
        { name: 'star5', type: 'number', title: '5 Stars' },
      ]
    },
  ]
}