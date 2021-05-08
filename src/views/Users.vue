<template>
  <div class="users">
    <Breadcrumb
      :separator="'el-icon-arrow-right'"
      :breadcrumb="breadcrumb"
    ></Breadcrumb>
    <!-- -------------------------------- -->
    <el-form
      @keyup.enter.native="queryvalue"
      @submit.native.prevent
      :inline="true"
      :model="inputdata"
      class="demo-form-inline"
    >
      <el-form-item class="iput" :prop="inputdata.query">
        <el-input
          v-model="inputdata.query"
          placeholder="请输入内容"
          style="width:360px"
          clearable
          @blur="queryvalue"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="queryvalue"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogFormVisible = true" type="primary "
          >添加用户</el-button
        >
      </el-form-item>
    </el-form>

    <!-- ---------------------------------- -->

    <el-table :data="tableData" v-if="tableData" border height="480">
      <el-table-column label="#" type="index" :index="indexadd" width="50">
      </el-table-column>
      <el-table-column label="姓名" prop="username" width="120">
      </el-table-column>
      <el-table-column label="邮箱" prop="email" width="160"> </el-table-column>
      <el-table-column label="电话" prop="mobile"> </el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          {{ scope.row.create_time | formateDate }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changestate(scope.row.mg_state, scope.row.id)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button
              type="primary"
              v-model="scope.row.id"
              @click="edit(scope.row)"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              v-model="scope.row.id"
              type="danger"
              @click="remove(scope.row.id)"
              icon="el-icon-delete"
              circle
            ></el-button>
            <el-button
              v-model="scope.row.id"
              type="success"
              @click="role(scope.row)"
              icon="el-icon-check"
              circle
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- ----------------------------------- -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="ruleForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addhuser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- ---------------------------------------- -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listObj.pagenum"
        :page-sizes="[1, 2, 3, 4, 5]"
        :page-size="listObj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totall"
      >
      </el-pagination>
    </div>
    <!-- -----------------编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="FormVisible">
      <el-form :model="editForm">
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input :disabled="true" v-model="editForm.username"></el-input>
        </el-form-item>

        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="editForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="editForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="FormVisible = false">取 消</el-button>
        <el-button type="primary" @click="OK">确 定</el-button>
      </div>
    </el-dialog>

    <!-- ------分配用户 -->
    <el-dialog title="分配用户" :visible.sync="userVisible">
      <el-form :model="listuser">
        <el-form-item
          label="用户名"
          prop="username"
          :label-width="formLabelWidth"
        >
          <el-input :disabled="true" v-model="listuser.username"></el-input>
        </el-form-item>

        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="listuser.value">
            <el-option
              v-for="item in listuser.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userVisible = false">取 消</el-button>
        <el-button type="primary" @click="rloeOK">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { formateDate } from "../assets/date";
export default {
  data() {
    return {
      listObj: {
        query: null,
        pagenum: 1,
        pagesize: 5
      },
      listuser: {
        username: "",
        options: [
          {
            value: -1,
            label: "请选择",
            disabled: true
          },
          {
            value: 30,
            label: "主管"
          },
          {
            value: 31,
            label: "测试角色"
          },
          {
            value: 34,
            label: "测试角色2"
          },
          {
            value: 39,
            label: "超级管理员"
          },
          {
            value: 40,
            label: "test"
          }
        ],
        value: -1
      },
      userVisible: false,
      totall: 5,
      FormVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      tableData: [],
      inputdata: {
        query: ""
      },
      breadcrumb: [
        {
          title: "首页",
          name: "login"
        },
        {
          title: "用户管理"
        },
        {
          title: "用户列表"
        }
      ],
      oldtext: "",
      userid: "",
      editForm: {
        username: "",
        email: "",
        mobile: ""
      },
      ruleForm: {
        username: "",
        password: "",
        mobile: "",
        email: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      roleobj: {
        id: "",
        userid: ""
      }
    };
  },
  methods: {
    indexadd(index) {
      return (this.listObj.pagenum - 1) * this.listObj.pagesize + index + 1;
    },
    getUser() {
      this.$api.getUserlist(this.listObj).then(res => {
        this.tableData = res.users;
        this.totall = res.total;
      });
    },
    handleSizeChange(val) {
      // 每页多少条

      this.$router.replace({
        query: {
          pagesize: Number(val),
          pagenum: Number(this.listObj.pagenum)
        }
      });
    },
    handleCurrentChange(val) {
      // 当前第几页

      this.$router.replace({
        query: {
          pagenum: Number(val),
          pagesize: Number(this.listObj.pagesize)
        }
      });
    },
    queryvalue() {
      // 查询值  不能直接绑定查询值
      localStorage.setItem("query", this.inputdata.query);
      this.listObj.query = this.inputdata.query;
      // this.$router.replace({
      //   query: {
      //     search: this.inputdata.query
      //   }
      // });
      // this.listObj = { ...this.listObj, ...this.inputdata };
      this.getUser();
    },
    remove(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.removeUser(id).then(res => {
            this.$message({
              type: "success",
              message: res.meta.msg
            });
            this.getUser();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addhuser() {
      this.dialogFormVisible = false;
      this.$api.adduser(this.ruleForm).then(res => {
        this.$message({
          type: "success",
          message: res.meta.msg
        });
        this.getUser();
      });
    },

    edit(obj) {
      this.userid = obj.id;
      this.FormVisible = true;
      this.editForm = Object.assign(this.editForm, obj);
    },
    OK() {
      this.FormVisible = false;
      this.$api
        .editting(this.userid, {
          usernam: this.editForm.username,
          mobile: this.editForm.mobile,
          email: this.editForm.email
        })

        .then(res => {
          this.$message({
            type: "success",
            message: res.meta.msg
          });
          this.getUser();
        });
    },

    changestate(state, id) {
      this.$api.changeState(state, id).then(res => {
        this.$message({
          type: "success",
          message: res.meta.msg
        });
      });
    },
    role(obj) {
      this.userVisible = true;
      this.listuser.username = obj.username;
      this.roleobj.id = obj.id;

      this.$api.rid(obj.id).then(res => {
        this.roleobj.userid = res.data.rid;
        this.listuser.value = res.data.rid;
      });
    },
    rloeOK() {
      this.userVisible = false;
      this.roleobj.userid = this.listuser.value;

      this.$api
        .roleuser(this.roleobj.id, {
          id: this.roleobj.id,
          rid: this.roleobj.userid
        })
        .then(res => {
          console.log(res);
          this.$message({
            type: "success",
            message: res.meta.msg
          });
          this.getUser();
        });
    }
  },
  mounted() {
    // Object.assign(this.inputdata, this.$route.query);
    // this.inputdata = Object.assign(this.inputdata, this.$route.query);
    // console.log(this.$route.query, this.inputdata);
    this.inputdata.query = localStorage.getItem("query");
    if (localStorage.getItem("query")) {
      this.queryvalue();
    } else {
      this.getUser();
    }
  },
  filters: {
    formateDate: function(time) {
      //  注意:time应为格式为13位的unix时间戳
      // 转化为年-月-日 时:分:秒
      /*  time = time * 1000;
      let date = new Date(time);
      console.log(new Date(time));
      return formateDate(date, "yyyy-MM-dd hh:mm"); */

      // 转化为 年 - 月 - 日
      time = time * 1000;
      let date = new Date(time);
      // console.log(new Date(time));
      return formateDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  components: {
    Breadcrumb
  },
  watch: {
    // listObj: {
    //   deep: true,
    //   immediate: true,
    //   handler(value) {
    //     this.$router.push({
    //       path: "/home/users",
    //       query: {
    //         pagenum: value.pagenum,
    //         pagesize: value.pagesize
    //       }
    //     });
    //   }
    // },
    $route: {
      immediate: true,

      handler(value) {
        if (value.query.pagenum || value.query.pagesize) {
          this.listObj.pagenum = Number(value.query.pagenum);
          this.listObj.pagesize = Number(value.query.pagesize);
          this.getUser();
        } else {
          this.getUser();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.users {
  flex: 1;
  background: white;
  border-radius: 5px;
  padding: 15px;
  .block {
    margin-top: 15px;
  }
  ::v-deep .el-dialog {
    width: 600px;
    .el-form-item {
      margin-bottom: 20px;
    }
  }
}
.demo-form-inline {
  padding: 20px 0;
}
.el-form-item {
  margin-bottom: 0;
}
</style>
