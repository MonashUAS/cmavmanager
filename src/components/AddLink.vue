<template>
  <div>
    <b-modal v-on:ok="hok" v-on:show="hopen" size="lg" id="modaludp" title="Add UDP">
      <b-form>
        <b-form-group id="linkname"
                      label="Link Name" label-for="linknameinput">
          <b-form-input id="linknameinput"
                        type="text" v-model="form.link_options.link_name" required
                        placeholder="Enter Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="host"
                      label="Target Host" label-for="hostinput">
          <b-form-input id="hostinput"
                        type="text" v-model="form.udp_properties.host"
                        placeholder="Enter Host"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="hostport"
                      label="Target Host Port" label-for="hostportinput">
          <b-form-input id="hostportinput"
                        type="number" v-model="form.udp_properties.hostport"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="bindport"
                      label="Bind Port" label-for="bindportinput">
          <b-form-input id="bindportinput"
                        type="number" v-model="form.udp_properties.bindport"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="udptype"
                      label="UDP Type" label-for="udptypeinput">
        <b-form-select id="udptypeinput" v-model="form.udp_properties.udp_type" :options="udptypeoptions" class="mb-3" required>
        </b-form-select>
        </b-form-group>
      </b-form>
      <b-btn v-b-toggle.defs variant="primary">Load Defaults</b-btn>
      <b-collapse id="defs">
        <b-card>
          <b-button v-on:click="loadsitl">SITL</b-button>
          <b-button v-on:click="loadgcs">GCS</b-button>
        </b-card>
      </b-collapse>
    </b-modal>
    </div>
</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
      form: {
        link_options: {
          link_name: ''
        },
        udp_properties: {
          host: '',
          hostport: '',
          bindport: '',
          udp_type: null
        }
      },
      udptypeoptions: [
        { value: null, text: 'Please select UDP Type' },
        { value: '0', text: 'Fully Defined' },
        { value: '1', text: 'Client' },
        { value: '2', text: 'Server' },
        { value: '3', text: 'Broadcast Lock' },
        { value: '4', text: 'Broadcast Unlock' }
      ]
    }
  },
  methods: {
    hopen: function (event) {
      if (event) {
        this.form.link_options.link_name = ''
        this.form.udp_properties.host = ''
        this.form.udp_properties.hostport = ''
        this.form.udp_properties.bindport = ''
        this.form.udp_properties.udp_type = ''
        console.log('got modal open event')
      }
    },
    hok: function (event) {
      if (event) {
        console.log('Adding UDP Link')
        console.log(JSON.stringify(this.form))
        axios.post('http://localhost:8000/links', this.form)
          .then(function (response) {
            console.log('seems to have worked')
            this.$emit('emitRefresh')
          }.bind(this))
          .catch(err => {
            console.log(err)
          })
      }
    },
    loadsitl: function (event) {
      this.form.link_options.link_name = 'SITL'
      this.form.udp_properties.host = '127.0.0.1'
      this.form.udp_properties.hostport = '14552'
      this.form.udp_properties.bindport = '14550'
      this.form.udp_properties.udp_type = '0'
    },
    loadgcs: function (event) {
      this.form.link_options.link_name = 'GCS'
      this.form.udp_properties.host = '127.0.0.1'
      this.form.udp_properties.hostport = '14555'
      this.form.udp_properties.bindport = ''
      this.form.udp_properties.udp_type = '1'
    }
  }
}
</script>

<style>
</style>
