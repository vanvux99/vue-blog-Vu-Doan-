<template>
  <div>
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
</template>

<script>
export default {
    // emit tới filteredBlogs 
}
</script>

<style>

</style>