<template>
  <div class="meetups-list transition-list">
    <fade-transition-group name="transition-list">
      <meetups-list-item
      v-for="meetup in meetups"
      :key="meetup.id"
      :meetup="meetup">
      </meetups-list-item>
    </fade-transition-group>
  </div>
</template>

<script>
import MeetupsListItem from '@/components/MeetupsListItem'
import FadeTransitionGroup from '@/components/FadeTransitionGroup'
export default {
  name: 'MeetupsList',
  components: { FadeTransitionGroup, MeetupsListItem },
  props: {
    meetups: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
