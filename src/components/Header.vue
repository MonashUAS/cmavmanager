<template>
  <div class="Header">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-navbar-brand href="#">
        <img src="../../node_modules/iconic/icons/computer-icons/network.svg" width="50px" height="50px"></img>
      </b-navbar-brand>
      <b-navbar-brand href="#">
        <h2>cmavmanager</h2>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <b-nav-text v-if="isConnected" class="cm-conn">Connected</b-nav-text>
        <b-nav-text v-else="isConnected" class="cm-nconn">Disconnected</b-nav-text>
      </b-navbar-nav>
      </b-collapse>

      </router-link>
    </b-navbar>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Header',
  data () {
    return {
      isConnected: 0
    }
  },
  created: function () {
    this.checkConn()
    this.timer = setInterval(this.checkConn, 1000)
  },
  methods: {
    checkConn: function () {
      console.log('checking connection')
      var vm = this
      axios.get('http://localhost:8000/heartbeat')
        .then(function (response) {
          vm.isConnected = 1
        })
        .catch(err => {
          console.log(err)
          vm.isConnected = 0
        })
    }
  }
}
</script>

<style scoped>
  .cm-nconn {
    color: #ff0000;
  }
  .cm-conn {
    color: #00ff00;
  }

</style>
