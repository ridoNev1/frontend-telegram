import Vue from 'vue'
import Vuex from 'vuex'
import users from './user'
import friends from './friends'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    friends
  }
})
