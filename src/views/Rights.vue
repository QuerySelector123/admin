<template>
  <div>
    <h1>内容插槽</h1>
    <test>
      hello word
    </test>
    <h1>
      插槽内 也可以包含任何模板代码 包括 HTML
    </h1>
    <test>
      <!-- 添加一个foot Awesome 图标 -->
      <i class="el-icon-edit"></i>
    </test>
    <!-- 插槽内 添加 其他组件  -->
  </div>
</template>

<script>
import test from "./test";
export default {
  components: {
    test
  }
};
</script>

<style lang="scss" scoped></style>
