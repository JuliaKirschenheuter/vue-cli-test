<template>
  <header class="header">
    <div>
      <h1>
        <router-link :to="{name: 'index'}">
          <img src="@/assets/logo.svg" alt="Meetups"/>
        </router-link>
      </h1>
    </div>
    <nav>
      <router-link :to="{name: 'meetups-list'}" v-if="$route.meta.showBackToList"> &larr; Вернуться к списку
      </router-link>
      <router-link :to="{ name: 'index', query: { participation: 'attending' } }">Мои митапы</router-link>
      <router-link :to="{ name: 'index', query: { participation: 'organizing' } }">Организуемые митапы
      </router-link>
      <router-link :to="{ name: 'create-meetup'}">Создать</router-link>
      <router-link :to="{name: 'login'}">Войти</router-link>
      <router-link :to="{name: 'register'}">Зарегистрироваться</router-link>
      <a href="#">Выйти</a>
    </nav>
  </header>
</template>

<script>

export default {
  name: 'TheHeader'
}
</script>

<style scoped>

</style>
