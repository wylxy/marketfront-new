<!--
 * @Author: chensanqi 1915656015@qq.com
 * @Date: 2022-12-12 00:41:39
 * @LastEditors: chensanqi 1915656015@qq.com
 * @LastEditTime: 2022-12-12 03:52:29
 * @FilePath: \good\src\views\userCenter.vue
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
      <span>门店</span>
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
        <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
      </el-header>


      <div id="contain">
        <div class="form">
          <label>用户名：</label><input type="text" v-model.trim="username"><br/>
        </div>
        <div class="form">
          <label>密码：</label><input type="password" v-model.trim="password"><br/>
        </div>
        <div class="form">
          <label>性别：</label><input type="gender" v-model.trim="gender"><br/>
        </div>
        <div class="form">
          <label>支付密码：</label><input type="password" v-model.trim="payword"><br/>
        </div>
        <div class="form">
          <label>身份证号：</label><input type="indentifyNumber" v-model.trim="indentifyNumber"><br/>
        </div>
        <div class="form">
          <label>电话：</label><input type="phone" v-model.trim="phone"><br/>
        </div>
        <button @click="edit">更改</button>
      </div>

    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
      username:localStorage.getItem('username'),
      password:"",
      gender:"",
      payword:"",
      indentifyNumber:"",
      phone:""
      };
    },
    methods: {
      logout(){
        this.$router.push('/')
      },
        edit(){
            let baseurl = "http://127.0.0.1:8888";
      this.axios({
        method: "post",
        url: baseurl + "/user/edit",
        headers:{
              'Authorization': 'Bearer'+' '+localStorage.getItem('token')
        },
        data: {
          userName:localStorage.getItem('username'),
          userId: localStorage.getItem("userId"),
          gender:this.gender,
          indentifyNumber: this.indentifyNumber,
          password:this.password,
          payPassword:this.payword,
          phone:this.phone
        },
      }).then((res) => {
          alert(res.data.message)
      });
      this.axios({
        method: "post",
        url: baseurl + "/user/changePassword",
        headers:{
              'Authorization': 'Bearer'+' '+localStorage.getItem('token')
        },
        data: {
          password:this.password
        },
      }).then(res=>{
          console.log(res);
      })
      this.axios({
        method: "post",
        url: baseurl + "/user/changePayPassword",
        headers:{
              'Authorization': 'Bearer'+' '+localStorage.getItem('token')
        },
        data: {
          payPassword:this.payword,
        },
      })
        }
    },
  }
</script>
<style >
#background{
  width: 100%;
    height: 100%;
    /* background: url("../assets/bg2.jpg"); */
    background-size:100% 100%;
    position: fixed;
    top: 0;
    left: 0;
}
#contain{
    margin-top: 20px;
  width: 580px;
  height: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  border-radius: 20px;
}
.form{
  /* color: white; */
  margin-left: 20%;
  margin-top: 60px;
  font-size: 20px;
  text-align: left;
}
label{
  float:left;
  width: 5em;
  margin-right: 1em;
  text-align: right;
}
input,textarea{
  margin-left: 10px;
  padding: 4px;
  border: solid 1px #4e5ef3;
  outline: 0;
  font: normal 13px/100% Verdana,Tahoma,sans-serif;
  width: 200px;
  height: 20px;
  background:#f1f1f190;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
}
input:hover,textarea:hover,input:focus,textarea:focus{border-color:#0d0aa1;}
button{
  position: relative;
  height: 33px;
  width: 150px;
  background: rgba(35, 19, 252, 0.425);
  border-radius: 10px;
  margin-top: 38px;
  box-shadow: none;
  color: white;
  margin-left: 40px;
}
 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
