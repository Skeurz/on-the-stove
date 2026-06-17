export const collection = {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Collection Title',
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
      name: 'description',
      title: 'Description',
      type: 'string',
      rows: 3,
      description: 'Shown on the collections listing page',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'recipes',
      title: 'Recipes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'recipe' }] }],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
  ],
    preview: {
     select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'description',
    },
    prepare({ title, media, subtitle }) {
      return {
        title,
        media,
        subtitle: subtitle ? (subtitle.length > 60 ? subtitle.slice(0, 57) + '...' : subtitle) : 'No description',
      }
    }
  }
}