<template class="modal-template">
  <div class="modal-mask" v-show="show" @click="closeModal" transition="modal">
      <div class="modal-container" @click.stop>

          <div class="modal-header">
              <h3>{{title}}</h3>
          </div>

          <div class="modal-body">
              <img v-if="image" v-bind:src="image.src"/>
              <table v-if="table" class="table">
                  <tr v-if="table.headers">
                      <th v-for="header in table.headers">{{header}}</th>
                  </tr>
                  <tr v-for="(row, name) in table.rows">
                      <td>{{name}}</td>
                      <td v-bind:style="row.style">{{row.value}}</td>
                  </tr>
              </table>
          </div>

          <!-- <div class="modal-footer text-right">
              <button class="modal-default-button" @click="savePost()">
                  Save
              </button>
          </div> -->
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
      title: ''
    }
  },
  methods: {
    resetProperties: function () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
    closeModal: function () {
      this.$root.showModal = false
    }
  },
  tag: 'modal'
}

</script>