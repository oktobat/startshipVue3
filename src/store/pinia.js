import { createPinia } from 'pinia'
import { modProduct } from './product'
import { modMovie } from './movie'
import { modMember } from './member'
import { modBoard } from './board'

const pinia = createPinia()

pinia.use((store) => {
  store.registerModule('product', modProduct)
  store.registerModule('movie', modMovie)
  store.registerModule('member', modMember)
  store.registerModule('board', modBoard)
})

export default pinia
