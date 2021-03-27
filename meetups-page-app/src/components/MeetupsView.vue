<template>
  <div>
    <div class="filters-panel">
      <div class="filters-panel__col">
        <form-check :options="dateFilterOptions" v-model="filter_.date"></form-check>
      </div>
      <div class="filters-panel__col">
        <div class="form-group form-group_inline">
          <div class="input-group input-group_icon input-group_icon-left">
            <app-icon icon="search"/>
            <input
              id="filters-panel__search"
              class="form-control form-control_rounded form-control_sm"
              type="text"
              placeholder="Поиск"
              v-model="filter_.search"
            />
          </div>
        </div>
        <div class="form-group form-group_inline">
          <page-tabs
            :selected.sync="filter_.view"
          ></page-tabs>
        </div>
      </div>
    </div>

    <fade-transition
      v-if="filteredMeetups && filteredMeetups.length"
      name="fade"
      mode="out-in"
    >
      <meetups-list
        v-if="filter_.view === '' || filter_.view === 'list'"
        :meetups="filteredMeetups"
        key="list"
      ></meetups-list>
      <meetups-calendar
        v-else-if="filter_.view === 'calendar'"
        :meetups="filteredMeetups"
        key="calendar"
      ></meetups-calendar>
    </fade-transition>
    <app-empty v-else>Митапов по заданным условиям не найдено...</app-empty>

  </div>

</template>

<script>
import MeetupsList from '@/components/MeetupsList'
import FadeTransition from '@/components/FadeTransition'
import MeetupsCalendar from '@/components/MeetupsCalendar'
import AppEmpty from '@/components/AppEmpty'
import FormCheck from '@/components/FormCheck'
import AppIcon from '@/components/AppIcon'
import PageTabs from '@/components/PageTabs'

export default {
  name: 'MeetupsView',
  components: { PageTabs, AppIcon, FormCheck, AppEmpty, MeetupsCalendar, FadeTransition, MeetupsList },

  props: {
    meetups: Array,
    filter: {
      type: Object
    }
  },

  watch: {
    filter_: {
      deep: true,
      handler (newValue) {
        this.$emit('update:filter', newValue)
      }
    },
    filter: {
      deep: true,
      handler (newValue) {
        this.filter_ = newValue
      }
    }
  },

  data () {
    return {
      dateFilterOptions: [
        { text: 'Все', value: 'all' },
        { text: 'Прошедшие', value: 'past' },
        { text: 'Ожидаемые', value: 'future' }
      ],
      filter_: {
        ...this.filter
      }
    }
  },

  computed: {
    filteredMeetups () {
      let filteredMeetups = this.meetups

      if (this.filter_.date === 'past') {
        filteredMeetups = filteredMeetups.filter(
          (meetup) => new Date(meetup.date) <= new Date()
        )
      } else if (this.filter_.date === 'future') {
        filteredMeetups = filteredMeetups.filter(
          (meetup) => new Date(meetup.date) > new Date()
        )
      }

      if (this.filter_.participation === 'organizing') {
        filteredMeetups = filteredMeetups.filter((meetup) => meetup.organizing)
      } else if (this.filter_.participation === 'attending') {
        filteredMeetups = filteredMeetups.filter((meetup) => meetup.attending)
      }

      if (this.filter_.search) {
        const concatMeetupText = (meetup) =>
          [meetup.title, meetup.description, meetup.place, meetup.organizer]
            .join(' ')
            .toLowerCase()
        filteredMeetups = filteredMeetups.filter((meetup) =>
          concatMeetupText(meetup).includes(this.filter_.search.toLowerCase())
        )
      }
      return filteredMeetups
    }
  }
}
</script>

<style scoped>

</style>
