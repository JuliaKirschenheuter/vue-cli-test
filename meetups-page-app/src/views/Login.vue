<template>
  <form class="form" @submit.prevent="doLogin">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" v-model="email" placeholder="demo@email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" v-model="password" placeholder="password" class="form-control" />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">Войти</button>
    </div>
    <div class="form__append">Нет аккаунта? <router-link to="/register" class="link">Зарегистрируйтесь</router-link></div>
  </form>
</template>

<script>
import { login } from '@/utils/data'

export default {
  name: 'Login',

  data () {
    return {
      email: null,
      password: null
    }
  },

  methods: {
    doLogin () {
      if (this.email === '' || this.email == null) {
        alert('Требуется ввести Email')
      } else if (this.password === '' || this.password == null) {
        alert('Требуется ввести пароль')
      } else {
        login(this.email, this.password).then((res) => {
          if (res.fullname) {
            alert(res.fullname)
          } else {
            alert(res.message)
          }
        })
      }
    }
  }
}
</script>

<style scoped>

.form {
  max-width: 500px;
  padding-top: 50px;
  width: 100%;
  margin: 0 auto;
}

</style>
