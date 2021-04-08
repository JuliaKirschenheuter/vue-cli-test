<template>
  <div v-if="meetup_">
    <form-layout title="Создать новый митап">
      <pre><code>{{ meetup_ }}</code></pre>
      <meetup-form :meetup="processedEmptyMeetup" :submitButton="submitButton" @cancel="handleCancel" @submit="handleSubmit"></meetup-form>
    </form-layout>
  </div>
</template>

<script>
import { buildEmptyMeetup } from '@/utils/data'
import FormLayout from '@/components/FormLayout'
import MeetupForm from '@/components/MeetupForm'
import deepClone from 'lodash.clonedeep'

export default {
  name: 'CreateNewMeetup',
  components: { MeetupForm, FormLayout },

  data () {
    return {
      meetup_: null,
      submitButton: 'Создать'
    }
  },

  mounted () {
    this.meetup_ = buildEmptyMeetup()
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
  },

  methods: {
    handleSubmit (meetupFromForm) {
      this.meetup_ = deepClone(meetupFromForm)
    },

    handleCancel () {
      this.$router.push({
        name: 'meetups-list'
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
