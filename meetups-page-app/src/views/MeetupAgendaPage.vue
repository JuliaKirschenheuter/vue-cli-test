<template>
  <div v-if="meetup.agenda" class="meetup-agenda">
    <meetup-agenda-item
      v-for="agendaItem in meetup.agenda"
      :key="agendaItem.id"
      :agendaItem="agendaItem"
    ></meetup-agenda-item>
  </div>
</template>

<script>
import MeetupAgendaItem from '@/views/MeetupAgendaItem'

export default {
  name: 'MeetupAgendaPage',
  components: { MeetupAgendaItem },
  props: {
    meetup: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
