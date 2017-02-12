<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  height: 500px;
  overflow-y: auto;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.table table {
  border: 1px solid;
}

.table tr {
  border: 1px solid;
}

.table tr td, .table tr th {
  padding: 5px;
}
</style>

<template class="modal-template">
  <div class="modal-mask" v-show="show" @click="$emit('close')" transition="modal">
      <div class="modal-container" @click.stop>

          <div class="modal-header">
              <h3>{{title}}</h3>
          </div>

          <div class="modal-body">
              <img v-if="data.image" v-bind:src="data.image.src"/>
              <table v-if="data.table" class="table">
                  <tr v-if="data.table.headers">
                      <th v-for="header in data.table.headers">{{header}}</th>
                  </tr>
                  <tr v-for="(row, name) in data.table.rows">
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
  props: ['show', 'data', 'title'],
  methods: {},
  tag: 'modal'
}

</script>