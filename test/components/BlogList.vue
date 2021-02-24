<template>
  <div class="container-fluid">
    <!-- search -->
    <div v-if="isVisible" class="container-fluid mb-3 px-0">
      <h3>Search Blogs</h3>

      <div class="row my-5">
        <div class="col-2">
          <label>Tiêu đề</label>
        </div>

        <div class="col-10">
          <input
            class="w-100"
            placeholder="Tiêu đề"
            v-model="titleSearchString"
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

      <table v-if="filteredBlogs.length > 0" class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Tin</th>
            <th scope="col">Loại</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Vị trí</th>
            <th scope="col">Ngày public</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <!-- chưa gọi ra được tên của cate và pos -->
          <tr v-for="blog in filteredBlogs" :key="blog.id">
            <th scope="row">{{ blog.id }}</th>
            <td>{{ blog.title }}</td>
            <td>{{ blog.category }}</td>
            <td>{{ blog.public }}</td>
            <td>{{ blog.position }}</td>
            <td>{{ blog.data_pubblic }}</td>
            <td>
              <button
                type="button"
                class="btn"
                @click="updateBlog(blog, blog.id)"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="deleteBlog(blog.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- list -->
    <h3>List Blogs</h3>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tin</th>
          <th scope="col">Loại</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Vị trí</th>
          <th scope="col">Ngày public</th>
          <th scope="col">Edit</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="blog in blogs" :key="blog.id">
          <th scope="row">{{ blog.id }}</th>
          <td>{{ blog.title }}</td>
          <td>{{ changeCategory(blog.category) }}</td>
          <td>{{ changePublic(blog.public) }}</td>
          <td>{{ changePosition(blog.position) }}</td>
          <td>{{ blog.data_pubblic }}</td>
          <td>
            <nuxt-link to="/blogs/edit">Edit</nuxt-link>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="deleteBlog(blog.id)"
            >
              Delete
            </button>
          </td>
          <td>{{ blog.position }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

var source_link = "http://localhost:4000/blogs";


export default {
  props: ["isVisible"],

  data() {
    return {
      blogs: [],
      titleSearchString: "",
      filteredBlogs: [],

      //categories
      categories: [
        { text: "Thời sự", value: "1" },
        { text: "Thế giới", value: "2" },
        { text: "Kinh doanh", value: "3" },
        { text: "Giải trí", value: "4" },
        { text: "Thể thao", value: "5" },
      ],

      positions: [
        { text: "Việt Nam", value: "1" },
        { text: "Châu Á", value: "2" },
        { text: "Châu Âu", value: "3" },
        { text: "Châu Mỹ", value: "4" },
      ],
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
    changeCategory: function (categoryIndex) {
      let result = ""

      if (categoryIndex > 0) {
        switch (categoryIndex) {
          case 1:
            result = "Thời sự"
            break;
          case 2:
            result = "Thế giới"
            break;
          case 3:
            result = "Kinh doanh"
            break;
          case 4:
            result = "Giải trí"
            break;
          case 5:
            result = "Thể thao"
            break;
          default:
            result = "error"
            break;
        }
      } else {
        return "error"
      }

      return result
    },

    /**
     * change index default => public name
     */
    changePublic: function (boolIndex) {
      let result = ""

      switch (boolIndex) {
        case false:
          result = "No"
          break;
        case true:
          result = "Yes"
          break;
        default:
          result = "error"
          break;
      }

      return result
    },

    /**
     * change id => category name
     */
    changePosition: function (arrayIndex) {
      // let lengthPositions = this.positions.length;
      // let lengthArrayInput = arrayIndex.length;
      
        if (arrayIndex) {
          // for (let index = 0; index < lengthPositions; index++) {
          //   for (let indexArray = 0; indexArray < lengthArrayInput; indexArray++) {
          //     if (arrayIndex[indexArray] == this.positions.value) {
          //       return this.positions.text
          //     }
          //   }
          //  }
        }
      
      let abc = arrayIndex
      console.log(abc);
    },


  },
};


</script>