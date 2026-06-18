import { defineQuery } from 'next-sanity'
import groq from 'groq'

export const getAllRecipes = defineQuery(`
  *[_type == "recipe"] | order(publishedAt desc) {
    _id, title, slug, categories, description, mainImage,
    prepTime, cookTime, servings, calories, publishedAt,
    ratingTotal, ratingCount, difficulty
  }
`)

export const getPaginatedRecipes = defineQuery(`
  {
    "recipes": *[_type == "recipe"] | order(publishedAt desc) [$start...$end] {
      _id, title, slug, categories, description, mainImage,
      prepTime, cookTime, servings, calories, publishedAt,
      ratingTotal, ratingCount, difficulty
    },
    "total": count(*[_type == "recipe"])
  }
`)

export const getRecipeBySlug = defineQuery(`
  *[_type == "recipe" && slug.current == $slug][0] {
    _id, title, slug, categories, description, mainImage,
    prepTime, cookTime, servings, calories, ingredients, steps,
    body, tips, helpfulTips, variations, veganAdaptation,
    storageTips, faqs, tags, difficulty, cuisine, publishedAt,
    secondaryImage, videoUrl,
    "preparationImages": preparationImages[]{ _key, image, caption, stepNumber }
  }
`)

export const getRecipesByCategory = defineQuery(`
  *[_type == "recipe" && $category in categories] | order(publishedAt desc) {
    _id, title, slug, categories, description, mainImage,
    prepTime, cookTime, servings, calories, publishedAt,
    ratingTotal, ratingCount, difficulty
  }
`)

export const getPaginatedRecipesByCategory = defineQuery(`
  {
    "recipes": *[_type == "recipe" && $category in categories] | order(publishedAt desc) [$start...$end] {
      _id, title, slug, categories, description, mainImage,
      prepTime, cookTime, servings, calories, publishedAt,
      ratingTotal, ratingCount, difficulty
    },
    "total": count(*[_type == "recipe" && $category in categories])
  }
`)

export const searchRecipes = defineQuery(`
  *[
    _type == "recipe" &&
    (
      title match $term ||
      description match $term ||
      count((categories)[@ match $term]) > 0
    )
  ] | order(publishedAt desc) {
    _id, title, slug, categories, description, mainImage,
    prepTime, cookTime, servings, calories, publishedAt,
    ratingTotal, ratingCount, difficulty
  }
`)

export const searchRecipeSuggestions = defineQuery(`
  *[
    _type == "recipe" &&
    (
      title match $term ||
      description match $term ||
      count((categories)[@ match $term]) > 0
    )
  ] | order(publishedAt desc)[0...5] {
    _id, title, slug, categories, mainImage
  }
`)

export const getAuthor = defineQuery(`
  *[_type == "author"][0] {
    name, photo, bio, instagram, pinterest
  }
`)

export const getSuggestedRecipes = defineQuery(`
  *[_type == "recipe" && _id != $currentId && (count((categories)[@ in $categories]) > 0 || count((tags)[@ in $tags]) > 0)] | order(publishedAt desc) [0...6] {
    _id, title, slug, categories, mainImage,
    prepTime, cookTime, ratingTotal, ratingCount, difficulty
  }
`)

export const getFeaturedRecipes = groq`{
  "recipes": *[_type == "recipe" && featured == true] {
    _id, title, slug, mainImage, categories, cuisine, difficulty,
    prepTime, cookTime, servings, ratingTotal, ratingCount, description
  }
}`


export const getCollections = groq`
  *[_type == "collection"] | order(publishedAt desc) {
    _id, title, slug, description,
    "coverImage": coverImage.asset->url,
    "recipeCount": count(recipes),
  }
`

export const getCollection = groq`
  *[_type == "collection" && slug.current == $slug][0] {
    _id, title, description,
    "coverImage": coverImage.asset->url,
    "recipes": recipes[]-> {
      _id, title, slug, categories, cuisine, difficulty,
      prepTime, cookTime, servings, ratingTotal, ratingCount, description,
      mainImage
    }
  }
`