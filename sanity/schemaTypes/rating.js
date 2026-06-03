export const rating = {
  name: 'rating',
  title: 'Rating',
  type: 'document',
  fields: [
    {
      name: 'recipe',
      title: 'Recipe',
      type: 'reference',
      to: [{ type: 'recipe' }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'value',
      title: 'Stars (1-5)',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5).integer(),
    },
    {
      name: 'ipHash',
      title: 'IP Hash',
      type: 'string',
      description: 'SHA-256 hash of the voter IP + salt. Used to enforce one-vote-per-IP.',
      validation: Rule => Rule.required(),
    },
    {
  name: 'browserHash',
  title: 'Browser Hash',
  type: 'string',
  hidden: true,
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'recipe.title',
      subtitle: 'value',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled recipe',
        subtitle: `${subtitle} ★`,
      }
    },
  },
}
