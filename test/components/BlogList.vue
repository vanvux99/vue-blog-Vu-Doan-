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
          <td>{{ blog.category }}</td>
          <td>{{ blog.public }}</td>
          <td>{{ blog.position }}</td>
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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

const resource_url = "http://localhost:3000/blogs"

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
    };
  },

  mounted() {
    this.getBlogs();
  },

  methods: {
    getBlogs: function () {
      axios
        .get("http://localhost:3000/blogs")
        .then((response) => (this.blogs = response.data));
    },

    deleteBlog: function (id) {
      axios.delete("http://localhost:3000/blogs/" + id).then(() => {
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
  },
};
</script>