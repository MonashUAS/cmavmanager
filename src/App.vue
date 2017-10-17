<template>
  <div id="app">
    <c-header></c-header>
    <router-view/>
    <c-footer></c-footer>
  </div>
</template>

<script>
import CHeader from '@/components/Header'
import CFooter from '@/components/Footer'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  components: { CHeader, CFooter },
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left: 20%;
  margin-right: 20%;
}
</style>
