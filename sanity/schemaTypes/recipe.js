export const recipe = {
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Recipe Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Short Hook / Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(220)
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
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
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'prepTime',
      title: 'Prep Time (minutes)',
      type: 'number'
    },
    {
      name: 'cookTime',
      title: 'Cook Time (minutes)',
      type: 'number'
    },
    {
      name: 'servings',
      title: 'Servings',
      type: 'number'
    },
    {
      name: 'calories',
      title: 'Calories',
      description: 'Approximate calories per serving.',
      type: 'number'
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{ type: 'text' }]
    },
    {
      name: 'body',
      title: 'Full Post Content',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime'
    },
    {
      name: 'ratingTotal',
      title: 'Rating Total',
      type: 'number',
      readOnly: true,
      hidden: true,
    },
    {
      name: 'ratingCount',
      title: 'Rating Count',
      type: 'number',
      readOnly: true,
      hidden: true,
    },
    {
  name: 'ratingBreakdown',
  title: 'Rating Breakdown',
  type: 'object',
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