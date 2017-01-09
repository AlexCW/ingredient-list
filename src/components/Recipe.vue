<template>
  <div id="recipes">
    <p>Name: {{recipe.attributes.name}}</p>
    <p>Summary: {{recipe.attributes.summary}}</p>
    <p>Prep Time: {{recipe.attributes['prep-time']}}</p>
  </div>
</template>

<script>
export default {
  props: ['recipe'],
  template: '#recipes'
}
</script>