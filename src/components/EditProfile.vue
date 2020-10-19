<template>
  <div class="edit-profile">
    <div class="username" @click="$emit('settingtoggle')" style="cursor: pointer;">
      <img src="../assets/back.png" alt="btn-back">
      <p>@{{usersDetail.username}}</p>
    </div>
    <div class="user-profile">
      <div class="profile-pict" :style="`background-image: url(http://localhost:3008/${usersDetail.image});`">
        <form class="form-image" enctype="multipart/form-data" @change.prevent="updateImage">
          <label class="custom-file-upload">
            <input type="file" @change="upload($event)"/>
            <b-icon icon="camera2" scale="2" class="mt-1"></b-icon>
          </label>
        </form>
      </div>
      <div class="profile-data">
        <div class="fullname">
          <div v-if="nameToggle === 0">
            <p>{{usersDetail.fullname}}</p>
            <b-icon icon="pencil" class="edit-btn1" @click="editusername($event)"></b-icon>
          </div>
          <div class="md-form m-0" v-else>
            <input type="text" id="form-phone" class="form-control" v-model="usersDetail.fullname" required>
            <b-icon icon="arrow-right-circle-fill" class="edit-btn" variant="info" scale="1.5" @click="editDataUsername"></b-icon>
          </div>
        </div>
        <p>{{usersDetail.phone}}</p>
      </div>
    </div>
    <div class="user-account">
      <h5>Account</h5>
      <div class="chage-phone-number">
        <div v-if="editToggle === 0">
          <p>{{usersDetail.phone}}</p>
          <p>Edit phone number</p>
          <b-icon icon="pencil" class="edit-btn" @click="editToggleBtn($event)"></b-icon>
        </div>
        <div v-else>
          <div class="md-form m-1">
            <input type="text" id="form-phone" class="form-control" v-model="usersDetail.phone" required>
          </div>
          <b-icon icon="arrow-right-circle-fill" class="edit-btn" variant="info" scale="1.5" @click="editPhone"></b-icon>
        </div>
      </div>
      <div class="chage-phone-number">
        <div v-if="bioToggle === 0">
          <p>{{usersDetail.bio}}</p>
          <p>Bio</p>
          <b-icon icon="pencil" class="edit-btn" @click="editToggleBtn2($event)"></b-icon>
        </div>
        <div v-else>
          <div class="md-form m-1">
            <input type="text" id="form-phone" class="form-control" v-model="usersDetail.bio" required>
          </div>
          <b-icon icon="arrow-right-circle-fill" class="edit-btn" variant="info" scale="1.5" @click="editBio"></b-icon>
        </div>
      </div>
    </div>
    <div class="setting-account">
      <p class="font-weight-bold mt-4" style="font-size: 19px;">Setting</p>
      <div class="setting-list">
        <p><img src="../assets/Union.png" alt="notif" class="mr-2"> Notification and Sound</p>
        <p><img src="../assets/security.png" alt="privat" class="mr-3"> Privati and Security</p>
        <p><img src="../assets/data.png" alt="" class="mr-2"> Data and Storage</p>
        <p><img src="../assets/Chat.png" alt="chat" class="mr-2"> Chat Setiing</p>
        <p><img src="../assets/Device.png" alt="device" class="mr-2"> Devices</p>
        <p @click="logout"><b-icon icon="x-circle-fill" font-scale="1.4" class="mr-2"></b-icon> LogOut</p>
        <p><router-link to="/about">About</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'EditProfile',
  data () {
    return {
      editToggle: 0,
      userPhone: null,
      bioToggle: 0,
      userBio: null,
      nameToggle: 0,
      userName: null,
      image: null
    }
  },
  computed: {
    ...mapGetters({
      usersDetail: 'users/getDetailUsers'
    })
  },
  methods: {
    editToggleBtn (e) {
      this.editToggle = 1
    },
    editToggleBtn2 (e) {
      this.bioToggle = 1
    },
    editusername (e) {
      this.nameToggle = 1
      e.target.style.display = 'none'
    },
    editPhone () {
      const data = {
        bio: this.usersDetail.bio,
        phone: this.usersDetail.phone,
        id: this.usersDetail.iduser,
        fullname: this.usersDetail.fullname
      }
      this.editDataUser(data).then(result => {
        this.$swal(result)
        this.editToggle = 0
      })
    },
    editDataUsername () {
      const data = {
        bio: this.usersDetail.bio,
        phone: this.usersDetail.phone,
        id: this.usersDetail.iduser,
        fullname: this.usersDetail.fullname
      }
      this.editDataUser(data).then(result => {
        this.$swal(result)
        this.nameToggle = 0
      })
    },
    editBio () {
      const data = {
        bio: this.usersDetail.bio,
        phone: this.usersDetail.phone,
        id: this.usersDetail.iduser,
        fullname: this.usersDetail.fullname
      }
      this.editDataUser(data).then(result => {
        this.$swal(result)
        this.bioToggle = 0
      })
    },
    logout () {
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('token')
      localStorage.removeItem('fullname')
      localStorage.removeItem('email')
      localStorage.removeItem('image')
      window.location = '/login'
    },
    ...mapActions({
      editDataUser: 'users/updateUsers',
      updateImageData: 'users/updateImage',
      getDetailUsers: 'users/getDetailUser'
    }),
    upload (event) {
      this.image = event.target.files[0]
    },
    updateImage () {
      const dataimage = {
        image: this.image,
        iduser: this.usersDetail.iduser
      }
      this.updateImageData(dataimage).then(result => {
        if (result === 'File must be png/jpg/jpeg, max size 1mb') {
          this.$swal(result)
        } else if (result === 'Ukuran File terlalu besar') {
          this.$swal(result)
        } else {
          // window.location = '/'
          this.getDetailUsers(this.usersDetail.iduser)
        }
      })
    }
  }
}
</script>

