<template>
  <div>
      <h1>{{status}}</h1>
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
          <tr v-for="blog in filteredBlogs" :key="blog.id">
            <th scope="row">{{ blog.id }}</th>
            <td>{{ blog.title }}</td>
            <td>{{ changeCategory(blog.category) }}</td>
            <td>{{ changePublic(blog.public) }}</td>
            <td>{{ changePosition(blog.position) }}</td>
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
</template>

<script>
import axios from "axios";

const source_link = "http://localhost:3000/blogs/";

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

export default {
    props : [
        "status",
        "filteredBlogs",
    ],

    mounted() {
      this.getBlogs();
    },

    methods : {
        getCategoriPublicPosition (value, array) {
          if (!value) return "Chưa được phân loại"
          if (typeof value == "object") {
            if (!value || !Array.isArray(value)) return undefined

            return value.map(element => { 
              const item = array.find(e => e.value === element)
              return item ? item.text : ''
            }).join(',')
          }
          let result = array.find( e => e.value == value)

          return result ? result.text : "Chưa được phân loại"
        },

        /**
         * change id => category name
         * cmt lại đoạn này
         */
        changeCategory: function (categoryNumber) {
            return this.getCategoriPublicPosition(categoryNumber, categoriesArray)
        },

        /**
         * change index default => public name
         */
        changePublic: function (publicBool) {
            const item = publicArray.find(e => e.value === publicBool)
            return item ? item.text : ''
        },

        /**
         * change id => category name
         */
        changePosition: function (arrayIndex) {
            return this.getCategoriPublicPosition(arrayIndex, positionArray)
        },

        getBlogs: function () {
          axios
            .get(source_link)
            .then((response) => {
              console.log(response.data)
              this.blogs = response.data
              });
        },

        deleteBlog: function (id) {
          axios.delete(source_link + id).then(() => {
            alert("xóa thành công")
            this.$emit('deleted', true)
          });
        },

        updateBlog: function (data, id) {
          console.log(data, id);
          // axios.put(source_link + id, data);
          this.$router.push('/blogs/' + id)
        },
    },
}
</script>

<style>

</style>