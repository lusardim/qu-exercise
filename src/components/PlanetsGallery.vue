<template>
  <div class="container">
    <PlanetCard
        v-for="planet in planets"
        :key="planet.name"
        :planet="planet"
    />
  </div>
</template>

<script>
import PlanetCard from '@/components/PlanetCard.vue';

export default {
  props: {
    planets: {
      type: Array,
      required: true
    }
  },
  data() {
    return  {page: 0};
  },
  methods: {
  },
  components: {
    PlanetCard
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* Create four equal columns that sits next to each other */
.container {
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
  gap: 10px;
  margin-left: 2rem;
  margin-right: 2rem;
}

.planets-container div {
  object-fit: cover;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  border-radius: 5px;}

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 800px) {
  .planets-container {
    flex: 50%;
    max-width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .planets-container {
    flex: 100%;
    max-width: 100%;
  }
}
</style>
