<template>
  <div class="about">
    <UsersBox type="login"/>
  </div>
</template>

<script>
import UsersBox from '../components/UsersBox'

export default {
  name: 'Login',
  components: {
    UsersBox
  }
}
</script>
