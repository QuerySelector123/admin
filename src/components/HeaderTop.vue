<template>
  <div class="header">
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            alt=""
          />
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" @click.native="tulogin">
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { SET_INFO } from "../store/moustation-type";
import { mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations([SET_INFO]),
    tulogin() {
      this[SET_INFO]({
        token: "",
        username: ""
      });
      this.$router.push({
        name: "login"
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  height: 60px;
  border-bottom: 1px solid rgb(230, 230, 230);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
