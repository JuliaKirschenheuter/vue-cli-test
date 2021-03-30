<template>
  <div v-if="meetup">
    <div
      :style="getImgUrl ? `--bg-url: url('${getImgUrl}')` : `${getImgUrl}`"
      class="meetup-cover">
      <h1 class="meetup-cover__title" v-if="processedMeetup.title">{{ processedMeetup.title }}</h1>
    </div>
    <div class="container">
      <div class="buttons">
        <secondary-button >Участвовать</secondary-button>
        <secondary-button>Отменить участие</secondary-button>
        <router-link class="button button_secondary" :to="{ name: 'edit-meetup', params: { meetup: processedMeetup, meetupId: processedMeetup.id } }">Редактировать</router-link>
        <secondary-button>Удалить</secondary-button>
      </div>
      <div class="meetup">
        <div class="meetup__content">
          <content-tabs :tabs="tabs">
            <router-view :meetup="processedMeetup" />
          </content-tabs>
        </div>
        <div class="meetup__aside">
          <meetup-info :meetup="processedMeetup"></meetup-info>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import { fetchMeetup, getMeetupCoverLink } from '@/utils/data'
import MeetupInfo from '@/views/MeetupInfo'
import ContentTabs from '@/components/ContentTabs'
import SecondaryButton from '@/components/SecondaryButton'

export default {
  name: 'MeetupPage',
  components: { SecondaryButton, ContentTabs, MeetupInfo },
  data () {
    return {
      meetup: null,
      tabs: [
        { to: { name: 'meetup-description' }, text: 'Описание' },
        { to: { name: 'meetup-agenda' }, text: 'Программа' }
      ]
    }
  },

  beforeRouteEnter (to, from, next) {
    fetchMeetup(to.params.meetupId).then((meetup) => {
      next((vm) => vm.setMeetup(meetup))
    })
  },

  beforeRouteUpdate (to, from, next) {
    if (to.params.meetupId === from.params.meetupId) {
      next()
    } else {
      fetchMeetup(to.params.meetupId).then((meetup) => {
        this.setMeetup(meetup)
        next()
      })
    }
  },

  computed: {
    getImgUrl () {
      return getMeetupCoverLink(this.meetup)
    },
    processedMeetup () {
      return Object.assign({}, this.meetup, {
        date: new Date(this.meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      })
    }
  },

  methods: {
    setMeetup (meetup) {
      this.meetup = meetup
    }
  }
}
</script>

<style scoped>
.buttons {
  padding-top: 40px;
  margin: 0 auto;
}
.button_secondary {
  margin-right: 10px;
}
</style>
