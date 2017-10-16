<template>
  <ul>
    <li v-for="link in links">Hello {{ link.id }} {{ link.name }}</li>
  </ul>
</template>

<script>

export default {
  name: 'LinksView',
  props: {
    links: {
      type: Array
    }
  },
  created: function () {
    console.log('In Linksview now')
    console.log(this.links)
  }
}
</script>

<style scoped>
</style>
