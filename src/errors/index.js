export default {
  handle (context, error) {
    if (error.response && error.response.status === 422) {
      this.handleValidationError(context, error.response.data.errors)
    } else {
      if(error.response.data.errors) {
        context.error = error.response.data.errors[0].detail
      }
    }
  },
  handleValidationError (context, errors) {
    errors.forEach(function (error) {
      var field = error.source.pointer.split('/').pop()
      if (context.fields.hasOwnProperty(field)) {
        context.fields[field].error = error.detail
      }
    })
  }
}
