<template>
  <div id="app">
    <div class="wrapper bg-grey">
      <header class="header">
        <div>
          <h1>
            <router-link :to="{name: 'index'}">
              <img src="@/assets/logo.svg" alt="Meetups" />
            </router-link>
          </h1>
        </div>
        <nav>
          <router-link :to="{name: 'meetups-list'}" v-if="$route.meta.showBackToList"> &larr; Вернуться к списку</router-link>
          <router-link :to="{ name: 'meetups', query: { participation: 'attending' } }">Мои митапы</router-link>
          <router-link :to="{ name: 'meetups', query: { participation: 'organizing' } }">Организуемые митапы</router-link>
          <router-link :to="{name: 'create-meetup'}">Создать митап</router-link>
          <router-link :to="{name: 'login'}">Войти</router-link>
          <router-link :to="{name: 'register'}">Зарегистрироваться</router-link>
          <a href="#">Выйти</a>
        </nav>
      </header>
      <main class="main">
        <router-view></router-view>
      </main>
      <footer class="footer">
        <div class="container">
          2020. learn JS
        </div>
      </footer>
    </div>
  </div>
</template>

<style>

</style>
