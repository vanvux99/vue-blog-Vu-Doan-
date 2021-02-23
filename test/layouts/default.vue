<template>
  <div>
    <app-header></app-header>
    <div class="container-fluid row mt-3">
      <div class="col-3">
        <app-menu></app-menu>
      </div>
      <div class="col-9">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>

import HeaderComponents from '@/components/AppHeader.vue'
import MenuComponents from '@/components/AppMenu.vue'

export default {
  components: {
    "appHeader": HeaderComponents,
    "menuHeader": MenuComponents,
  }
}

</script>

<style>


</style>
