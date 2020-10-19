import axios from 'axios'
import { url } from '../../helpers/env'

const actions = {
  resetNotif: (context, payload) => {
    return new Promise((resolve, reject) => {
      axios.patch(`${url}/friends/updatenotif`, {
        id_users: payload.sender,
        id_friends: payload.receiver
      }).then(response => {
        resolve(response)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}
