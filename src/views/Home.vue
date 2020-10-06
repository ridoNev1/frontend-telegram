<template>
  <div class="home">
    <div class="chat-page">
      <div class="friend-content">
        <div class="navbar-friend">
          <h3>Telegram</h3>
          <div class="hamburger-menu mt-2">
            <input class="hamburger-animation" type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
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
          <div @click="showChat1(item)" v-for="(item, index) in listUser" :key="index">
            <div v-if="item.email === senderData">
              <span></span>
            </div>
            <div class="list-chatbox" v-else>
              <div class="profile-image1">
                <img src="../assets/Online.png" alt="onlineBar">
              </div>
              <div class="name-chats">
                <p>{{item.fullname}}</p>
                <p>Iya sayang...</p>
              </div>
              <div class="time-notif">
                <p>12.00</p>
                <p>1</p>
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
            <div class="profile-pict">
              <img src="../assets/Online.png" alt="onlineBar">
            </div>
            <div class="name-chats">
              <p class="mt-3">{{receiverName}}</p>
              <p style="color: #7E98DF;">online</p>
            </div>
          </div>
          <div class="chat-colunm">
            <div class="mt-3" v-for="(item, index) in privateChat" :key="index">
              <div class="chat-box" v-if="item.sender !== senderData">
                <div class="profile-pict">
                  <img src="../assets/Online.png" alt="onlineBar">
                </div>
                <p>{{item.msg}}</p>
              </div>
              <div class="chat-box2" v-else>
                <p>{{item.msg}}</p>
                <div class="profile-pict">
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
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { url } from '../helpers/env'

export default {
  name: 'Home',
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
      privateChat: []
    }
  },
  methods: {
    showChat1 (receiver) {
      this.chatMessage = 1
      // this.roomChat = []
      this.receiverData = receiver.email
      this.receiverName = receiver.fullname
      this.setPrivateChat()
    },
    sendChat () {
      const message = {
        sender: this.senderData,
        msg: this.textChat,
        receiver: this.receiverData
      }
      this.roomChat = [...this.roomChat, message]

      this.socket.emit('send-message', {
        username: this.senderData,
        room: this.receiverData,
        textChat: this.textChat
      })
      this.textChat = ''
      this.setPrivateChat()
    },
    setPrivateChat () {
      const privateChats = this.roomChat.filter(e => e.sender === this.receiverData || e.sender === this.senderData || e.receiver)
      this.privateChat = privateChats
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
  }
}
</script>

<style scoped>
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
  background-image: url(../assets/suzy.png);
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

.time-notif p:nth-child(1) {
  margin-bottom: 0;
}
.time-notif p:nth-child(2) {
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
  grid-template-columns: 1fr 11fr;
  align-items: center;
}
.profile-pict {
  width: 60px;
  height: 60px;
  background-image: url(../assets/suzy.png);
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
  display: flex;
}
.chat-box p {
  background-color: #7E98DF;
  padding: 10px 15px;
  color: white;
  border-radius: 35px 35px 35px 10px;
  margin-left: 10px;
}
.chat-box2 {
  display: flex;
  justify-content: flex-end;
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
</style>
