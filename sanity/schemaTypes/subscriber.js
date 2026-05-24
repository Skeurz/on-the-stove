export const subscriber = {
  name: 'subscriber',
  title: 'Email Subscriber',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'Where they signed up from',
    }
  ],
  preview: {
    select: { title: 'email', subtitle: 'subscribedAt' }
  }
}