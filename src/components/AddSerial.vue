<template>
  <div>
    <b-modal v-on:ok="hok" v-on:show="hopen" size="lg" id="modalserial" title="Add Serial">
      <b-form>
        <b-form-group id="linkname"
                      label="Link Name" label-for="linknameinput">
          <b-form-input id="linknameinput"
                        type="text" v-model="form.link_options.link_name" required
                        placeholder="Enter Name"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="port"
                      label="Serial Port" label-for="portinput">
          <b-form-input id="portinput"
                        type="text" v-model="form.serial_properties.port"
                        placeholder="Enter Port"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="baudrate"
                      label="Baudrate" label-for="baudrateinput">
          <b-form-input id="baudrateinput"
                        type="number" v-model="form.serial_properties.baudrate"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="flowcontrol"
                      label="Flow Control" label-for="flowcontrolinput">
        <b-form-checkbox id="flowcontrolinput" v-model="form.serial_properties.flowcontrol">
        </b-form-checkbox>
        </b-form-group>
        <b-form-group id="bem"
                      label="Block Xmit" label-for="beminput2">
        <b-form-checkbox id="bemtypeinput21" v-model="form.link_options.blockXmitRx" value="true" unchecked-value="false">
          Rx
        </b-form-checkbox>
        <b-form-checkbox id="bemtypeinput22" v-model="form.link_options.blockXmitTx" value="true" unchecked-value="false">
          Tx
        </b-form-checkbox>
        </b-form-group>
      </b-form>
    </b-modal>
    </div>
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      form: {
        link_options: {
          link_name: '',
          blockXmitRx: 'false',
          blockXmitTx: 'false'
        },
        serial_properties: {
          port: '',
          baudrate: '',
          flowcontrol: 'false'
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'cmav_addr'
    ])
  },
  methods: {
    hopen: function (event) {
      if (event) {
        this.form.link_options.link_name = ''
        this.form.link_options.blockXmitRx = 'false'
        this.form.link_options.blockXmitTx = 'false'
        this.form.serial_properties.port = ''
        this.form.serial_properties.baudrate = ''
        this.form.serial_properties.flowcontrol = 'false'
        console.log('got modal open event')
      }
    },
    hok: function (event) {
      if (event) {
        console.log('Adding Serial Link')
        console.log(JSON.stringify(this.form))
        axios.post(this.cmav_addr + '/links', this.form)
          .then(function (response) {
            console.log('seems to have worked')
            this.$emit('emitRefresh')
          }.bind(this))
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style>
</style>
