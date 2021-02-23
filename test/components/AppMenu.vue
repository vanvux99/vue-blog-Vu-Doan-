<template>
  <div>
      <div>
      <button type="button" class="btn btn-secondary listbtn">
        <nuxt-link to="/blogs/list"> List </nuxt-link>
        </button>
      </div>

      <div>
      <button type="button" class="btn btn-secondary listbtn">
        <nuxt-link to="/blogs/new"> New </nuxt-link>
        </button>
      </div>

      <div>
      <button type="button" class="btn btn-secondary listbtn">
        <nuxt-link to="/blogs/search"> Search </nuxt-link>
        </button>
      </div>

      <div>
      <button type="button" class="btn btn-secondary listbtn">
        <nuxt-link to="/blogs/edit"> Edit </nuxt-link></button>
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