<template>
  <blog-create-edit :title="title"></blog-create-edit>
</template>

<script>
import BlogCreateEdit from "@/components/BlogCreateEdit.vue";

export default {
  data() {
    return {
      title: "Edit Blogs",
    };
  },

  components: { BlogCreateEdit },
};
</script>