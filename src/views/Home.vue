<template>
  <div class="home">
    <side-left></side-left>
    <div ref="right" class="right">
      <div class="top">
        <header-top></header-top>
      </div>
      <div class="bottom">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideLeft from "../components/side-left";
import HeaderTop from "@/components/HeaderTop";
export default {
  components: {
    SideLeft,
    HeaderTop
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: calc(100vw - 200px);
    max-width: calc(100vw - 64px);
    .bottom {
      flex: 1;
      display: flex;
      background: rgb(245, 247, 249);
      padding: 20px;
      overflow: hidden;
      box-sizing: border-box;
    }
  }
}
</style>
