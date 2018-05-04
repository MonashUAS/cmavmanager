<template>
  <div class="link-con">
  <b-list-group>
    <link-display v-for="link in links" :link="link" @emitRefresh="emitRefresh">
    </link-display>
  </b-list-group>
  </div>
</template>

<script>

import LinkDisplay from '@/components/LinkDisplay'

export default {
  name: 'LinksView',
  components: { LinkDisplay },
  props: {
    links: {
      type: Array
    }
  },
  created: function () {
    console.log('In Linksview now')
    console.log(this.links)
  },
  methods: {
    emitRefresh: function (id) {
      console.log('emitrefresh')
      this.$emit('emitRefresh')
    }
  }
}
</script>

<style scoped>
  .link-con {
  width: 75%;
  margin: auto;
  }
</style>
