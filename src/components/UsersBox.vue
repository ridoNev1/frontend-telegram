<template>
  <div class="user-box">
    <div class="user-data">
      <div class="box-title">
        <div>
          <h3 v-if="type !== 'register'">Login</h3>
          <div v-else>
            <router-link to="/login"><img src="../assets/back.png" alt="back"></router-link>
            <h3>Register</h3>
          </div>
        </div>
        <p v-if="type !== 'register'">Hi, Welcome back!</p>
        <form class="users-input">
          <div class="md-form" v-if="type === 'register'">
            <input type="text" id="form-name" class="form-control" v-model="username" required>
            <label for="form-name">Full Name</label>
          </div>
          <div class="md-form">
            <input type="email" id="form-email" class="form-control" v-model="userEmail" required>
            <label for="form-email">Email</label>
          </div>
          <div class="md-form">
            <input type="password" id="form-password" class="form-control" v-model="userPassword" required>
            <label for="form-password">Password</label>
          </div>
          <p style="text-align: right; color: #7E98DF;" class="mt-4 mb-4">Forgot password ?</p>
          <div>
            <button class="input-button" @click.prevent="login" v-if="type !== 'register'">Login</button>
            <button class="input-button" v-else @click.prevent="register">Register</button>
          </div>
        </form>
        <div class="login-with">
          <span></span>
          <p>Login With</p>
          <span></span>
        </div>
        <button class="input-button" style="color: #7E98DF; background-color: transparent; border: 2px solid #7E98DF;">Google</button>
        <div>
          <p class="mt-3" v-if="type !== 'register'">Don’t have an account?<router-link to="/register" style="color: #7E98DF;">Sign Up</router-link></p>
          <span v-else></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Swal from 'sweetalert2'

export default {
  name: 'UsersBox',
  props: ['type'],
  data () {
    return {
      userEmail: null,
      userPassword: null,
      username: null
    }
  },
  methods: {
    ...mapActions({
      onLogin: 'users/onLogin',
      onRegister: 'users/register'
    }),
    login () {
      const dataUsers = {
        email: this.userEmail,
        password: this.userPassword
      }
      this.onLogin(dataUsers).then(response => {
        if (response === "Cannot read property 'password' of undefined") {
          this.alertExist(response)
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('token')
          localStorage.removeItem('fullname')
          localStorage.removeItem('email')
          localStorage.removeItem('image')
          localStorage.removeItem('iduser')
        } else if (response === 'Incorrect password! Please try again') {
          this.alertExist(response)
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('token')
          localStorage.removeItem('fullname')
          localStorage.removeItem('email')
          localStorage.removeItem('image')
          localStorage.removeItem('iduser')
        } else {
          window.location = '/'
        }
      })
    },
    alertExist (result) {
      Swal.fire({
        icon: 'error',
        title: result,
        text: 'Please check your personal info or create a new one'
      })
    },
    register () {
      const dataRegister = {
        email: this.userEmail,
        password: this.userPassword,
        fullname: this.username
      }
      this.onRegister(dataRegister).then(result => {
        this.$swal(result)
        this.$router.push('/login')
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
@media screen and (max-width: 992px) {
  .user-data {
    width: 50%;
  }
}
@media screen and (max-width: 720px) {
  .user-data {
    width: 70%;
  }
}
@media screen and (max-width: 520px) {
  .user-data {
    width: 100%;
  }
}
</style>
