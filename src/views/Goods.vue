<template>
  <div>
    <h1>goods</h1>
  </div>
</template>

<script>
import _ from "underscore";
export default {
  mounted() {
    var objs = [
      { val1: "abc", val2: "a" },
      { val1: "fgh", val2: "b" },
      { val1: "cde", val2: "c" }
    ];
    var sortedValues = _.sortBy(objs, "val1");
    console.log(sortedValues);
    // 浅拷贝只拷贝一层
    var _data = _.clone(objs);
    var data = _.deep(objs);
    objs[0].val1 = "aaaa";
    console.log(data);
  }
};
</script>

<style lang="scss" scoped></style>
