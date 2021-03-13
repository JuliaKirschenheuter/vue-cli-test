<template>
  <ul class="info-list">
    <li>
      <app-icon icon="user" class="icon info-list__icon"/>
      {{ meetup.organizer }}
    </li>
    <li>
      <app-icon icon="map" class="icon info-list__icon"/>
      {{meetup.place}}
    </li>
    <li>
      <app-icon icon="cal-lg" class="icon info-list__icon"/>
      <time datetime="2020-01-01">{{processedMeetup.date}}</time>
    </li>
  </ul>
</template>

<script>
import AppIcon from '@/components/AppIcon'
export default {
  name: 'MeetupInfo',
  components: { AppIcon },
  props: {
    meetup: {
      type: Object,
      required: true
    }
  },

  computed: {
    processedMeetup () {
      return Object.assign({}, this.meetup, {
        date: new Date(this.meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      })
    }
  }

}
</script>

<style scoped>

</style>
