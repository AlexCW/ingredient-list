<template class="lookahead">
  <input class="typeahead form-control" type="text" autocomplete="false"/>
</template>

<script>
import Typeahead from 'typeahead.js'

export default {
  components: [Typeahead],
  mounted () {
    this.getOptions()
  },
  data () {
    return {
      options: [],
      match: ''
    }
  },
  methods: {
    getOptions () {
      var that = this
      this.$parent.getOptions(function (data) {
        if (that.$parent.hasOwnProperty('formatOptions')) {
          data = that.$parent.formatOptions(data)
        }

        that.options = data
        that.bindTypeahead(that.$el)
      })
    },
    getTemplate (match) {
      this.match = match
      return '<div><h2>' + match + '</h2></div>'
    },
    substringMatcher (strs) {
      return function findMatches (q, cb) {
        var matches = []

        var substrRegex = ''

        matches = []

        substrRegex = new RegExp(q, 'i')
        strs.forEach(function (str, i) {
          if (substrRegex.test(str)) {
            matches.push(str)
          }
        })
        cb(matches)
      }
    },
    bindTypeahead (el) {
      var that = this

      window.jQuery(el).typeahead({
        hint: true,
        minLength: 3
      },
        {
          name: 'typeahead',
          source: this.substringMatcher(this.options),
          displayKey: that.displayKey,
          templates: {
            suggestion: function (match) {
              return that.getTemplate(match)
            }
          }
        }).bind('typeahead:select', function (ev, suggestion, e) {
          that.$emit('input', suggestion)
        }).bind('typeahead:change', function (ev, suggestion, e) {
          that.$emit('input', suggestion)
        })
    }
  },
  template: '.lookahead'
}
</script>