<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside
      width="200px"
      style="
        background-color: rgb(238, 241, 246);
        height: 100%;
        margin-left: -1px;
      "
    >
      <el-menu
        router
        :default-active="$route.path"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#FFC540"
        style="height: 100vh"
      >
        <el-menu-item index="/auser">
          <i class="el-icon-eleme"></i>
          <span>用户</span>
        </el-menu-item>

        <el-menu-item index="/avip">
          <i class="el-icon-s-order"></i>
          <span>会员</span>
        </el-menu-item>

        <el-menu-item index="/ashop">
          <i class="el-icon-user"></i>
          <span>门店</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container style="height: 100%">
      <el-header
        style="
          text-align: right;
          font-size: 12px;
          height: 100%;
          border-bottom: #c0bebe 1px solid;
        "
      >
        <div style="display: flex; line-height: 60px">
          <div style="margin-top: 8px">
            <i class="el-icon-s-fold" style="font-size: 23px"></i>
          </div>
          <div style="flex: 1; text-align: center; font-size: 30px">
            <span>欢迎来到智慧菜市场管理系统</span>
          </div>
          <el-dropdown>
            <span>管理员</span
            ><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown">
<!--              <el-dropdown-item @click.native="toUser"-->
<!--                >个人中心</el-dropdown-item-->
<!--              >-->
              <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main style="height: 100%">
        <div>
          <div style="margin-bottom: 5px">
            <!-- <el-input placeholder="请输入商品名称" suffix-icon="el-icon-search" style="width:250px"></el-input> -->
<!--            <el-input-->
<!--              v-model="input"-->
<!--              placeholder="请输入内容"-->
<!--              suffix-icon="el-icon-search"-->
<!--              style="width: 250px"-->
<!--            ></el-input>-->
<!--            <el-button type="primary" style="margin-left: 5px" @click="search"-->
<!--              >查询</el-button-->
<!--            >-->
            <!-- <el-button type="danger" style="margin-left: 5px" @click="loadPost">添加商品</el-button> -->
            <el-button
                type="danger"
                style="margin-left: 5px;float: left;"
                @click="dialogFormVisible = true"
            >添加用户</el-button
            >
            <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.gender"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                  <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                  <el-input v-model="form.identityNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.password"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="支付密码" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.payPassword"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
<!--                <el-form-item label="电话" :label-width="formLabelWidth">-->
<!--                  <el-input-->
<!--                    v-model="form.phone"-->
<!--                    autocomplete="off"-->
<!--                  ></el-input>-->
<!--                </el-form-item>-->
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="
                    dialogFormVisible = false;
                    add();
                  "
                  >确 定</el-button
                >
              </div>
            </el-dialog>
            <el-dialog title="用户信息" :visible.sync="dialogFormVisibleEdit">
              <el-form :model="form">
                <el-form-item v-show="false" label="userId" :label-width="formLabelWidth">
                  <el-input v-model="form.userId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="form.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                  <el-input
                      v-model="form.gender"
                      autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                  <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码" :label-width="formLabelWidth">
                  <el-input v-model="form.identityNumber" autocomplete="off"></el-input>
                </el-form-item>
<!--                <el-form-item label="密码" :label-width="formLabelWidth">-->
<!--                  <el-input v-model="form.password" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="支付密码" :label-width="formLabelWidth">-->
<!--                  <el-input v-model="form.payPassword" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="
                    dialogFormVisibleEdit = false;
                    editSubmit();
                  "
                >确 定</el-button
                >
              </div>
            </el-dialog>
          </div>
          <el-table
            :data="tableData"
            :header-cell-style="{ background: '#ceceea', color: '#555555' }"
            border
          >
<!--            <el-table-column  prop="userId" v-show="false" label="id"width="180px">-->
<!--            </el-table-column>-->
            <el-table-column prop="userName" label="姓名"width="180px">
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="100px">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="100px">
            </el-table-column>
            <el-table-column prop="identityNumber" label="身份证号码" width="180px">
            </el-table-column>
            <el-table-column prop="operate" label="操作">
              <template slot-scope="scope" >

              <el-button type="text" @click="dialogFormVisibleEdit = true;edit(scope.row)"> 修改</el-button>
              <el-button type="text" @click="del(scope.row.userId)"> 删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      input: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      form: {
        exp: "",
        itemName: "",
        label: "",
        nid: "",
        specialPrice: "",
        tradeSize: "",
        unitPrice: "",
        productId:""
      },
      formLabelWidth: "120px",
    };
  },
  created() {
   this.getList();
  },
  methods: {
    logout(){
      this.$router.push('/')
    },
    toUser(){
      this.$router.push("/usercenter");
    },
    add() {
      let id = new Date().getMilliseconds()
      localStorage.setItem('id',id);

      let baseurl = "http://127.0.0.1:8888";
      this.axios({
        method: "post",
        url: baseurl + "/user/register",
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },

        data: {
          userId:id,
          username: this.form.userName,
          gender: this.form.gender ,
          phone: this.form.phone,
          password: this.form.password,
          payPassword: this.form.payPassword,
          identityNumber: this.form.identityNumber},
      }).then((res) => {
        alert(res.data.message)
        location.reload();
      });
    },
    getList() {
      let baseurl = "http://127.0.0.1:9999";
      let method = "/admin/getUserlist";
      this.axios({
        method: "get",
        url: baseurl + method,
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
      }).then((res) => {
        this.tableData = res.data.data;
      });
    },
    search() {
      let baseurl = "http://127.0.0.1:9999";
      this.axios({
        method: "get",
        url: baseurl + "/item/search",
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
        params: {
          keyword:this.input
        },
      }).then((res) => {
        this.tableData = res.data.data;
        console.log(res.data.data);
      });
    },
    edit(row){
      this.form={
        userId:row.userId,
        userName: row.userName,
        gender: row.gender ,
        phone: row.phone,
        password: row.password,
        payPassword: row.payPassword,
        identityNumber: row.identityNumber
      }
      },
      editSubmit(){
        let baseurl = "http://127.0.0.1:9999";
        this.axios({
          method: "post",
          url: baseurl + "/admin/edit",
          headers: {
            Authorization: "Bearer" + " " + localStorage.getItem("token"),
          },
          data: {
            userId: this.form.userId,
            userName: this.form.userName,
            gender: this.form.gender ,
            phone: this.form.phone,
            password: this.form.password,
            payPassword: this.form.payPassword,
            identityNumber: this.form.identityNumber
          },
        }).then((res) => {
          alert(res.data.message)
          location.reload();
        });
      },
    del(id){
      let baseurl = "http://127.0.0.1:9999";
      this.axios({
        method: "get",
        url: baseurl + "/admin/delete",
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
        params: {
          userId: id,
        },
      }).then((res) => {
        alert(res.data.message)
        location.reload();
      });
    }
  },
};
</script>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
