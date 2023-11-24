<template>
  <div class="sort-selector">
    <select v-model="selectedSort" @change="emitSortChange">
      <option :key="each" v-for="each in Object.keys(options)" :value="each">{{ options[each] }}</option>
    </select>
  </div>
</template>

<script setup>
const options = {
  'name': "Name",
  'population': "Planet Population",
  "rotation_period": "Rotation Period",
  "orbital_period": "Orbital Period",
  "diameter": "Diameter",
}

</script>

<script>
export default {
  name: 'SortSelector',
  data() {
    return {
      selectedSort: 'name' // default sort option
    };
  },
  methods: {
    emitSortChange() {
      this.$emit('sortChanged', this.selectedSort);
    }
  }
};
</script>

<style>
.sort-selector {
  margin-left: 1rem;
  width: 5rem;
}
</style>
