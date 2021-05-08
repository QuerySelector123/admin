<template>
  <div>
    <el-breadcrumb :separator-class="separator">
      <el-breadcrumb-item
        v-for="item in breadcrumb"
        :key="item.title"
        :to="handle(item)"
        >{{ item.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    separator: {
      type: String,
      default: "/"
    },
    breadcrumb: {
      type: Array
    }
  },

  data() {
    return {};
  },
  methods: {
    handle(obj) {
      if (obj.name) {
        return { name: obj.name };
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
