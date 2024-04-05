<template>
  <div class="movie__container">
    <section-title title="movie" />
    <movie-search @onSearch="onSearch" v-model:currentPage.sync="currentPage" />
    <movie-tag @onSearch="onClick" v-model:currentPage.sync="currentPage" />
    <movie-section :movies="movies" />
    <pagination
      :totalItems="totalItems"
      v-model:currentPage.sync="currentPage"
      :itemsPerPage="itemsPerPage"
      @onClick="onClick"
      @onSearch="onSearch"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import SectionTitle from '@/components/layout/SectionTitle.vue'
import MovieSearch from '@/components/movie/MovieSearch.vue'
import MovieTag from '@/components/movie/MovieTag.vue'
import MovieSection from '@/components/movie/MovieSection.vue'
import Pagination from '@/components/layout/Pagination.vue'
export default {
  components: {
    SectionTitle,
    MovieSearch,
    MovieTag,
    MovieSection,
    Pagination
  },
  setup() {
    const store = useStore()
    let movies = ref([])
    let totalItems = ref(1)
    let currentPage = ref(1)
    const itemsPerPage = ref(20)
    const id = '64ed394366c7282a2d002b595b1b9954'

    const onSearch = async (page) => {
      let subject = store.getters.fnGetSubject
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${id}&language=ko-KR&query=${subject}&page=${page}`
        )
        let result = await response.json()
        movies.value = result.results
        totalItems.value = result.total_results
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    }

    const onClick = async (page) => {
      let { media, type } = store.getters.fnGetMovieTag
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/${media}/${type}?api_key=${id}&language=ko-KR&page=${page}`
        )
        let result = await response.json()
        movies.value = result.results
        totalItems.value = result.total_results
        console.log(this.movies)
      } catch (error) {
        console.log(error)
      }
    }

    const firstData = async () => {
      try {
        let response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${id}&language=ko-KR&page=1`
        )
        let result = await response.json()
        movies.value = result.results
        totalItems.value = result.total_results
        console.log(result.total_results)
      } catch (error) {
        console.log(error)
      }
    }
    firstData()

    return {
      movies,
      totalItems,
      currentPage,
      itemsPerPage,
      onClick,
      onSearch
    }
  }
}
</script>

<style lang="scss" scoped>
.movie__container {
  max-width: 1200px;
  margin: 50px auto;
}
</style>
