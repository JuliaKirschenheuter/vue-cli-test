<template>
  <div class="container" v-if="meetup_">
    <h1>Редактировать: {{ meetup_.title }}</h1>
    <pre><code>{{ meetup_ }}</code></pre>
    <meetup-form @cancel="handleCancel" @submit="handleSubmit" :meetup="meetup_" :submitButton="submitButton"></meetup-form>
  </div>
</template>

<script>
import MeetupForm from '@/components/MeetupForm'
import { fetchMeetup } from '@/utils/data'
import deepClone from 'lodash.clonedeep'

export default {
  name: 'EditMeetup',
  components: { MeetupForm },
  props: {
    meetupId: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      meetup_: null,
      submitButton: 'Сохранить'
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

  methods: {
    setMeetup (meetup) {
      this.meetup_ = meetup
    },
    handleCancel () {
      this.$router.push({
        name: 'meetup-page',
        params: {
          meetupId: this.$route.params.meetupId
        }
      })
    },
    handleSubmit (meetupFromForm) {
      this.meetup_ = deepClone(meetupFromForm)
    }
  }

}
</script>

<style scoped>
.container {
  margin-top: 50px;
}

</style>
