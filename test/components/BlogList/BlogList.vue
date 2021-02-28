<template>
  <div class="container-fluid">
    <!-- search -->
    <div v-if="isVisible" class="container-fluid mb-3 px-0">
      <search-blog @search="searchAPI($event)"></search-blog>
      <data-table :filteredBlogs = "blogs"></data-table>
    </div>

    <!-- list -->
    <h3>List Blogs</h3>
      <data-table @deleted="getBlogs()"  :filteredBlogs= "blogs"></data-table>
  </div>
</template>

<script>
 
import axios from "axios";
import Search from "./search.vue"
import DataTable from "./list.vue"

const source_link = "http://localhost:3000/blogs/";

export default {
  props:[
    "isVisible"
  ],

  components: {
    "search-blog" : Search,
    "data-table" : DataTable,
  },

  data() {
    return {
      blogs: [],
      titleSearchString: "",
      filteredBlogs: [],
      status: "",
    };
  },

    mounted() {
      this.getBlogs();
    },

  methods: {
    searchAPI(form) {
            axios
        .get(source_link, {
          params: {
            title_like: form.title
          }
        })
        .then((response) => (this.blogs = response.data));
    },

    filteredBlog: function () {
      if (!this.titleSearchString) {
        return this.blogs;
      }

      const searchString = this.titleSearchString.trim().toLowerCase();

      this.filteredBlogs = this.blogs.filter(function (item) {
        if (item.title.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      });

      return this.filteredBlogs;
    },

    getBlogs: function () {
      axios
        .get(source_link)
        .then((response) => (this.blogs = response.data));
    },


  },
};


</script>