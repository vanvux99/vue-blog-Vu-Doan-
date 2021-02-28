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
    // call back tới filteredBlog() và titleSearchString: chưa làm được
    data() {
      return {
        isVisible: true,
        form: {
          title: ''
        }
      };
    },

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