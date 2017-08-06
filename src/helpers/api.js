export default {
  getIncludedData: function (context, ids) {
    context.included.map(include => {
      var indexId = ids.indexOf(include.id)
      if (indexId > -1) {
        ids[indexId] = include
      }
      return include
    })

    return ids
  },
  getRelationshipIdentifiers: function (context, key) {
    return context.relationships[key].data.map(relation => relation.id)
  }
}
