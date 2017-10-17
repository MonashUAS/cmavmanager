<template>
    <b-list-group-item>
      <div class="wrapperlink">
        <div class="llink">
        Link# {{ link.id }} Name: {{ link.link_options.link_name }}
        </div>

        <div class="rlink">
          <b-btn v-b-toggle.collapse1 variant="primary">View Stats</b-btn>
          <b-dropdown id="ddown" text="Actions" variant="primary" class="m-md-2">
              <b-dropdown-item>Edit</b-dropdown-item>
              <b-dropdown-item>Delete</b-dropdown-item>
            </b-dropdown>
        </div>
      </div>
      <b-collapse id="collapse1" class="mt-2">
        <b-card>
          <p class="card-text">Stats Will Go Here</p>
        </b-card>
      </b-collapse>
    </b-list-group-item>
</template>

<script>

export default {
  name: 'LinkDisplay',
  props: {
    link: {
      type: Object
    }
  },
  created: function () {
    console.log('In LinksDisplay now')
    console.log(this.link)
  }
}
</script>

<style scoped>
  .llink {
  text-align: left;
  float: left;
  }

  .rlink {
  text-align: right;
  }

  #ddown {
  padding-top: 0px;
  }
</style>
