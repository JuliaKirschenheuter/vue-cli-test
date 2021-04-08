<template>
  <div class="wrapper bg-grey">
    <the-header></the-header>
    <main class="main">
      <slot></slot>
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
export default {
  name: 'BaseLayout',
  components: { TheFooter, TheHeader }
}
</script>

<style scoped>
.main { flex: 1 0 auto }
</style>
