import axios from 'axios'
import { url } from '../../helpers/env'

const state = () => {
  return {
    token: localStorage.getItem('token') || null,
    detailUsers: []
  }
}

const getters = {
  isLogin: (state) => {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  },
  getDetailUsers: (state) => {
    return state.detailUsers
  }
}

const mutations = {
  SET_DETAIL_USERS: (state, payload) => {
    state.detailUsers = payload
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
        localStorage.setItem('iduser', result.data.data.iduser)
        localStorage.setItem('email', payload.email)
        // console.log(result.data.data)
      }).catch(err => {
        console.log(err)
      })
    })
  },
  getDetailUser: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/users/getdetail/${payload}`).then(result => {
        context.commit('SET_DETAIL_USERS', result.data.data[0])
      }).catch(err => {
        reject(err)
      })
    })
  },
  updateUsers: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.patch(`${url}/users/updatedata/${payload.id}`, {
        phone: payload.phone,
        bio: payload.bio,
        fullname: payload.fullname
      }).then(result => {
        resolve(result.data.message)
      }).catch(err => {
        reject(err)
      })
    })
  },
  updateImage: (context, payload) => {
    return new Promise((resolve, reject) => {
      const fd = new FormData()
      fd.append('image', payload.image)
      axios.patch(`${url}/users/updateimage/${payload.iduser}`, fd).then(result => {
        resolve(result.data.message)
        // console.log(result.data.message)
      }).catch(err => {
        console.log(err)
      })
    })
  },
  register: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/users/register`, {
        fullname: payload.fullname,
        email: payload.email,
        password: payload.password
      }).then(result => {
        resolve(result.data.message)
      }).catch(err => {
        console.log(err)
      })
    })
  },
  getAllUser: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/users/getallusers?name=${payload}`).then(result => {
        resolve(result.data.data)
      }).catch(err => {
        reject(new Error(err))
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
