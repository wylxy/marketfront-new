<!--
 * @Author: chensanqi 1915656015@qq.com
 * @Date: 2022-12-08 17:00:30
 * @LastEditors: chensanqi 1915656015@qq.com
 * @LastEditTime: 2022-12-12 02:26:59
 * @FilePath: \fruit\src\views\main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>

   <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: 100%;margin-left:-1px" >
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

    <el-menu-item index="/order">
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

<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="数量"
        width="180">
        <!-- <input type="number" style="width:100px" v-model="scope.row.quantity"> -->
         <template slot-scope="scope">
        <el-input
        type="number"
            v-model="scope.row.quantity"
            style="width: 100px"
            @keyup.enter.native="updateCart(scope.row.itemId,scope.row.quantity)"
          ></el-input>
            </template>
      </el-table-column>

      <el-table-column
        prop="size"
        label="规格">
      </el-table-column>
       <el-table-column
        prop="unitPrice"
        label="原价">
      </el-table-column>
        <el-table-column
        prop="totalPrice"
        label="总计">
      </el-table-column>
      <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
        <el-button size="small" type="primary" @click="del(scope.row.itemId,scope.row.quantity)">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
   <div class="cre">
     <button style="height:50px;width:150px;font-size:30px" @click="cancel">取消</button>
     <button style="height:50px;width:150px;font-size:30px" @click="cre">生成订单</button>
        </div>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
         tableData: [],
         inputList:[]
      }
    },
    created() {
      this.getCart()
    },
methods: {
  userCenter(){
    this.$router.push("/usercenter");
  },
  logout(){
    this.$router.push('/')
  },
  cancel(){
    this.$router.push('/good')
  },
  del(id,quantity){
    let baseurl = "http://127.0.0.1:8888";
    this.axios({
      method: "post",
      url: baseurl + "/cart/delete",
      headers:{
        'Authorization': 'Bearer'+' '+localStorage.getItem('token')
      },
      data: {
        userId:localStorage.getItem('userId'),
        itemId:id,
        quantity:quantity
      },
    }).then(res=>{
      alert(res.data.message)
      this.getCart()
    })

  },
  cre(){
     let baseurl = "http://127.0.0.1:8888";
    this.axios({
        method: "post",
        url: baseurl + "/order/checkout",
        headers:{
              'Authorization': 'Bearer'+' '+localStorage.getItem('token')
        },
        params: {
          userId:localStorage.getItem('userId'),

        },
      }).then(res=>{
        alert(res.data.message)
         this.$router.push('/order')
      })

  },
  getCart(){
    let baseurl = "http://127.0.0.1:8888";
     this.axios({
        method: "get",
        url: baseurl + "/cart/get",
        headers:{
              'Authorization': 'Bearer'+' '+localStorage.getItem('token')
        },
        params: {
          userId:localStorage.getItem('userId')
        },
      }).then(res=>{
        console.log(res.data.data)
        this.tableData = res.data.data
      })
  },
  updateCart(id,quantity){
     let baseurl = "http://127.0.0.1:8888";
    this.axios({
        method: "post",
        url: baseurl + "/cart/update",
        headers:{
              'Authorization': 'Bearer'+' '+localStorage.getItem('token')
        },
        data: {
          userId:localStorage.getItem('userId'),
          itemId:id,
          quantity:quantity

        },
      }).then(res=>{
        this.getCart()
      })
  }
},

  };
</script>
<style lang="scss">
.cre{
 position: fixed;
    right: 0;
    bottom: 20px;
}
</style>
