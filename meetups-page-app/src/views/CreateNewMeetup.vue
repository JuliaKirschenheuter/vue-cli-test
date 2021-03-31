<template>
  <div class="container" v-if="meetup_">
    <h1>Создать новый митап</h1>
    <form-layout :meetup="processedEmptyMeetup" :meetup-id="meetupId_" :submitButton="submitButton"></form-layout>
  </div>
</template>

<script>
import { buildEmptyMeetup } from '@/utils/data'
import FormLayout from '@/components/FormLayout'

export default {
  name: 'CreateNewMeetup',
  components: { FormLayout },

  data () {
    return {
      meetup_: null,
      submitButton: 'Создать',
      meetupId_: null
    }
  },

  mounted () {
    this.meetup_ = buildEmptyMeetup()
    this.meetupId_ = this.meetup_.id
  },

  computed: {
    processedEmptyMeetup () {
      return Object.assign({}, this.meetup_, {
        localDate: new Date(this.meetup_.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
}

</style>
