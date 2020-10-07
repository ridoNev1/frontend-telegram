<template>
  <div class="user-box">
    <div class="user-data">
      <div class="box-title">
        <h3>Login</h3>
        <p>Hi, Welcome back!</p>
        <form class="users-input" @submit.prevent="login">
          <div class="md-form">
            <input type="email" id="form-email" class="form-control" v-model="userEmail" required>
            <label for="form-email">Email</label>
          </div>
          <div class="md-form">
            <input type="password" id="form-password" class="form-control" v-model="userPassword" required>
            <label for="form-password">Password</label>
          </div>
          <p style="text-align: right; color: #7E98DF;" class="mt-4 mb-4">Forgot password ?</p>
          <button type="submit" class="input-button">Login</button>
        </form>
        <div class="login-with">
          <span></span>
          <p>Login With</p>
          <span></span>
        </div>
        <button class="input-button" style="color: #7E98DF; background-color: transparent; border: 2px solid #7E98DF;">Google</button>
        <p class="mt-3">Don’t have an account? Sign Up</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'UsersBox',
  data () {
    return {
      userEmail: null,
      userPassword: null
    }
  },
  methods: {
    ...mapActions({
      onLogin: 'users/onLogin'
    }),
    login () {
      const dataUsers = {
        email: this.userEmail,
        password: this.userPassword
      }
      this.onLogin(dataUsers).then(response => {
        if (response === "Cannot read property 'password' of undefined") {
          this.alertExist()
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('token')
          localStorage.removeItem('fullname')
          localStorage.removeItem('email')
          localStorage.removeItem('image')
        } else {
          window.location = '/'
        }
      })
    },
    alertExist () {
      Swal.fire({
        icon: 'error',
        title: 'Username Doesnt Exist!',
        text: 'Please check your personal info or create a new one'
      })
    }
  }
}
</script>

<style scoped>
.user-box {
  width: 100%;
  height: 100vh;
  background-color: #e5e5e5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-data {
  width: 35%;
  background-color: #fff;
  border-radius: 15px;
  padding: 40px;
}
.box-title h3 {
  color: #7E98DF;
  text-align: center;
}

.input-button {
  width: 100%;
  outline: none;
  background-color: #7E98DF;
  border-radius: 70px;
  padding: 15px 0;
  border: none;
  color: white;
  font-weight: bold;
}
.login-with {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-with p {
  margin-top: 15px;
  color: rgb(187, 184, 184);
}
.login-with span {
  height: 2px;
  width: 30%;
  background-color: rgb(202, 201, 201);
  display: flex;
}
</style>
