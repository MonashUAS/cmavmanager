<template>
  <div class="entry">
    <links-view :links="links"></links-view>
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
      // vm.links = response.data
      vm.links = [{id: 1, name: 'hello world'},
                  {id: 2, name: 'fuck it'}]
      console.log(response.data)
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
</style>
