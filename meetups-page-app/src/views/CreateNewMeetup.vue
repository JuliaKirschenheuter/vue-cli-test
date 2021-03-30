<template>
  <div class="container" v-if="meetup_">
    <h1>Создать новый митап</h1>
    <form-layout :meetup="meetup_" :meetup-id="meetupId_" :submitButton="submitButton"></form-layout>
  </div>
</template>

<script>
import { buildEmptyMeetup } from '@/utils/data'
import FormLayout from '@/components/FormLayout'

export default {
  name: 'CreateNewMeetup',
  components: { FormLayout },

  data () {
    return {
      meetup_: null,
      submitButton: 'Создать',
      meetupId_: null
    }
  },

  mounted () {
    const emptyMeetup = buildEmptyMeetup()
    this.meetup_ = emptyMeetup
    this.meetupId_ = emptyMeetup.id
  }

}
</script>

<style scoped>
.container {
  margin-top: 50px;
}

</style>
