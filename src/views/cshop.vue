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
        <el-menu-item index="/cgood">
          <i class="el-icon-eleme"></i>
          <span>商品</span>
        </el-menu-item>

        <el-menu-item index="/corder">
          <i class="el-icon-s-order"></i>
          <span>订单</span>
        </el-menu-item>

        <el-menu-item index="/cshop">
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
            <span>商家</span
            ><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="toUser"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item @click.native="logout"
                >退出系统</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main style="height: 100%">
        <div>
          <!--    <div style="margin-bottom: 5px">-->
          <!--      &lt;!&ndash; <el-input placeholder="请输入商品名称" suffix-icon="el-icon-search" style="width:250px"></el-input> &ndash;&gt;-->
          <!--     <el-input v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search" style="width:250px"></el-input>-->
          <!--      <el-button type="primary" style="margin-left: 5px" @click="loadPost">查询</el-button>-->
          <!--    </div>-->
          <div style="margin-bottom: 5px">
            <el-input v-model="inputid" placeholder="请输入内容" suffix-icon="el-icon-search" style="width:250px"></el-input>
      <!-- <el-button type="primary" style="margin-left: 5px" @click="search()">查询</el-button> -->


<el-button type="primary" @click="dialogTableVisible = true;search()">查询</el-button>

<el-dialog title="门店信息" :visible.sync="dialogTableVisible">
  <el-table :data="gridData">
    <el-table-column property="nId" label="门店编号" width="150"></el-table-column>
    <el-table-column property="address" label="门店地址" width="200"></el-table-column>
    <el-table-column property="name" label="门店名" width="200"></el-table-column>
    <el-table-column property="license" label="许可证" width="200"></el-table-column>
    <el-table-column property="merchantId" label="商家编号" width="200"></el-table-column>
    <el-table-column property="startTime" label="营业开始时间" width="200"></el-table-column>
    <el-table-column property="endTime" label="营业暂停时间" width="200"></el-table-column>
    <el-table-column property="remainingAmount" label="账户剩余金额"></el-table-column>
  </el-table>
</el-dialog>





            <el-button
              type="danger"
              style="margin-left: 5px"
              @click="dialogFormVisible = true"
              >添加门店</el-button
            >
            <el-dialog title="门店信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="地址" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.address"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="许可证" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.license"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="门店名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.startTime"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="结束时间" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.endTime"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
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
          </div>
          <el-table
            :data="tableData"
            :header-cell-style="{ background: '#ceceea', color: '#555555' }"
            border
          >
            <el-table-column prop="nId" label="门店编号" width="120px">
            </el-table-column>
            <el-table-column prop="address" label="门店地址" width="200px">
            </el-table-column>
            <el-table-column prop="name" label="门店名" width="150px">
            </el-table-column>
            <el-table-column prop="license" label="许可证" width="120px">
            </el-table-column>
            <el-table-column prop="merchantId" label="商家编号" width="120px">
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="营业开始时间"
              width="200px"
            >
            </el-table-column>
            <el-table-column prop="endTime" label="营业暂停时间" width="200px">
            </el-table-column>
            <el-table-column
              prop="remainingAmount"
              label="账户剩余金额"

            >
            </el-table-column>
            <!-- <el-table-column prop="operate" label="操作">
              <el-button size="small" type="danger">修改</el-button>
            </el-table-column> -->
          </el-table>
        </div>
        <!-- <div>
          <p style="font-size: 30px; display: flex">门店今日流水：{{}}</p>
        </div> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      gridData:[],
      input: "",
      inputid:"",
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        address: "",
        license: "",
        name: "",
        startTime: "",
        endTime: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.getlist()
    this.gridData.shift()
  },
  methods: {
    logout(){
      this.$router.push('/')
    },
    search(){
       let baseurl = "http://127.0.0.1:9999";
      this.axios({
          method:"get",
          url:baseurl+'/store/get',
          headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
        params:{
          storeId:this.inputid
        }
      }).then(res=>{
        this.gridData.unshift(res.data.data)
        console.log(this.gridData);

      })
    },
    add() {
      let baseurl = "http://127.0.0.1:9999";
      this.axios({
        method: "post",
        url: baseurl + "/store/add",
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
        data: {
          address: this.form.address,
          endTime: this.form.endTime,
          license: this.form.license,
          merchantId: localStorage.getItem('mid'),
          name: this.form.name,
          startTime: this.form.startTime,
        },
      }).then(res=>{
       alert(res.data.message)
       location.reload();
      });
    },
    getlist(){
   let baseurl = "http://127.0.0.1:9999";
   this.axios({
     method: "get",
     url:baseurl+'/store/list',
     headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },

   }).then(res=>{
     this.tableData = res.data.data
   })
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
