<template>
  <div class="home">
    <div class="chat-page">
      <div class="friend-content">
        <div class="navbar-friend">
          <h3>Telegram</h3>
          <div class="hamburger-menu mt-2">
            <input class="hamburger-animation" type="checkbox" @click="navToggle"/>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="aplication-menu">
            <p @click="settingApp"><img src="../assets/Settings.png" alt="setting" class="mr-3"> Settings</p>
            <p><img src="../assets/Contacts.png" alt="Contact" class="mr-3"> Contacts</p>
            <p><img src="../assets/Vector.png" alt="Cals" style="margin-left: -5px; margin-right: 11px;"> Calls</p>
            <p><img src="../assets/bookmark.png" alt="Save" style="margin-left: 2px; margin-right: 19px;"> Save Message</p>
            <p @click="showAddFriends"><img src="../assets/Invite friends.png" alt="invite" style="margin-left: -10px; margin-right: 19px;"> Invite Friends</p>
            <p><img src="../assets/FAQ.png" alt="faq" style="margin-left: -2px; margin-right: 18px;"> Telegram FAQ</p>
          </div>
        </div>
        <div class="chat-search">
          <form class="search-message">
            <button><b-icon icon="search"></b-icon></button>
            <input type="text" placeholder="Type your message...">
          </form>
          <img src="../assets/Plus.png" alt="plus">
        </div>
        <div class="message-status">
          <p>All</p>
          <p>Important</p>
          <p>Unread</p>
          <p>Read</p>
          <p class="text-white">.</p>
        </div>
        <div class="chat-list">
          <div @click="showChat1(item, index)" v-for="(item, index) in listFriends" :key="index">
            <div v-if="item.email === senderData">
              <span></span>
            </div>
            <div class="list-chatbox" v-else>
              <div class="profile-image1" :style="`background-image: url(http://localhost:3008/${item.image});`">
                <div>
                  <span v-if="item.statuson === 'Offline'"></span>
                  <img src="../assets/Online.png" alt="onlineBar" v-else>
                </div>
              </div>
              <div class="name-chats">
                <p>{{item.fullname}}</p>
                <p class="chats-preview">{{item.newchats}}</p>
              </div>
              <div class="time-notif">
                <p>00.00</p>
                <div class="msg-notif">
                  <span v-if="item.msg_notif === 0"></span>
                  <p class="msg-notifbox" v-else>{{item.msg_notif}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-content">
        <div class="h2 mb-0" v-if="chatMessage === 0">
          <b-icon icon="exclamation-circle-fill" variant="danger"></b-icon>
          <b-icon icon="exclamation-circle-fill" variant="warning"></b-icon>
        </div>
        <div v-else class="chat-thereis">
          <div class="chat-navbar bg-white">
            <img src="../assets/back.png" alt="back" @click="showChatRes" style="cursor: pointer;">
            <div class="profile-pict" :style="`background-image: url(http://localhost:3008/${receiverImage}); cursor: pointer;`" @click="showReceiver">
              <img src="../assets/Online.png" alt="onlineBar">
            </div>
            <div class="name-chats">
              <p class="mt-3">{{receiverName}}</p>
              <div class="receiver-status">
                <p class="text-secondary" v-if="listFriends[receiverIndex].statuson === 'Offline'">{{listFriends[receiverIndex].statuson}}</p>
                <p style="color: #7E98DF;" v-else>{{listFriends[receiverIndex].statuson}}</p>
              </div>
            </div>
          </div>
          <div class="chat-colunm">
            <div class="mt-3" v-for="(item, index2) in historyChat" :key="'a' + index2">
              <div class="chat-box" v-if="item.sender !== senderData">
                <div class="profile-pict" :style="`background-image: url(http://localhost:3008/${receiverImage});`">
                  <div>
                    <span v-if="listFriends[receiverIndex].statuson === 'Offline'"></span>
                    <img src="../assets/Online.png" alt="onlineBar" v-else>
                  </div>
                </div>
                <p>{{item.message}}</p>
              </div>
              <div class="chat-box2" v-else>
                <p>{{item.message}}</p>
                <div class="profile-pict" :style="`background-image: url(http://localhost:3008/${senderImage});`">
                  <img src="../assets/Online.png" alt="onlineBar">
                </div>
              </div>
            </div>
            <div class="mt-3" v-for="(item, index) in privateChat" :key="index">
              <div class="chat-box" v-if="item.sender !== senderData">
                <div class="profile-pict" :style="`background-image: url(http://localhost:3008/${receiverImage});`">
                  <img src="../assets/Online.png" alt="onlineBar">
                </div>
                <p>{{item.msg}}</p>
              </div>
              <div class="chat-box2" v-else>
                <p>{{item.msg}}</p>
                <div class="profile-pict" :style="`background-image: url(http://localhost:3008/${senderImage});`">
                  <img src="../assets/Online.png" alt="onlineBar">
                </div>
              </div>
            </div>
          </div>
          <div class="chat-input bg-white">
            <form class="chat" @submit.prevent="sendChat">
              <input type="text" placeholder="Type your message.." v-model="textChat">
            </form>
            <div class="chat-button">
              <img src="../assets/Plus.png" alt="plus">
              <img src="../assets/emoji.png" alt="emoji">
              <img src="../assets/square.png" alt="square">
            </div>
          </div>
        </div>
      </div>
      <EditProfile class="edit-profile-page" @settingtoggle="settingApp" @setdc="disconnect"/>
      <ReceiverData  class="friend-slieder" @sideright="showReceiver"/>
      <AddFriends class="add-friends-page" @closeaddfriends="showAddFriends"/>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { url } from '../helpers/env'
import EditProfile from '../components/EditProfile'
import { mapActions, mapGetters } from 'vuex'
import ReceiverData from '../components/ReceiverData'
import AddFriends from '../components/AddFriends'

export default {
  name: 'Home',
  components: {
    EditProfile,
    ReceiverData,
    AddFriends
  },
  data () {
    return {
      chatMessage: 0,
      roomChat: [],
      socket: io(`${url}`),
      senderData: localStorage.getItem('email'),
      receiverData: null,
      textChat: '',
      listUser: null,
      receiverName: null,
      privateChat: [],
      senderImage: localStorage.getItem('image'),
      receiverImage: null,
      historyChat: [],
      iduser: localStorage.getItem('iduser'),
      listFriends: [],
      // notif materials
      msgNotif: 1,
      receiverId: null,
      receiverIndex: null,
      // receiver status
      receiverStatus: null

    }
  },
  computed: {
    ...mapGetters({
      usersDetail: 'users/getDetailUsers'
    })
  },
  methods: {
    showChat1 (receiver, index) {
      this.chatMessage = 1
      this.receiverData = receiver.email
      this.receiverName = receiver.fullname
      this.receiverImage = receiver.image
      this.receiverStatus = receiver.statuson
      this.privateChat = []
      this.roomChat = []
      this.receiverId = receiver.iduser
      this.setPrivateChat()
      this.socket.emit('get-history-message', {
        sender: this.senderData,
        receiver: this.receiverData
      })
      this.historyMessage()
      localStorage.setItem('image', this.usersDetail.image)
      this.receiverIndex = index
      this.listFriends[this.receiverIndex].msg_notif = 0

      // reset notif
      const notifData = {
        sender: this.iduser,
        receiver: this.receiverId
      }
      this.updateNotification(notifData)
      const listFriend = document.querySelector('.friend-content')
      listFriend.classList.toggle('friend-content-toggle')
    },
    showChatRes () {
      const listFriend = document.querySelector('.friend-content')
      listFriend.classList.toggle('friend-content-toggle')
    },
    sendChat () {
      const message = {
        sender: this.senderData,
        msg: this.textChat,
        receiver: this.receiverData,
        type: 1
      }
      this.roomChat = [...this.roomChat, message]

      this.socket.emit('send-message', {
        username: this.senderData,
        room: this.receiverData,
        textChat: this.textChat,
        type: 1
      })
      this.setPrivateChat()
      // notif on dev
      const notif = {
        idsender: this.iduser,
        idreceiver: this.receiverId,
        newmessage: this.textChat
      }
      this.socket.emit('set-msgnotif', notif)
      this.listFriends[this.receiverIndex].newchats = this.textChat
      this.textChat = ''
      // auto scroll
      const chatBox = document.querySelector('.chat-colunm')
      setTimeout(() => {
        chatBox.scrollTop = chatBox.scrollHeight
      }, 1)
    },
    setPrivateChat () {
      const privateChats = this.roomChat.filter(e => {
        if (this.receiverData === null) {
          return e.sender === this.receiverData || e.sender === this.senderData
        } else {
          return e.receiver === this.receiverData || e.sender === this.receiverData
        }
      })
      this.privateChat = privateChats
    },
    navToggle () {
      const menu = document.querySelector('.aplication-menu')
      menu.classList.toggle('aplication-menu-toggle')
    },
    historyMessage () {
      this.socket.on('history-message', (payload) => {
        this.historyChat = payload
        const chatBox = document.querySelector('.chat-colunm')
        setTimeout(() => {
          chatBox.scrollTop = chatBox.scrollHeight
        }, 1)
      })
    },
    settingApp () {
      const setting = document.querySelector('.edit-profile-page')
      setting.classList.toggle('edit-profile-page-toggle')
    },
    ...mapActions({
      getDetailUsers: 'users/getDetailUser',
      updateNotification: 'friends/resetNotif'
    }),
    showReceiver () {
      const sideright = document.querySelector('.friend-slieder')
      sideright.classList.toggle('friend-slider-box')
    },
    disconnect () {
      this.socket.emit('on-dc', this.iduser)
    },
    showAddFriends () {
      const addFriends = document.querySelector('.add-friends-page')
      addFriends.classList.toggle('add-friends-toggle')
    }
  },
  mounted () {
    this.socket.emit('get-all-users', [])
    this.socket.on('data-users', (payload) => {
      this.listUser = payload
    })
    this.socket.emit('join-room', this.senderData)
    this.socket.on('private-message', (payload) => {
      this.roomChat = [...this.roomChat, payload]
      if (this.receiverData !== null) {
        this.setPrivateChat()
      }
    })
    this.getDetailUsers(this.iduser)
    this.socket.emit('get-friends', this.iduser)
    this.socket.on('list-friends', (payload) => {
      payload.forEach(el => {
        if (parseInt(el.id_users) === parseInt(this.iduser)) {
          this.listFriends.push(el)
        }
      })
    })
    // notif room
    this.socket.emit('join-room-notif', this.iduser)
    this.socket.on('notif-response', (payload) => {
      this.listFriends.map(el => {
        // chats new
        if (el.id_friends === payload.sender) {
          el.newchats = payload.message
        }

        // notif new
        if (el.id_friends === payload.sender && el.id_friends !== this.receiverId) {
          el.msg_notif += 1
        }
      })
    })

    // online offline status
    this.socket.emit('set-status', this.iduser)
    this.socket.on('status-on', (payload) => {
      this.listFriends.map(el => {
        if (el.id_friends === +payload.onlineid) {
          el.statuson = 'Online'
        }
      })
    })

    this.socket.on('status', (payload) => {
      this.listFriends.map(el => {
        if (el.id_friends === +payload.offlineid) {
          el.statuson = 'Offline'
        }
      })
    })
  }
}
</script>

<style scoped>
.home {
  font-family: 'Rubik', sans-serif !important;
}
.chat-page {
  display: grid;
  grid-template-columns: 360px 1fr;
}
.friend-content {
  background-color: #ffffff;
}
.chat-content {
  background-color: #fafafa;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navbar-friend {
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
}
.navbar-friend h3 {
  color: #7E98DF;
  font-weight: bold;
}
.chat-navbar img:nth-child(1) {
  display: none;
}
/* hamburger */
.hamburger-menu {
  width: 25px;
  height: 25px;
  display: flex;
  flex-direction: column;
}
.hamburger-menu span {
  width: 25px;
  height: 3px;
  background-color: #7E98DF;
  margin-bottom: 5px;
  border-radius: 10px;
  transition: all 0.4s ease;
}
.hamburger-menu .hamburger-animation {
  position: absolute;
  width: 30px;
  height: 30px;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}
.hamburger-menu span:nth-child(2) {
  transform-origin: 0 0;
}
.hamburger-menu span:nth-child(3) {
  width: 15px;
}
.hamburger-menu span:nth-child(4) {
  transform-origin: 0 100%;
}
.hamburger-menu input:checked ~ span:nth-child(2) {
  transform: rotate(45deg) translate(1.5px, -1.4px);
}
.hamburger-menu input:checked ~ span:nth-child(3) {
  transform: scale(0);
}
.hamburger-menu input:checked ~ span:nth-child(4) {
  transform: rotate(-45deg) translate(1px, 2px);
}

.aplication-menu {
  position: absolute;
  background-color: #7E98DF;
  width: 200px;
  border-radius: 35px 10px 35px 35px;
  padding: 20px;
  margin-top: 40px;
  margin-left: 110px;
  height: 0;
  transform: scale(0);
  transition: all .4s ease;
}
.aplication-menu p {
  color: white;
  cursor: pointer;
}
.aplication-menu p:hover {
  color: #e1e8ff;
}

.aplication-menu-toggle {
  height: 270px;
  transform: scale(1);
}

/* search-message */
.chat-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.search-message button {
  background-color: transparent;
  border: none;
  outline: none;
  position: absolute;
  font-size: 20px;
  margin-left: 5px;
  margin-top: 10px;
}

.search-message input[type="text"] {
  outline: none;
  border: none;
  background-color: #fafafa;
  padding: 15px 40px;
  border-radius: 15px;
  width: 260px;
}

/* message-status */
.message-status {
  display: flex;
  font-size: 20px;
  margin-top: 10px;
  overflow: scroll;
}

.message-status::-webkit-scrollbar {
  width: 0;
  height: 2px;
}
.message-status::-webkit-scrollbar-track {
  display: none;
}
.message-status::-webkit-scrollbar-thumb {
  background-color: rgb(202, 199, 199);
}

.message-status p {
  margin-left: 50px;
}
.chat-list {
  overflow: scroll;
}
.chat-list::-webkit-scrollbar {
  width: 7px;
  height: 0;
}
.chat-list::-webkit-scrollbar-thumb {
  background-color: grey;
}
.chat-list::-webkit-scrollbar-track {
  display: none;
}

/* profile-image */
.list-chatbox {
  display: grid;
  grid-template-columns: 2fr 4fr 1fr;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  transition: all .2s ease;
}
.list-chatbox:hover {
  background-color: #fafafa;
}
.profile-image1 {
  width: 78px;
  height: 78px;
  /* background-image: url(../assets/suzy.png); */
  background-size: cover;
  border-radius: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.profile-image2 {
  width: 78px;
  height: 78px;
  background-image: url(../assets/iu.jpg);
  background-size: cover;
  border-radius: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.name-chats p:nth-child(1) {
  margin-bottom: 0;
  font-weight: bold;
  transition: all .4s ease;
}
.name-chats p:nth-child(1):hover {
  color: #7E98DF;
}
.chats-preview {
  overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 1; /* number of lines to show */
   -webkit-box-orient: vertical;
}

.time-notif p:nth-child(1) {
  margin-bottom: 0;
}

.time-notif .msg-notifbox {
  width: 25px;
  height: 25px;
  background-color: #7E98DF;
  color: white;
  text-align: center;
  border-radius: 15px;
}
.chat-thereis {
  width: 100%;
  height: 100%;
}

/* chat content */
.chat-thereis {
  display: grid;
  grid-template-rows: 1.3fr 8fr 1.3fr;
}
.chat-navbar {
  padding: 0 20px;
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: center;
}
.profile-pict {
  width: 60px;
  height: 60px;
  background-size: cover;
  border-radius: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

/* chat-colunm */
.chat-colunm {
  display: flex;
  flex-direction: column;
  padding: 12px 30px;
  overflow: scroll;
}

.chat-colunm::-webkit-scrollbar {
  width: 7px;
  height: 0;
}
.chat-colunm::-webkit-scrollbar-track {
  display: none;
}
.chat-colunm::-webkit-scrollbar-thumb {
  background-color: grey;
}

.chat-box {
  display: grid;
  grid-template-columns: 60px 1fr;
  align-items: center;
  justify-items: start;
}
.chat-box p {
  background-color: #7E98DF;
  padding: 10px 15px;
  color: white;
  border-radius: 35px 35px 35px 10px;
  margin-left: 10px;
}

.chat-box2 {
  display: grid;
  grid-template-columns: 1fr 60px;
  justify-items: end;
  align-items: center;
}
.chat-box2 p {
  background-color: white;
  padding: 10px 15px;
  color: black;
  border-radius: 35px 10px 35px 35px;
  margin-right: 10px;
  margin-top: 15px;
}
/* chat-input */
.chat-input {
  padding: 20px;
}

.chat input[type="text"] {
  outline: none;
  border: none;
  background-color: #fafafa;
  padding: 5px 12px;
  width: 100%;
  border-radius: 7px;
}
.chat-button {
  width: 100px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 30px;
  bottom: 27px;
}
.chat-button img {
  cursor: pointer;
}

/* edit-profile-page */
.edit-profile-page {
  position: fixed;
  left: -400px;
  transition: all .2s ease;
  z-index: 4;
}
.edit-profile-page-toggle {
  left: 0;
}

/* friend-slieder */
.friend-slieder {
  position: fixed;
  height: 100vh;
  right: -500px;
  width: 360px;
  padding: 30px;
  transition: all .3s ease;
}
.friend-slider-box {
  right: 0;
}

/* add friends */
.add-friends-page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
}

/* responsive breakpoin */
@media screen and (max-width: 720px) {
  .chat-page {
    grid-template-columns: 1fr;
  }
  .friend-content {
    position: fixed;
    height: 100vh;
    width: 100%;
    z-index: 2;
  }
  .friend-content-toggle {
    display: none;
  }
  .chat-navbar {
    grid-template-columns: 30px 70px 1fr;
  }
  .chat-navbar img:nth-child(1) {
    display: unset;
  }
}
/* custom toggle */
.add-friends-toggle {
  display: flex;
}
</style>
