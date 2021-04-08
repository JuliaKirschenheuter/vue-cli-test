<template>
  <div v-if="meetup_">
    <form-layout :title="meetup_.title" >
      <pre><code>{{ meetup_ }}</code></pre>
      <meetup-form :meetup="meetup_" :submitButton="submitButton" @cancel="handleCancel" @submit="handleSubmit"></meetup-form>
    </form-layout>
  </div>
</template>

<script>
import FormLayout from '@/components/FormLayout'
import { fetchMeetup } from '@/utils/data'
import MeetupForm from '@/components/MeetupForm'
import deepClone from 'lodash.clonedeep'

export default {
  name: 'EditMeetup',
  components: { MeetupForm, FormLayout },
  props: {
    meetup: {
      type: Object
    }
  },

  data () {
    return {
      meetup_: null,
      submitButton: 'Сохранить'
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
    },

    handleSubmit (meetupFromForm) {
      this.meetup_ = deepClone(meetupFromForm)
    },

    handleCancel () {
      this.$router.push({
        name: 'meetup-page',
        params: {
          meetupId: this.$route.params.meetupId
        }
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
