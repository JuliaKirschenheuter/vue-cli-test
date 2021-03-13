<template>
<div class="form-check">
  <div v-for="option in options" :key="option.value" class="form-check__group">
    <input
      class="form-check__input"
      type="radio"
      :name="radioGroupName"
      :value="option.value"
      :checked="option.value === selected"
      @input="$emit('change', option.value)"
    />
  </div>
</div>
</template>

<script>
export default {
  name: 'FormCheck',
  props: {
    options: {
      type: Array,
      required: true
    },
    selected: String
  },

  // todo: no Math.random()
  data () {
    return {
      radioGroupName: Math.random()
    }
  },

  // todo: no prop mutation
  model: {
    prop: 'selected',
    event: 'change'
  }

}
</script>

<style scoped>

</style>
