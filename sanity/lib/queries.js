import { defineQuery } from 'next-sanity'

export const getAllRecipes = defineQuery(`
  *[_type == "recipe"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    description,
    mainImage,
    prepTime,
    cookTime,
    servings,
    publishedAt
  }
`)

export const getRecipeBySlug = defineQuery(`
  *[_type == "recipe" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    description,
    mainImage,
    prepTime,
    cookTime,
    servings,
    ingredients,
    steps,
    body,
    publishedAt
  }
`)

export const getRecipesByCategory = defineQuery(`
  *[_type == "recipe" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    description,
    mainImage,
    prepTime,
    cookTime,
    servings,
    publishedAt
  }
`)
export const getAuthor = defineQuery(`
  *[_type == "author"][0] {
    name,
    photo,
    bio,
    instagram,
    pinterest
  }
`)