<template>
  <div class="container-fluid">
    <!-- search -->
    <div v-if="isVisible" class="container-fluid mb-3 px-0">
      <search-blog :filteredBlogsFunction = "filteredBlogs" ></search-blog>
      <data-table></data-table>
    </div>

    <!-- list -->
    <h3>List Blogs</h3>
      <data-table></data-table>
  </div>
</template>

<script>

// import 
import axios from "axios";
import Search from "@/pages/blogs/search.vue"
import DataTable from "./list.vue"


//#region  variables and child function
var source_link = "http://localhost:3000/blogs/";

const positionArray = [
  { text: "Việt Nam", value: 1 },
  { text: "Châu Á", value: 2 },
  { text: "Châu Âu", value: 3 },
  { text: "Châu Mỹ", value: 4 },
]

const categoriesArray = [
  { text: "Thời sự", value: 1 },
  { text: "Thế giới", value: 2 },
  { text: "Kinh doanh", value: 3 },
  { text: "Giải trí", value: 4 },
  { text: "Thể thao", value: 5 },
]

const publicArray = [
  { text: "Yes", value: true },
  { text: "No", value: false },
]

/**
 * method use for Categori, Public and Position
 * it return string 
 */
var getCategoriPublicPosition = (value, array) => {
  if (!value) return undefined
  if (typeof value == "object") {
    if (!value || !Array.isArray(value)) return undefined

    return value.map(element => { 
      const item = array.find(e => e.value === element)
      return item ? item.text : ''
    }).join(',')
  }
  let result = array.find( e => e.value == value)

  return result ? result.text : "Chưa được phân loại"
}
//#endregion

// export
export default {
  props: ["isVisible"],

  components: {
    "search-blog" : Search,
    "data-table" : DataTable,
  },

  data() {
    return {
      blogs: [],
      titleSearchString: "",
      filteredBlogs: [],
    };
  },

  mounted() {
    this.getBlogs();
  },

  methods: {
    getBlogs: function () {
      axios
        .get(source_link)
        .then((response) => (this.blogs = response.data));

        // var a = this.blogs;if (a) {
        //   var abc = a.filter( value1111 => { value1111 });
          
        // }
        console.log(this.blogs.length);
    },

    deleteBlog: function (id) {
      axios.delete(source_link + id).then(() => {
        this.getBlogs();
        alert("xóa thành công")
      });
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

    /**
     * change id => category name
     */
    changeCategory: function (categoryNumber) {
      return getCategoriPublicPosition(categoryNumber, categoriesArray)
    },

    /**
     * change index default => public name
     */
    changePublic: function (publicBool) {

      return getCategoriPublicPosition(publicBool, publicArray)
    },

    /**
     * change id => category name
     */
    changePosition: function (arrayIndex) {
      return getCategoriPublicPosition(arrayIndex, positionArray)
    },


  },
};


</script>