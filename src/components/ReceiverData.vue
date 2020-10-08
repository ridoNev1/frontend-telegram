<template>
  <div class="friend-slider">
    <div class="title-data">
      <img src="../assets/back.png" alt="backdata" @click="$emit('sideright')">
      <h4 style="color: #7E98DF;">@mmldolg</h4>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReceiverData'
}
</script>

<style>
.friend-slider {
  background: white;
}
.title-data {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
