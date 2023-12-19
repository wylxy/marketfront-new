<!--
 * @Author: chensanqi 1915656015@qq.com
 * @Date: 2022-12-08 15:47:52
 * @LastEditors: chensanqi 1915656015@qq.com
 * @LastEditTime: 2022-12-12 14:45:10
 * @FilePath: \fruit\src\views\register.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="background">
      <div id="contain">
        <h1>Register</h1>

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
          <label>身份证号：</label><input type="indentifyNumber" v-model.trim="indentifyNumber"><br/>
        </div>
        <div class="form">
          <label>电话：</label><input type="phone" v-model.trim="phone"><br/>
        </div>
        <button @click.prevent="handlefinish">提交</button>
      </div>
    </div>
</template>
//css
<style scoped>
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
  width: 580px;
  height: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background:#00000090;
  text-align: center;
  border-radius: 20px;
}
#contain h1{
  color: white;
}
.form{
  color: white;
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
</style>
<script>
export default {
    name:'register',
    props: {
    msg: String
  },
  data(){
    return{
      username:"",
      password:"",
      gender:"",
      phone:"",
      payword:"",
      indentifyNumber:""
  };
  },methods:{
  //点击完成按钮触发handlefinish
    handlefinish()
    {


        let id = new Date().getMilliseconds()
        localStorage.setItem('mid',id);
        // let baseurl = "http://192.168.0.103:9999"
        let baseurl = "http://127.0.0.1:9999"
        this.axios.post(baseurl+"/merchant/register",{
          username:this.username,
          gender:this.gender,
          password:this.password,
          phone:this.phone,
          identityNumber:this.indentifyNumber,
          merchantId:id
        }).then(res=>{
          console.log(res);
          if(res.data.message == "注册成功"){
             this.$router.push('/')
              alert("注册成功");
          }
        })
       // this.$router.push('/login');//完成注册后跳转至登录页面

    }
  }
};
</script>
