import axios from 'axios'
import { url } from '../../helpers/env'

const state = () => {
  return {
    token: localStorage.getItem('token') || null
  }
}

const getters = {
  isLogin: (state) => {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  }
}

const actions = {
  onLogin: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/users/login`, {
        email: payload.email,
        password: payload.password
      }).then(result => {
        resolve(result.data.message)
        localStorage.setItem('refreshToken', result.data.data.refreshToken)
        localStorage.setItem('token', result.data.data.token)
        localStorage.setItem('fullname', result.data.data.fullname)
        localStorage.setItem('image', result.data.data.image)
        localStorage.setItem('email', payload.email)
        // console.log(result.data.data)
      }).catch(err => {
        console.log(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
}
