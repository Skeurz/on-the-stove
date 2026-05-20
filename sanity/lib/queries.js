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
    publishedAt,
    ratingTotal,
    ratingCount
  }
`)

export const getPaginatedRecipes = defineQuery(`
  {
    "recipes": *[_type == "recipe"] | order(publishedAt desc) [$start...$end] {
      _id,
      title,
      slug,
      category,
      description,
      mainImage,
      prepTime,
      cookTime,
      servings,
      publishedAt,
      ratingTotal,
      ratingCount
    },
    "total": count(*[_type == "recipe"])
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
    publishedAt,
    ratingTotal,
    ratingCount
  }
`)

export const getPaginatedRecipesByCategory = defineQuery(`
  {
    "recipes": *[_type == "recipe" && category == $category] | order(publishedAt desc) [$start...$end] {
      _id,
      title,
      slug,
      category,
      description,
      mainImage,
      prepTime,
      cookTime,
      servings,
      publishedAt,
      ratingTotal,
      ratingCount
    },
    "total": count(*[_type == "recipe" && category == $category])
  }
`)

export const searchRecipes = defineQuery(`
  *[
    _type == "recipe" &&
    (
      title match $term ||
      description match $term ||
      category match $term
    )
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    description,
    mainImage,
    prepTime,
    cookTime,
    servings,
    publishedAt,
    ratingTotal,
    ratingCount
  }
`)

export const searchRecipeSuggestions = defineQuery(`
  *[
    _type == "recipe" &&
    (
      title match $term ||
      description match $term ||
      category match $term
    )
  ] | order(publishedAt desc)[0...5] {
    _id,
    title,
    slug,
    category,
    mainImage
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

export const getSuggestedRecipes = defineQuery(`
  *[_type == "recipe" && _id != $currentId] | order(publishedAt desc) [0...12] {
    _id,
    title,
    slug,
    category,
    mainImage,
    prepTime,
    cookTime,
    ratingTotal,
    ratingCount
  }
`)
