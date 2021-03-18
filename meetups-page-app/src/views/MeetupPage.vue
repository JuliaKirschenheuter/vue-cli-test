<template>
  <div v-if="meetup">
    <div
      :style="getImgUrl ? `--bg-url: url('${getImgUrl}')` : `${getImgUrl}`"
      class="meetup-cover">
      <h1 class="meetup-cover__title" v-if="meetup.title">{{ meetup.title }}</h1>
    </div>
    <div class="container">
      <div class="buttons">
        <button type="button" class="button button_secondary">Участвовать</button>
        <button type="button" class="button button_secondary">Отменить участие</button>
        <router-link class="button button_secondary" :to="{ name: 'edit-meetup', params: { meetupId: meetup.id } }">Редактировать</router-link>
        <button type="button" class="button button_secondary">Удалить</button>
      </div>
      <div class="meetup">
        <div class="meetup__content">
          <content-tabs :tabs="tabs">
            <router-view :meetup="meetup" />
          </content-tabs>
        </div>
        <div class="meetup__aside">
          <meetup-info :meetup="meetup"></meetup-info>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import { fetchMeetup, getMeetupCoverLink } from '@/utils/data'
import MeetupInfo from '@/views/MeetupInfo'
import ContentTabs from '@/components/ContentTabs'

export default {
  name: 'MeetupPage',
  components: { ContentTabs, MeetupInfo },
  data () {
    return {
      meetup: null,
      tabs: [
        { to: { name: 'meetup-description' }, text: 'Описание' },
        { to: { name: 'meetup-agenda' }, text: 'Программа' }
      ]
    }
  },

  mounted () {
    fetchMeetup(this.$route.params.meetupId).then(meetup => this.setMeetup(meetup))
  },

  computed: {
    getImgUrl () {
      return getMeetupCoverLink(this.meetup)
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
