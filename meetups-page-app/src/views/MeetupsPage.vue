<template>
  <div class="container">
    <meetups-view :meetups="processedMeetups" :filter.sync="filter" ></meetups-view>
  </div>
</template>

<script>

import { API_URL, fetchMeetups } from '@/utils/data'
import MeetupsView from '@/components/MeetupsView'
export default {
  name: 'MeetupsPage',
  components: { MeetupsView },

  data () {
    return {
      meetups: [],
      filter: {
        view: 'list',
        date: 'all',
        participation: 'all',
        search: ''
      }
    }
  },

  async mounted () {
    this.meetups = await this.fetchMeetups()
  },

  computed: {
    processedMeetups () {
      return this.meetups.map(meetup => ({
        ...meetup,
        cover: meetup.imageId
          ? `${API_URL}/images/${meetup.imageId}` : undefined,
        date: new Date(meetup.date),
        localDate: new Date(meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }))
    },

    routeQuery () {
      return this.$route.query
    }

  },

  watch: {
    'filter.date': function () {
      this.routerReplace()
    },
    'filter.participation': function () {
      this.routerReplace()
    },
    'filter.search': function () {
      this.routerReplace()
    },
    'filter.view': function () {
      this.routerReplace()
    },
    routeQuery: {
      immediate: true,
      handler: function () {
        this.filter.date = this.$route.query.date ? this.$route.query.date : 'all'
        this.filter.participation = this.$route.query.participation ? this.$route.query.participation : 'all'
        this.filter.view = this.$route.query.view ? this.$route.query.view : 'list'
        this.filter.search = this.$route.query.search ? this.$route.query.search : ''
      }
    }
  },

  methods: {
    async fetchMeetups () {
      return fetchMeetups()
    },

    routerReplace () {
      this.$router.replace({
        query: {
          participation: (this.filter.participation === '') ? undefined : this.filter.participation,
          date: (this.filter.date === '') ? undefined : this.filter.date,
          view: (this.filter.view === '') ? undefined : this.filter.view,
          search: (this.filter.search === '') ? undefined : this.filter.search
        }
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
