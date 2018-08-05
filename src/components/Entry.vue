<template>
  <div class="entry">
    <h2>Links</h2>
    <links-view :links="links" @emitRefresh="emitRefresh"></links-view>
    <p v-if="links.length == 0">No links to display</p>
    <br>
    <h2>SYSID Mapping</h2>
    <mapping :mapping="mapping" @emitRefresh="emitRefresh"></mapping>
    <br>
    <h2>Routing Table</h2>
    <b-button-group class="mngbtn">
      <b-button v-on:click="getLinks" variant="info">Refresh Links</b-button>
      <b-button v-b-modal.modaludp variant="primary">Add UDP</b-button>
      <b-button variant="danger">Save to File</b-button>
      <b-button variant="success">Load from File</b-button>
  </b-button-group>

  <add-link @emitRefresh="emitRefresh"></add-link>

  </div>
</template>
<script>

import axios from 'axios'
import VueBootstrapTable from 'vue2-bootstrap-table2'
import LinksView from '@/components/LinksView'
import Mapping from '@/components/Mapping'
import AddLink from '@/components/AddLink'

export default {
  name: 'Entry',
  components: { LinksView, Mapping, AddLink, VueBootstrapTable: VueBootstrapTable },
  data () {
    return {
      links: [],
      mapping: []
    }
  },
  created: function () {
    this.getLinks()
    this.getMapping()
  },
  methods: {
    emitRefresh: function (id) {
      console.log('emitrefresh')
      this.getLinks()
      this.getMapping()
    },
    getLinks: function () {
      var vm = this
      axios.get('http://localhost:8000/links')
      .then(function (response) {
        vm.links = response.data.links
        console.log(vm.links)
      })
    },
    getMapping: function () {
      var vm = this
      axios.get('http://localhost:8000/mapping')
        .then(function (response) {
          vm.mapping = response.data.mapping
          if (vm.mapping.length === 0) {
            vm.mapping = []
          }
          console.log('Mapping')
          console.log(vm.mapping)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, h3 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.mngbtn {
    padding-top: 10px;
    }
</style>
