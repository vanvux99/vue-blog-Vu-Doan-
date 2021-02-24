<template>
  <div class="container-fluid">
    <h3>{{ title }}</h3>

    <!-- title -->
    <div class="form-group">
      <label class="col-2 ml-2">Tiêu đề</label>
      <div class="col-10">
        <input class="w-75 form-control" v-model="form.title" type="text" />
      </div>
    </div>

    <!-- description -->
    <div class="form-group">
      <label class="col-2 ml-2">Mô tả ngắn</label>
      <div class="col-10">
        <input class="w-75 form-control" v-model="form.des" type="text" />
      </div>
    </div>

    <!-- detail -->
    <div class="form-group">
      <label class="col-2 ml-2">Chi tiết</label>
      <div class="col-10">
        <textarea
          v-model="form.detail"
          rows="10"
          class="form-control"
        ></textarea>
      </div>
    </div>

    <!-- thumbs -->
    <div class="form-group">
      <label class="col-2 ml-2">Hình ảnh</label>
      <div class="col-10">
        <button>Choose files</button>
      </div>
    </div>

    <!-- category -->
    <div class="form-group">
      <label class="col-2 ml-2">Loại</label>
      <div class="col-10">
        <select v-model="form.category">
          <option
            v-for="category in categories"
            :value="category.value"
            :key="category.value"
          >
            {{ category.text }}
          </option>
        </select>
      </div>
    </div>

    <!-- position -->
    <div class="form-group">
      <label class="col-2 ml-2">Vị trí</label>
      <div class="col-10"
            v-for="itemCheckbox in positions" 
            :value="itemCheckbox.value"
            :key ="itemCheckbox.value"
      >
        <input type="checkbox" :value="itemCheckbox.value" v-model="form.position" />
        <label>{{itemCheckbox.text}}</label>
        <br />
      </div>
    </div>

    <!-- public -->
    <div class="form-group">
      <label class="col-2 ml-2">Public</label>
      <div class="col-10"
            v-for="item in publics" 
            :value="item.value"
            :key ="item.value"
      >
        <input type="radio" :value="item.value" v-model="form.public" />
        <label>{{item.text}}</label>
        <br />
      </div>
    </div>

    <!-- date -->
    <div class="form-group">
      <label class="col-2 ml-2">Date Public</label>
      <div class="col-10">
        <input type="date" v-model="form.data_pubblic" />

        <!-- button -->
        <div class="form-group d-flex justify-content-center">
          <!--  create button -->
          <button
            v-if="title === 'New Blogs'"
            type="button"
            class="btn btn-success mr-2"
            @click="postBlog()"
          >
            Submit
          </button>

          <!-- edit button -->
          <button
            v-if="title === 'Edit Blogs'"
            type="button"
            class="btn btn-success mr-2"
            @click="updateBlog(this.form)"
          >
            Submit
          </button>

          <button type="button" @click="clear()" class="btn btn-primary">
            Clear
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

var source_link = "http://localhost:4000/blogs";

export default {
  props: ["title"],

  data: function () {
    return {
      //form array
      form: {
        title: "",
        des: "",
        detail: "",
        category: "",
        public: "",
        position: "",
        data_pubblic: "",
      },

      //category array
      categories: [
        { text: "Thời sự", value: "1" },
        { text: "Thế giới", value: "2" },
        { text: "Kinh doanh", value: "3" },
        { text: "Giải trí", value: "4" },
        { text: "Thể thao", value: "5" },
      ],
      
      publics: [
        { text: "Yes", value: "1" },
        { text: "No", value: "2" },
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
    this.getBlog();
  },

  methods: {
    postBlog: function () {
      console.warn(this.form)
      axios.post(source_link, this.form).then(() => {});
      // check thông báo thành công, hoặc thất bại, chuyển người dùng đi tới trang chủ hoặc quay lại
    },

    clear: function () {
      this.form.title = "";
      this.form.des = "";
      this.form.detail = "";
      this.form.category = "";
      this.form.public = "";
      this.form.position = [];
      this.form.data_pubblic = "";
    },

    getBlog: function () {
      if (this.$route.params.id) {
        axios
          .get(source_link + this.$route.params.id)
          .then((response) => (this.form = response.data))
      }
    },

    updateBlog: function (data, id) {
      axios.put(source_link + id, data);
    },
  },
};
</script>
