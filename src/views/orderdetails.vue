<!--
 * @Author: chensanqi 1915656015@qq.com
 * @Date: 2022-12-08 17:00:30
 * @LastEditors: chensanqi 1915656015@qq.com
 * @LastEditTime: 2022-12-12 03:34:54
 * @FilePath: \fruit\src\views\main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>

  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: 100%;margin-left:-1px">
      <el-menu
          router
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#FFC540"
          style="height:100vh;"
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
      <el-header style="text-align: right; font-size: 12px;height: 100%;border-bottom: #c0bebe 1px solid">
        <div style="display:flex;line-height: 60px;">
          <div style="margin-top:8px">
            <i class="el-icon-s-fold" style="font-size:23px;"></i>
          </div>
          <div style="flex:1;text-align: center;font-size:30px">
            <span>欢迎来到智慧蔬果坊管理系统</span>
          </div>
          <el-dropdown>
            <span>用户</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="userCenter">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main style="height: 100%">
        <div>
          <div style="margin-bottom: 5px">
            <!-- <el-input placeholder="请输入商品名称" suffix-icon="el-icon-search" style="width:250px"></el-input> -->
            <!-- <el-input v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search" style="width:250px"></el-input>
            <el-button type="primary" style="margin-left: 5px" >查询</el-button> -->
          </div>
          <el-table :data="tableData"
                    :header-cell-style="{background:'#ceceea',color:'#555555'}"
                    border
          >
            <el-table-column prop="orderId" label="订单号" width="400px">
            </el-table-column>
            <el-table-column prop="productId" label="商品编号" width="400px">
            </el-table-column>

            <el-table-column prop="number" label="数量">

            </el-table-column>
          </el-table>
          <el-button type="primary" style="margin-left: 5px;margin-top: 10px" @click="cancel">退出</el-button>
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
    }
  },
  created() {
    this.tableData = this.$route.query.tableData
  },
  methods: {
    cancel() {
      this.$router.push('/order')
    },
    userCenter() {
      this.$router.push("/usercenter");
    },
    logout() {
      this.$router.push('/')
    },
  },
}
</script>
<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
