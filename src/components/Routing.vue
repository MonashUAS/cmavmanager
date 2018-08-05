<template>
  <div class="route-list">
    <b-container class="route class">
      <b-row class="route-item">
        <b-col>Dest</b-col>
        <b-col>Next Hop</b-col>
      </b-row>
      <b-row class="route-item" v-for="route in routing_table">
        <b-col>
          <b-form-input v-model="route.dest"
                        type="number">
          </b-form-input></b-col>
        <b-col>
          <b-form-input v-model="route.next_hop"
                        type="number">
          </b-form-input></b-col>
        <b-col><b-button @click="deleteItem(route)" size="sm" variant="danger">Delete</b-button>
          </b-col>
      </b-row>
    </b-container>
    </br>
    <b-button-group>
      <b-button @click="addItem()">Add Entry</b-button>
      <b-button @click="pushTable()">Push Table</b-button>
      <b-button @click="emitRefresh()">Pull Table</b-button>
    </b-button-group>
  <b-modal id="errormodal" ref="errormodalref" hide-footer title="Mapping Error">
    <p>Error, one or more routing table entries is blank</p>
    <b-btn class="mt-3" variant="outline-danger" block @click="closeModal()">Close</b-btn>
  </b-modal>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Routing',
  props: {
    routing_table: {
      type: Array
    }
  },
  created: function () {
    console.log('In routingcreate now')
  },
  methods: {
    emitRefresh: function (id) {
      console.log('emit refresh')
      this.$emit('emitRefresh')
    },
    deleteItem: function (route) {
      this.routing_table.splice(this.routing_table.indexOf(route), 1)
    },
    addItem: function () {
      this.routing_table.push({dest: '0', next_hop: '0'})
      console.log(this.routing_table)
    },
    closeModal: function () {
      this.$refs.errormodalref.hide()
    },
    pushTable: function () {
      console.log(JSON.stringify(this.routing_table))
      for (var i = 0; i < this.routing_table.length; i++) {
        if (this.routing_table[i].dest === '0') {
          this.$refs.errormodalref.show()
          return
        }
      }
      axios.post('http://localhost:8000/routing', this.routing_table)
        .then(function (response) {
          console.log('successful push routing')
          this.$emit('emitRefresh')
        }.bind(this))
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
  .route-list {
  width: 75%;
  margin: auto;
  }
  .route-item{
  border-style: solid;
  }
</style>
