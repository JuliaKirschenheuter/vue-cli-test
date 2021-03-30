<template>
  <div class="container" v-if="meetup_">
    <h1>Редактировать: {{ meetup_.title }}</h1>
    <form-layout :meetup="meetup_" :meetup-id="meetupId_" :submitButton="submitButton"></form-layout>
  </div>
</template>

<script>
import FormLayout from '@/components/FormLayout'
import { fetchMeetup } from '@/utils/data'

export default {
  name: 'EditMeetup',
  components: { FormLayout },
  props: {
    meetupId: {
      type: [Number, String]
    },
    meetup: {
      type: Object
    }
  },

  data () {
    return {
      meetup_: null,
      submitButton: 'Сохранить',
      meetupId_: this.meetupId
    }
  },

  beforeRouteEnter (to, from, next) {
    if (to.params.meetup !== undefined) {
      next((vm) => vm.setMeetup(to.params.meetup))
    } else {
      fetchMeetup(to.params.meetupId).then((meetup) => {
        next((vm) => vm.setMeetup(meetup))
      })
    }
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

  methods: {
    setMeetup (meetup) {
      this.meetup_ = meetup
    }
  }

}
</script>

<style scoped>
.container {
  margin-top: 50px;
}

</style>
