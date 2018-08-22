<template>
  <div class="Header">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-navbar-brand href="#">
        <img src="/open-iconic/svg/signal.svg" width="50px" height="50px" alt="signal"></img>
      </b-navbar-brand>
      <b-navbar-brand href="#">
        <h2>cmavmanager</h2>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <b-nav-text v-if="isConnected" class="cm-conn">Connected</b-nav-text>
        <b-nav-text v-else="isConnected" class="cm-nconn">Disconnected</b-nav-text>
        <b-form-input v-model="addr" type="text"></b-form-input>
        <b-button v-on:click="updateAddr" :size="sm">Change</b-button>
      </b-navbar-nav>
      </b-collapse>

      </router-link>
    </b-navbar>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters([
      'cmav_addr'
    ])
  },
  data () {
    return {
      isConnected: 0,
      addr: ''
    }
  },
  created: function () {
    this.checkConn()
    this.timer = setInterval(this.checkConn, 1000)
    console.log('CMAV ADDR')
    console.log(this.cmav_addr)
    this.addr = this.cmav_addr
  },
  methods: {
    checkConn: function () {
      var vm = this
      axios.get(this.cmav_addr + '/heartbeat')
        .then(function (response) {
          vm.isConnected = 1
        })
        .catch(err => {
          console.log(err)
          vm.isConnected = 0
        })
    },
    updateAddr: function () {
      console.log('setting cmav addr')
      this.setCmavAddr(this.addr)
    },
    ...mapMutations([
      'setCmavAddr'
    ])
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
