<script>
import { ref, computed } from 'vue'
export default {
  name: 'ActorSection',
  props: {
    keyword: String
  },
  setup(props) {
    const actorWorks = ref([
      {
        name: '이동욱',
        genre: '드라마',
        title: '도깨비',
        photo: './assets/image/p_leedongwook.jpg'
      },
      {
        name: '유연석',
        genre: '영화',
        title: '멍뭉미',
        photo: './assets/image/p_yooyeonseok.jpg'
      },
      {
        name: '이동욱',
        genre: '드라마',
        title: '도깨비1',
        photo: './assets/image/p_leedongwook.jpg'
      },
      {
        name: '유연석',
        genre: '영화',
        title: '멍뭉미1',
        photo: './assets/image/p_yooyeonseok.jpg'
      },
      {
        name: '이동욱1',
        genre: '영화',
        title: '도깨비',
        photo: './assets/image/p_leedongwook.jpg'
      },
      {
        name: '유연석1',
        genre: '드라마',
        title: '멍뭉미',
        photo: './assets/image/p_yooyeonseok.jpg'
      },
      {
        name: '이동욱',
        genre: '드라마',
        title: '도깨비3',
        photo: './assets/image/p_leedongwook.jpg'
      },
      {
        name: '유연석',
        genre: '영화',
        title: '멍뭉미3',
        photo: './assets/image/p_yooyeonseok.jpg'
      },
      {
        name: '이동욱',
        genre: '영화',
        title: '도깨비4',
        photo: './assets/image/p_leedongwook.jpg'
      },
      {
        name: '유연석',
        genre: '영화',
        title: '멍뭉미4',
        photo: './assets/image/p_yooyeonseok.jpg'
      }
    ])

    const onSearch = computed(() => {
      return actorWorks.value.filter(
        (item) =>
          item.name.indexOf(props.keyword) > -1 ||
          item.genre.indexOf(props.keyword) > -1 ||
          item.title.indexOf(props.keyword) > -1
      )
    })

    return {
      actorWorks,
      onSearch
    }
  }
}
</script>

<template>
  <div class="actor__wrap">
    <ul>
      <li v-for="(item, index) in onSearch" :key="index">
        <a href="#">
          <img :src="item.photo" :alt="item.title" />
          <span>작품명 : {{ item.title }}</span>
          <span>출연배우 : {{ item.name }} </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.actor__wrap {
  margin: 50px 0;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 0 0 23%;
      margin: 20px 1%;
      a {
        display: block;
        img {
          width: 100%;
        }
        span {
          display: block;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        flex: 0 0 42%;
        margin: 20px 4%;
      }
    }
  }
}
</style>
