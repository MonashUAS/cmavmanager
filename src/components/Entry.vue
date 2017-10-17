<template>
  <div class="entry">
    <h2>Links</h2>
    <links-view :links="links"></links-view>
    <b-button-group class="mngbtn">
      <b-button variant="info">Refresh Links</b-button>
      <b-button variant="primary">Add UDP</b-button>
      <b-button variant="primary">Add Serial</b-button>
      <b-button variant="danger">Stop Routing</b-button>
      <b-button variant="success">Start Routing</b-button>
  </b-button-group>
  </div>
</template>

<script>

import axios from 'axios'
import LinksView from '@/components/LinksView'

export default {
  name: 'Entry',
  components: { LinksView },
  data () {
    return {
      links: []
    }
  },
  created: function () {
    var vm = this
    axios.get('http://localhost:8000/links')
    .then(function (response) {
      vm.links = response.data.links
      console.log(vm.links)
    })
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
