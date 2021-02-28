<template>
  <div>
      <h3>Search Blogs</h3>

      <div class="row my-5">
        <div class="col-2">
          <label>Tiêu đề</label>
        </div>

        <div class="col-10">
          <input
            class="w-100"
            placeholder="Tiêu đề"
            v-model="form.title"
          />
        </div>
      </div>

      <button
        type="button"
        @click="filteredBlog()"
        class="btn btn-success mb-3"
      >
        Search
      </button>
  </div>
</template>

<script>
import BlogList from '~/components/BlogList/BlogList';
export default {
    data() {
      return {
        isVisible: true,
        form: {
          title: ''
        }
      };
    },

  /** event search to components partner
     * @author Vu Doan
     * @param  
     * @return update data into page edit
     * 
     * @since 1-3-2021
     */
    methods : { 
      filteredBlog() {
        this.$emit("search", this.form)
      }
    },
        
    components: { BlogList },
}
</script>

<style>

</style>