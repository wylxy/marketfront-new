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
    <el-menu-item index="/cgood">
      <i class="el-icon-eleme"></i>
      <span>商品</span>
    </el-menu-item>

    <el-menu-item index="/corder">
      <i class="el-icon-s-order"></i>
      <span>订单</span>
    </el-menu-item>

<!--    <el-menu-item index="/cshop">-->
<!--      <i class="el-icon-user"></i>-->
<!--      <span>门店</span>-->
<!--    </el-menu-item>-->
  </el-menu>
    </el-aside>

    <el-container style="height: 100%">
      <el-header style="text-align: right; font-size: 12px;height: 100%;border-bottom: #c0bebe 1px solid">
          <div style="display:flex;line-height: 60px;">
    <div style="margin-top:8px">
      <i class="el-icon-s-fold" style="font-size:23px;"></i>
    </div>
    <div style="flex:1;text-align: center;font-size:30px">
      <span>欢迎来到智慧菜市场管理系统</span>
    </div>
    <el-dropdown>
      <span>商家</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
      </el-header>

      <el-main style="height: 100%">
<!--        <div>-->
<!--    <div style="margin-bottom: 5px">-->
<!--      &lt;!&ndash; <el-input placeholder="请输入商品名称" suffix-icon="el-icon-search" style="width:250px"></el-input> &ndash;&gt;-->
<!--     <el-input v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search" style="width:250px"></el-input>-->
<!--      <el-button type="primary" style="margin-left: 5px" @click="loadPost">查询</el-button>-->
<!--    </div>-->
  <el-table :data="tableData"
            :header-cell-style="{background:'#ceceea',color:'#555555'}"
            border
  >
    <el-table-column prop="orderId" label="订单号" width="150px">
    </el-table-column>
    <el-table-column prop="Courier_id" label="配送员账号" width="150px">
    </el-table-column>
    <el-table-column prop="orderState" label="订单状态" width="100px">
    </el-table-column>
    <el-table-column prop="userId" label="用户账号" width="150px">
    </el-table-column>
    <el-table-column prop="startTime" label="下单时间" width="120px">
    </el-table-column>
    <el-table-column prop="price" label="实付价格" width="80px">
    </el-table-column>
    <el-table-column prop="operate" label="操作">
      <template slot-scope="scope">
      <el-button size="small" type="danger" @click="deleteOrder(scope.row.orderId)">取消订单</el-button>
      <el-button size="small" type="success" @click="updateOrderStatus(scope.row.orderId)"
                 v-if="scope.row.orderState=='已支付'?true:false">配送</el-button>
      </template>
    </el-table-column>
  </el-table>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {Message} from "element-ui";

  export default {
    data() {

      return {
         tableData: [],
         input: '',
         visible: false,
      }
    },
    created() {
      this.getOrder()
    },
    methods: {
      logout(){
        this.$router.push('/')
      },
      deleteOrder(id){
         let baseurl = "http://127.0.0.1:9999";
      this.axios({
          method:"post",
          url:baseurl+'/order/cancel',
          headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
        params:{
          orderId:id
        }
      }).then(res=>{
       alert(res.data.message)
       location.reload();
      })
      },
      updateOrderStatus(id){
        let baseurl = "http://127.0.0.1:9999";
        this.axios({
          method:"post",
          url:baseurl+'/order/updateStatus',
          headers: {
            Authorization: "Bearer" + " " + localStorage.getItem("token"),
          },
          params:{
            orderId:id,
          }
        }).then(res=>{
          Message.success("配送成功")
          location.reload();
        })
      },
      getOrder(){
      let baseurl = "http://127.0.0.1:9999";
      this.axios({
          method:"get",
          url:baseurl+'/order/getMerchantOrders',
          headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
        params:{
          merchantId:localStorage.getItem('mid')
        }
      }).then(res=>{
       this.tableData = res.data.data
        console.log(res.data.data)
      })
   },
    },
  };
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
