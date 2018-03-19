<template class="modal-template">
  <div class="modal-mask" v-show="show" @click="closeModal" transition="modal">
      <div class="modal-container" @click.stop v-bind:style="containerStyle">

          <div class="modal-header">
              <h3>{{title}}</h3>
          </div>

          <div class="modal-body">
              <img v-if="modalHasImage" v-bind:src="image.src">
              <table v-if="table" class="table">
                  <tr v-if="table.headers">
                      <th v-for="header in table.headers">{{header}}</th>
                  </tr>
                  <tr v-for="(row, name) in table.rows">
                      <td>{{name}}</td>
                      <td v-bind:class="setClassName(row.style)">{{row.value}}</td>
                  </tr>
              </table>
          </div>

      </div>
  </div>
</template>

<script>
export default {
  template: '.modal-template',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      image: {},
      type: 'modal',
      table: {},
      title: '',
      containerStyle: ''
    }
  },
  computed: {
    modalHasImage () {
      return this.image.hasOwnProperty('src')
    }
  },
  methods: {
    resetProperties () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
    setClassName (style) {
      return style
    },
    closeModal () {
      this.$store.dispatch('global/setModal', { modal: { show: false } })
    }
  },
  tag: 'modal'
}

</script>