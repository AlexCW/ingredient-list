export default {
  getIncludedData: function (context, ids) {
    context.included.map(function (u) {
      var indexId = ids.indexOf(u.id)
      if (indexId > -1) {
        ids[indexId] = u
      }
      return u
    })
    return ids
  },
  getRelationshipIdentifiers: function (context, key) {
    return context.relationships[key].data.map(function (u) {
      return u.id
    })
  }
}
