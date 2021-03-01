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
import { SOURCE_LINK } from "~/const";
import { POSITIONS } from "~/const";
import { CATEGORIES } from "~/const";
import { PUBLICS } from "~/const";

export default {
    props : [
        "status",
        "filteredBlogs",
    ],

    mounted() {
      this.getBlogs();
    },

    data: function () {
      return {
        categories: CATEGORIES,
        publics: PUBLICS,
        positions: POSITIONS,
      }
    },


    methods : {

    /** dùng để phân loại categories, position và public
     * @author Vu Doan
     * @param  value index input
     * @param  array array input (categories, position, public)
     * @return "chưa được phân loại" or string of element
     * 
     * @since 1-3-2021
     */
      getCategoriPublicPosition (value, array) {
        if (!value) return "Chưa được phân loại"
        if (typeof value == "object") {
          if (!value || !Array.isArray(value)) return "Chưa được phân loại"

          return value.map(element => { 
            const item = array.find(e => e.value === element)
            return item ? item.text : ''
          }).join(',')
        }
        let result = array.find( e => e.value == value)

        return result ? result.text : "Chưa được phân loại"
      },

    /** changeCategory
     * @author Vu Doan
     * @param  category index input (Category)
     * @return "chưa được phân loại" or string of (Category)
     * 
     * @since 1-3-2021
     */
      changeCategory: function (category) {
          return this.getCategoriPublicPosition(category, this.categories)
      },

    /** changePublic
     * @author Vu Doan
     * @param  public index input (Public)
     * @return "chưa được phân loại" or string of (Public)
     * 
     * @since 1-3-2021
     */
      changePublic: function (_publics) {
          const item = this.publics.find(e => e.value === _publics)
          return item ? item.text : ''
      },

    /** changePosition
     * @author Vu Doan
     * @param  position index input (Position)
     * @return "chưa được phân loại" or string of (Position)
     * 
     * @since 1-3-2021
     */
      changePosition: function (position) {
          return this.getCategoriPublicPosition(position, this.positions)
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
          .then((response) => {
            // console.log(response.data)
            this.blogs = response.data
            });
      },

    /** deleteBlog
     * @author Vu Doan
     * @param  id of blog deleting
     * @return "xóa thành công"
     * 
     * @since 1-3-2021
     */
      deleteBlog: function (id) {
        axios.delete(SOURCE_LINK + id).then(() => {
          alert("xóa thành công")
          this.$emit('deleted', true)
        });
      },

    /** edit blog
     * @author Vu Doan
     * @param  
     * @return update data into page edit
     * 
     * @since 1-3-2021
     */
      updateBlog: function (data, id) {
        this.$router.push('/blogs/' + id)
      },
    },
}
</script>

<style>

</style>