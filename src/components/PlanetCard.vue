<template>
  <div class="planet-card">
    <h3>{{ planet.name }}</h3>
    <p>Climate: {{ planet.climate }}</p>
    <p>Population: {{ planet.population }}</p>
    <!-- Add more planet properties as needed -->
  </div>
</template>

<script>
export default {
  props: {
    planet: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.planet-card {
  width: 500px;
  border: solid red 1px;
}
</style>

