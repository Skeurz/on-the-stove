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
    calories,
    publishedAt,
    ratingTotal,
    ratingCount,
    difficulty
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
      calories,
      publishedAt,
      ratingTotal,
      ratingCount,
      difficulty
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
    calories,
    ingredients,
    steps,
    body,
    tips,
    helpfulTips,
    variations,
    veganAdaptation,
    storageTips,
    faqs,
    tags,
    difficulty,
    cuisine,
    publishedAt,
    secondaryImage,
    "preparationImages": preparationImages[]{
      _key,
      image,
      caption,
      stepNumber
    },
    videoUrl,
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
    calories,
    publishedAt,
    ratingTotal,
    ratingCount,
    difficulty
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
      calories,
      publishedAt,
      ratingTotal,
      ratingCount,
      difficulty
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
    calories,
    publishedAt,
    ratingTotal,
    ratingCount,
    difficulty
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
  *[_type == "recipe" && _id != $currentId && (category == $category || count((tags)[@ in $tags]) > 0)] | order(publishedAt desc) [0...6] {
    _id,
    title,
    slug,
    category,
    mainImage,
    prepTime,
    cookTime,
    ratingTotal,
    ratingCount,
    difficulty
  }
`)