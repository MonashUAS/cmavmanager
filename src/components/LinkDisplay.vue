<template>
    <b-list-group-item>
      <div class="wrapperlink">
        <div v-if="link.udp_properties" class="llink">
        <p><strong>UDP Link#</strong> {{ link.id }} <strong>Name:</strong> {{ link.link_options.link_name }} <strong>blockXmitRx:</strong> {{ link.link_options.blockXmitRx }} <strong>blockXmitTx:</strong> {{ link.link_options.blockXmitTx }}</p>
        <p><strong>Host:</strong> {{ link.udp_properties.host }} <strong>Host Port:</strong> {{ link.udp_properties.hostport }} <strong>Bind Port:</strong> {{ link.udp_properties.bindport }}</p>
        </div>
        <div v-if="link.serial_properties" class="llink">
        <p><strong>Serial Link#</strong> {{ link.id }} <strong>Name:</strong> {{ link.link_options.link_name }} <strong>blockXmitRx:</strong> {{ link.link_options.blockXmitRx }} <strong>blockXmitTx:</strong> {{ link.link_options.blockXmitTx }}</p>
        <p><strong>Port:</strong> {{ link.serial_properties.port }} <strong>Baudrate:</strong> {{ link.serial_properties.baudrate }} <strong>Flowcontrol:</strong> {{ link.serial_properties.flowcontrol }}</p>
        </div>

        <div class="rlink">
          <br>
          <b-btn v-b-toggle="collapseid" variant="primary">View Stats</b-btn>
          <b-dropdown id="ddown" text="Actions" variant="primary" class="m-md-2">
              <b-dropdown-item>Edit</b-dropdown-item>
              <b-dropdown-item  v-on:click="deleteLink">Delete</b-dropdown-item>
            </b-dropdown>
        </div>
      </div>
      <b-collapse :id="collapseid" class="mt-2" style="align: left">
        <br>
        <br>
        <GChart
          type="LineChart"
          :data="chartData"
          :options="chartOptions.chart"
        />
      </b-collapse>
    </b-list-group-item>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { GChart } from 'vue-google-charts'

export default {
  components: {
    GChart
  },
  data () {
    return {
      collapseid: null,
      counter: 0,
      chartData: [
        ['id', 'bandwidth'],
        [0, 0]
      ],
      chartOptions: {
        chart: {
          title: 'Bandwidth',
          width: 700,
          height: 200,
          legend: 'none',
          hAxis: {
            title: 'Time (s)'
          },
          vAxis: {
            title: 'Bytes per Second'
          }
        }
      }
    }
  },
  name: 'LinkDisplay',
  computed: {
    ...mapGetters([
      'cmav_addr'
    ])
  },
  props: {
    link: {
      type: Object
    }
  },
  created: function () {
    console.log('In LinksDisplay now')
    console.log(this.link)
    this.timer = setInterval(this.getStats, 1000)
    this.getCollapseID()
  },
  methods: {
    getStats: function () {
      var vm = this
      axios.get('http://localhost:8000/stats')
        .then(function (response) {
          for (var i = 0; i < response.data.stats.length; i++) {
            if (response.data.stats[i].name === vm.link.link_options.link_name) {
              if (response.data.stats[i].drate_rx <= 10000) {
                var tmp = [vm.counter++, response.data.stats[i].drate_rx]
                vm.chartData.push(tmp)
              }
            }
          }
        })
    },
    deleteLink: function () {
      console.log('deleteing this link')
      axios.delete(this.cmav_addr + '/links/' + this.link.id)
      .then(function (response) {
        console.log('link deleted')
        this.$emit('emitRefresh')
      }.bind(this))
    },
    getCollapseID: function () {
      var tmpid = this._uid
      this.collapseid = tmpid + 'collapse'
      console.log('collapseid')
      console.log(this.collapseid)
    }
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

  #card {
      width: auto;
      display: block
  }
</style>
