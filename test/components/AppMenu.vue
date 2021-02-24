<template>
  <div>
      <div>
        <nuxt-link to="/blogs/list">
          <button type="button" class="btn btn-secondary listbtn"> List </button>
         </nuxt-link>
      </div>

      <div>
        <nuxt-link to="/blogs/new"> 
          <button type="button" class="btn btn-secondary listbtn">  New  </button>
        </nuxt-link>
      </div>

      <div>
        <nuxt-link to="/blogs/search">
          <button type="button" class="btn btn-secondary listbtn"> Search </button>
        </nuxt-link>
      </div>

      <div>
        <nuxt-link to="/blogs/edit"> 
          <button type="button" class="btn btn-secondary listbtn"> Edit </button>
        </nuxt-link>
      </div>
  </div>
</template>

<script>

export default {

}
</script>

<style>
  .listbtn {
          width: 180px;
          height: 50px;
          margin-left: 50px;
      }
</style>