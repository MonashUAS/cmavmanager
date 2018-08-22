<template>
  <div class="map-list">
    <b-container class="map class">
      <b-row class="map-item">
        <b-col>Source</b-col>
        <b-col>Dest</b-col>
        <b-col>Bidir</b-col>
        <b-col>Delete</b-col>
      </b-row>
      <b-row class="map-item" v-for="map in mapping">
        <b-col>
          <b-form-input v-model="map.src"
                        type="number">
          </b-form-input></b-col>
        <b-col>
          <b-form-input v-model="map.dst"
                        type="number">
          </b-form-input></b-col>
        <b-col>
          <b-form-checkbox v-model="map.bidir">
          </b-form-checkbox></b-col>
        <b-col><b-button @click="deleteItem(map)" size="sm" variant="danger">Delete</b-button>
          </b-col>
      </b-row>
    </b-container>
    </br>
    <b-button-group>
      <b-button @click="addItem()">Add Entry</b-button>
      <b-button @click="pushMapping()">Push Mapping</b-button>
      <b-button @click="emitRefresh()">Pull Mapping</b-button>
    </b-button-group>
  <b-modal id="errormodal" ref="errormodalref" hide-footer title="Mapping Error">
    <p>Error, one or more mapping entries is blank</p>
    <b-btn class="mt-3" variant="outline-danger" block @click="closeModal()">Close</b-btn>
  </b-modal>
  </div>
</template>

<script>

import axios from 'axios'
import { mapGetters} from 'vuex'

export default {
  name: 'Mapping',
  computed: {
    ...mapGetters([
      'cmav_addr'
    ])
  },
  props: {
    mapping: {
      type: Array
    }
  },
  created: function () {
    console.log('In Mappingcreate now')
  },
  methods: {
    emitRefresh: function (id) {
      console.log('emit refresh')
      this.$emit('emitRefresh')
    },
    deleteItem: function (map) {
      this.mapping.splice(this.mapping.indexOf(map), 1)
    },
    addItem: function () {
      this.mapping.push({src: '0', dst: '0', bidir: 'false'})
      console.log(this.mapping)
    },
    closeModal: function () {
      this.$refs.errormodalref.hide()
    },
    pushMapping: function () {
      console.log(JSON.stringify(this.mapping))
      for (var i = 0; i < this.mapping.length; i++) {
        if (this.mapping[i].src === '0') {
          this.$refs.errormodalref.show()
          return
        }
        if (this.mapping[i].dst === '0') {
          this.$refs.errormodalref.show()
          return
        }
      }
      axios.post(this.cmav_addr + '/mapping', this.mapping)
        .then(function (response) {
          console.log('successful push mapping')
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
  .map-list {
  width: 75%;
  margin: auto;
  }
  .map-item{
  border-style: solid;
  }
</style>
