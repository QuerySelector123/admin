<template>
  <div class="side">
    <div class="h1" v-if="!isCollapse">后台管理</div>
    <div class="img" v-else><img src="../assets/img/logo.jpg" alt="" /></div>
    <!-- <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#001529"
      text-color="#999999"
      active-text-color="#fff"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">
            <router-link tag="span" :to="{name:'users'}">用户列表</router-link> </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-2">角色列表</el-menu-item>
          <el-menu-item index="1-3">权限列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-4">商品列表</el-menu-item>
          <el-menu-item index="1-5">分类参数</el-menu-item>
          <el-menu-item index="1-6">商品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-7">订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-s-promotion"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-8">数据列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu> -->
    <input
      class="ipt"
      type="checkbox"
      v-model="isCollapse"
      :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
    />
    <el-menu
      :default-active="activeIndex"
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#aaa"
      active-text-color="#fff"
      :router="true"
    >
      <el-submenu :index="'' + item.id" v-for="item in list" :key="item.id">
        <template slot="title">
          <i class="el-icon-user-solid" v-if="item.authName == '用户管理'"></i>
          <i class="el-icon-more" v-if="item.authName == '权限管理'"></i>
          <i class="el-icon-s-goods" v-if="item.authName == '商品管理'"></i>
          <i class="el-icon-s-order" v-if="item.authName == '订单管理'"></i>
          <i class="el-icon-s-data" v-if="item.authName == '数据统计'"></i>
          <span>{{ item.authName }}</span>
        </template>

        <el-menu-item
          v-for="it in item.children"
          :key="it.id"
          :index="'/home/' + it.path"
          >{{ it.authName }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      isCollapse: false,
      activeIndex: ""
    };
  },
  methods: {
    async getMenu() {
      const lists = await this.$api.getMenus();
      this.list = lists;

      // this.$api.getMenus().then(res => {
      //   this.list = res;
      //   // console.log(this.list);
      // });
    }
  },
  created() {
    this.getMenu();
  },
  async beforeRouterEnter(to, from, next) {
    const lists = await api.getMenu();
    next(vm => {
      vm.lists = lists;
    });
  },
  watch: {
    $route: {
      immediate: true,
      handler(value) {
        this.activeIndex = "/home/" + value.name.toLowerCase();
      }
    },
    isCollapse: {
      immediate: true,
      handler(val) {
        // if (val) {
        //   this.$parent.$refs.right.style.maxWidth = `calc(100vw - 64px)`;
        //   return;
        // }
        // setTimeout(() => {
        //   this.$parent.$refs.right.style.maxWidth = `calc(100vw - 200px)`;
        // }, 300);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
.side {
  position: relative;
  height: 100vh;
  background: #001529;
  .h1 {
    color: white;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .el-menu {
    border-right: 0;
  }
  .ipt {
    position: absolute;
    font-size: 25px;
    background-color: none;
    border: none;
    -webkit-appearance: none; /*去除默认样式*/
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    -ms-appearance: none;
    position: absolute;
    top: 13px;
    right: -50px;
    cursor: pointer;
  }
}
</style>
