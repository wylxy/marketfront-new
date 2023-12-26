<!--
 * @Author: chensanqi 1915656015@qq.com
 * @Date: 2023-12-08 17:00:30
 * @LastEditors: chensanqi 1915656015@qq.com
 * @LastEditTime: 2023-12-12 12:47:50
 * @FilePath: \fruit\src\views\main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
        <el-menu-item index="/good">
          <i class="el-icon-eleme"></i>
          <span>商品</span>
        </el-menu-item>

        <el-menu-item index="/Order">
          <i class="el-icon-s-order"></i>
          <span>订单</span>
        </el-menu-item>

        <el-menu-item index="/vip">
          <i class="el-icon-user"></i>
          <span>会员</span>
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
            <span>欢迎来到智慧蔬果坊管理系统</span>
          </div>
          <el-dropdown>
            <span>用户</span
            ><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="userCenter">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="exit">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main style="height: 100%">
        <div>
          <div style="margin-bottom: 5px">
            <!-- <el-input placeholder="请输入商品名称" suffix-icon="el-icon-search" style="width:250px"></el-input> -->
            <el-input
              v-model="input"
              placeholder="请输入内容"
              suffix-icon="el-icon-search"
              style="width: 250px"
            ></el-input>
            <el-button type="primary" style="margin-left: 17px" @click="search"
              >查询</el-button
            >
          </div>
          <el-table
            :data="searchData"
            :header-cell-style="{ background: '#ceceea', color: '#555555' }"
            border
          >
            <el-table-column prop="itemName" label="名称" width="180px">
            </el-table-column>
            <el-table-column prop="tradeSize" label="规格" width="100px">
            </el-table-column>
            <el-table-column prop="label" label="标签" width="100px">
            </el-table-column>
            <el-table-column prop="productId" label="商品编号" width="180px">
            </el-table-column>
            <el-table-column prop="storeName" label="门店名称" width="180px">
            </el-table-column>
            <el-table-column prop="unitPrice" label="原价" width="80px">
            </el-table-column>
            <el-table-column prop="specialPrice" label="特价" width="80px">
            </el-table-column>
            <el-table-column prop="exp" label="保质期" width="80px">
            </el-table-column>
            <el-table-column prop="operate" label="操作">
              <!-- <el-button size="small" type="danger">删除</el-button> -->
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="success"
                  @click="addCart(scope.row.productId)"
                  >添加</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="position: fixed; right: 0; bottom: 10px">
          <button
            style="height: 50px; width: 150px; font-size: 30px"
            @click="pcart"
          >
            购物车
          </button>
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
      searchData: [],
    };
  },
  created() {
    this.getAll();
    this.search();
  },
  methods: {
    exit(){
      this.$router.push('/')
    },
    userCenter(){
       this.$router.push("/usercenter");
    },
    pcart() {
      this.$router.push("/cart");
    },
    getAll() {
      let baseurl = "http://127.0.0.1:8888";
      this.axios.get(baseurl + "/item/getall",{
        headers:{
              'Authorization': 'Bearer'+' '+localStorage.getItem('token')
        }
      }).then((res) => {
        this.tableData = res.data.data;

      });
    },
    search() {
      let baseurl = "http://127.0.0.1:8888";
      this.axios({
        method: "get",
        url: baseurl + "/item/search",
        headers:{
              'Authorization': 'Bearer'+' '+localStorage.getItem('token')
        },
        params: {
          keyword: this.input || "",
        },
      }).then((res) => {
        this.searchData = res.data.data;
      });
    },
    addCart(id) {
      let baseurl = "http://127.0.0.1:8888";
      this.axios({
        method: "post",
        url: baseurl + "/cart/add",
        headers:{
              'Authorization': 'Bearer'+' '+localStorage.getItem('token')
        },
        data: {
          userId: localStorage.getItem("userId"),
          quantity: "1",
          itemId: id,
        },
      }).then((res) => {});
    },
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
.cart {
  position: fixed;
  right: 0;
  bottom: 20px;
}
</style>
