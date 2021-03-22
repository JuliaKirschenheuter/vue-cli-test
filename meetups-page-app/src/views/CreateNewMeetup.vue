<template>
  <div class="container" v-if="meetup_">
    <h1>Создать новый митап</h1>
    <pre><code>{{ meetup_ }}</code></pre>
    <meetup-form @cancel="handleCancel" @submit="handleSubmit" :meetup="meetup_" :submitButton="submitButton"></meetup-form>
  </div>
</template>

<script>
import MeetupForm from '@/components/MeetupForm'
import deepClone from 'lodash.clonedeep'

export default {
  name: 'CreateNewMeetup',
  components: { MeetupForm },
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      meetup_: null,
      submitButton: 'Создать'
    }
  },

  mounted () {
    this.meetup_ = this.meetup
  },

  methods: {
    handleCancel () {
      this.$router.push({
        name: 'meetups-list'
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
