<template>
  <div>
    <pre><code>{{ meetup_ }}</code></pre>
    <meetup-form class="form meetup-form"
       @cancel="handleCancel"
       @submit="handleSubmit"
       :meetup="meetup"
       :submitButton="submitButton">
      <slot></slot>
    </meetup-form>
  </div>

</template>

<script>
import MeetupForm from '@/components/MeetupForm'
import deepClone from 'lodash.clonedeep'

export default {
  name: 'FormLayout',
  components: { MeetupForm },

  props: {
    meetupId: {
      type: [Number, String],
      required: true
    },
    meetup: {
      type: Object
    },
    submitButton: String
  },

  data () {
    return {
      meetup_: null
    }
  },

  methods: {
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

</style>
