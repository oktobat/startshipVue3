import axios from 'axios'
export const modMovie = {
  state: () => ({
    movieTag: { media: 'movie', type: 'popular' },
    search: false,
    subject: ''
  }),
  mutations: {
    on__Update(state, payload) {
      state.movieTag.media = payload.media
      state.movieTag.type = payload.type
      state.search = false
    },
    on__Search(state, payload) {
      state.search = true
      state.subject = payload
    }
  },
  actions: {
    init__Store({ commit }) {
      axios.get('./assets/data/products.json').then((response) => {
        console.log(response)
        commit('set__Store', response.data)
      })
    }
  },
  getters: {
    fnGetMovieTag: (state) => state.movieTag,
    fnGetSearch: (state) => state.search,
    fnGetSubject: (state) => state.subject
  }
}
