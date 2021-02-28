
<template>
  <div class="container-fluid">
    <h3>{{ title }}</h3>
    <form>
      <!-- title -->
      <div class="form-group">
        <label class="col-2 ml-2">Tiêu đề</label>
        <div class="col-10">
          <input class="w-75 form-control" id="title" v-model="form.title" type="text" />
        </div>
        <span class="messError"></span>
      </div>

      <!-- description -->
      <div class="form-group">
        <label class="col-2 ml-2">Mô tả ngắn</label>
        <div class="col-10">
          <input class="w-75 form-control" id="description" v-model="form.des" type="text" />
        </div>
        <span class="messError"></span>
      </div>

      <!-- detail -->
      <div class="form-group">
        <label class="col-2 ml-2">Chi tiết</label>
        <div class="col-10">
          <textarea
            v-model="form.detail"
            rows="10"
            class="form-control"
            id="detail"
          ></textarea>
        </div>
        <span class="messError"></span>
      </div>

      <!-- image -->
      <div class="form-group">
        <label class="col-2 ml-2">Hình ảnh</label>
        <div class="col-10">
          <button>Choose files</button>
          <label> Không có tệp nào được chọn </label>
        </div>
        <span class="messError"></span>
      </div>

      <!-- category -->
      <div class="form-group">
        <label class="col-2 ml-2">Loại</label>
        <div class="col-10">
          <select id="caterogy" v-model="form.category">
            <option
              v-for="category in categories"
              :value="category.value"
              :key="category.value"
            >
              {{ category.text }}
            </option>
          </select>
        </div>
        <span class="messError"></span>
      </div>

      <!-- position -->
      <div class="form-group">
        <label class="col-2 ml-2">Vị trí</label>
        <div class="col-10"
              v-for="itemCheckbox in positions" 
              :value="itemCheckbox.value"
              :key ="itemCheckbox.value"
        >
          <input type="checkbox" :id="'cb_'+itemCheckbox.value" :value="itemCheckbox.value" v-model="form.position" />
          <label :for="'cb_'+itemCheckbox.value">{{itemCheckbox.text}}</label>
          <br />
        </div>
        <span class="messError"></span>
      </div>

      <!-- public -->
      <div class="form-group">
        <label class="col-2 ml-2">Public</label>
        <div class="col-10"
              v-for="item in publics" 
              :value="item.value"
              :key ="item.value"
        >
          <input type="radio" :id="'pl_'+item.value " :value="item.value" v-model="form.public" />
          <label :for="item.value">{{item.text}}</label>
          <br />
        </div>
        <span class="messError"></span>
      </div>

      <!-- date -->
      <div class="form-group">
        <label class="col-2 ml-2">Date Public</label>
        <div class="col-10">
          <input type="date" v-model="form.data_pubblic" />
        </div>
        <span class="messError"></span>
      </div>
      
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
          @click="updateBlog(form, form.id)"
        >
          Submit
        </button>

        <button type="button" @click="clear()" class="btn btn-primary">
          Clear
        </button>

        <button type="button" @click="a()">TEST</button>
      </div>
    </form>
  </div>
</template>

<script> 

import axios from "axios";

//#region  variables and methods other
const CATEGORIES = [
  { text: "Thời sự", value: 1},
  { text: "Thế giới", value: 2 },
  { text: "Kinh doanh", value: 3 },
  { text: "Giải trí", value: 4 },
  { text: "Thể thao", value: 5 },
]
      
const PUBLICS = [
  { text: "Yes", value: 1 },
  { text: "No", value: 2 },
]

const POSITIONS = [
  { text: "Việt Nam", value: 1 },
  { text: "Châu Á", value: 2 },
  { text: "Châu Âu", value: 3 },
  { text: "Châu Mỹ", value: 4 },
]

const FORM = {
  title: "",
  des: "",
  detail: "",
  category: [],
  public: "",
  position: [],
  data_pubblic: "",
}

const ERRORS = [
  {type : "text", text : "Vui lòng nhập lại !"},
  {type : "radio", text : "Vui lòng chọn lại !"},
  {type : "checkbox", text : "Vui lòng chọn lại !"},
]

const SOURCE_LINK = "http://localhost:3000/blogs/";

//#endregion 


export default {
  props: ["title"],

  data: function () {
    return {
      form: FORM,
      categories: CATEGORIES,
      publics: PUBLICS,
      positions: POSITIONS,
      errors: ERRORS,
    };
  },

  mounted() {
    this.getBlog();
  },

  methods: {
    
    /** 
     * @author Vu Doan
     * @param  element: called element
     * @param  selector: selector to class ".form-group"
     * @return parentElement have class ".form-group"
     * 
     * @since 1-3-2021
     */
    getParent: function(element, selector) {
      while (element.parentElement) {
          if (element.parentElement.matches(selector)) {
            return element.parentElement
          }
        element = element.parentElement
      }
    },

    /** check valid element into form
     * @author Vu Doan
     * @param  id id for element input
     * @return parentElement have class ".form-group"
     * 
     * @since 1-3-2021
     */
    checkValid: function(id) {
      let form = document.querySelector("form")
      let checkId = document.querySelector(id)

      if(checkId) 
      { 
        let checkType = checkId.type
        let getType = this.errors.find(e => e.type == checkType)
        if(getType)
        { 
          let value = document.querySelector(id).value
          let formGroup = form.querySelector(".form-group")
          let err = this.getParent(checkId, formGroup)
          console.log(err);
          err.querySelector(".messError");
          if(value == null){
            return err.innerHTML = ""
          }
          else {
            return err.innerHTML = getType.text
          }
        }
        else  return false
      }
      else  return false
    },

    postBlog: function () {

      if(this.checkValid("#title") == false)
      { 
        let inputElement = document.querySelector(idElement)
        let erorElement = inputElement.parentElement.querySelector(".messError")

        erorElement.innerText = "có lỗi"
      } 
      else {
        axios.post(SOURCE_LINK, this.form).then(() => {
          alert("thêm thành công")
          this.$router.push('/blogs/list')
        })
      }
      
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
          .get(SOURCE_LINK + this.$route.params.id)
          .then((response) => (this.form = response.data))
      }
    },

    updateBlog: function (data, id) {
      //console.log(data, id);
      //axios.put(source_link + id, data);
      alert("Sửa thành công")
      this.$router.push('/blogs/list')
    },
  },
};



</script>
