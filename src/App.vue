<template>
  <div id="app">
    <router-view class="wrapper"/>
    <div class="push-down"></div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Footer
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding-top: 20px;
}



.push-down {
  height: 50px;
  width: 100%;
}
</style>
