<template>
  <base-button
    class="button_danger"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </base-button>
</template>

<script>
import BaseButton from '@/components/BaseButton'
export default {
  name: 'DangerButton',
  components: { BaseButton }
}
</script>

<style scoped>

.button.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button.button_danger:hover {
  border-color: var(--red-light);
}
</style>
