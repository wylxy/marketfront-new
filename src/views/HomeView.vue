<template>
<div id="background">
    <div class="container">
        <form action="">
          <h1>Login</h1>
          <div class="form">
              <div class="item">
                <label>用户名：</label><input type="text" name="username" v-model.trim="name" placeholder="请输入用户名">
                <!-- v-model把输入的值传输给name变量 -->
                <br/>
              </div>
              <div class="item">
                <label>密码：</label><input type="password" name="password" v-model.trim="password" placeholder="请输入密码">
                <br/>
              </div>
              <!-- <div class="keep">
                <input @click="handlesave" id="yes" type="radio" value="0" >
                <label for="yes">保持登录状态</label>
              </div> -->
          </div>

        </form>
             <div>
                <button  type="submit" @click="handlelogin">登录</button>
              <!-- v-on点击按钮触发handlelogin方法 -->
              <button  @click="handleregister">注册</button>
             </div>
             <div>
                 <button  type="submit" @click="chandlelogin">商家登录</button>
              <!-- v-on点击按钮触发handlelogin方法 -->
              <button  @click="chandleregister">商家注册</button>
             </div>
      <div>
        <button  type="submit" @click="adminlogin">管理员登录</button>
      </div>
          <!-- <router-view></router-view> -->
    </div>
</div>
</template>

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

.container{
  width: 480px;
  height: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background:#00000090;
  text-align: center;
  border-radius: 20px;
  margin-top: 10px;
}
.container h1{
  color: aliceblue;
  margin-left: 20px;
}
.item {
  color: white;
  margin-left: 15%;
  margin-top: 35px;
  font-size: 20px;
  text-align: left;
}
.item label{
  float:left;
  width: 5em;
  margin-right: 1em;
  text-align: right;
}
input{
  margin-left: -5px;
  padding: 4px;
  border: solid 1px #4e5ef3;
  outline: 0;
  font: normal 13px/100% Verdana,Tahoma,sans-serif;
  width: 200px;
  height: 23px;
  background:#f1f1f190;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
}
button{
  position: relative;
  height: 33px;
  width: 100px;
  background: rgba(35, 19, 252, 0.425);
  border-radius: 10px;
  margin-top: 18px;
  box-shadow: none;
  color: white;
  margin-left: 40px;
  margin-right: 10px;

}
.keep{
  color: white;
}
.keep input{
  width: 15px;
  height: 15px;
  margin-top: 7px;
  margin-left: 10px;
  margin-right: 10px;
}

</style>
<script>
export default {
  data(){
    return{
      name:"",//姓名，用v-model绑定监听，将输入的字符串赋值给name变量
      password:"",//密码
      st:"false",//false为不保存登录
    };
  },
  methods:{
     handlelogin()
    {
      let baseurl = "http://127.0.0.1:8888"
      this.axios.post(baseurl+"/user/login",{
        username:this.name,
        password:this.password,
      }).then(res=>{
        if(res.data.code==2200){
          localStorage.setItem('token',res.data.data.token)
          localStorage.setItem('userId',res.data.data.userId)
          localStorage.setItem('username',this.name)
          alert(res.data.message)
          console.log(this.name);
          this.$router.push('/good')
        }else{
          alert(res.data.message)
        }
      })
//       let baseurl = "http://192.168.101.10:8888"
//       this.axios({
//   method: 'post',
//   url: baseurl+"/user/login",
//   params: {
//     username:this.username,
//     password:this.password,
//   }
// }).then((res) => {
//   console.log(res);
// })
    },
    adminlogin(){
      let baseurl = "http://127.0.0.1:9999"
      this.axios({
        method:"post",
        url:baseurl+"/merchant/login",
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
        params:{
          username:this.name,
          password:this.password,
        }
      }).then(res=>{
        localStorage.setItem("mid",res.data.data.mid)
        localStorage.setItem('token',res.data.data.token)
        localStorage.setItem('username',this.name)

        this.$router.push('/auser')
      })
    },
      chandlelogin()
    {
      let name = this.name;
      let baseurl = "http://127.0.0.1:9999"
      this.axios({
        method:"post",
        url:baseurl+"/merchant/login",
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
        params:{
           username:this.name,
           password:this.password,
        }
      }).then(res=>{
        if(res.data.code==2200){
          localStorage.setItem('token',res.data.data.token)
          localStorage.setItem('username',name)
          localStorage.setItem("mid",res.data.data.mid)
          alert(res.data.message)
          this.$router.push('/cgood')
        }else{
          alert(res.data.message)
        }



      })
    },
    handleregister()
    {
      this.$router.push('/register')//点击注册按钮，跳转至注册页面
    },
    chandleregister()
    {
      this.$router.push('/cregister')//点击注册按钮，跳转至注册页面
    },
  }
};
</script>
