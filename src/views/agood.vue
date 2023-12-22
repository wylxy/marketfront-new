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
            <span>欢迎来到智慧蔬果坊管理系统</span>
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
            <el-input
              v-model="input"
              placeholder="请输入内容"
              suffix-icon="el-icon-search"
              style="width: 250px"
            ></el-input>
            <el-button type="primary" style="margin-left: 5px" @click="search"
              >查询</el-button
            >
            <!-- <el-button type="danger" style="margin-left: 5px" @click="loadPost">添加商品</el-button> -->
            <el-button
              type="danger"
              style="margin-left: 5px"
              @click="dialogFormVisible = true"
              >添加商品</el-button
            >
            <el-dialog title="商品信息" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="保质期" :label-width="formLabelWidth">
                  <el-input v-model="form.exp" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.itemName"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="标签" :label-width="formLabelWidth">
                  <el-input v-model="form.label" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="门店编号" :label-width="formLabelWidth">
                  <el-input v-model="form.nid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="特价" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.specialPrice"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="规格" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.tradeSize"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="原价" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.unitPrice"
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
            <el-dialog title="商品信息" :visible.sync="dialogFormVisibleEdit">
              <el-form :model="form">
                <el-form-item label="保质期" :label-width="formLabelWidth">
                  <el-input v-model="form.exp" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                  <el-input
                      v-model="form.itemName"
                      autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="标签" :label-width="formLabelWidth">
                  <el-input v-model="form.label" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="门店编号" :label-width="formLabelWidth">
                  <el-input v-model="form.nid" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="特价" :label-width="formLabelWidth">
                  <el-input
                      v-model="form.specialPrice"
                      autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="规格" :label-width="formLabelWidth">
                  <el-input
                      v-model="form.tradeSize"
                      autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item label="原价" :label-width="formLabelWidth">
                  <el-input
                      v-model="form.unitPrice"
                      autocomplete="off"
                  ></el-input>
                </el-form-item>
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
            <el-table-column prop="itemName" label="名称" width="180px">
            </el-table-column>
            <el-table-column prop="tradeSize" label="规格" width="100px">
            </el-table-column>
            <el-table-column prop="label" label="标签" width="100px">
            </el-table-column>
            <el-table-column prop="productId" label="商品编号" width="180px">
            </el-table-column>
            <el-table-column prop="nId" label="门店编号" width="180px">
            </el-table-column>
            <el-table-column prop="unitPrice" label="原价" width="80px">
            </el-table-column>
            <el-table-column prop="specialPrice" label="特价" width="80px">
            </el-table-column>
            <el-table-column prop="exp" label="保质期" width="80px">
            </el-table-column>
            <el-table-column prop="operate" label="操作">
              <template slot-scope="scope" >

              <el-button type="text" @click="dialogFormVisibleEdit = true;edit(scope.row)"> 修改</el-button>
              <el-button type="text" @click="delGood(scope.row.productId)"> 删除</el-button>
<!--              <el-button size="small" type="success" @click="del(tableData)">删除</el-button>-->
<!--              <template slot-scope="tableData">-->
<!--                <el-button-->
<!--                    size="small"-->
<!--                    type="success"-->
<!--                    @click="del(tableData.row.productId)"-->
<!--                >删除</el-button-->
<!--                >-->
              </template>
<!--            <el-dialog title="商品信息" :visible.sync="dialogFormVisible">-->
<!--              <el-form :model="form">-->
<!--                <el-form-item label="保质期" :label-width="formLabelWidth">-->
<!--                  <el-input v-model="form.exp" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="商品名称" :label-width="formLabelWidth">-->
<!--                  <el-input-->
<!--                    v-model="form.itemName"-->
<!--                    autocomplete="off"-->
<!--                  ></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="标签" :label-width="formLabelWidth">-->
<!--                  <el-input v-model="form.label" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="门店编号" :label-width="formLabelWidth">-->
<!--                  <el-input v-model="form.nid" autocomplete="off"></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="特价" :label-width="formLabelWidth">-->
<!--                  <el-input-->
<!--                    v-model="form.specialPrice"-->
<!--                    autocomplete="off"-->
<!--                  ></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="规格" :label-width="formLabelWidth">-->
<!--                  <el-input-->
<!--                    v-model="form.tradeSize"-->
<!--                    autocomplete="off"-->
<!--                  ></el-input>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="原价" :label-width="formLabelWidth">-->
<!--                  <el-input-->
<!--                    v-model="form.unitPrice"-->
<!--                    autocomplete="off"-->
<!--                  ></el-input>-->
<!--                </el-form-item>-->
<!--              </el-form>-->
<!--              <div slot="footer" class="dialog-footer">-->
<!--                <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--                <el-button-->
<!--                  type="primary"-->
<!--                  @click="-->
<!--                    dialogFormVisible = false;-->
<!--                    add();-->
<!--                  "-->
<!--                  >确 定</el-button-->
<!--                >-->
<!--              </div>-->
<!--            </el-dialog>-->
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
      let baseurl = "http://127.0.0.1:9999";
      this.axios({
        method: "post",
        url: baseurl + "/item/add",
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },

        data: {
          exp: this.form.exp,
          itemName: this.form.itemName ,
          label: this.form.label,
          nid: this.form.nid,
          specialPrice: this.form.specialPrice,
          tradeSize: this.form.tradeSize,
          unitPrice: this.form.unitPrice,
        },
      }).then((res) => {
        alert(res.data.message)
        location.reload();
      });
    },
    getList() {
      let baseurl = "http://127.0.0.1:9999";
      let method = "/item/getlist";
      let username = localStorage.getItem("username");
      alert(username);
      if(username=="admin"){
        method =  "/item/getall";
      }
      this.axios({
        method: "get",
        url: baseurl + method,
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
        params:{
          storeId:localStorage.getItem("mid")
        }
      }).then((res) => {
        this.tableData = res.data.data;
        console.log(res.data.data);
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
        exp: row.exp,
        itemName: row.itemName ,
        label: row.label,
        nid: row.nId,
        specialPrice: row.specialPrice,
        tradeSize: row.tradeSize,
        unitPrice: row.unitPrice,
        productId :row.productId
      }
      },
      editSubmit(){
        let baseurl = "http://127.0.0.1:9999";
        this.axios({
          method: "post",
          url: baseurl + "/item/edit",
          headers: {
            Authorization: "Bearer" + " " + localStorage.getItem("token"),
          },
          data: {
            exp: this.form.exp,
            itemName: this.form.itemName ,
            label: this.form.label,
            nid: this.form.nid,
            specialPrice: this.form.specialPrice,
            tradeSize: this.form.tradeSize,
            unitPrice: this.form.unitPrice,
            productId: this.form.productId

          },
        }).then((res) => {
          alert(res.data.message)
          location.reload();
        });
      },
    delGood(id){
      let baseurl = "http://127.0.0.1:9999";
      this.axios({
        method: "get",
        url: baseurl + "/item/delete",
        headers: {
          Authorization: "Bearer" + " " + localStorage.getItem("token"),
        },
        params: {
          itemId: id,
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
