import { recipe } from './recipe'
import { author } from './author'
import { rating } from './rating'
import { subscriber } from './subscriber'
import { collection } from './collection'

export const schema = {
  types: [recipe, author, rating, subscriber, collection],
}