<template>
  <div class="meetup-agenda__item">
    <div class="meetup-agenda__item-col">
      <app-icon v-bind:icon="processedAgenda.defaultIcon" class="icon"/>
    </div>
    <div class="meetup-agenda__item-col" v-if="agendaItem.startsAt || agendaItem.endsAt">{{agendaItem.startsAt}} - {{agendaItem.endsAt}}</div>
    <div class="meetup-agenda__item-col">

      <h5 class="meetup-agenda__title" v-if="agendaItem.title"> {{agendaItem.title}}</h5>
      <h5 class="meetup-agenda__title" v-else>{{processedAgenda.defaultTitle}}</h5>

      <p v-if="agendaItem.type === 'talk' " >
        <span v-if="agendaItem.speaker">{{ agendaItem.speaker }}</span>
        <span v-if="agendaItem.speaker" class="meetup-agenda__dot"></span>
        <span class="meetup-agenda__lang" v-if="agendaItem.language">{{agendaItem.language}}</span>
      </p>

      <p v-if="agendaItem.description">{{agendaItem.description}}</p>
    </div>
  </div>
</template>

<script>
import { agendaItemIcons, getAgendaItemTypes } from '@/utils/data'
import AppIcon from '@/components/AppIcon'

export default {
  name: 'MeetupAgendaItem',
  components: { AppIcon },
  props: {
    agendaItem: {
      required: true,
      type: Object
    }
  },
  computed: {
    processedAgenda () {
      if (this.agendaItem) {
        return Object.assign({}, this.agendaItem, {
          defaultTitle: getAgendaItemTypes()[this.agendaItem.type],
          defaultIcon: agendaItemIcons[this.agendaItem.type]
        })
      }
      return null
    }
  }
}
</script>

<style scoped>

</style>
