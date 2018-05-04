<template>
  <div class="entry">
    <h2>Links</h2>
    <links-view :links="links" @emitRefresh="emitRefresh"></links-view>
    <p v-if="links.length == 0">No links to display</p>
    <br>
    <h2>SYSID Mapping</h2>
    <vue-bootstrap-table
            :columns="columns"
            :values="values"
            :show-filter="e"
            :show-column-picker="false"
            :sortable="false"
            :paginated="false"
            :multi-column-sortable=false
            :filter-case-sensitive=false

    >
    </vue-bootstrap-table>
    <br>
    <h2>Routing Table</h2>
    <vue-bootstrap-table
            :columns="columns2"
            :values="values2"
            :show-filter="e"
            :show-column-picker="false"
            :sortable="false"
            :paginated="false"
            :multi-column-sortable=false
            :filter-case-sensitive=false

    >
    </vue-bootstrap-table>
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
import AddLink from '@/components/AddLink'

export default {
  name: 'Entry',
  components: { LinksView, AddLink, VueBootstrapTable: VueBootstrapTable },
  data () {
    return {
      links: [],
      columns: [
        {
          title: 'Source',
          visible: true,
          editable: true
        },
        {
          title: 'Dest',
          visible: true,
          editable: true
        }
      ],
      columns2: [
        {
          title: 'Dest',
          visible: true,
          editable: true
        },
        {
          title: 'Next Hop',
          visible: true,
          editable: true
        }
      ],
      values: [
        {
          'Source': 1,
          'Dest': 255
        },
        {
          'Source': 255,
          'Dest': 1
        },
        {
          'Source': 2,
          'Dest': 254
        },
        {
          'Source': 245,
          'Dest': 2
        }
      ],
      values2: [
        {
          'Dest': 1,
          'Next Hop': 0
        },
        {
          'Dest': 2,
          'Next Hop': 0
        },
        {
          'Dest': 255,
          'Next Hop': 1
        },
        {
          'Dest': 254,
          'Next Hop': 2
        }
      ]
    }
  },
  created: function () {
    this.getLinks()
  },
  methods: {
    emitRefresh: function (id) {
      console.log('emitrefresh')
      this.getLinks()
    },
    getLinks: function () {
      var vm = this
      axios.get('http://localhost:8000/links')
      .then(function (response) {
        vm.links = response.data.links
        console.log(vm.links)
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
