<template>
  <div class="container">
    <h1>Редактировать: {{ meetup.title }}</h1>
    <pre><code>{{ meetup }}</code></pre>
    <meetup-form :meetup="meetup"></meetup-form>
  </div>
</template>

<script>
import MeetupForm from '@/components/MeetupForm'

export default {
  name: 'EditMeetup',
  components: { MeetupForm },
  props: {
    meetup: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 50px;
}

</style>
