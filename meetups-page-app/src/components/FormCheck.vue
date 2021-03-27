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
      <label class="form-check__label">{{ option.text }}</label>
    </div>
  </div>
</template>

<script>
import { random } from 'nanoid'

export default {
  name: 'FormCheck',
  props: {
    options: {
      type: Array,
      required: true
    },
    selected: String
  },

  data () {
    return {
      radioGroupName: random(1)[0]
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