<style scoped>
.edit-profile {
  width: 360px;
  height: 100vh;
  background-color: #fff;
  padding: 20px;
  font-family: 'Rubik', sans-serif !important;
  color: rgb(80, 80, 80);
  overflow: scroll;
}
.edit-profile::-webkit-scrollbar {
  height: 0;
  width: 2px;
}
.edit-profile::-webkit-scrollbar-thumb {
  background-color: rgb(189, 188, 188);
}

.username {
  display: grid;
  grid-template-columns: 30px 1fr;
}
.username p {
  font-weight: bold;
  font-size: 19px;
  color: #7e98df;
  margin-top: -3px;
}

/* profile-pict */
.user-profile {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
}
.profile-pict {
  width: 78px;
  height: 78px;
  /* background-image: url(../assets/suzy.png); */
  background-size: cover;
  border-radius: 30px;
}
.profile-data {
  margin-top: 10px;
}
.profile-data p:nth-child(1) {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 0;
}
.profile-data p:nth-child(2) {
  color: rgb(202, 200, 200);
}

/* user-account */
.user-account {
  margin-top: 25px;
}
.user-account h5 {
  font-weight: bold;
}

.chage-phone-number {
  margin-top: 19px;
  border-bottom: 1.5px solid rgb(226, 226, 226);
  padding: 12px 0;
}
.chage-phone-number p:nth-child(1) {
  margin-bottom: 3px;
}
.chage-phone-number p:nth-child(2) {
  color: rgb(202, 200, 200);
  margin-bottom: 3px;
}
.edit-btn {
  position: absolute;
  right:20px;
  margin-top: -50px;
  cursor: pointer;
}
.edit-btn1 {
  position: absolute;
  right:20px;
  margin-top: -25px;
  cursor: pointer;
}
/* setting-list */
.setting-list p {
  cursor: pointer;
  transition: all .3s ease;
}
.setting-list p:hover {
  color: #7e98df;
}
/* .custom-file-input */
.custom-file-input::-webkit-file-upload-button {
  cursor: pointer;
  height: 78px;
  width: 78px;
}
.form-image {
  height: 100%;
  border-radius: 30px;
  transition: all .3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-image:hover {
  background-color: rgba(5, 5, 5, 0.3);
}
.custom-file-upload input[type="file"] {
  display: none;
  border-radius: 10px;
  font-weight: bold;
  padding: 8px;
  margin: 20px auto;
}

.custom-file-upload {
  color: white;
  padding: 25px 20px;
  opacity: 0;
}
.custom-file-upload:hover {
  opacity: 1;
}
</style>
