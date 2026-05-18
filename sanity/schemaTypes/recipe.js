export const recipe = {
  name: 'recipe',
  title: 'Recipe',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
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
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true }
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
      name: 'description',
      title: 'Short Description',
      type: 'text'
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
  ]
}