import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { modProduct } from './product'
import { modMovie } from './movie'
import { modMember } from './member'
import { modBoard } from './board'

export default createStore({
  modules: {
    modProduct,
    modMovie,
    modMember,
    modBoard
  },
  plugins: [createPersistedState({ storage: window.localStorage })]
})
