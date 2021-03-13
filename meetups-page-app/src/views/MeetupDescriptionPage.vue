<template>
<div v-if="meetup.description">
  <p class="meetup-description">{{meetup.description}}</p>
</div>
</template>

<script>
export default {
  name: 'MeetupDescriptionPage',
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
