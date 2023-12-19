<!--
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
            <span>欢迎来到智慧菜市场管理系统</span>
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
          <!--          <div style="margin-bottom: 5px">-->
          <!--            &lt;!&ndash; <el-input placeholder="请输入商品名称" suffix-icon="el-icon-search" style="width:250px"></el-input> &ndash;&gt;-->
          <!--            <el-input v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search" style="width:250px"></el-input>-->
          <!--            <el-button type="primary" style="margin-left: 5px" @click="loadPost">查询</el-button>-->
          <!--          </div>-->
          <el-table :data="tableData"
                    :header-cell-style="{background:'#ceceea',color:'#555555'}"
                    border
          >
            <el-table-column prop="vipId" label="会员编号" width="80px">
            </el-table-column>
            <el-table-column prop="username" label="用户账号" width="80px">
            </el-table-column>
            <el-table-column prop="level" label="会员等级" width="80px">
            </el-table-column>
            <el-table-column prop="credit" label="会员积分" width="80px">
            </el-table-column>
            <el-table-column prop="startTime" label="缴费时间" width="100px">
            </el-table-column>
            <el-table-column prop="endTime" label="到期时间" width="100px">
            </el-table-column>
            <el-table-column prop="remainingAmountt" label="会员余额" width="80px">
            </el-table-column>
            <el-table-column width="100px" label="注册时长">
              <input type="text" style="width:54px" v-model="input">
            </el-table-column>
            <el-table-column width="100px" label="充值金额">
              <input type="text" style="width:54px" v-model="money">
            </el-table-column>
            <el-table-column prop="operate" label="操作">
              <el-button size="small" type="primary" @click="renewVip">注册</el-button>
              <el-button size="small" type="success" @click="rechargeVip">充值</el-button>
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
      money: ""
    }
  },
  created() {
    this.getVip()
  },
  methods: {
    userCenter(){
      this.$router.push("/usercenter");
    },
    logout() {
      this.$router.push('/')
    },
    getVip() {
      let baseurl = "http://127.0.0.1:8888"
      this.axios({
        method: 'get',
        url: baseurl + '/vip/get',
        headers: {
          'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
        },
        params: {
          id: localStorage.getItem('userId')
        }
      }).then(res => {
        this.tableData = []
        this.tableData.unshift(res.data.data)
      })
    },
    renewVip() {
      let baseurl = "http://127.0.0.1:8888"
      this.axios({
        method: "post",
        url: baseurl + "/vip/renew",
        headers: {
          'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
        },
        data: {
          days: this.input,
          userId: localStorage.getItem('userId')
        },
      }).then(res => {
        this.tableData = res.data.data
        this.getVip()
      })

    },
    rechargeVip() {
      let baseurl = "http://127.0.0.1:8888"
      this.axios({
        method: "post",
        url: baseurl + "/vip/recharge",
        headers: {
          'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
        },
        data: {
          money: this.money,
          userId: localStorage.getItem('userId')
        },
      }).then(res => {
        alert(res.data.message)
        location.reload();
      })

    }
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
