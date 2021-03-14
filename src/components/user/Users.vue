<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" type="string" clearable>
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUserDialog=true">添加用户</el-button>
        </el-col>
      </el-row>

      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value=1 :inactive-value=0 active-color="#13ce66"
                       @change="userStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="created_at"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :enterable="false" content="修改" placement="top-start">
              <el-button type="primary" size="medium" @click="showEditDialog(scope.row)" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" size="medium" @click="removeUserById(scope.row.id)" icon="el-icon-delete"></el-button>
            </el-tooltip>
<!--            <el-tooltip class="item" effect="dark" content="修改角色" placement="top-start">
              <el-button type="warning" size="medium" icon="el-icon-setting"></el-button>
            </el-tooltip>-->
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
          :page-sizes="[10, 20, 50, 100]" :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-card>

    <el-dialog title="添加用户" :visible.sync="addUserDialog" width="50%" @close="addDiaLogClose">

      <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="70px">
        <el-input  v-model="addForm.id" type="hidden"></el-input>
        <el-form-item prop="name" label="用户名">
          <el-input prefix-icon="el-icon-user-solid" v-model="addForm.name" type="text"></el-input>
        </el-form-item>

        <el-form-item prop="email" label="邮箱">
          <el-input prefix-icon="el-icon-message" v-model="addForm.email" type="text"></el-input>
        </el-form-item>

        <el-form-item prop="mobile" label="手机号">
          <el-input prefix-icon="el-icon-mobile" v-model="addForm.mobile" type="text"></el-input>
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input prefix-icon="el-icon-lollipop" :placeholder="password_text" v-model="addForm.password" type="password"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser">确 定</el-button>
         <el-button @click="addUserDialog = false">取 消</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import {userList, changeUserStatus, addUser, getInfo, updateUser, deleteUser} from "@/api/user";
import {Message} from "element-ui";

export default {
  data() {
    var checkMobile = (rule, value, callback) => {
      const mobileReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
      if (!value) {
        return callback(new Error('请输入手机号'));
      }
      if (!mobileReg.test(value)) {
        return callback(new Error('请输入正确的手机号'));
      }
      callback()
    };
    //请求参数
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      userList: [],
      total: 0,
      //对话框控制
      addUserDialog: false,
      password_text: "不填写为默认密码",
      addForm: {
        id: "",
        name: "",
        email: "",
        mobile: "",
        password: "",
      },
      addFormRules: {
        name: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 4, message: '用户名最短四位', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ],
        mobile: [
          {validator: checkMobile, trigger: 'blur'}
        ],
        password: [
          {min: 6, message: '用户名最短六位', trigger: 'blur'}
        ],
      },

    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      userList(this.queryInfo).then((res_data) => {
        if (res_data.code !== 200) {
          Message({
            message: res_data.message,
            type: 'error',
            duration: 5 * 1000
          })
        }
        this.userList = res_data.data.user_list
        this.total = res_data.data.total
        return res_data;
      })
    },
    //监听页面大小改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    //页码改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    //修改状态
    userStatusChange(UserInfo) {
      changeUserStatus({uid: UserInfo.id, status: UserInfo.status}).then((res_data) => {
        if (res_data.code !== 200) {
          UserInfo.status = !UserInfo.status
          this.$message.error(res_data.message);

        }
        this.$message.success(res_data.message);
      });
    },
    //关闭清空
    addDiaLogClose() {
      this.$refs.addFormRef.resetFields()
      this.password_text = "不填写为默认密码"
    },
    //添加前验证
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        console.log(this.addForm);
        if (this.addForm.id){
          updateUser(this.addForm).then((res_data) => {
            if (res_data.code !== 200) {
              this.$message.error(res_data.message)
            }
            this.$message.success(res_data.message)
            this.addUserDialog = false
            this.getUserList()
          });
        }else {
          addUser(this.addForm).then((res_data) => {
            if (res_data.code !== 200) {
              this.$message.error(res_data.message)
            }
            this.$message.success(res_data.message)
            this.addUserDialog = false
            this.getUserList()
          });
        }

      });
    },
    //编辑
    showEditDialog(info){
      this.addUserDialog=true
      getInfo({id: info.id}).then((res_data) => {
        this.addForm.id = res_data.data.id
        this.addForm.name = res_data.data.name
        this.addForm.mobile = res_data.data.mobile
        this.addForm.email = res_data.data.email
        this.password_text = "不填写密码不做修改"
      });

    },
    removeUserById(id){
      this.$confirm('是否删除用户?', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        deleteUser({id:id}).then((res_data) => {
          if (res_data.code !== 200) {
            this.$message.error(res_data.message)
          }
          this.$message.success(res_data.message)
          this.addUserDialog = false
          this.getUserList()
        });

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });



    }
  }
}
</script>

<style lang="less" scoped>

</style>