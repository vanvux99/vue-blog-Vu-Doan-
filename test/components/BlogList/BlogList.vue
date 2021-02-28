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

const SOURCE_LINK = "http://localhost:3000/blogs/";

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
    
    /** search API 
     * @author Vu Doan
     * @param  <form>
     * @return data of server
     * 
     * @since 1-3-2021
     */
    searchAPI(form) {
            axios
        .get(source_link, {
          params: {
            title_like: form.title
          }
        })
        .then((response) => (this.blogs = response.data));
    },

    /** title search
     * @author Vu Doan
     * @param  
     * @return title use input
     * 
     * @since 1-3-2021
     */
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

    /** call API take data server
     * @author Vu Doan
     * @param  
     * @return data of server by SOURCE_LINK
     * 
     * @since 1-3-2021
     */
    getBlogs: function () {
      axios
        .get(SOURCE_LINK)
        .then((response) => (this.blogs = response.data));
    },
  },
};

</script>