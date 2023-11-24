<template>
  <loading :active="isLoading"
           :can-cancel="false"
           :is-full-page="true"/>
  <div class="container">
    <header class="main-header">
      <h2>Star Wars planets</h2>
    </header>
    <header class="search-bar">
      <input type="text" placeholder="Search.." name="search" v-model="filter" v-on:input="filterPlanets">
      <font-awesome-icon icon="search"/>
      <SortSelector @sortChanged="handleSortChange"/>
    </header>
    <div class="main-panel">
      <PlanetsGallery :planets="filteredAndSorted" class="main-panel"/>
    </div>
  </div>
</template>

<script>
import PlanetsGallery from '@/components/PlanetsGallery.vue'
import SortSelector from "@/components/SortSelector.vue";
import * as swapiService from '@/services/SwapiService'
import _ from 'lodash';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

export default {
  name: 'App',
  components: {
    SortSelector,
    PlanetsGallery,
    Loading
  },
  data() {
    return {
      abortController: null,
      filter: '',
      sort: null,
      planets: [],
      isLoading: false,
      filteredAndSorted: []
    }
  },
  mounted() {
    window.addEventListener('beforeunload', this.handlePageRefresh);
  },
  created() {
    this.abortController = new AbortController();
    this.fetchPlanets();
    this.filteredAndSorted = this.planets;
  },
  beforeUnmount() {
    this.abortController.abort();
  },
  methods: {
    handleSortChange(newSort) {
      this.sort = newSort;
      this.filterPlanets();
    },
    filterPlanets() {
      let result = this.planets;
      if (!_.isEmpty(this.filter)) {
        result = result.filter(each => each.name.toLowerCase().startsWith(this.filter.toLowerCase()));
      }
      if (!_.isEmpty(this.sort)) {
        result = _.sortBy(result, this.sort);
      }
      this.filteredAndSorted = result;
    },
    async fetchPlanets() {
      this.isLoading = true;
      const [newPlanets, error] = await swapiService.getPlanets(this.filter, this.abortController.signal);
      if (error == null) {
        this.planets = newPlanets;
      } else {
        this.filterPlanets();
      }
      this.isLoading = false;
    },
    handlePageRefresh() {
      this.abortController.abort();
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin-right: 1rem;
  margin-left: 1rem;
}

.main-header {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  align-self: auto;
  margin-bottom: 2rem;
}

.main-panel {
  display: block;
  flex-grow: 1;
  flex-shrink: 1;
  align-self: auto;
}

.search-bar {
  display: flex;
  align-items: flex-start;
  align-self: flex-end;
  margin-bottom: 2rem;
  margin-right: 2rem;
}


</style>
