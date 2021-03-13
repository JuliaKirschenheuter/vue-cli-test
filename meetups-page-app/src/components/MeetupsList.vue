<template>
  <div class="meetups-list transition-list">
    <transition-group name="transition-list">
      <meetups-list-item
      v-for="meetup in meetups"
      :key="meetup.id"
      :meetup="meetup">
      </meetups-list-item>
    </transition-group>
  </div>
</template>

<script>
import MeetupsListItem from '@/components/MeetupsListItem'
export default {
  name: 'MeetupsList',
  components: { MeetupsListItem },
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
