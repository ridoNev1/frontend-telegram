<template>
  <div class="add-friends">
    <div class="friends-box">
      <div style="background-color: #7E98DF;">
        <button class="button-close" @click="$emit('closeaddfriends')">x</button>
      </div>
      <div class="form-search">
        <input type="text" class="form-control" placeholder="search.." @keyup="searchFriends" v-model="search">
      </div>
      <div>
        <div class="noresult" v-if="!userData">
          <p>no result</p>
        </div>
        <div class="user-list" v-else v-for="(item, index) in userData" :key="index">
          <div class="profile-image" :style="`background-image: url(http://localhost:3008/${item.image});`">
            <span></span>
          </div>
          <p>{{item.fullname}}</p>
          <b-icon icon="person-plus-fill" scale="1.3" style="cursor: pointer;" @click="addFriendsBtn(item.iduser)"></b-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AddFriends',
  data () {
    return {
      search: '',
      userData: null,
      iduser: localStorage.getItem('iduser')

    }
  },
  methods: {
    ...mapActions({
      getUser: 'users/getAllUser',
      inserFriends: 'friends/inserFriend'
    }),
    searchFriends () {
      this.getUser(this.search).then(result => {
        this.userData = result
      })
    },
    addFriendsBtn (value) {
      const dataInsert = {
        iduser: this.iduser,
        idfrieds: value
      }

      this.inserFriends(dataInsert).then(result => {
        this.$swal(result)
        window.location = '/'
      })
    }
  }
}
</script>

<style>
.add-friends {
  background-color: rgba(5, 5, 5, 0.3);
}

.friends-box {
  width: 360px;
  height: 80vh;
  background-color: white;
  overflow: scroll;
}

.friends-box::-webkit-scrollbar {
  width: 3px;
  height: 0;
}
.friends-box::-webkit-scrollbar-track {
  background-color: darkgray;
}
.friends-box::-webkit-scrollbar-thumb {
  background-color: grey;
}

.form-search {
  background-color: #7E98DF;
  padding: 20px;
}
.user-list {
  padding: 15px;
  display: grid;
  grid-template-columns: 2fr 6fr 1fr;
  align-items: center;
  border-bottom: 1px solid rgb(219, 219, 219);
}
.profile-image {
  width: 55px;
  height: 55px;
  background-size: cover;
  border-radius: 15px;
}
.button-close {
  width: 30px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 15px;
  margin: 5px;
  background-color: transparent;
  color: white;
}
.noresult {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
