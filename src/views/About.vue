<template>
  <div class="container">
    <h3>Google Maps</h3>
    <google-maps class="map" :center="{lat: -6.431025, lng: 106.961840}" :zoom="14"></google-maps>
  </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'

export default {
  components: {
    'google-maps': VueGoogleMaps.Map
  }
}
</script>
<style scoped>
  .map {
    width: 100%;
    height: 500px;
  }
</style>
