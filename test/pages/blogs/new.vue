<template>
  <blog-create-edit :title="title"></blog-create-edit>
</template>

<script>
import BlogCreateEdit from "~/components/BlogCreateEdit.vue";

export default {
  data() {
    return {
      title: "New Blogs",
    };
  },

  components: { BlogCreateEdit },
};
</script>