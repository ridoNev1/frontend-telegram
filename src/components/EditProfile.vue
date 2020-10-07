<template>
  <div class="edit-profile">
    <div class="username">
      <img src="../assets/back.png" alt="btn-back" @click="$emit('settingtoggle')" style="cursor: pointer;">
      <p>Username</p>
    </div>
    <div class="user-profile">
      <div class="profile-pict">
        <span></span>
      </div>
      <div class="profile-data">
        <p>Gloria Mckinney</p>
        <p>+375(29)9638433</p>
      </div>
    </div>
    <div class="user-account">
      <h5>Account</h5>
      <div class="chage-phone-number">
        <div v-if="editToggle === 0">
          <p>+375(29)9638433</p>
          <p>Edit phone number</p>
        </div>
        <div v-else>
          <div class="md-form m-1">
            <input type="email" id="form-phone" class="form-control" v-model="userPhone" required>
            <label for="form-phone">Phone</label>
          </div>
          <b-icon icon="pencil" class="edit-btn" @click="editPhone"></b-icon>
        </div>
        <b-icon icon="pencil" class="edit-btn" @click="editToggleBtn($event)"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfile',
  data () {
    return {
      editToggle: 0,
      userPhone: ''
    }
  },
  methods: {
    editToggleBtn (e) {
      this.editToggle = 1
      e.target.style.display = 'none'
    },
    editPhone () {
      console.log(this.userPhone)
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
  background-image: url(../assets/suzy.png);
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
  border-top: 1.5px solid rgb(226, 226, 226);
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

</style>
